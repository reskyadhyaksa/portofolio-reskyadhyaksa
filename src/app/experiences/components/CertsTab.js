"use client";
import { Award, Search } from "lucide-react";
import { certifications } from "@/data/certifications";

export default function CertsTab({ certSearch, setCertSearch }) {
  const filteredCerts = certifications.filter((c) =>
    c.toLowerCase().includes(certSearch.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/10 pb-3 gap-2.5">
        <h2 className="text-base sm:text-lg font-bold text-rose-300 flex items-center gap-2">
          <Award className="w-4 h-4 sm:w-5 sm:h-5" /> Certifications & Achievements
        </h2>

        <div className="relative w-full sm:w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
          <input
            type="text"
            placeholder="Search certificates..."
            value={certSearch}
            onChange={(e) => setCertSearch(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-lg pl-8 pr-3 py-1 text-xs text-white/80 font-medium focus:ring-1 focus:ring-rose-500 outline-none font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filteredCerts.map((cert, index) => {
          const parts = cert.split(" - ");
          const title = parts[0];
          const issuer = parts[1] || "";

          return (
            <div
              key={index}
              className="bg-white/5 p-3 sm:p-4 rounded-xl border border-white/10 hover:border-rose-500/20 hover:bg-white/10 transition-all duration-200 flex items-start gap-3 group"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-rose-300 transition-colors leading-snug">
                  {title}
                </h3>
                {issuer && (
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold truncate">
                    {issuer}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        {filteredCerts.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-8 text-white/40 text-xs">
            No certifications found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
