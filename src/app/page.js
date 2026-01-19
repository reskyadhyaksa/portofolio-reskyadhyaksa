import Image from "next/image";
import TileGrid from "./component/tilegrid";
import NavigationBar from "./component/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden">
      <div className="fixed top-4 z-10 flex w-full justify-center">
        <NavigationBar />
      </div>
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white">
        <div className="pointer-events-none mt-24 flex min-h-[calc(100vh-6rem)] flex-row place-items-center justify-between px-52">
          <div className="flex h-full -translate-y-10 flex-col justify-center gap-5">
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
            <div className="flex place-items-center">
              <button className="pointer-events-auto w-fit cursor-pointer rounded-sm bg-white px-10 py-2 text-base font-bold text-black">
                Download CV
              </button>
              <span className="mx-5 h-6 w-px border border-white/20"></span>
              <div className="flex gap-2">
                <Link
                  href={"https://www.linkedin.com/in/reskyadhyaksa/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto cursor-pointer"
                >
                  <Image
                    src="linkedin.svg"
                    height={25}
                    width={25}
                    alt="Linkedin"
                    className="brightness-0 invert"
                  />
                </Link>
                <Link
                  href={"https://github.com/reskyadhyaksa"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto cursor-pointer"
                >
                  <Image
                    src="github.svg"
                    height={25}
                    width={25}
                    alt="Github"
                    className="brightness-0 invert"
                  />
                </Link>
                <button className="pointer-events-auto cursor-pointer">
                  <Image
                    src="instagram.svg"
                    height={25}
                    width={25}
                    alt="Instagram"
                    className="brightness-0 invert"
                  />
                </button>
                <button className="pointer-events-auto cursor-pointer">
                  <Image
                    src="discord.svg"
                    height={25}
                    width={25}
                    alt="Discord"
                    className="brightness-0 invert"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="h-172.5 w-125 place-items-center overflow-hidden rounded-lg border border-white/20 backdrop-blur-xl">
            <div className="flex w-full place-items-center justify-between bg-white/5 px-5 py-3 backdrop-blur-xl">
              <div className="pointer-events-auto flex place-items-center justify-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-red-400/80 bg-red-400/60 hover:bg-red-400/80"></span>
                <span className="h-3 w-3 rounded-full border-2 border-yellow-400/80 bg-yellow-400/60 hover:bg-yellow-400/80"></span>
                <span className="h-3 w-3 rounded-full border-2 border-green-400/80 bg-green-400/60"></span>
              </div>
              <p className="text-xs text-white/50">PROFILE_RENDER.EXE</p>
            </div>
            <div className="mt-2 mb-2 h-131 w-[97%] place-items-center justify-center bg-white/5 backdrop-blur-xl">
              <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-blue-500" />
              <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-blue-500" />
              <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-blue-500" />
              <span className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-blue-500" />

              <div className="pointer-events-auto fixed top-1/2 left-1/2 h-120 w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white">
                <Image
                  src="/ME.jpg"
                  fill
                  alt="Resky Adhyaksa"
                  className="-translate-y-32 scale-200 object-cover"
                />
              </div>
            </div>
            <div className="flex h-full w-full flex-col bg-white/5 py-3 text-xs text-white/50 backdrop-blur-xl">
              <p className="whitespace-pre text-blue-400">
                {"\t"}class{" "}
                <span className="text-yellow-300">Professional</span>:
              </p>
              <p className="whitespace-pre text-pink-300">
                {"\t\t"}def <span className="text-blue-400">__init__</span>
                <span className="text-white">(self):</span>
              </p>
              <p className="whitespace-pre">
                {"\t\t\t"}self.name ={" "}
                <span className="text-green-300">
                  {'"'}Resky Adhyaksa{'"'}
                </span>
              </p>
              <p className="whitespace-pre">
                {"\t\t\t"}self.role ={" "}
                <span className="text-green-300">
                  {'"'}CS_BACHELOR{'"'}
                </span>
              </p>
              <p className="whitespace-pre">
                {"\t\t\t"}self.focus = [
                <span className="text-green-300">
                  {'"'}ML{'"'}
                </span>
                ,
                <span className="text-green-300">
                  {'"'}FE{'"'}
                </span>
                ,
                <span className="text-green-300">
                  {'"'}IT{'"'}
                </span>
                ]
              </p>
            </div>
          </div>
        </div>
      </main>
      <TileGrid />
    </div>
  );
}
