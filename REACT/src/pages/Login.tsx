import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Hexagon, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("请输入邮箱和密码");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        navigate("/", { replace: true });
      } else {
        setError("邮箱或密码错误");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center p-gutter relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary opacity-10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-fixed opacity-10 blur-[120px]" />
      </div>

      <main className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Branding */}
        <div className="text-center mb-stack-lg">
          <div className="inline-flex items-center justify-center gap-2 mb-stack-md">
            <Hexagon className="w-8 h-8 text-secondary fill-secondary" />
            <h1 className="font-display-lg text-display-lg text-primary tracking-tight">Nexus</h1>
          </div>
          <p className="font-body-md text-on-surface-variant">高价值企业运营协同平台</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-surface-container transition-all duration-300">
          <div className="mb-stack-lg text-center">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-unit">欢迎回来</h2>
            <p className="font-body-sm text-on-surface-variant">请输入您的凭证以访问系统</p>
          </div>

          {error && (
            <div className="mb-stack-md p-stack-sm bg-error-container text-on-error-container rounded-lg font-body-sm text-body-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            {/* Email */}
            <div>
              <label className="block font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">
                电子邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nexus.com"
                className="w-full px-stack-md py-stack-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface transition-all focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-outline-variant"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-stack-sm">
                <label className="block font-label-bold text-label-bold text-on-surface-variant">
                  密码
                </label>
                <button
                  type="button"
                  onClick={() => alert("请联系管理员重置密码")}
                  className="font-label-sm text-label-sm text-secondary hover:underline"
                >
                  忘记密码？
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入密码"
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-secondary text-on-secondary font-label-bold text-body-lg rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-on-secondary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  登录
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Test accounts */}
          <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant/30">
            <p className="font-label-bold text-label-sm text-on-surface-variant mb-stack-sm text-center uppercase tracking-wider">
              测试账号
            </p>
            <div className="grid grid-cols-2 gap-stack-sm">
              <button
                type="button"
                onClick={() => { setEmail("admin@nexus.com"); setPassword("admin123"); }}
                className="p-stack-sm bg-surface-container-low rounded-lg border border-outline-variant hover:border-secondary transition-colors text-left"
              >
                <p className="font-label-bold text-label-bold text-on-surface">管理员</p>
                <p className="font-body-sm text-on-surface-variant">admin@nexus.com</p>
                <p className="font-label-sm text-secondary">admin123</p>
              </button>
              <button
                type="button"
                onClick={() => { setEmail("test@nexus.com"); setPassword("test123"); }}
                className="p-stack-sm bg-surface-container-low rounded-lg border border-outline-variant hover:border-secondary transition-colors text-left"
              >
                <p className="font-label-bold text-label-bold text-on-surface">测试用户</p>
                <p className="font-body-sm text-on-surface-variant">test@nexus.com</p>
                <p className="font-label-sm text-secondary">test123</p>
              </button>
            </div>
          </div>

          <div className="mt-stack-lg text-center">
            <p className="font-body-sm text-on-surface-variant">
              还没有账户？{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-secondary font-label-bold hover:underline"
              >
                立即注册
              </button>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-stack-lg flex justify-center gap-stack-lg">
          <button onClick={() => alert("帮助中心")} className="text-label-sm font-label-bold text-on-surface-variant hover:text-secondary transition-colors">
            帮助中心
          </button>
          <button onClick={() => alert("系统公告")} className="text-label-sm font-label-bold text-on-surface-variant hover:text-secondary transition-colors">
            系统公告
          </button>
          <button onClick={() => alert("API文档")} className="text-label-sm font-label-bold text-on-surface-variant hover:text-secondary transition-colors">
            API文档
          </button>
        </div>
      </main>
    </div>
  );
}
