import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Database,
  Settings,
  HelpCircle,
  LogOut,
  Key,
  Users,
  Shield,
  ReceiptText,
  Puzzle,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "仪表盘", path: "/" },
  { icon: BarChart3, label: "分析", path: "/analytics" },
  { icon: FileText, label: "报告", path: "/reports" },
  { icon: Database, label: "数据管理", path: "/data" },
];

const settingsNavItems = [
  { icon: Users, label: "用户", path: "/users" },
  { icon: Shield, label: "权限", path: "/permissions" },
  { icon: ReceiptText, label: "日志", path: "/logs" },
  { icon: Puzzle, label: "集成", path: "/integrations" },
];

export default function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-surface-container-low border-r border-outline-variant z-30 flex flex-col transition-all duration-300 hidden md:flex ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="px-6 py-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary shrink-0">
          <span className="font-bold text-lg">N</span>
        </div>
        {!collapsed && (
          <div>
            <p className="font-headline-sm text-headline-sm text-on-surface truncate">
              {user?.name || "System Admin"}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              {user?.role === "admin" ? "Operations Control" : "Analyst"}
            </p>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mx-0 transition-all duration-300 ease-in-out transform active:scale-95 ${
                active
                  ? "bg-secondary-container text-on-secondary-container shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="font-label-bold text-label-bold">{item.label}</span>
              )}
            </button>
          );
        })}

        {!collapsed && (
          <div className="pt-4 pb-2">
            <p className="px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              系统
            </p>
          </div>
        )}
        {collapsed && <div className="h-4" />}

        {settingsNavItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mx-0 transition-all duration-300 ease-in-out transform active:scale-95 ${
                active
                  ? "bg-secondary-container text-on-secondary-container shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="font-label-bold text-label-bold">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="px-4 pb-3">
        <button
          onClick={() => alert("API Key 生成成功: nxsk_" + Math.random().toString(36).slice(2, 14))}
          className={`w-full py-2.5 rounded-full bg-secondary text-on-secondary font-label-bold text-label-bold hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
            collapsed ? "px-2" : "px-4"
          }`}
          title={collapsed ? "Generate API Key" : undefined}
        >
          <Key className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Generate API Key</span>}
        </button>
      </div>

      {/* Footer */}
      <div className="px-2 pt-4 border-t border-outline-variant space-y-1">
        <button
          onClick={() => navigate("/settings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-on-surface-variant hover:bg-surface-container-highest ${
            isActive("/settings") ? "bg-surface-container-highest text-on-surface" : ""
          }`}
          title={collapsed ? "设置" : undefined}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-label-bold text-label-bold">设置</span>}
        </button>
        <button
          onClick={() => alert("帮助中心 - 请联系技术支持")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-on-surface-variant hover:bg-surface-container-highest"
          title={collapsed ? "帮助" : undefined}
        >
          <HelpCircle className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-label-bold text-label-bold">Help Center</span>}
        </button>
        <button
          onClick={() => {
            if (confirm("确定要退出登录吗？")) {
              logout();
              navigate("/login");
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-error hover:bg-error-container"
          title={collapsed ? "退出" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-label-bold text-label-bold">Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-surface border border-outline-variant rounded-full flex items-center justify-center text-on-surface-variant hover:text-secondary shadow-sm"
      >
        <span className="text-xs">{collapsed ? ">" : "<"}</span>
      </button>
    </aside>
  );
}
