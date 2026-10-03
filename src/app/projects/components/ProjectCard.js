import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Terminal, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

export default function ProjectCard({ project }) {
  const getCategoryStyles = (cat) => {
    switch (cat) {
      case "web":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";
      case "ml":
        return "bg-purple-500/10 text-purple-300 border-purple-500/30";
      case "data":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-blue-500/10 text-blue-300 border-blue-500/30";
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#081321]/90 via-[#040b13]/85 to-[#020509]/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-blue-950/40">
      <div className="space-y-4">
        {project.image && (
          <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b13] via-transparent to-transparent opacity-80" />
            {project.featured && (
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 rounded-full border border-amber-400/80 bg-[#070e17]/95 px-3 py-1 text-xs font-bold text-amber-300 shadow-xl shadow-black/80 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span className="tracking-wide">Featured</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono ${getCategoryStyles(
                project.category
              )}`}
            >
              {project.category === "ml"
                ? "Machine Learning"
                : project.category === "web"
                ? "Web Development"
                : "Data Analytics"}
            </span>

            {!project.image && project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/60 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300 font-mono">
                <Sparkles className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span>Featured</span>
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {project.period}
          </span>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-blue-300">
            {project.title}
          </h2>
          <p className="mt-1 text-xs font-medium text-slate-300">
            {project.role}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
          {project.summary || project.bullets[0]}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-300 transition-colors group-hover:border-white/15"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-4">
        <Link
          href={`/experiences?tab=projects&project=${project.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <Terminal className="h-3.5 w-3.5 text-purple-400" />
          <span>Console View</span>
        </Link>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all"
            >
              <span>Live</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {project.detailUrl && (
            <Link
              href={project.detailUrl}
              className="inline-flex items-center gap-1 rounded-lg border border-blue-500/40 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <span>Case Study</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
