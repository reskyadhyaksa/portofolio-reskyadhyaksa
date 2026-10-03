import { Search, X, LayoutGrid, LayoutList, ChevronDown, Filter } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/data/projects";

export default function ProjectFilterBar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  categoryCounts = {},
  viewMode = "grid",
  onViewModeChange,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pointer-events-none">
      <div className="block sm:hidden w-full pointer-events-auto">
        <div className="relative w-full">
          <Filter className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cyan-400" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter category"
            className="w-full appearance-none rounded-xl border border-slate-800 bg-[#060e1c] pl-9 pr-9 py-2.5 text-xs font-semibold text-slate-200 focus:border-cyan-500/60 focus:bg-[#091426] focus:outline-none transition-all shadow-inner"
          >
            {PROJECT_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <option key={cat.id} value={cat.id} className="bg-[#091224] text-slate-200">
                  {cat.label} ({count})
                </option>
              );
            })}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 custom-scrollbar pointer-events-auto rounded-2xl border border-slate-800 bg-[#060e1c] p-1 shadow-inner">
        {PROJECT_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/50 font-bold"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[#0c1626] text-slate-400 border border-slate-800"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5 pointer-events-auto w-full sm:w-auto">
        <div className="relative flex-1 sm:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title or tech..."
            className="w-full rounded-xl border border-slate-800 bg-[#060e1c] pl-9 pr-8 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/60 focus:bg-[#091426] focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear Search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {onViewModeChange && (
          <div className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-800 bg-[#060e1c] p-1 shadow-inner shrink-0">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              aria-label="Grid View"
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              aria-label="List View"
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
