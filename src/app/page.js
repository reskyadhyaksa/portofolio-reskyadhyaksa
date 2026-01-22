import Image from "next/image";
import TileGrid from "./component/tilegrid";
import NavigationBar from "./component/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-primary relative min-h-screen w-full overflow-hidden">
      <div className="fixed top-4 z-1000 flex w-full justify-center">
        <NavigationBar pathname={"Resky Adhyaksa"} />
      </div>
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white">
        <div className="3xl:px-52 pointer-events-none mt-24 flex min-h-[calc(100vh-10rem)] flex-row place-items-center justify-between px-10 md:px-32">
          <div className="flex h-full flex-col justify-center gap-5 md:-translate-y-10">
            <div className="flex place-items-center gap-5">
              <p className="w-fit rounded-sm border border-white px-3 py-1 text-xs">
                STATUS: ACTIVE
              </p>
              <p className="text-xs text-white/40">LOC: JAKARTA, IDN</p>
            </div>
            <h1 className="3xl:text-9xl text-5xl font-extrabold text-white md:text-7xl">
              RESKY
              <br />
              ADHYAKSA<span className="animate-pulse opacity-20">_</span>
            </h1>
            <div className="flex flex-col gap-2 md:flex-row">
              <button className="3xl:w-48 flex w-46 place-items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 py-2 backdrop-blur-xl md:w-40">
                <Image
                  src="machine.svg"
                  alt="ML Icon"
                  height={20}
                  width={20}
                  className=""
                />
                <p className="3xl:text-sm text-xs">ML Engineer</p>
              </button>
              <button className="3xl:w-48 flex w-46 place-items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 py-2 backdrop-blur-xl md:w-40">
                <Image
                  src="developer.svg"
                  alt="ML Icon"
                  height={20}
                  width={20}
                  className=""
                />
                <p className="text-sm">Fullstack Dev</p>
              </button>
              <button className="3xl:w-48 flex w-46 place-items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 py-2 backdrop-blur-xl md:w-40">
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
            <p className="3xl:w-150 md:text-md 3xl:text-xl w-72 text-xs text-white/50 md:w-120">
              I adapt quickly to new technologies, work with dedication, and
              deliver results with precision. Specializing in building{" "}
              <span className="text-white/80 underline">
                intelligent systems
              </span>{" "}
              and seamsless{" "}
              <span className="text-white/80 underline">user experiences</span>{" "}
              through engineered solutions.
            </p>
            <div className="flex flex-col place-items-start gap-2 md:flex-row md:place-items-center md:gap-0">
              <Link
                href={"/cv.pdf"}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto w-fit cursor-pointer rounded-sm bg-white px-10 py-2 text-base font-bold text-black"
              >
                Download CV
              </Link>
              <span className="mx-5 hidden h-6 w-px border border-white/20 md:inline"></span>
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
                <Link
                  href={"https://www.instagram.com/adhrskyy_"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto cursor-pointer"
                >
                  <Image
                    src="instagram.svg"
                    height={25}
                    width={25}
                    alt="Instagram"
                    className="brightness-0 invert"
                  />
                </Link>
                <Link
                  href={"https://medium.com/@reskyadhyaksa19"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto cursor-pointer"
                >
                  <Image
                    src="medium.svg"
                    height={25}
                    width={25}
                    alt="Medium"
                    className="translate-y-1.5 brightness-0 invert"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="3xl:h-172.5 3xl:w-125 hidden h-136 w-100 -translate-x-2 -translate-y-3 place-items-center overflow-hidden rounded-lg border border-white/20 backdrop-blur-xl lg:inline">
            <div className="flex w-full place-items-center justify-between bg-white/5 px-5 py-3 backdrop-blur-xl">
              <div className="pointer-events-auto flex place-items-center justify-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-red-400/80 bg-red-400/60 hover:bg-red-400"></span>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-yellow-400/80 bg-yellow-400/60 hover:bg-yellow-400"></span>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-green-400/80 bg-green-400/60 hover:bg-green-400"></span>
              </div>
              <p className="text-xs text-white/50">PROFILE_RENDER.EXE</p>
            </div>
            <div className="3xl:h-125 mt-2 mb-2 h-96 w-[97%] place-items-center justify-center bg-white/5 backdrop-blur-xl">
              <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-blue-500" />
              <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-blue-500" />
              <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-blue-500" />
              <span className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-blue-500" />

              <div className="pointer-events-auto fixed top-1/2 left-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white">
                <Image
                  src="/ME.jpg"
                  fill
                  alt="Resky Adhyaksa"
                  className="-translate-y-32 scale-200 object-cover"
                />
                <p className="fixed bottom-0 rounded-tr-sm border-white/5 bg-white/50 px-2 py-1 text-xs text-white backdrop-blur-xl">
                  Location: MT. Prau
                </p>
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
      <div className="relative flex justify-center">
        <Link href={"/experiences"} className="animate-blink cursor-pointer text-white/50 text-sm">
          Explore More...
        </Link>
        <span className="animate-blink absolute bottom-0 w-10 translate-y-1 border-b border-white/20"></span>
      </div>
    </div>
  );
}
