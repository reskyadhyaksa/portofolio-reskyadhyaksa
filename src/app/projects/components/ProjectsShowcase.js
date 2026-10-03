"use client";
import { useState, useMemo } from "react";
import { FolderGit2, Layers } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectFilterBar from "./ProjectFilterBar";
import ProjectCard from "./ProjectCard";
import ProjectsHeroHeader from "./ProjectsHeroHeader";
import FeaturedCarousel from "./FeaturedCarousel";

export default function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredProjects = useMemo(() => {
    return projects.filter((p) => p.featured);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = { all: projects.length, web: 0, ml: 0, data: 0 };
    projects.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.summary && p.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-10 sm:space-y-12 pointer-events-none">
      <ProjectsHeroHeader
        totalCount={categoryCounts.all}
        webCount={categoryCounts.web}
        mlCount={categoryCounts.ml}
        dataCount={categoryCounts.data}
      />

      <FeaturedCarousel featuredProjects={featuredProjects} />

      <section className="space-y-6 pt-4 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300">
              <FolderGit2 className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                All Projects Directory
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Showing {filteredProjects.length} of {projects.length} repositories
          </span>
        </div>

        <ProjectFilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryCounts={categoryCounts}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(idx % 6) * 60 + 50}ms` }}
            >
              <ProjectCard project={proj} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] py-16 text-center">
            <Layers className="h-8 w-8 text-slate-500 mb-2 opacity-50" />
            <p className="text-sm font-semibold text-slate-300">
              No projects match your search criteria.
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Try adjusting your search terms or clearing the active category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors pointer-events-auto"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
