import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import { useEffect } from "react";

export default function Layout() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const noLayoutPaths = ["/login", "/register", "/404", "/500"];
  const hideLayout = noLayoutPaths.some((p) => location.pathname.startsWith(p));

  if (hideLayout) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideNav />
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-container-margin">
          <div className="max-w-desktop-max mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
