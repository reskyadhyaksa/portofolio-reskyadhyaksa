import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function DeckAdjacentNavigator({ prevProject, nextProject }) {
  if (!prevProject && !nextProject) return null;

  return (
    <section className="border-t border-slate-800/80 pt-10 mt-12 sm:mt-16 pointer-events-none">
      <div className="flex items-center justify-between mb-4 pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
          Switch Project Focus
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pointer-events-none">
        {prevProject && (
          <Link
            href={`/projects/${prevProject.id}`}
            className="group rounded-2xl border border-slate-700/80 bg-[#091224] p-5 shadow-lg hover:border-cyan-400/60 hover:bg-[#0d1830] transition-all flex items-center justify-between gap-4 pointer-events-auto"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-[#040812] text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-950/40 transition-colors shadow-sm">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                  Previous Project
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {prevProject.title}
                </h4>
              </div>
            </div>
          </Link>
        )}

        {nextProject && (
          <Link
            href={`/projects/${nextProject.id}`}
            className="group rounded-2xl border border-slate-700/80 bg-[#091224] p-5 shadow-lg hover:border-cyan-400/60 hover:bg-[#0d1830] transition-all flex items-center justify-between gap-4 pointer-events-auto"
          >
            <div className="flex items-center gap-3.5 text-right sm:ml-auto">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                  Next Project
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {nextProject.title}
                </h4>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-[#040812] text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-950/40 transition-colors shadow-sm">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
