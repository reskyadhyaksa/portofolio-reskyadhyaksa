import {
  Activity,
  ClipboardList,
  Pill,
  ShieldAlert,
  Users,
  Server,
  Cpu,
  Database,
  LayoutDashboard,
  Code,
  Sparkles,
} from "lucide-react";

const ICON_MAP = {
  Activity,
  ClipboardList,
  Pill,
  ShieldAlert,
  Users,
  Server,
  Cpu,
  Database,
  LayoutDashboard,
  Code,
};

export default function CaseStudyFeatures({ features = [] }) {
  if (!features || features.length === 0) return null;

  return (
    <section className="space-y-6 pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
          <Code className="h-4 w-4" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Fitur Utama &amp; Solusi
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pointer-events-none">
        {features.map((feature, idx) => {
          const IconComponent = ICON_MAP[feature.icon] || Sparkles;
          const isFullWidth = idx === features.length - 1 && features.length % 2 !== 0;

          return (
            <div
              key={idx}
              className={`bg-[#091224] p-6 sm:p-7 rounded-3xl border border-slate-700/80 shadow-lg hover:border-cyan-500/50 hover:bg-[#0d1830] transition-all duration-300 group pointer-events-auto ${
                isFullWidth ? "md:col-span-2" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-400 transition-all shadow-md">
                <IconComponent className="text-cyan-300 w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
