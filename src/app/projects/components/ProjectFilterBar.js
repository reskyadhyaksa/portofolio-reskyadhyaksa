import { Search, X } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/data/projects";

export default function ProjectFilterBar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  categoryCounts = {},
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-4 pointer-events-none">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar pointer-events-auto">
        {PROJECT_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isActive
                  ? "border border-blue-400/40 bg-blue-500/20 text-blue-300 shadow-sm shadow-blue-500/20"
                  : "border border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-slate-200"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                  isActive
                    ? "bg-blue-400/20 text-blue-200"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative w-full sm:w-72 pointer-events-auto">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or tech..."
          className="w-full rounded-xl border border-white/10 bg-black/40 pl-8.5 pr-8 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-blue-400/50 focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
