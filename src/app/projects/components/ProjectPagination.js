import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-800/80 pointer-events-none">
      <p className="text-xs font-mono text-slate-400 shrink-0">
        <span className="hidden sm:inline">Showing </span>
        <span className="text-white font-bold">{startIndex}</span>-
        <span className="text-white font-bold">{endIndex}</span>
        <span className="hidden sm:inline"> of </span>
        <span className="sm:hidden">/</span>
        <span className="text-white font-bold">{totalItems}</span>
        <span className="hidden sm:inline"> repositories</span>
      </p>

      <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="inline-flex items-center gap-1 rounded-xl border border-slate-700/80 bg-[#091224] px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-slate-300 hover:border-cyan-500/40 hover:bg-[#0d1830] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-700/80 disabled:hover:bg-[#091224] shadow-sm active:scale-95"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                className={`h-7 sm:h-8 min-w-[28px] sm:min-w-[32px] px-1.5 sm:px-2 rounded-xl text-xs font-mono font-bold transition-all shadow-sm active:scale-95 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border border-cyan-400/50 shadow-md shadow-blue-950/50"
                    : "border border-slate-700/80 bg-[#091224] text-slate-300 hover:border-slate-500 hover:bg-[#0d1830] hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="inline-flex items-center gap-1 rounded-xl border border-slate-700/80 bg-[#091224] px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-slate-300 hover:border-cyan-500/40 hover:bg-[#0d1830] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-700/80 disabled:hover:bg-[#091224] shadow-sm active:scale-95"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
