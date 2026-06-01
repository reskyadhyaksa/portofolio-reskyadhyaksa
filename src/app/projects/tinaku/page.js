import TileGrid from "../../../component/tilegrid";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Activity, 
  ClipboardList, 
  Pill, 
  ShieldAlert, 
  Users, 
  ExternalLink,
  Code,
  LayoutDashboard
} from "lucide-react";

export default function TinakuProjectDetail() {
  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden">
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white pt-32 px-10 md:px-32 pb-20">
        <div className="pointer-events-auto">
          <Link href="/projects" className="inline-flex items-center gap-2 mb-8 text-blue-400 hover:text-blue-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Projects</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                TINAKU
              </h1>
              <p className="text-xl md:text-2xl text-white/70 font-light">
                Pendamping Digital Ibu Hamil Selama 1000 Hari Pertama Kehidupan
              </p>
            </div>
            <a 
              href="https://tinaku.net" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 py-3 px-6 bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-md"
            >
              Kunjungi Website <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <div className="relative w-full h-64 md:h-[550px] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl shadow-blue-900/20 group">
            <Image 
              src="/assets/tinaku-screenshot.png" 
              alt="Tinaku Dashboard" 
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021526] via-transparent to-transparent opacity-80"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              
              {/* Tentang Proyek */}
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <LayoutDashboard className="text-blue-400 w-8 h-8" />
                  Tentang Proyek
                </h2>
                <div className="text-white/80 space-y-5 text-lg leading-relaxed bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm shadow-xl">
                  <p>
                    TINAKU adalah platform digital inovatif berbasis web yang dirancang khusus untuk mendampingi ibu hamil selama masa krusial 1000 Hari Pertama Kehidupan.
                  </p>
                  <p>
                    Proyek ini dikembangkan dengan tujuan mulia untuk membantu menurunkan angka kematian ibu dan bayi di Indonesia melalui sistem pemantauan mandiri, edukasi literasi KIA, dan koneksi langsung secara <i className="text-blue-300">real-time</i> antara pasien dengan tenaga kesehatan (Bidan/Puskesmas).
                  </p>
                </div>
              </section>

              {/* Fitur Utama */}
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Code className="text-blue-400 w-8 h-8" />
                  Fitur Utama
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Feature Card 1 */}
                  <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Activity className="text-blue-400 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">Dashboard Personal</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Pemantauan metrik penting seperti HB, Tekanan Darah, TFU, DJJ, serta visualisasi grafik kehamilan dan peningkatan berat badan.
                    </p>
                  </div>

                  {/* Feature Card 2 */}
                  <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ClipboardList className="text-emerald-400 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">Skrining KSPR Mandiri</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Fitur deteksi dini risiko kehamilan menggunakan Kartu Skor Poedji Rochjati (KSPR) digital yang terhubung dengan dashboard Bidan.
                    </p>
                  </div>

                  {/* Feature Card 3 */}
                  <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Pill className="text-purple-400 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">Tracker TTD</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Kalender visual interaktif yang membantu memantau kepatuhan ibu dalam mengonsumsi suplemen zat besi harian (mencegah anemia).
                    </p>
                  </div>

                  {/* Feature Card 4 */}
                  <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-rose-500/50 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ShieldAlert className="text-rose-400 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-rose-300 transition-colors">Edukasi KIA & Darurat</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Pusat literasi kesehatan berstandar buku KIA 2024 dan integrasi hotline cepat ke layanan darurat medis setempat.
                    </p>
                  </div>

                  {/* Feature Card 5 (Full Width) */}
                  <div className="md:col-span-2 bg-gradient-to-r from-blue-900/20 to-transparent p-6 rounded-3xl border border-blue-500/20 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 group">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="text-blue-400 w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">Manajemen Multilateral (Bidan & Faskes)</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          Sistem dilengkapi dengan admin panel khusus untuk Bidan dan Fasilitas Kesehatan (Puskesmas/Rumah Sakit) agar dapat mengelola rekam jejak pasien, memantau alarm indikator peringatan dini, dan menjadwalkan pemeriksaan kuantitas secara komprehensif.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            </div>

            {/* Sidebar Kanan */}
            <div className="space-y-6">
              
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest text-white/50 font-bold mb-4">Peran Saya</h3>
                <p className="text-2xl font-bold text-white mb-2">Core Developer</p>
                <p className="text-blue-400 font-medium">Full-Stack Development</p>
              </div>

              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest text-white/50 font-bold mb-6">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-300 text-sm font-medium border border-blue-500/20">Node.js</span>
                  <span className="px-4 py-2 rounded-xl bg-gray-500/10 text-gray-300 text-sm font-medium border border-gray-500/20">Next.js</span>
                  <span className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 text-sm font-medium border border-cyan-500/20">React</span>
                  <span className="px-4 py-2 rounded-xl bg-teal-500/10 text-teal-300 text-sm font-medium border border-teal-500/20">Tailwind CSS</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <TileGrid />
    </div>
  );
}
