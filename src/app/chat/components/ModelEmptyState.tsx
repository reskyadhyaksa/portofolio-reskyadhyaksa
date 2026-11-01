import { RotateCcw, SearchX } from "lucide-react";

interface ModelEmptyStateProps {
  onReset: () => void;
}

export default function ModelEmptyState({ onReset }: ModelEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08] text-[#9aa0a6] mb-3">
        <SearchX className="h-6 w-6" aria-hidden="true" />
      </div>
      <h4 className="text-sm font-semibold text-white">No models found</h4>
      <p className="mt-1 max-w-sm text-xs text-[#9aa0a6] leading-relaxed">
        No AI models match your current search and filter combination.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 flex items-center gap-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-white px-3.5 py-1.5 transition-colors border border-white/[0.1]"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Clear filters</span>
      </button>
    </div>
  );
}
