"use client";
import { Layers, Monitor, PenTool, RotateCcw, Wand2 } from "lucide-react";
import type { ImageCapabilityFilterKey } from "@/lib/image-model-filter";

interface ImageQuickFilterPillsProps {
  activeCapability: ImageCapabilityFilterKey | null;
  onToggleCapability: (cap: ImageCapabilityFilterKey) => void;
  hasActiveFilter: boolean;
  onResetFilters: () => void;
}

export default function ImageQuickFilterPills({
  activeCapability,
  onToggleCapability,
  hasActiveFilter,
  onResetFilters,
}: ImageQuickFilterPillsProps) {
  const is4K = activeCapability === "4k";
  const isVector = activeCapability === "vector";
  const isMulti = activeCapability === "multi_image";
  const isEditOnly = activeCapability === "edit_only";

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
      <button
        type="button"
        aria-pressed={is4K}
        onClick={() => onToggleCapability("4k")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
          is4K
            ? "border border-amber-500/40 bg-amber-500/20 text-amber-300 shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-amber-500/20 hover:text-amber-300"
        }`}
      >
        <Monitor className="h-3 w-3 text-amber-400" aria-hidden="true" />
        <span>4K Ultra HD</span>
      </button>

      <button
        type="button"
        aria-pressed={isVector}
        onClick={() => onToggleCapability("vector")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
          isVector
            ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-cyan-500/20 hover:text-cyan-300"
        }`}
      >
        <PenTool className="h-3 w-3 text-cyan-400" aria-hidden="true" />
        <span>Vector Art</span>
      </button>

      <button
        type="button"
        aria-pressed={isMulti}
        onClick={() => onToggleCapability("multi_image")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
          isMulti
            ? "border border-purple-500/40 bg-purple-500/20 text-purple-300 shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-purple-500/20 hover:text-purple-300"
        }`}
      >
        <Layers className="h-3 w-3 text-purple-400" aria-hidden="true" />
        <span>Multi-Reference</span>
      </button>

      <button
        type="button"
        aria-pressed={isEditOnly}
        onClick={() => onToggleCapability("edit_only")}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
          isEditOnly
            ? "border border-rose-500/40 bg-rose-500/20 text-rose-300 shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-rose-500/20 hover:text-rose-300"
        }`}
      >
        <Wand2 className="h-3 w-3 text-rose-400" aria-hidden="true" />
        <span>Style Transfer Only</span>
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
