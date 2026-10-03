export default function CaseStudySidebar({ project }) {
  return (
    <div className="space-y-6 pointer-events-none sticky top-28">
      <div className="bg-[#091224] p-6 sm:p-7 rounded-3xl border border-slate-700/80 shadow-xl relative overflow-hidden pointer-events-auto">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 font-mono">
          Peran Saya
        </h3>
        <p className="text-xl sm:text-2xl font-black text-white mb-1">
          {project.role}
        </p>
        <p className="text-cyan-400 text-sm font-semibold mb-5">
          {project.roleType}
        </p>
        <div className="border-t border-slate-800 pt-4">
          <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-1.5 font-mono">
            Waktu Pengerjaan
          </h4>
          <p className="text-slate-100 font-semibold text-sm">
            {project.timeline}
          </p>
        </div>
      </div>

      {project.techStack && project.techStack.length > 0 && (
        <div className="bg-[#091224] p-6 sm:p-7 rounded-3xl border border-slate-700/80 shadow-xl relative overflow-hidden pointer-events-auto">
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 font-mono">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-950/80 text-cyan-200 text-xs font-semibold border border-cyan-500/40 font-mono shadow-sm hover:border-cyan-400 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.infrastructure && project.infrastructure.length > 0 && (
        <div className="bg-[#091224] p-6 sm:p-7 rounded-3xl border border-slate-700/80 shadow-xl relative overflow-hidden pointer-events-auto">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 font-mono">
            Infrastruktur &amp; Spesifikasi
          </h3>
          <div className="space-y-3.5 text-xs sm:text-sm">
            {project.infrastructure.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2 text-slate-300 font-medium">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color || "bg-cyan-400"} shadow-sm`} />
                  <span>{item.label}:</span>
                </div>
                <span className="text-white font-bold text-right font-mono text-xs sm:text-sm">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
