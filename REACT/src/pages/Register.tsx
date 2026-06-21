import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Network, Eye, EyeOff, CheckCircle, Circle } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = (() => {
    let s = 0;
    if (password.length >= 6) s++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) s++;
    if (/[^a-zA-Z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthText = ["请输入密码", "极弱", "弱", "中等", "强"];
  const strengthColor = [
    "bg-outline-variant",
    "bg-error",
    "bg-orange-400",
    "bg-secondary",
    "bg-secondary",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !role || !password.trim()) {
      setError("请填写所有必填项");
      return;
    }
    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }
    if (!terms) {
      setError("请同意服务条款");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const ok = register(name, email, role, password);
      if (ok) {
        navigate("/", { replace: true });
      } else {
        setError("该邮箱已被注册");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center p-gutter relative overflow-hidden selection:bg-secondary-container selection:text-on-secondary-container">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-surface via-transparent to-secondary/5" />
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center p-gutter w-full">
        <div className="w-full max-w-[480px] animate-fade-in-up">
          {/* Branding */}
          <div className="text-center mb-stack-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-stack-md shadow-lg shadow-primary/20">
              <Network className="w-6 h-6 text-on-primary" />
            </div>
            <h1 className="font-display-md text-display-md text-primary tracking-tight">Nexus</h1>
            <p className="font-body-md text-on-surface-variant mt-unit">高价值企业运营协同平台</p>
          </div>

          {/* Registration Card */}
          <div className="glass-card rounded-xl shadow-sm overflow-hidden p-stack-lg">
            <div className="mb-stack-lg">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-unit">创建新账户</h2>
              <p className="font-body-sm text-on-surface-variant">请填写以下信息以完成系统注册</p>
            </div>

            {error && (
              <div className="mb-stack-md p-stack-sm bg-error-container text-on-error-container rounded-lg font-body-sm text-body-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-stack-md">
              {/* Full Name */}
              <div className="group">
                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-unit transition-colors group-focus-within:text-secondary">
                  全名
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入您的真实姓名"
                  className="w-full px-stack-md py-stack-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface transition-all focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-outline-variant"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-unit transition-colors group-focus-within:text-secondary">
                  电子邮箱
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@nexus.com"
                  className="w-full px-stack-md py-stack-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface transition-all focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-outline-variant"
                />
              </div>

              {/* Role */}
              <div className="group">
                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-unit transition-colors group-focus-within:text-secondary">
                  角色选择
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none px-stack-md py-stack-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface transition-all focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 cursor-pointer"
                >
                  <option value="" disabled>请选择您的系统角色</option>
                  <option value="admin">系统管理员</option>
                  <option value="manager">运营经理</option>
                  <option value="analyst">数据分析师</option>
                  <option value="observer">观察员</option>
                </select>
              </div>

              {/* Password */}
              <div className="group">
                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-unit transition-colors group-focus-within:text-secondary">
                  密码
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="设置您的登录密码"
                    className="w-full px-stack-md py-stack-md pr-12 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface transition-all focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-outline-variant"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-stack-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength Indicator */}
                <div className="mt-stack-sm flex items-center gap-1.5 h-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-full flex-1 rounded-full transition-colors duration-300 ${
                        i <= strength ? strengthColor[strength] : "bg-outline-variant"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] font-label-bold text-on-surface-variant mt-1">
                  密码强度: {password.length === 0 ? "请输入密码" : strengthText[strength]}
                </p>
              </div>

              {/* Confirm Password */}
              <div className="group">
                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-unit transition-colors group-focus-within:text-secondary">
                  确认密码
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="再次输入密码"
                    className="w-full px-stack-md py-stack-md pr-12 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface transition-all focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-outline-variant"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-stack-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-stack-sm py-unit">
                <button
                  type="button"
                  onClick={() => setTerms(!terms)}
                  className="flex items-center h-5 mt-0.5"
                >
                  {terms ? (
                    <CheckCircle className="w-4 h-4 text-secondary" />
                  ) : (
                    <Circle className="w-4 h-4 text-outline-variant" />
                  )}
                </button>
                <label className="font-body-sm text-on-surface-variant leading-tight cursor-pointer" onClick={() => setTerms(!terms)}>
                  我已阅读并同意 Nexus{" "}
                  <button type="button" onClick={() => alert("服务条款")} className="text-secondary hover:underline">
                    服务条款
                  </button>{" "}
                  和{" "}
                  <button type="button" onClick={() => alert("隐私政策")} className="text-secondary hover:underline">
                    隐私政策
                  </button>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !terms}
                className={`w-full py-3.5 font-label-bold text-body-lg rounded-full shadow-sm transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 ${
                  terms
                    ? "bg-secondary text-on-secondary hover:shadow-md hover:bg-on-secondary-fixed-variant cursor-pointer"
                    : "bg-outline-variant text-on-primary-container cursor-not-allowed opacity-60"
                }`}
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-on-secondary border-t-transparent rounded-full animate-spin" />
                ) : (
                  "创建账户"
                )}
              </button>
            </form>

            <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant/30 text-center">
              <p className="font-body-sm text-on-surface-variant">
                已有账户？{" "}
                <button onClick={() => navigate("/login")} className="text-secondary font-label-bold hover:underline">
                  立即登录
                </button>
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-stack-lg flex justify-center gap-stack-lg">
            <button onClick={() => alert("帮助中心")} className="text-[11px] font-label-bold text-on-surface-variant hover:text-secondary transition-colors">
              帮助中心
            </button>
            <button onClick={() => alert("系统公告")} className="text-[11px] font-label-bold text-on-surface-variant hover:text-secondary transition-colors">
              系统公告
            </button>
            <button onClick={() => alert("API文档")} className="text-[11px] font-label-bold text-on-surface-variant hover:text-secondary transition-colors">
              API文档
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
