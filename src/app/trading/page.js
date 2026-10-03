import Link from "next/link";
import { Construction, ArrowLeft, FolderGit2, LineChart, Cpu, Sparkles } from "lucide-react";
import TileGrid from "@/component/tilegrid";

export const metadata = {
  title: "Under Construction - Trading Dashboard | Resky Adhyaksa",
  description: "Quantitative trading telemetry and algorithmic analytics system is currently under construction.",
};

export default function TradingPage() {
  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <main className="pointer-events-none relative z-10 flex w-full flex-col items-center justify-center text-white px-4 sm:px-6 py-24 max-w-3xl mx-auto animate-fade-in-up">
        <div className="w-full rounded-3xl border border-slate-700/80 bg-gradient-to-b from-[#091526]/95 via-[#050d18]/95 to-[#02050b]/98 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-blue-950/50 text-center relative overflow-hidden pointer-events-auto">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 px-3.5 py-1 text-xs font-mono font-bold text-amber-300 shadow-sm mb-6">
            <Construction className="h-3.5 w-3.5 text-amber-400" />
            <span>MODULE // UNDER CONSTRUCTION</span>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-500/20 via-[#0a1526] to-cyan-500/10 shadow-xl shadow-amber-950/40">
              <LineChart className="h-10 w-10 text-amber-300" />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-lg border border-cyan-400/40 bg-[#06101e] text-cyan-300">
                <Cpu className="h-3.5 w-3.5 animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Algorithmic Trading Dashboard
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-xl mx-auto mb-8">
            This quantitative analytics engine, real-time market telemetry stream, and automated trading backtester are currently being upgraded with clean architecture and low-latency protocols.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto mb-8 text-left">
            <div className="rounded-xl border border-slate-800 bg-[#040914] p-3 shadow-inner">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Status</span>
              <p className="text-xs font-bold text-amber-300 mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                Refactoring Engine
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#040914] p-3 shadow-inner">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Target Protocol</span>
              <p className="text-xs font-bold text-cyan-300 mt-0.5">WebSocket Feed</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#040914] p-3 shadow-inner">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Security</span>
              <p className="text-xs font-bold text-purple-300 mt-0.5">API Vault Isolated</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-slate-800/80">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#091224] px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:border-slate-500 hover:bg-[#0f1d38] hover:text-white transition-all shadow-md active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/50 bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:brightness-110 shadow-lg shadow-blue-950/50 transition-all active:scale-95"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Projects</span>
            </Link>
          </div>
        </div>
      </main>
      <TileGrid />
    </div>
  );
}