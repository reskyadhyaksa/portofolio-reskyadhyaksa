"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Terminal, Share2, Check } from "lucide-react";

export default function DeckCommandBar({ project }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  const projectUrl = project.liveUrl || project.githubUrl;
  const isGithub = Boolean(projectUrl && projectUrl.toLowerCase().includes("github.com"));

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8 sm:mb-10 pointer-events-none">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2.5 rounded-xl border border-slate-700/80 bg-[#0a1222] px-4 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:bg-[#0f1b33] hover:text-white transition-all shadow-md active:scale-95 group pointer-events-auto"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-cyan-400" />
        <span>Directory</span>
      </Link>

      <div className="hidden md:flex items-center gap-2.5 font-mono text-xs px-3.5 py-1.5 rounded-full bg-[#080f1d] border border-slate-800 shadow-inner pointer-events-none">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-slate-400">NODE:</span>
        <span className="text-white font-bold uppercase tracking-wider">
          {project.id}
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-cyan-400 text-[11px] font-semibold">
          {project.status || "ACTIVE"}
        </span>
      </div>

      <div className="flex items-center gap-2.5 pointer-events-auto">
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share Link"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-[#0a1222] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:bg-[#0f1b33] hover:text-white transition-all shadow-md active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>

        <Link
          href={`/experiences?tab=projects&project=${project.id}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-purple-500/40 bg-purple-950/40 px-3.5 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-900/50 hover:border-purple-400 hover:text-white transition-all shadow-md active:scale-95"
        >
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Console</span>
        </Link>

        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/50 bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-bold text-white hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-950/50 active:scale-95"
          >
            <span>{isGithub ? "GitHub" : "Live Site"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
