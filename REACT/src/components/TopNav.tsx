import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const topNavItems = [
  { label: "仪表盘", path: "/" },
  { label: "分析", path: "/analytics" },
  { label: "报告", path: "/reports" },
  { label: "数据管理", path: "/data" },
  { label: "系统设置", path: "/settings" },
];

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount] = useState(3);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      alert(`搜索: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface dark:bg-inverse-surface shadow-sm border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-container-margin h-16 max-w-desktop-max mx-auto">
        {/* Left: Mobile menu + Brand */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-display-md text-display-md font-bold text-primary dark:text-inverse-on-surface cursor-pointer" onClick={() => navigate("/")}>
            Nexus
          </span>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex items-end h-full gap-6 pt-2">
          {topNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`font-label-bold text-label-bold pb-3 transition-colors duration-300 ease-in-out cursor-pointer relative top-[1px] border-b-2 ${
                isActive(item.path)
                  ? "text-secondary dark:text-secondary-fixed border-secondary dark:border-secondary-fixed"
                  : "text-on-surface-variant dark:text-outline-variant border-transparent hover:text-secondary dark:hover:text-secondary-fixed"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="搜索资源、报告或设置..."
              className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all w-64 placeholder:text-outline"
            />
          </div>

          <button
            onClick={() => alert(`您有 ${notificationCount} 条新通知`)}
            className="relative p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface" />
            )}
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="h-8 w-px bg-outline-variant mx-1" />

          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="font-label-bold text-label-bold text-on-surface">{user?.name || "用户"}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {user?.role === "admin" ? "高级管理员" : "分析师"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full border border-secondary bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-surface border-t border-outline-variant px-container-margin py-3 space-y-2">
          {topNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left font-label-bold text-label-bold py-2 px-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
