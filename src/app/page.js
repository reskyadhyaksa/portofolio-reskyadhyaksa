import TileGrid from "../component/tilegrid";
import Link from "next/link";
import PhotoCard from "@/component/photo-card";
import HeadTitle from "@/component/headline";

export default function Home() {
  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden">
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white">
        <div className="3xl:px-52 pointer-events-none mt-24 flex min-h-[calc(100vh-10rem)] flex-row place-items-center justify-between px-10 md:px-32">
          <HeadTitle/>
          <PhotoCard/>
        </div>
      </main>
      <TileGrid />
      <div className="relative flex justify-center">
        <Link href={"/experiences"} className="animate-blink cursor-pointer text-white/50 text-xs sm:text-sm">
          Explore More...
        </Link>
        <span className="animate-blink absolute bottom-0 w-10 translate-y-1 border-b border-white/20"></span>
      </div>
    </div>
  );
}
