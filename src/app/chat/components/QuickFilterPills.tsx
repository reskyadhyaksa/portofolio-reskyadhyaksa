import { Brain, Image as ImageIcon, Layers, RotateCcw, Sparkles, Zap } from "lucide-react";
import type { CapabilityFilterKey, ModelUsage } from "@/lib/model-catalog";

interface QuickFilterPillsProps {
  activeCapability: CapabilityFilterKey | null;
  activeUsage: ModelUsage | null;
  onToggleCapability: (cap: CapabilityFilterKey) => void;
  onToggleUsage: (usage: ModelUsage) => void;
  hasActiveFilter: boolean;
  onResetFilters: () => void;
}

export default function QuickFilterPills({
  activeCapability,
  activeUsage,
  onToggleCapability,
  onToggleUsage,
  hasActiveFilter,
  onResetFilters,
}: QuickFilterPillsProps) {
  const isFree = activeCapability === "free";
  const isReasoning = activeCapability === "reasoning";
  const isVision = activeCapability === "image";
  const isFast = activeUsage === "fast";
  const isComplex = activeUsage === "complex";

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
      <button
        type="button"
        aria-pressed={isFree}
        onClick={() => onToggleCapability("free")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
          isFree
            ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-emerald-500/20 hover:text-emerald-300"
        }`}
      >
        <Sparkles className="h-3 w-3 text-emerald-400" aria-hidden="true" />
        <span>Free Tier</span>
      </button>

      <button
        type="button"
        aria-pressed={isReasoning}
        onClick={() => onToggleCapability("reasoning")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
          isReasoning
            ? "border border-purple-500/40 bg-purple-500/20 text-purple-300 shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-purple-500/20 hover:text-purple-300"
        }`}
      >
        <Brain className="h-3 w-3 text-purple-400" aria-hidden="true" />
        <span>Reasoning</span>
      </button>

      <button
        type="button"
        aria-pressed={isVision}
        onClick={() => onToggleCapability("image")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
          isVision
            ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-cyan-500/20 hover:text-cyan-300"
        }`}
      >
        <ImageIcon className="h-3 w-3 text-cyan-400" aria-hidden="true" />
        <span>Vision</span>
      </button>

      <button
        type="button"
        aria-pressed={isFast}
        onClick={() => onToggleUsage("fast")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
          isFast
            ? "border border-amber-500/40 bg-amber-500/20 text-amber-300 shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-amber-500/20 hover:text-amber-300"
        }`}
      >
        <Zap className="h-3 w-3 text-amber-400" aria-hidden="true" />
        <span>Fast</span>
      </button>

      <button
        type="button"
        aria-pressed={isComplex}
        onClick={() => onToggleUsage("complex")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
          isComplex
            ? "border border-indigo-500/40 bg-indigo-500/20 text-indigo-300 shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-indigo-500/20 hover:text-indigo-300"
        }`}
      >
        <Layers className="h-3 w-3 text-indigo-400" aria-hidden="true" />
        <span>Complex</span>
      </button>

      {hasActiveFilter && (
        <button
          type="button"
          onClick={onResetFilters}
          className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-[#9aa0a6] hover:bg-white/[0.06] hover:text-white transition-colors"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
