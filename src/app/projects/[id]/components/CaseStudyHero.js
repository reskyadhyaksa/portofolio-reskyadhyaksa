import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function CaseStudyHero({ project }) {
  return (
    <div className="space-y-6 mb-10">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Kembali ke Projects</span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            {project.title}
          </h1>
          <p className="mt-3 text-lg sm:text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600 hover:text-white rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md active:scale-95 shadow-lg shadow-blue-950/40 shrink-0"
          >
            <span>Kunjungi Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
