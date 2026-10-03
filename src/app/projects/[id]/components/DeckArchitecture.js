"use client";
import { useState } from "react";
import { GitBranch, Copy, Check, ChevronRight } from "lucide-react";

export default function DeckArchitecture({ architecture, codeSnippet }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    if (!codeSnippet?.code) return;
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(codeSnippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  if (!architecture && !codeSnippet) return null;

  return (
    <section className="space-y-6 pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
          <GitBranch className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            System Architecture &amp; Data Pipeline
          </h2>
          {architecture?.title && (
            <p className="text-xs font-mono text-cyan-400 mt-0.5 font-semibold">
              {architecture.title}
            </p>
          )}
        </div>
      </div>

      {architecture?.flow && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto">
          {architecture.flow.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-slate-700/80 bg-[#091224] p-5 shadow-lg hover:border-cyan-400/60 hover:bg-[#0d1a33] transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-500/40 inline-block shadow-sm">
                  STEP {step.step}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-white mt-3 leading-snug group-hover:text-cyan-300 transition-colors">
                  {step.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              {idx < architecture.flow.length - 1 && (
                <div className="hidden lg:flex items-center justify-center absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#081122] border border-slate-700 text-cyan-400 shadow-md">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {codeSnippet && (
        <div className="rounded-2xl border border-slate-700/80 bg-[#02050b] overflow-hidden shadow-2xl font-mono text-xs sm:text-sm pointer-events-auto">
          <div className="flex items-center justify-between border-b border-slate-800 bg-[#0d1627] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 inline-block shadow-sm" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block shadow-sm" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block shadow-sm" />
              </span>
              <span className="text-slate-300 text-xs ml-2 font-mono font-medium">
                {codeSnippet.filename}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                {codeSnippet.language}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                aria-label="Copy Code Snippet"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-[#081122] border border-slate-700 hover:bg-[#12203d] hover:border-slate-500 transition-all shadow-sm active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 overflow-x-auto custom-scrollbar bg-[#02050b] text-slate-200 leading-relaxed font-mono">
            <pre className="text-xs sm:text-sm leading-relaxed">
              <code>{codeSnippet.code}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}
