"use client";
import { useState, useMemo } from "react";
import { FolderGit2, Layers } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectFilterBar from "./ProjectFilterBar";
import ProjectCard from "./ProjectCard";
import FeaturedCarousel from "./FeaturedCarousel";
import ProjectPagination from "./ProjectPagination";

const PAGE_SIZE = 6;

export default function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const totalItems = filteredProjects.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = totalItems > 0 ? (safeCurrentPage - 1) * PAGE_SIZE + 1 : 0;
  const endIndex = Math.min(safeCurrentPage * PAGE_SIZE, totalItems);

  const paginatedProjects = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [filteredProjects, safeCurrentPage]);

  return (
    <div className="space-y-10 sm:space-y-12 pointer-events-none">
      <FeaturedCarousel featuredProjects={featuredProjects} />

      <section className="space-y-6 pt-6 border-t border-slate-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
              <FolderGit2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                All Projects Directory
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Showing {startIndex}-{endIndex} of {totalItems} repositories
              </p>
            </div>
          </div>

          <ProjectFilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            categoryCounts={categoryCounts}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {paginatedProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${(idx % 6) * 50 + 40}ms` }}
              >
                <ProjectCard project={proj} viewMode="grid" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {paginatedProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(idx % 6) * 50 + 40}ms` }}
              >
                <ProjectCard project={proj} viewMode="list" />
              </div>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-[#060e1c]/50 py-16 text-center shadow-inner">
            <Layers className="h-9 w-9 text-slate-500 mb-3 opacity-60" />
            <p className="text-base font-bold text-slate-200">
              No projects match your search criteria.
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed">
              Try adjusting your search query or clearing active category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="mt-5 rounded-xl border border-slate-700 bg-[#091224] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0f1d38] transition-all pointer-events-auto active:scale-95 shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}

        <ProjectPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </section>
    </div>
  );
}
