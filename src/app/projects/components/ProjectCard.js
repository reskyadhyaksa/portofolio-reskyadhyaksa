import Link from "next/link";
import { ExternalLink, Terminal, ArrowUpRight, Sparkles } from "lucide-react";

export default function ProjectCard({ project, viewMode = "grid" }) {
  const getCategoryStyles = (cat) => {
    switch (cat) {
      case "web":
        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
      case "ml":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      case "data":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    }
  };

  const projectUrl = project.liveUrl || project.githubUrl;
  const isGithub = Boolean(projectUrl && projectUrl.toLowerCase().includes("github.com"));

  if (viewMode === "list") {
    return (
      <div className="group relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5 rounded-2xl border border-slate-700/80 bg-[#081122] p-4 sm:p-5 md:p-6 shadow-lg hover:border-cyan-500/50 hover:bg-[#0c1830] transition-all duration-300 pointer-events-auto">
        <div className="space-y-2.5 sm:space-y-3 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
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

            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 font-mono">
                <Sparkles className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span>Featured</span>
              </span>
            )}

            <span className="text-[11px] font-mono text-slate-400 ml-auto lg:ml-2">
              {project.period}
            </span>
          </div>

          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
              {project.title}
            </h2>
            <p className="mt-0.5 text-xs font-semibold text-cyan-400">
              {project.role}
            </p>
          </div>

          <p className="hidden sm:block text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            {project.summary || project.bullets[0]}
          </p>

          <div className="hidden sm:flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="rounded-md border border-slate-700 bg-[#040914] px-2 py-0.5 font-mono text-[10px] text-slate-300 group-hover:border-slate-600 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2.5 pt-3 sm:pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/40 bg-cyan-950/60 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-900/80 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                <span>{isGithub ? "GitHub" : "Live"}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {project.detailUrl && (
              <Link
                href={project.detailUrl}
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-gradient-to-r from-blue-600 to-cyan-600 px-3.5 py-1.5 text-xs font-bold text-white hover:from-blue-500 hover:to-cyan-500 transition-all shadow-md shadow-blue-950/50 active:scale-95"
              >
                <span>View Detail</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          <Link
            href={`/experiences?tab=projects&project=${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <Terminal className="h-3.5 w-3.5 text-purple-400" />
            <span>Console View</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-slate-700/80 bg-[#081122] p-4 sm:p-5 md:p-6 shadow-lg hover:border-cyan-500/50 hover:bg-[#0c1830] transition-all duration-300 pointer-events-auto">
      <div className="space-y-2.5 sm:space-y-3.5">
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

            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300 font-mono">
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
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white transition-colors group-hover:text-cyan-300 line-clamp-1">
            {project.title}
          </h2>
          <p className="mt-0.5 text-xs font-semibold text-cyan-400">
            {project.role}
          </p>
        </div>

        <p className="hidden sm:block text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
          {project.summary || project.bullets[0]}
        </p>

        <div className="hidden sm:flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="rounded-md border border-slate-700 bg-[#040914] px-2 py-0.5 font-mono text-[10px] text-slate-300 group-hover:border-slate-600 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex items-center justify-between gap-2 border-t border-slate-800 pt-3 sm:pt-4">
        <Link
          href={`/experiences?tab=projects&project=${project.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <Terminal className="h-3.5 w-3.5 text-purple-400" />
          <span>Console View</span>
        </Link>

        <div className="flex items-center gap-2">
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/40 bg-cyan-950/60 px-2.5 py-1 text-xs font-semibold text-cyan-200 hover:bg-cyan-900/80 hover:text-white transition-all active:scale-95"
            >
              <span>{isGithub ? "GitHub" : "Live"}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {project.detailUrl && (
            <Link
              href={project.detailUrl}
              className="inline-flex items-center gap-1 rounded-lg border border-blue-500/40 bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 text-xs font-bold text-white hover:from-blue-500 hover:to-cyan-500 transition-all shadow-md shadow-blue-950/50 active:scale-95"
            >
              <span>View Detail</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
