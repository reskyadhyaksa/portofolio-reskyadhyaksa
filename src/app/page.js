import Image from "next/image";
import TileGrid from "./component/tilegrid";
import NavigationBar from "./component/navbar";

export default function Home() {
  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden">
      <div className="fixed top-4 z-10 flex w-full justify-center">
        <NavigationBar />
      </div>
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white">
        <div className="pointer-events-none mt-24 flex min-h-[calc(100vh-6rem)] flex-row place-items-center px-24">
          <div className="flex h-full -translate-y-20 flex-col justify-center gap-5">
            <div className="flex place-items-center gap-5">
              <p className="w-fit rounded-sm border border-white px-3 py-1 text-xs">
                STATUS: ACTIVE
              </p>
              <p className="text-xs text-white/40">LOC: 127.0.0.1</p>
            </div>
            <h1 className="text-9xl font-extrabold text-white">
              RESKY
              <br />
              ADHYAKSA<span className="animate-pulse opacity-20">_</span>
            </h1>
            <div className="flex gap-2">
              <button className="flex w-48 place-items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 py-2 backdrop-blur-xl">
                <Image
                  src="machine.svg"
                  alt="ML Icon"
                  height={20}
                  width={20}
                  className=""
                />
                <p className="text-sm">ML Engineer</p>
              </button>
              <button className="flex w-48 place-items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 py-2 backdrop-blur-xl">
                <Image
                  src="developer.svg"
                  alt="ML Icon"
                  height={20}
                  width={20}
                  className=""
                />
                <p className="text-sm">Frontend Dev</p>
              </button>
              <button className="flex w-48 place-items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 py-2 backdrop-blur-xl">
                <Image
                  src="terminal.svg"
                  alt="ML Icon"
                  height={20}
                  width={20}
                  className=""
                />
                <p className="text-sm">IT Support</p>
              </button>
            </div>
            <p className="w-150 text-xl text-white/50">
              I adapt quickly to new technologies, work with dedication, and
              deliver results with precision. Specializing in building{" "}
              <span className="text-white/80 underline">
                intelligent systems
              </span>{" "}
              and seamsless{" "}
              <span className="text-white/80 underline">user experiences</span>{" "}
              through engineered solutions.
            </p>
            <div className="flex relative place-items-center">
              <button className="bg-white px-10 py-2 text-base text-black w-fit rounded-sm font-bold">Download CV</button>
              <span className="h-6 w-px mx-5 border border-white/20"></span>
              <div className="flex gap-2">
                <Image src="linkedin.svg" height={25} width={25} alt="Linkedin" className="invert brightness-0"/>
                <Image src="github.svg" height={25} width={25} alt="Linkedin" className="invert brightness-0"/>
                <Image src="instagram.svg" height={25} width={25} alt="Linkedin" className="invert brightness-0"/>
                <Image src="discord.svg" height={25} width={25} alt="Linkedin" className="invert brightness-0"/>
              </div>
            </div>
          </div>
          <div className="fixed top-[20%] right-[20%] z-1000 h-100 w-75 overflow-hidden rounded-xl hover:scale-110">
            <Image
              src="/ME.jpg"
              fill
              alt="Myself"
              className="-translate-y-16 scale-200 object-cover"
            />
          </div>
        </div>
      </main>
      <TileGrid />
    </div>
  );
}
