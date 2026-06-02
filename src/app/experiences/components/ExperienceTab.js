import { MapPin, Calendar, GraduationCap, Briefcase } from "lucide-react";
import { education } from "../education";
import { workExperiences, organizational } from "../experience";

export default function ExperienceTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-emerald-300">
          <Briefcase className="w-5 h-5" /> Career & Education History
        </h2>
        
        <div className="relative border-l-2 border-emerald-500/20 pl-6 ml-3 space-y-8">
          
          {/* CV. Suhuf Kertaseni Nusantara */}
          <div className="relative group">
            <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-primary group-hover:scale-125 transition-transform duration-200"></span>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-md">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">CV. Suhuf Kertaseni Nusantara</h3>
                  <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> Bandung, Jawa Barat, Indonesia &bull; July – Sept 2023
                  </p>
                </div>
                <span className="w-fit text-xs px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full font-bold">
                  Software Developer
                </span>
              </div>
              <ul className="space-y-2 text-xs md:text-sm text-white/70 list-disc pl-4 leading-relaxed">
                {workExperiences[0].bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bangkit Academy */}
          <div className="relative group">
            <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-primary group-hover:scale-125 transition-transform duration-200"></span>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-md">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">Bangkit Academy (Mobile Development)</h3>
                  <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> Bandung, Jawa Barat, Indonesia &bull; Aug – Dec 2023
                  </p>
                </div>
                <span className="w-fit text-xs px-2.5 py-1 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded-full font-bold">
                  Studi Independen Kampus Merdeka
                </span>
              </div>
              <ul className="space-y-2 text-xs md:text-sm text-white/70 list-disc pl-4 leading-relaxed">
                {workExperiences[1].bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education - Telkom University */}
          <div className="relative group">
            <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-purple-500 border-4 border-primary group-hover:scale-125 transition-transform duration-200"></span>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-md">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 group-hover:text-purple-300 transition-colors">
                    <GraduationCap className="w-5 h-5 text-purple-400" /> Telkom University
                  </h3>
                  <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> Bandung, Jawa Barat, Indonesia &bull; Aug 2020 - Mei 2025
                  </p>
                </div>
                <span className="w-fit text-xs px-2.5 py-1 bg-purple-500/15 border border-purple-500/30 text-purple-400 rounded-full font-bold">
                  Bachelor in Informatics (GPA 3.08)
                </span>
              </div>
              <ul className="space-y-2 text-xs md:text-sm text-white/70 list-disc pl-4 leading-relaxed">
                {education[0].bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Organizational */}
          <div className="relative group">
            <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-yellow-500 border-4 border-primary group-hover:scale-125 transition-transform duration-200"></span>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 backdrop-blur-md">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">INTERFEST – Himpunan Mahasiswa Telkom</h3>
                  <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" /> October - Nov 2021
                  </p>
                </div>
                <span className="w-fit text-xs px-2.5 py-1 bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 rounded-full font-bold">
                  Staff Stage Division
                </span>
              </div>
              <ul className="space-y-2 text-xs md:text-sm text-white/70 list-disc pl-4 leading-relaxed">
                {organizational[0].bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
