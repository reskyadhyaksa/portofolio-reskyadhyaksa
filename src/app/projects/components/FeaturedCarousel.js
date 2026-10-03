"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
  Terminal,
  CheckCircle2,
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

  return (
    <section className="space-y-4 pointer-events-none">
      <div className="flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-sm shadow-amber-400/20">
            <Sparkles className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Featured Flagship Projects
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:bg-white/10 hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:bg-white/10 hover:text-white transition-all active:scale-90"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#091524]/95 via-[#050d17]/95 to-[#02050a]/98 p-4 sm:p-6 md:p-8 backdrop-blur-2xl shadow-2xl shadow-blue-950/40 overflow-hidden transition-all duration-300 pointer-events-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/70 bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-300 shadow-md">
                  <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>SPOTLIGHT</span>
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider font-mono ${getCategoryStyles(
                    currentProject.category
                  )}`}
                >
                  {currentProject.category === "ml"
                    ? "Machine Learning"
                    : currentProject.category === "web"
                    ? "Web Development"
                    : "Data Analytics"}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentProject.period}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {currentProject.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-blue-300">
                  {currentProject.role}
                </p>
              </div>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                {currentProject.summary || currentProject.bullets[0]}
              </p>

              {currentProject.bullets && currentProject.bullets.length > 1 && (
                <div className="space-y-1.5 pt-1">
                  {currentProject.bullets.slice(0, 2).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300/90">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentProject.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <Link
                href={`/experiences?tab=projects&project=${currentProject.id}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <Terminal className="h-4 w-4 text-purple-400" />
                <span>Inspect in Terminal Console</span>
              </Link>

              <div className="flex items-center gap-2">
                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs sm:text-sm font-bold text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all active:scale-95"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {currentProject.detailUrl && (
                  <Link
                    href={currentProject.detailUrl}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/50 bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-xs sm:text-sm font-bold text-white hover:brightness-110 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <FeaturedSlideVisual project={currentProject} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {featuredProjects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-amber-400"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
