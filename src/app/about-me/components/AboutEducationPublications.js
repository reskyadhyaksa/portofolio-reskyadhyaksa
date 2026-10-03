import { GraduationCap, BookOpen, Award, CheckCircle2, ShieldCheck, FileCheck, Sparkles, ExternalLink } from "lucide-react";

export default function AboutEducationPublications() {
  return (
    <section className="space-y-6 pointer-events-none">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-none">
        <div className="rounded-3xl border border-slate-700/80 bg-[#091224] p-6 sm:p-7 shadow-xl relative overflow-hidden pointer-events-auto flex flex-col justify-between group hover:border-purple-500/40 transition-all">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold border border-purple-500/40 bg-purple-950/60 text-purple-300">
                  UNIVERSITY DEGREE
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-2 group-hover:text-purple-300 transition-colors">
                  Telkom University
                </h3>
                <p className="text-xs font-mono text-cyan-400 font-semibold">
                  Bachelor&apos;s Degree in Informatics · GPA: 3.08 / 4.00
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 shrink-0">
                2020 – 2025
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="rounded-2xl border border-slate-800 bg-[#040914] p-4 space-y-2 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>Licensed Intellectual Property (e-Hak Cipta)</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/17ygXybzGZUWnQmaXTZFVLCWLkPEnTfDz/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-300 hover:bg-emerald-900/80 hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
                  >
                    <span>View License</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Developed an officially registered application program titled: <span className="font-semibold text-white">&quot;Sentiment Analysis Based on Machine Learning for Social Media Posts on Earthquake Disasters.&quot;</span>
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#040914] p-4 space-y-2 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>Scientific Paper (Jurnal RESTI - SINTA 2)</span>
                  </div>
                  <a
                    href="https://jurnal.iaii.or.id/index.php/RESTI/article/view/6101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300 hover:bg-cyan-900/80 hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
                  >
                    <span>Read Paper</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Published paper titled: <span className="font-semibold text-white">&quot;Application of VGG16 in Automated Detection of Bone Fractures in X-Ray Images&quot;</span> in Jurnal RESTI (SINTA 2 Index).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700/80 bg-[#091224] p-6 sm:p-7 shadow-xl relative overflow-hidden pointer-events-auto flex flex-col justify-between group hover:border-amber-500/40 transition-all">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold border border-amber-500/40 bg-amber-950/60 text-amber-300">
                  NATIONAL MERIT PROGRAM
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-2 group-hover:text-amber-300 transition-colors">
                  Bangkit Academy 2023
                </h3>
                <p className="text-xs font-mono text-cyan-400 font-semibold">
                  Google, GoTo, Traveloka · Mobile &amp; Machine Learning
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 shrink-0">
                2023
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="rounded-2xl border border-slate-800 bg-[#040914] p-4 space-y-2 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Top 10 Company-based Capstone Project</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/14pAiOm0O3JEyGjOSNwz4M3-pZuWgdsDS/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/70 border border-amber-500/40 text-[11px] font-mono font-bold text-amber-300 hover:bg-amber-900/80 hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
                  >
                    <span>Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Achieved Top 10 out of 24 national capstone projects, demonstrating excellence in mobile application engineering, problem-solving, and machine learning integration.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#040914] p-4 space-y-2 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-300">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Selected as Best Team (Collaboration with Fishku)</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/1Bk0JF3yvY3PjtPbLaeP5uGoc7ar56dXj/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-950/70 border border-blue-500/40 text-[11px] font-mono font-bold text-blue-300 hover:bg-blue-900/80 hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
                  >
                    <span>Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Engineered Kotlin-based application incorporating machine learning recommendation algorithms for product discovery and decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
