import { GitBranch, Activity } from "lucide-react";

export default function TerminalWindowHeader({ activeFileName }) {
  return (
    <div className="h-10 sm:h-11 px-3 sm:px-4 bg-[#07111c] border-b border-white/[0.08] flex items-center justify-between shrink-0 select-none">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 border border-rose-500/30"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-500/30"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-500/30"></span>
        </div>

        <span className="hidden sm:inline-block h-3 w-px bg-white/10"></span>

        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <span className="text-slate-500 hidden md:inline">resky-os &gt; experiences &gt;</span>
          <span className="text-slate-200 font-semibold">{activeFileName}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden xs:flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-slate-400 font-mono">
          <GitBranch className="w-3 h-3 text-blue-400" />
          <span>main</span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
          <Activity className="w-2.5 h-2.5 animate-pulse" />
          <span className="hidden sm:inline">24ms • </span>
          <span>Online</span>
        </div>
      </div>
    </div>
  );
}
