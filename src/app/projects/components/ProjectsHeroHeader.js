import { FolderGit2, Cpu, Globe2, BarChart3 } from "lucide-react";

export default function ProjectsHeroHeader({ totalCount, webCount, mlCount, dataCount }) {
  const stats = [
    { label: "Total Projects", value: totalCount, icon: FolderGit2, color: "text-blue-400" },
    { label: "Web Applications", value: webCount, icon: Globe2, color: "text-cyan-400" },
    { label: "ML / AI Systems", value: mlCount, icon: Cpu, color: "text-purple-400" },
    { label: "Data Dashboards", value: dataCount, icon: BarChart3, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-mono text-blue-300">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>PORTFOLIO DIRECTORY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Engineered Projects &amp; Solutions
        </h1>
        <p className="max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
          Explore production web applications, machine learning architectures, and data visualization engines engineered with clean code standards and high performance.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                <Icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-lg font-bold font-mono text-white leading-none">
                  {s.value}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {s.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
