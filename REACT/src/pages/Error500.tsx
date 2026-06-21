import { useState } from "react";
import { RefreshCw, Headphones, Clock, Hexagon } from "lucide-react";

export default function Error500() {
  const [checking, setChecking] = useState(false);

  const checkStatus = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      alert("系统状态检查完成：所有服务运行正常");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-container-margin relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage:
            "linear-gradient(to right, rgba(197, 198, 205, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 198, 205, 0.1) 1px, transparent 1px)",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(98, 250, 227, 0.08) 0%, transparent 60%)" }} />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-2xl">
        <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] border border-outline-variant/30 p-stack-lg md:p-12 text-center flex flex-col items-center">
          {/* Technical Illustration */}
          <div className="w-48 h-48 md:w-64 md:h-64 mb-stack-lg relative flex items-center justify-center">
            <div className="absolute inset-0 bg-secondary-fixed/20 rounded-full blur-2xl transform scale-75" />
            <div className="relative z-10 w-32 h-32 md:w-40 md:h-40">
              <Hexagon className="w-full h-full text-secondary/80" strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display-lg text-display-lg text-on-surface">500</span>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 bg-surface-container-highest/50 border border-outline-variant/40 rounded-full px-4 py-1.5 mb-stack-md">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
            <span className="font-label-bold text-label-bold text-on-surface-variant tracking-widest uppercase">
              System Code 500
            </span>
          </div>

          {/* Headings */}
          <h1 className="font-display-lg text-display-lg hidden md:block text-on-surface mb-stack-sm text-balance">
            Scheduled Maintenance
          </h1>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:hidden text-on-surface mb-stack-sm text-balance">
            Scheduled Maintenance
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mb-stack-lg text-balance">
            Nexus is currently undergoing high-performance infrastructure upgrades to ensure maximum reliability and speed. We apologize for the temporary interruption to your workflow.
          </p>

          {/* ETA Block */}
          <div className="w-full max-w-sm bg-surface-container border border-outline-variant/30 rounded-lg p-stack-md mb-stack-lg flex flex-col items-center justify-center shadow-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
              Estimated Return
            </span>
            <div className="flex items-center gap-2 text-on-surface">
              <Clock className="w-5 h-5" />
              <span className="font-headline-sm text-headline-sm">14:00 UTC</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-stack-md w-full">
            <button
              onClick={checkStatus}
              disabled={checking}
              className="w-full sm:w-auto bg-secondary text-on-secondary hover:bg-secondary-fixed-dim font-label-bold text-label-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {checking ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Check Status
            </button>
            <button
              onClick={() => alert("联系技术支持: support@nexus.com")}
              className="w-full sm:w-auto bg-transparent border border-outline hover:border-secondary hover:text-secondary text-on-surface font-label-bold text-label-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
            >
              <Headphones className="w-4 h-4" />
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
