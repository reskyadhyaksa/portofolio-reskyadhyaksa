import Link from "next/link";
import { Mail, FolderGit2, Sparkles, Terminal } from "lucide-react";

export default function AboutContactFooter() {
  return (
    <section className="pt-6 pointer-events-none">
      <div className="rounded-3xl border border-slate-700/80 bg-gradient-to-b from-[#091526]/95 via-[#050d17]/95 to-[#02050b]/98 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-2xl shadow-blue-950/40 relative overflow-hidden pointer-events-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3 py-0.5 text-xs font-mono font-bold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LET&apos;S CONNECT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to collaborate or hire?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Always open to discussing enterprise software engineering, scalable cloud infrastructure, or innovative full-stack opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:reskyadhyaksa19@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:brightness-110 shadow-lg shadow-blue-950/50 transition-all active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#060e1c] px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:border-slate-500 hover:bg-[#0c1830] hover:text-white transition-all shadow-sm active:scale-95"
            >
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>View Projects</span>
            </Link>

            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-950/40 px-4 py-2.5 text-xs sm:text-sm font-semibold text-purple-300 hover:bg-purple-900/50 hover:text-white transition-all shadow-sm active:scale-95"
            >
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>Terminal Console</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
