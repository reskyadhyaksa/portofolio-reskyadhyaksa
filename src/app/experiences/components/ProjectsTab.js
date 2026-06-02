"use client";

import { useState } from "react";
import { FolderGit2, FileCode, Layers } from "lucide-react";
import { projects } from "../project";

export default function ProjectsTab({ selectedSkill, setSelectedSkill }) {
  const [projectFilter, setProjectFilter] = useState("all");
  const [activeProject, setActiveProject] = useState(projects[0]);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = projectFilter === "all" || p.category === projectFilter;
    const matchesSkill = !selectedSkill || p.tech.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()));
    return matchesCategory && matchesSkill;
  });

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-full xl:h-[480px] min-h-[500px]">
      
      {/* Left Column: Project Selector List */}
      <div className="flex-1 flex flex-col min-h-0 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-purple-300 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5" /> Project Repository
          </h2>
          
          <select 
            value={projectFilter} 
            onChange={(e) => setProjectFilter(e.target.value)}
            className="bg-black/60 border border-white/10 rounded px-2 py-1 text-xs text-white/80 font-semibold focus:ring-1 focus:ring-purple-500 outline-none"
          >
            <option value="all">All Fields</option>
            <option value="web">Web Full-Stack</option>
            <option value="ml">Machine Learning / AI</option>
            <option value="data">Data Analysis</option>
          </select>
        </div>

        {selectedSkill && (
          <div className="flex items-center justify-between bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-purple-300">Filtering by tech stack: <strong className="text-white">{selectedSkill}</strong></span>
            <button 
              onClick={() => setSelectedSkill(null)}
              className="text-white/40 hover:text-white font-bold"
            >
              ✕ Clear
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar min-h-0">
          {filteredProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                activeProject?.id === p.id 
                  ? "bg-purple-500/10 border-purple-400 shadow-lg shadow-purple-950/20" 
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 leading-tight">{p.title}</h3>
                <span className="text-[10px] uppercase font-bold shrink-0 bg-white/10 px-2 py-0.5 rounded text-white/70">
                  {p.category}
                </span>
              </div>
              <p className="text-xs text-white/50 font-medium mt-1.5">{p.role} &bull; {p.period}</p>
              <div className="flex flex-wrap gap-1 mt-2.5">
                {p.tech.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/10 text-purple-300">
                    {t}
                  </span>
                ))}
                {p.tech.length > 3 && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/50">+{p.tech.length - 3}</span>
                )}
              </div>
            </button>
          ))}
          {filteredProjects.length === 0 && (
            <div className="text-center py-10 text-white/40 text-xs">No projects found. Try resetting the skill filter or selecting a different category.</div>
          )}
        </div>
      </div>

      {/* Right Column: Code-like Inspector Panel */}
      <div className="w-full xl:w-96 border border-white/10 rounded-2xl bg-black/40 p-5 flex flex-col space-y-4 shrink-0 min-h-0">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <FileCode className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-white/50 font-bold uppercase tracking-wider">inspect_file.json</span>
        </div>

        {activeProject ? (
          <div className="space-y-4 flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-0">
            <div>
              <p className="text-xs text-purple-400 font-bold">{"{"}</p>
              <div className="pl-4 space-y-3">
                <div>
                  <span className="text-white/40 text-xs">"title":</span>{" "}
                  <span className="text-green-300 text-xs font-bold font-sans">"{activeProject.title}"</span>,
                </div>
                <div>
                  <span className="text-white/40 text-xs">"role":</span>{" "}
                  <span className="text-blue-300 text-xs">"{activeProject.role}"</span>,
                </div>
                <div>
                  <span className="text-white/40 text-xs">"timeline":</span>{" "}
                  <span className="text-yellow-300 text-xs">"{activeProject.period}"</span>,
                </div>
                <div>
                  <span className="text-white/40 text-xs">"techStack":</span>{" "}
                  <span className="text-purple-300 text-xs">[</span>
                  <div className="flex flex-wrap gap-1 mt-1 pl-4">
                    {activeProject.tech.map((t, i) => (
                      <span key={i} className="text-[9px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/10">
                        "{t}"{i < activeProject.tech.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                  <span className="text-purple-300 text-xs">]</span>,
                </div>
                <div>
                  <span className="text-white/40 text-xs flex mb-1">"keyContributions": [</span>
                  <ul className="pl-4 space-y-2 list-decimal text-xs text-white/80 leading-relaxed font-sans pr-1">
                    {activeProject.bullets.map((b, i) => (
                      <li key={i} className="marker:text-purple-400 font-sans">{b}</li>
                    ))}
                  </ul>
                  <span className="text-white/40 text-xs">]</span>
                </div>
              </div>
              <p className="text-xs text-purple-400 font-bold">{"}"}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-white/30 text-xs py-10">
            <Layers className="w-8 h-8 mb-2 text-white/20 animate-bounce" />
            Select a project from the left panel to inspect details
          </div>
        )}
      </div>

    </div>
  );
}
