import { MapPin, Briefcase, GraduationCap, Users } from "lucide-react";
import { education } from "@/data/education";
import { workExperiences, organizational } from "@/data/experiences";

export default function ExperienceTab() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-2 text-emerald-300">
          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" /> Career History
        </h2>

        <div className="relative border-l-2 border-emerald-500/30 pl-4 sm:pl-6 ml-2 sm:ml-3 space-y-4 sm:space-y-6">
          {workExperiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              <span className="absolute -left-[17px] sm:-left-[25px] top-5 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-400 border-2 border-[#030a14] shadow-[0_0_6px_rgba(52,211,153,0.6)] group-hover:scale-125 transition-transform duration-200"></span>
              <div className="bg-white/5 p-3.5 sm:p-5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/40 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" /> {exp.location} · {exp.period}
                    </p>
                  </div>
                  <span className="w-fit text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full font-bold">
                    {exp.role}
                  </span>
                </div>
                <ul className="space-y-1.5 text-[11px] sm:text-xs text-white/70 list-disc pl-3.5 sm:pl-4 leading-relaxed font-sans">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-2 text-sky-300">
          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" /> Education
        </h2>

        <div className="relative border-l-2 border-sky-500/30 pl-4 sm:pl-6 ml-2 sm:ml-3 space-y-4 sm:space-y-6">
          {education.map((edu, idx) => (
            <div key={idx} className="relative group">
              <span className="absolute -left-[17px] sm:-left-[25px] top-5 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-sky-400 border-2 border-[#030a14] shadow-[0_0_6px_rgba(56,189,248,0.6)] group-hover:scale-125 transition-transform duration-200"></span>
              <div className="bg-white/5 p-3.5 sm:p-5 rounded-xl border border-white/10 hover:border-sky-500/30 transition-all duration-300 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      {edu.institution}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">
                      {edu.location} · {edu.period}
                    </p>
                  </div>
                  <span className="w-fit text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 bg-sky-500/15 border border-sky-500/30 text-sky-400 rounded-full font-bold">
                    {edu.degree}
                  </span>
                </div>
                {edu.bullets && (
                  <ul className="space-y-1 text-[11px] sm:text-xs text-white/70 list-disc pl-3.5 sm:pl-4 leading-relaxed font-sans">
                    {edu.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-2 text-purple-300">
          <Users className="w-4 h-4 sm:w-5 sm:h-5" /> Organizational Activities
        </h2>

        <div className="relative border-l-2 border-purple-500/30 pl-4 sm:pl-6 ml-2 sm:ml-3 space-y-4 sm:space-y-6">
          {organizational.map((org, idx) => (
            <div key={idx} className="relative group">
              <span className="absolute -left-[17px] sm:-left-[25px] top-5 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-purple-400 border-2 border-[#030a14] shadow-[0_0_6px_rgba(192,132,252,0.6)] group-hover:scale-125 transition-transform duration-200"></span>
              <div className="bg-white/5 p-3.5 sm:p-5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {org.title}
                  </h3>
                  <span className="w-fit text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 bg-purple-500/15 border border-purple-500/30 text-purple-300 rounded-full font-bold">
                    {org.role}
                  </span>
                </div>
                <ul className="space-y-1 text-[11px] sm:text-xs text-white/70 list-disc pl-3.5 sm:pl-4 leading-relaxed font-sans">
                  {org.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
