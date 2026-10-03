"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
  Terminal,
  CheckCircle2,
  StarIcon,
  Lock,
} from "lucide-react";
import FeaturedSlideVisual from "./FeaturedSlideVisual";

export default function FeaturedCarousel({ featuredProjects = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = featuredProjects.length;

  const nextSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total, isPaused]);

  if (total === 0) return null;

  const currentProject = featuredProjects[currentIndex];

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

  const projectUrl = currentProject.liveUrl || currentProject.githubUrl;
  const getLinkLabel = (url) => {
    if (!url) return "Overview";
    const lower = url.toLowerCase();
    if (lower.includes("github.com")) return "GitHub";
    if (lower.includes("drive.google.com")) return "Drive";
    if (lower.includes("colab")) return "Colab";
    return "Overview";
  };

  return (
    <section className="space-y-3 sm:space-y-4 pointer-events-none">
      <div className="flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-sm shadow-amber-400/20">
            <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Production Ready Projects
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-none">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            0{currentIndex + 1} / 0{total}
          </span>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-slate-700 bg-[#091224] text-slate-300 hover:border-slate-500 hover:bg-[#0f1d38] hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-slate-700 bg-[#091224] text-slate-300 hover:border-slate-500 hover:bg-[#0f1d38] hover:text-white transition-all active:scale-90"
            >
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="group relative rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-gradient-to-b from-[#091524]/95 via-[#050d17]/95 to-[#02050a]/98 p-4 sm:p-6 md:p-7 backdrop-blur-2xl shadow-2xl shadow-blue-950/40 overflow-hidden transition-all duration-300 pointer-events-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/70 bg-amber-400/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-amber-300 shadow-md">
                  <Sparkles className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>SPOTLIGHT</span>
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-mono ${getCategoryStyles(
                    currentProject.category
                  )}`}
                >
                  {currentProject.category === "ml"
                    ? "Machine Learning"
                    : currentProject.category === "web"
                      ? "Web Development"
                      : "Data Analytics"}
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                  {currentProject.period}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {currentProject.title}
                </h3>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-cyan-400">
                  {currentProject.role}
                </p>
              </div>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                {currentProject.summary || currentProject.bullets[0]}
              </p>

              {currentProject.bullets && currentProject.bullets.length > 1 && (
                <div className="hidden md:block space-y-1.5 pt-1">
                  {currentProject.bullets.slice(0, 2).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300/90">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
                {currentProject.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className={`rounded-lg border border-slate-700/80 bg-[#040914] px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[10px] sm:text-xs text-slate-200 ${
                      idx >= 4 ? "hidden sm:inline-flex" : "inline-flex"
                    }`}
                  >
                    {t}
                  </span>
                ))}
                {currentProject.tech.length > 4 && (
                  <span className="sm:hidden inline-flex items-center rounded-lg border border-slate-700/80 bg-[#040914] px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                    +{currentProject.tech.length - 4}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 sm:pt-4 border-t border-slate-800">
              <Link
                href={`/experiences?tab=projects&project=${currentProject.id}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-purple-400" />
                <span>Inspect in Terminal Console</span>
              </Link>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {projectUrl ? (
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/60 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-cyan-300 hover:bg-cyan-900/80 hover:text-white transition-all active:scale-95 shadow-sm flex-1 sm:flex-initial"
                  >
                    <span>{getLinkLabel(projectUrl)}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-900/60 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-400 select-none cursor-default shadow-sm flex-1 sm:flex-initial">
                    <span>Private</span>
                    <Lock className="h-3.5 w-3.5 text-slate-500" />
                  </span>
                )}

                {currentProject.detailUrl && (
                  <Link
                    href={currentProject.detailUrl}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-500/50 bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold text-white hover:brightness-110 shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex-1 sm:flex-initial"
                  >
                    <span>View Detail</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <FeaturedSlideVisual project={currentProject} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
          {featuredProjects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-7 sm:w-8 bg-amber-400"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
