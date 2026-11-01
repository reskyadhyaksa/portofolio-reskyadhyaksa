import { Search, X } from "lucide-react";
import type { KeyboardEvent } from "react";

interface ModelSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
  placeholder?: string;
}

export default function ModelSearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
  placeholder = "Search models by name, provider, or capability...",
}: ModelSearchBarProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onChange("");
    }
  };

  return (
    <div className="relative flex items-center">
      <div className="pointer-events-none absolute left-2.5 sm:left-3 flex items-center text-[#9aa0a6]">
        <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search models"
        className="h-8.5 sm:h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-8 sm:pl-9 pr-20 sm:pr-24 text-xs sm:text-[13px] text-white placeholder-[#9aa0a6] backdrop-blur-md transition-all duration-200 hover:border-white/[0.14] focus:border-[#8ab4f8] focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-[#8ab4f8]"
      />
      <div className="absolute right-2 flex items-center gap-1.5">
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md text-[#9aa0a6] hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          </button>
        )}
        <span className="rounded-md bg-white/[0.06] px-1.5 sm:px-2 py-0.5 font-mono text-[10px] sm:text-[11px] tabular-nums text-[#9aa0a6]">
          {resultCount === totalCount ? `${totalCount}` : `${resultCount}/${totalCount}`}
        </span>
      </div>
    </div>
  );
}
