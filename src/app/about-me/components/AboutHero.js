import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Award,
  Download,
  Terminal,
  ExternalLink,
} from "lucide-react";

export default function AboutHero() {
  const quickMetrics = [
    {
      icon: Briefcase,
      value: "Enterprise Scale",
      label: "HRIS & Banking Backend Systems",
      color: "text-cyan-400",
      border: "border-cyan-500/30",
    },
    {
      icon: ShieldCheck,
      value: "< 4 Hours SLA",
      label: "Mission-Critical Production Fixes",
      color: "text-emerald-400",
      border: "border-emerald-500/30",
    },
    {
      icon: GraduationCap,
      value: "S1 Informatics",
      label: "Telkom University (GPA 3.08)",
      color: "text-purple-400",
      border: "border-purple-500/30",
    },
    {
      icon: Award,
      value: "SINTA 2 & IP License",
      label: "Jurnal RESTI & e-Hak Cipta",
      color: "text-amber-400",
      border: "border-amber-500/30",
    },
  ];

  return (
    <section className="space-y-6 pointer-events-none">
      <div className="rounded-3xl border border-slate-700/80 bg-gradient-to-b from-[#091526]/95 via-[#050d17]/95 to-[#02050b]/98 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-2xl shadow-blue-950/40 relative overflow-hidden pointer-events-auto">
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3.5 py-1 text-xs font-bold text-cyan-300 font-mono shadow-sm">
                <Sparkles className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
                <span>FULL STACK DEVELOPER // DEVOPS</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-950/50 px-3 py-1 text-xs font-mono font-medium text-emerald-300 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Engineering Roles</span>
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Resky Adhyaksa
              </h1>
              <p className="mt-2 text-base sm:text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <span>Enterprise Full Stack Web Developer &amp; Cloud DevOps</span>
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Jakarta Pusat / Bandung, Indonesia</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Full Stack Developer with experience building and supporting enterprise HRIS platforms, high-throughput RESTful APIs, and cloud-native applications. Proficient in Java Spring Boot, Next.js, AngularJS, SQL, AWS, and Salesforce integration, with proven hands-on expertise in backend development, production deployment pipelines, and resolving mission-critical issues in SLA-driven environments.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="mailto:reskyadhyaksa19@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#060e1c] px-3.5 py-2 text-xs font-mono text-slate-200 hover:border-cyan-500/50 hover:bg-[#0c1830] hover:text-white transition-all shadow-sm active:scale-95"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>reskyadhyaksa19@gmail.com</span>
              </a>

              <a
                href="tel:+6281244004082"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#060e1c] px-3.5 py-2 text-xs font-mono text-slate-200 hover:border-cyan-500/50 hover:bg-[#0c1830] hover:text-white transition-all shadow-sm active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+62 812-4400-4082</span>
              </a>

              <a
                href="https://linkedin.com/in/reskyadhyaksa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#060e1c] px-3.5 py-2 text-xs font-mono text-slate-200 hover:border-blue-500/50 hover:bg-[#0c1830] hover:text-white transition-all shadow-sm active:scale-95"
              >
                <Image
                  src="/linkedin.svg"
                  width={14}
                  height={14}
                  alt="LinkedIn"
                  className="brightness-0 invert opacity-80"
                />
                <span>LinkedIn</span>
              </a>

              <Link
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-xs font-bold text-white hover:brightness-110 shadow-md shadow-blue-950/50 transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-700/80 bg-[#040914] overflow-hidden shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0d1627] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-slate-400 text-xs ml-2 font-medium">engineering.profile</span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              <div className="p-4 sm:p-5 space-y-3 bg-[#02050b] text-slate-300">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400 text-[11px]">DOMAIN</span>
                  <span className="text-cyan-300 font-bold">Enterprise HRIS &amp; DevOps</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400 text-[11px]">CURRENT</span>
                  <span className="text-slate-100 font-semibold">PT. Mandiri Tunas Finance</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400 text-[11px]">CORE STACK</span>
                  <span className="text-purple-300 font-semibold">Spring Boot · Next.js · AWS</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400 text-[11px]">SLA RESOLUTION</span>
                  <span className="text-emerald-400 font-bold">&lt; 4 Hours Urgent Tickets</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400 text-[11px]">ACADEMIC</span>
                  <span className="text-amber-300 font-semibold">Telkom University (3.08)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">PUBLICATIONS</span>
                  <a
                    href="https://jurnal.iaii.or.id/index.php/RESTI/article/view/6101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-white inline-flex items-center gap-1 font-semibold underline decoration-cyan-500/50 hover:decoration-cyan-300 transition-colors"
                  >
                    <span>Jurnal RESTI (SINTA 2)</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                </div>
              </div>

              <div className="bg-[#040914] px-4 py-2.5 border-t border-slate-800 text-[11px] text-cyan-400 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>&gt; Ready for enterprise full-stack deployment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-8 mt-8 border-t border-slate-800/80">
          {quickMetrics.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl border border-slate-800 bg-[#040914] p-4 shadow-md flex items-center gap-3.5 hover:${item.border} hover:bg-[#071122] transition-all group`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#091526] border border-slate-700/80 group-hover:scale-105 transition-transform shadow-inner">
                  <IconComp className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {item.value}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug truncate">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
