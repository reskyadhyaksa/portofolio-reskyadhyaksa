import Image from "next/image";
import { Server, Cpu, Globe, Lock, ShieldCheck } from "lucide-react";

export default function FeaturedSlideVisual({ project }) {
  if (project.image) {
    return (
      <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] md:min-h-[420px] rounded-2xl overflow-hidden border border-slate-700/80 bg-[#070e1b] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d1627] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#040812] border border-slate-800 text-[11px] font-mono text-slate-400 max-w-[220px] truncate">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-slate-300 truncate">
              {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "") : `${project.id}.app`}
            </span>
          </div>

          <div className="w-10 flex justify-end">
            <span className="text-[10px] font-mono text-cyan-400/80 uppercase font-semibold">
              PREVIEW
            </span>
          </div>
        </div>

        <div className="relative flex-1 w-full min-h-[240px] sm:min-h-[300px] bg-[#02060f] overflow-hidden group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/80 via-transparent to-transparent opacity-60" />
        </div>
      </div>
    );
  }

  if (project.id === "monitorx") {
    return (
      <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] md:min-h-[420px] rounded-2xl overflow-hidden border border-cyan-500/40 bg-gradient-to-br from-[#081526] via-[#040d1a] to-[#02060d] p-6 flex flex-col justify-between shadow-2xl shadow-cyan-950/40">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2.5 font-mono text-xs text-cyan-300">
            <Server className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span className="font-bold tracking-wide">SNMPv3 TELEMETRY ENGINE</span>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-300 border border-emerald-500/40 shadow-sm">
            LIVE 99.98%
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="rounded-xl border border-cyan-500/30 bg-[#07192f] p-3.5 shadow-md">
            <p className="text-[11px] font-mono font-bold text-cyan-300">CPU LOAD</p>
            <p className="text-xl sm:text-2xl font-black font-mono text-white mt-1">24.6%</p>
            <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full w-1/4 rounded-full bg-cyan-400 shadow-sm" />
            </div>
          </div>
          <div className="rounded-xl border border-blue-500/30 bg-[#091b38] p-3.5 shadow-md">
            <p className="text-[11px] font-mono font-bold text-blue-300">RAM USAGE</p>
            <p className="text-xl sm:text-2xl font-black font-mono text-white mt-1">4.2 GB</p>
            <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-blue-400 shadow-sm" />
            </div>
          </div>
          <div className="rounded-xl border border-purple-500/30 bg-[#160d2e] p-3.5 shadow-md">
            <p className="text-[11px] font-mono font-bold text-purple-300">LATENCY</p>
            <p className="text-xl sm:text-2xl font-black font-mono text-white mt-1">12 ms</p>
            <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full w-1/6 rounded-full bg-purple-400 shadow-sm" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700/80 bg-[#030914] p-3.5 font-mono text-[11px] text-slate-200 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>Active Polling Queue</span>
            <span className="text-cyan-400 font-bold">64 Nodes Registered</span>
          </div>
          <p className="text-cyan-300">&gt; SNMPv3 Handshake: authPriv (SHA-256 / AES-128)</p>
          <p className="text-emerald-400">&gt; PostgreSQL Replication Stream: Sync OK</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] md:min-h-[420px] rounded-2xl overflow-hidden border border-purple-500/40 bg-gradient-to-br from-[#1c0b2e] via-[#0e0419] to-[#04010a] p-6 flex flex-col justify-between shadow-2xl shadow-purple-950/40">
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
        <div className="flex items-center gap-2.5 font-mono text-xs text-purple-300">
          <Cpu className="h-4 w-4 text-purple-400 animate-pulse" />
          <span className="font-bold tracking-wide">NLP SENTIMENT MODEL</span>
        </div>
        <span className="rounded-full bg-purple-500/20 px-2.5 py-1 font-mono text-[11px] font-bold text-purple-300 border border-purple-500/40 shadow-sm">
          e-Hak Cipta Verified
        </span>
      </div>

      <div className="space-y-3 my-4">
        <div className="rounded-xl border border-purple-500/30 bg-[#160a28] p-4 shadow-md">
          <div className="flex justify-between items-center text-xs font-mono text-purple-200 mb-1.5">
            <span>Disaster Emergency Urgency Score</span>
            <span className="text-emerald-400 font-bold">94.8% F1-Score</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-emerald-400 shadow-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
          <div className="rounded-xl border border-slate-700/80 bg-[#06020c] p-3 shadow-inner">
            <span className="text-slate-400 text-[10px] block">Model Pipeline</span>
            <p className="text-purple-300 font-bold mt-1">TF-IDF + Naive Bayes</p>
          </div>
          <div className="rounded-xl border border-slate-700/80 bg-[#06020c] p-3 shadow-inner">
            <span className="text-slate-400 text-[10px] block">Dataset Processing</span>
            <p className="text-purple-300 font-bold mt-1">Disaster Social Streams</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700/80 bg-[#06020c] p-3.5 font-mono text-[11px] text-slate-200 shadow-inner">
        <p className="text-purple-300">&gt; Text classification active: Disaster Sentiment Radar</p>
      </div>
    </div>
  );
}
