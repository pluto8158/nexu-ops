import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Radar, AlertCircle, Star, Cloud, LayoutDashboard, ArrowLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  const radarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!radarRef.current) return;
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      radarRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    const handleMouseLeave = () => {
      if (!radarRef.current) return;
      radarRef.current.style.transform = "translate(0px, 0px)";
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center overflow-hidden relative text-on-surface">
      {/* Top Header */}
      <header className="absolute top-0 left-0 w-full p-container-margin flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <Radar className="w-8 h-8 text-secondary fill-secondary" />
          <span className="font-display-md text-display-md font-bold text-primary">Nexus</span>
        </div>
        <button
          onClick={() => alert("帮助中心 - 请联系技术支持")}
          className="hidden md:flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors duration-300 font-label-bold text-label-bold"
        >
          <HelpCircle className="w-5 h-5" />
          Help Center
        </button>
      </header>

      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-secondary-container rounded-full mix-blend-multiply filter blur-[100px] opacity-20 -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary-fixed-dim rounded-full mix-blend-multiply filter blur-[120px] opacity-20 -z-10 pointer-events-none" />

      {/* Main Content */}
      <main className="relative w-full max-w-desktop-max mx-auto flex flex-col items-center justify-center px-container-margin z-10 text-center">
        {/* Illustration */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-stack-lg flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-secondary/20 animate-pulse-ring" style={{ animationDelay: "0s" }} />
          <div className="absolute inset-0 rounded-full border-2 border-secondary/40 animate-pulse-ring" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 rounded-full border-2 border-secondary/10 animate-pulse-ring" style={{ animationDelay: "2s" }} />
          <div
            ref={radarRef}
            className="relative z-10 bg-surface-container-lowest rounded-full p-8 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex items-center justify-center transition-transform duration-100"
          >
            <Radar className="w-24 h-24 text-secondary" strokeWidth={1} />
            <AlertCircle className="absolute top-0 right-0 -mt-2 -mr-2 w-6 h-6 text-error" />
            <Star className="absolute bottom-4 left-4 w-4 h-4 text-on-surface-variant/50" />
            <Cloud className="absolute top-1/2 -left-8 w-5 h-5 text-on-surface-variant/30" />
            <Cloud className="absolute bottom-1/4 -right-10 w-7 h-7 text-on-surface-variant/40" />
          </div>
        </div>

        {/* Typography */}
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-sm tracking-tight">
          Signal Lost
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto mb-stack-lg leading-relaxed">
          We couldn't locate the data coordinates you requested. The page might have been moved, deleted, or never existed in this sector.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-sm">
          <button
            onClick={() => navigate("/")}
            className="group relative flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-secondary text-on-secondary rounded-full font-label-bold text-label-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-in-out border border-transparent overflow-hidden"
          >
            <LayoutDashboard className="w-5 h-5 mr-2 z-10" />
            <span className="z-10 whitespace-nowrap">Return to Dashboard</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-transparent text-secondary rounded-full font-label-bold text-label-bold border border-secondary hover:bg-secondary/5 transition-colors duration-300 ease-in-out"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Error Code Footer */}
        <div className="mt-stack-lg pt-stack-md border-t border-outline-variant/30 text-center">
          <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">
            Error Code: 404_NOT_FOUND
          </span>
        </div>
      </main>
    </div>
  );
}
