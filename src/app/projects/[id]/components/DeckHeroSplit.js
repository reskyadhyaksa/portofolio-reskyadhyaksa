import { Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";
import FeaturedSlideVisual from "@/app/projects/components/FeaturedSlideVisual";

export default function DeckHeroSplit({ project }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12 sm:mb-16 pointer-events-none">
      <div className="lg:col-span-7 flex flex-col justify-between space-y-6 pointer-events-none">
        <div className="space-y-4 pointer-events-none">
          <div className="flex flex-wrap items-center gap-2.5 pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3.5 py-1.5 text-xs font-bold text-cyan-300 font-mono shadow-sm">
              <Sparkles className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
              <span>{project.status || "SYSTEM // ACTIVE"}</span>
            </span>
            <span className="rounded-full border border-slate-700/80 bg-[#0a1324] px-3.5 py-1.5 text-xs font-mono font-medium text-slate-300 shadow-sm">
              {project.timeline}
            </span>
          </div>

          <div className="space-y-2 pointer-events-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 leading-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg font-semibold text-cyan-400">
              {project.role} · <span className="text-slate-300 font-normal">{project.roleType}</span>
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2 pointer-events-auto">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-700/80 bg-[#091224] p-4 shadow-lg hover:border-cyan-500/40 hover:bg-[#0d1830] transition-all group"
              >
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block group-hover:text-cyan-300 transition-colors">
                  {metric.label}
                </span>
                <p className="text-xl sm:text-2xl font-black font-mono text-white mt-1.5">
                  {metric.value}
                </p>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-5 flex items-center justify-center pointer-events-auto">
        <div className="w-full h-full min-h-[320px] sm:min-h-[400px] relative rounded-3xl border border-slate-700/80 bg-[#081122] p-3 sm:p-4 shadow-2xl shadow-blue-950/70 flex flex-col justify-center">
          <FeaturedSlideVisual project={project} />
        </div>
      </div>
    </div>
  );
}
