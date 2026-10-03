import { GraduationCap, BookOpen, Award, FileCheck, Sparkles, ExternalLink } from "lucide-react";

export default function AboutEducationPublications() {
  return (
    <section className="space-y-4 sm:space-y-6 pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300">
          <GraduationCap className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Education, Research &amp; Honors
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Academic foundation, scientific publications, and capstone awards
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pointer-events-none">
        <div className="rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-[#091224] p-4 sm:p-6 md:p-7 shadow-xl relative overflow-hidden pointer-events-auto flex flex-col justify-between group hover:border-purple-500/40 transition-all">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start justify-between gap-2 pb-2.5 sm:pb-3 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold border border-purple-500/40 bg-purple-950/60 text-purple-300">
                  UNIVERSITY DEGREE
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white mt-1.5 sm:mt-2 group-hover:text-purple-300 transition-colors">
                  Telkom University
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-cyan-400 font-semibold">
                  Bachelor&apos;s in Informatics · GPA: 3.08 / 4.00
                </p>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-slate-400 shrink-0">
                2020 – 2025
              </span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-[#040914] p-3 sm:p-4 space-y-1.5 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-emerald-300">
                    <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">e-Hak Cipta (IP License)</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/17ygXybzGZUWnQmaXTZFVLCWLkPEnTfDz/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-[10px] sm:text-[11px] font-mono font-bold text-emerald-300 hover:bg-emerald-900/80 hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
                  >
                    <span>License</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                  Officially registered program: <span className="font-semibold text-white">&quot;Sentiment Analysis Based on ML for Disaster Social Posts.&quot;</span>
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-[#040914] p-3 sm:p-4 space-y-1.5 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-cyan-300">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">Jurnal RESTI (SINTA 2)</span>
                  </div>
                  <a
                    href="https://jurnal.iaii.or.id/index.php/RESTI/article/view/6101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-[10px] sm:text-[11px] font-mono font-bold text-cyan-300 hover:bg-cyan-900/80 hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
                  >
                    <span>Read Paper</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                  Published paper: <span className="font-semibold text-white">&quot;Application of VGG16 in Automated Detection of Bone Fractures in X-Ray.&quot;</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-[#091224] p-4 sm:p-6 md:p-7 shadow-xl relative overflow-hidden pointer-events-auto flex flex-col justify-between group hover:border-amber-500/40 transition-all">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start justify-between gap-2 pb-2.5 sm:pb-3 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold border border-amber-500/40 bg-amber-950/60 text-amber-300">
                  NATIONAL MERIT
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white mt-1.5 sm:mt-2 group-hover:text-amber-300 transition-colors">
                  Bangkit Academy 2023
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-cyan-400 font-semibold">
                  Google, GoTo, Traveloka · Mobile &amp; ML
                </p>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-slate-400 shrink-0">
                2023
              </span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-[#040914] p-3 sm:p-4 space-y-1.5 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-amber-300">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                    <span className="truncate">Top 10 Final Capstone</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/14pAiOm0O3JEyGjOSNwz4M3-pZuWgdsDS/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-amber-950/70 border border-amber-500/40 text-[10px] sm:text-[11px] font-mono font-bold text-amber-300 hover:bg-amber-900/80 hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
                  >
                    <span>Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                  Top 10 out of 24 national capstone projects with high-impact Android ML architecture.
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-[#040914] p-3 sm:p-4 space-y-1.5 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-blue-300">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
                    <span className="truncate">Best Team Award (Fishku)</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/1Bk0JF3yvY3PjtPbLaeP5uGoc7ar56dXj/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-blue-950/70 border border-blue-500/40 text-[10px] sm:text-[11px] font-mono font-bold text-blue-300 hover:bg-blue-900/80 hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
                  >
                    <span>Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                  Engineered Kotlin mobile application integrating ML recommendation models for e-commerce discovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
