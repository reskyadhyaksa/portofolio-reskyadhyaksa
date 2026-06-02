"use client";

import { Wrench, Search, ChevronRight } from "lucide-react";
import { skills } from "../skills";

export default function SkillsTab({
  skillSearch,
  setSkillSearch,
  setSelectedSkill,
  setActiveTab
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/10 pb-4 gap-4">
        <h2 className="text-lg font-bold text-yellow-300 flex items-center gap-2">
          <Wrench className="w-5 h-5" /> Skills Inventory
        </h2>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search skills..."
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white/80 font-semibold focus:ring-1 focus:ring-yellow-500 outline-none w-48 font-mono"
          />
        </div>
      </div>

      <p className="text-xs text-white/50 leading-relaxed">
        💡 <strong>Tip:</strong> Click on any <span className="text-yellow-400 underline font-bold cursor-help">technology tag</span> to filter and view all projects that were built using that specific technology.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Proficient */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-bold tracking-widest text-emerald-400">🔥 Proficient Stacks</h3>
          <div className="flex flex-wrap gap-2">
            {skills.proficient
              .filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()))
              .map((skill, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedSkill(skill);
                    setActiveTab("projects");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex items-center gap-1 text-left"
                >
                  {skill}
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
            ))}
          </div>
        </div>

        {/* Experienced */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-bold tracking-widest text-blue-400">⚙️ Experienced Stacks</h3>
          <div className="flex flex-wrap gap-2">
            {skills.experienced
              .filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()))
              .map((skill, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedSkill(skill);
                    setActiveTab("projects");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/20 hover:border-blue-400/50 transition-all flex items-center gap-1 text-left"
                >
                  {skill}
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
            ))}
          </div>
        </div>

        {/* Skilled Stacks */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-bold tracking-widest text-purple-400">⚡ Skilled Areas</h3>
          <div className="flex flex-wrap gap-2">
            {skills.skilled
              .filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()))
              .map((skill, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedSkill(skill);
                    setActiveTab("projects");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/20 hover:border-purple-400/50 transition-all flex items-center gap-1 text-left"
                >
                  {skill}
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
            ))}
          </div>
        </div>

        {/* Soft Skills & Languages */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-yellow-400">🤝 Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft
                .filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()))
                .map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-yellow-500/5 text-yellow-300 text-xs font-semibold border border-yellow-500/10 select-none">
                    {skill}
                  </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-white/50">🗣️ Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((lang, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 text-white/80 text-xs font-semibold border border-white/10 select-none">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
