import { Sparkles } from "lucide-react";
import { PROVIDER_LABELS, type ModelProvider } from "@/lib/model-catalog";
import ProviderLogoIcon from "./ProviderLogoIcon";

interface ProviderTabRailProps {
  providers: readonly ModelProvider[];
  activeProvider: ModelProvider | null;
  onSelectProvider: (provider: ModelProvider | null) => void;
  counts: Record<string, number>;
}

export default function ProviderTabRail({
  providers,
  activeProvider,
  onSelectProvider,
  counts,
}: ProviderTabRailProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter models by provider"
      className="custom-scrollbar flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar"
    >
      <button
        type="button"
        role="tab"
        aria-selected={activeProvider === null}
        onClick={() => onSelectProvider(null)}
        className={`flex shrink-0 items-center gap-1.5 rounded-lg sm:rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] ${
          activeProvider === null
            ? "border border-white/20 bg-white/[0.14] text-white shadow-sm"
            : "border border-white/[0.06] bg-white/[0.03] text-slate-400 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
        }`}
      >
        <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#8ab4f8]" aria-hidden="true" />
        <span>All</span>
        <span className="ml-0.5 rounded-full bg-white/[0.08] px-1.5 py-0.2 text-[9.5px] sm:text-[10px] tabular-nums font-mono text-[#c4c7c5]">
          {counts.all ?? 0}
        </span>
      </button>

      {providers.map((provider) => {
        const isActive = activeProvider === provider;
        const count = counts[provider] ?? 0;
        return (
          <button
            key={provider}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectProvider(provider)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg sm:rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] ${
              isActive
                ? "border border-white/20 bg-white/[0.14] text-white shadow-sm font-semibold"
                : "border border-white/[0.06] bg-white/[0.03] text-slate-400 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <ProviderLogoIcon provider={provider} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>{PROVIDER_LABELS[provider]}</span>
            <span className="ml-0.5 rounded-full bg-white/[0.08] px-1.5 py-0.2 text-[9.5px] sm:text-[10px] tabular-nums font-mono text-[#c4c7c5]">
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
