"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  FileCode,
  Layers,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
  Lock,
} from "lucide-react";
import { projects, PROJECT_CATEGORIES } from "@/data/projects";

export default function ProjectsTab({
  selectedSkill,
  onSkillChange,
  selectedProjectId,
  onProjectChange,
  selectedCategory = "all",
  onCategoryChange,
  searchQuery = "",
  onSearchChange,
}) {
  const [mobileView, setMobileView] = useState(() => {
    return selectedProjectId ? "detail" : "list";
  });

  const activeProject =
    projects.find((p) => p.id === selectedProjectId) ||
    projects[0];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      p.category === selectedCategory;
    const matchesSkill =
      !selectedSkill ||
      p.tech.some((t) =>
        t.toLowerCase().includes(selectedSkill.toLowerCase())
      );
    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSkill && matchesSearch;
  });

  const handleSelectProject = (proj) => {
    onProjectChange?.(proj.id);
    setMobileView("detail");
  };

  const getLinkLabel = (url) => {
    if (!url) return "Overview";
    const lower = url.toLowerCase();
    if (lower.includes("github.com")) return "GitHub";
    if (lower.includes("drive.google.com")) return "Drive";
    if (lower.includes("colab")) return "Colab";
    return "Overview";
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 h-full min-h-0">
      <div className="flex lg:hidden items-center justify-between bg-black/40 border border-white/[0.08] p-1 rounded-xl shrink-0">
        <button
          type="button"
          onClick={() => setMobileView("list")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileView === "list"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Projects ({filteredProjects.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileView("detail")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileView === "detail"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Inspector</span>
        </button>
      </div>

      <div
        className={`flex-1 flex flex-col min-h-0 space-y-2.5 ${
          mobileView === "detail" ? "hidden lg:flex" : "flex"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5 border-b border-white/[0.08]">
          <div className="hidden lg:flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-sm font-bold text-slate-200">
              Repositories
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
              {filteredProjects.length}
            </span>
          </div>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Filter by keyword or stack..."
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-400/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 shrink-0">
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive =
              (selectedCategory || "all") === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange?.(cat.id)}
                className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-transparent"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {selectedSkill && (
          <div className="flex items-center justify-between bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg text-xs shrink-0">
            <span className="text-purple-300 text-[10px] sm:text-[11px]">
              Filtering skill: <strong className="text-white">{selectedSkill}</strong>
            </span>
            <button
              type="button"
              onClick={() => onSkillChange?.(null)}
              className="text-slate-400 hover:text-white text-[10px] font-semibold"
            >
              Clear ✕
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar min-h-0">
          {filteredProjects.map((p) => {
            const isSelected = activeProject?.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectProject(p)}
                className={`group w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-150 ${
                  isSelected
                    ? "bg-purple-500/[0.12] border-purple-500/40 shadow-sm"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug group-hover:text-purple-300">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[9px] uppercase font-bold bg-white/[0.06] text-slate-400 px-1.5 py-0.5 rounded border border-white/[0.04]">
                      {p.category}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 lg:hidden" />
                  </div>
                </div>

                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                  {p.role} · <span className="text-slate-500">{p.period}</span>
                </p>

                <div className="flex flex-wrap gap-1 mt-1.5">
                  {p.tech.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/15 border border-purple-500/20 text-purple-300 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 4 && (
                    <span className="text-[9px] px-1 py-0.5 rounded bg-white/5 text-slate-400">
                      +{p.tech.length - 4}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-10 text-slate-500 text-xs">
              <Layers className="w-5 h-5 mb-1.5 opacity-40" />
              <span>No matching projects found.</span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`w-full lg:w-96 border border-white/[0.08] rounded-xl bg-black/40 p-3 sm:p-4 flex flex-col space-y-2.5 shrink-0 min-h-0 ${
          mobileView === "list" ? "hidden lg:flex" : "flex"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileView("list")}
              className="lg:hidden p-1 -ml-1 text-slate-400 hover:text-white rounded-lg"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
            </button>
            <FileCode className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-slate-300 font-bold font-mono">
              inspector.json
            </span>
          </div>

          {activeProject && (
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
              <Sparkles className="w-2.5 h-2.5" />
              {activeProject.id}
            </span>
          )}
        </div>

        {activeProject ? (
          <div className="space-y-2.5 flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-0 font-mono text-xs">
            <div>
              <p className="text-purple-400 font-bold">{"{"}</p>
              <div className="pl-3 space-y-1.5">
                <div>
                  <span className="text-slate-500">{`"id":`}</span>{" "}
                  <span className="text-purple-300 font-semibold">{`"${activeProject.id}"`}</span>,
                </div>
                <div>
                  <span className="text-slate-500">{`"title":`}</span>{" "}
                  <span className="text-emerald-300 font-semibold">{`"${activeProject.title}"`}</span>,
                </div>
                <div>
                  <span className="text-slate-500">{`"role":`}</span>{" "}
                  <span className="text-sky-300">{`"${activeProject.role}"`}</span>,
                </div>
                <div>
                  <span className="text-slate-500">{`"timeline":`}</span>{" "}
                  <span className="text-amber-300">{`"${activeProject.period}"`}</span>,
                </div>
                <div>
                  <span className="text-slate-500">{`"techStack":`}</span>{" "}
                  <span className="text-purple-300">[</span>
                  <div className="flex flex-wrap gap-1 mt-1 pl-2.5">
                    {activeProject.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/20"
                      >
                        {`"${t}"`}
                        {i < activeProject.tech.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                  <span className="text-purple-300">]</span>,
                </div>
                <div>
                  <span className="text-slate-500 flex mb-1">{`"contributions": [`}</span>
                  <ul className="pl-2.5 space-y-1 list-none text-[11px] text-slate-300 leading-relaxed font-sans">
                    {activeProject.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="text-slate-500">]</span>
                </div>
              </div>
              <p className="text-purple-400 font-bold">{"}"}</p>
            </div>

            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
              {activeProject.detailUrl ? (
                <Link
                  href={activeProject.detailUrl}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-300 hover:text-white bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 rounded-lg transition-all active:scale-95"
                >
                  <span>View Detail</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              ) : <div />}

              {activeProject.liveUrl || activeProject.githubUrl ? (
                <a
                  href={activeProject.liveUrl || activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-300 hover:text-white bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-1 rounded-lg transition-all active:scale-95"
                >
                  <span>
                    {getLinkLabel(activeProject.liveUrl || activeProject.githubUrl)}
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-900/60 border border-slate-700/60 px-2.5 py-1 rounded-lg select-none cursor-default">
                  <span>Private</span>
                  <Lock className="w-3 h-3 text-slate-500" />
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 text-xs py-6">
            <Layers className="w-5 h-5 mb-1 opacity-40" />
            <span>Select a project from the left list.</span>
          </div>
        )}
      </div>
    </div>
  );
}
