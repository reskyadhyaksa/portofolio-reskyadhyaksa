import TileGrid from "../../component/tilegrid";
import Link from "next/link";
import Image from "next/image";

export default function ProjectPage() {
  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden">
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white pt-32 px-10 md:px-32">
        <div className="pointer-events-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-10">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/projects/tinaku"
              className="group block rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm cursor-pointer overflow-hidden"
            >
              <div className="relative w-full h-48 md:h-64">
                <Image 
                  src="/assets/tinaku-screenshot.png" 
                  alt="Tinaku.net Screenshot" 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">Tinaku.net</h2>
              <p className="text-white/70 text-sm md:text-base mb-4">
                A web application where I serve as the core developer.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-white/50">
                <span className="px-3 py-1 rounded-full bg-white/10">Full-Stack Development</span>
                <span className="px-3 py-1 rounded-full bg-white/10">Web App</span>
              </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <TileGrid />
    </div>
  );
}