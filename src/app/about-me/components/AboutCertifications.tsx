import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Solution Challenge Participant",
    issuer: "Google Developer Student Clubs",
    badgeColor: "border-blue-500/40 text-blue-300",
  },
  {
    title: "HackFest 2024 Participant",
    issuer: "Google",
    badgeColor: "border-cyan-500/40 text-cyan-300",
  },
  {
    title: "Bangkit Academy Batch 2 - Mobile Development",
    issuer: "Google, GoTo, Traveloka",
    badgeColor: "border-amber-500/40 text-amber-300",
  },
  {
    title: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding Indonesia",
    badgeColor: "border-emerald-500/40 text-emerald-300",
  },
  {
    title: "Belajar Fundamental Aplikasi Android",
    issuer: "Dicoding Indonesia",
    badgeColor: "border-purple-500/40 text-purple-300",
  },
  {
    title: "Memulai Pemrograman Dengan Kotlin",
    issuer: "Dicoding Indonesia",
    badgeColor: "border-indigo-500/40 text-indigo-300",
  },
  {
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Indonesia",
    badgeColor: "border-slate-500/40 text-slate-300",
  },
  {
    title: "Pengenalan ke Logika Pemrograman (101)",
    issuer: "Dicoding Indonesia",
    badgeColor: "border-rose-500/40 text-rose-300",
  },
  {
    title: "Belajar Membuat Aplikasi Android Pemula",
    issuer: "Dicoding Indonesia",
    badgeColor: "border-teal-500/40 text-teal-300",
  },
  {
    title: "AI & Data Science Talent Summit",
    issuer: "Fast Digitalent Festival 2023",
    badgeColor: "border-cyan-500/40 text-cyan-300",
  },
];

export default function AboutCertifications() {
  return (
    <section className="space-y-6 pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300">
          <Award className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Accreditations &amp; Certifications
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Verified technical credentials and industry certifications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 pointer-events-none">
        {CERTIFICATIONS.map((cert, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-700/80 bg-[#091224] p-4 shadow-md hover:border-cyan-500/40 hover:bg-[#0c1830] transition-all pointer-events-auto flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border bg-[#040914] ${cert.badgeColor}`}>
                  {cert.issuer}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {cert.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
