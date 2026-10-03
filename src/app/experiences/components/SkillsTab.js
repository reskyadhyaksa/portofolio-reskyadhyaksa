"use client";
import { Wrench, Search, ChevronRight } from "lucide-react";
import { skills } from "@/data/skills";

export default function SkillsTab({
  skillSearch,
  setSkillSearch,
  onSelectSkill,
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/10 pb-3 gap-2.5">
        <h2 className="text-base sm:text-lg font-bold text-yellow-300 flex items-center gap-2">
          <Wrench className="w-4 h-4 sm:w-5 sm:h-5" /> Skills Inventory
        </h2>

        <div className="relative w-full sm:w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
          <input
            type="text"
            placeholder="Search skills..."
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-lg pl-8 pr-3 py-1 text-xs text-white/80 font-medium focus:ring-1 focus:ring-yellow-500 outline-none font-mono"
          />
        </div>
      </div>

      <p className="text-[11px] text-white/50 leading-relaxed">
        Click on any <span className="text-yellow-400 font-semibold">technology tag</span> to inspect projects built with that stack.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2.5">
          <h3 className="text-[11px] uppercase font-bold tracking-widest text-emerald-400">
            Proficient Stacks
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.proficient
              .filter((s) =>
                s.toLowerCase().includes((skillSearch || "").toLowerCase())
              )
              .map((skill, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectSkill?.(skill)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex items-center gap-1"
                >
                  <span>{skill}</span>
                  <ChevronRight className="w-3 h-3 opacity-50" />
                </button>
              ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-[11px] uppercase font-bold tracking-widest text-blue-400">
            Experienced Stacks
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.experienced
              .filter((s) =>
                s.toLowerCase().includes((skillSearch || "").toLowerCase())
              )
              .map((skill, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectSkill?.(skill)}
                  className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-[11px] font-semibold border border-blue-500/20 hover:border-blue-400/50 transition-all flex items-center gap-1"
                >
                  <span>{skill}</span>
                  <ChevronRight className="w-3 h-3 opacity-50" />
                </button>
              ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-[11px] uppercase font-bold tracking-widest text-purple-400">
            Skilled Areas
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.skilled
              .filter((s) =>
                s.toLowerCase().includes((skillSearch || "").toLowerCase())
              )
              .map((skill, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectSkill?.(skill)}
                  className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] font-semibold border border-purple-500/20 hover:border-purple-400/50 transition-all flex items-center gap-1"
                >
                  <span>{skill}</span>
                  <ChevronRight className="w-3 h-3 opacity-50" />
                </button>
              ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2.5">
            <h3 className="text-[11px] uppercase font-bold tracking-widest text-yellow-400">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.soft
                .filter((s) =>
                  s.toLowerCase().includes((skillSearch || "").toLowerCase())
                )
                .map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-yellow-500/5 text-yellow-300 text-[11px] font-medium border border-yellow-500/10 select-none"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-[11px] uppercase font-bold tracking-widest text-white/50">
              Languages
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.languages.map((lang, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/5 text-white/80 text-[11px] font-medium border border-white/10 select-none"
                >
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
