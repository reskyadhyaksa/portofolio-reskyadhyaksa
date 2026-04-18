import Image from "next/image";
import Link from "next/link";

export default function HeadTitle() {
  return (
    <div className="flex h-full flex-col justify-center gap-5 md:-translate-y-10">
      <div className="flex place-items-center gap-5">
        <p className="w-fit rounded-sm border border-white px-3 py-1 text-xs">
          STATUS: WORKING
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
          <p className="3xl:text-sm text-xs">Fullstack Dev</p>
        </button>
        <button className="3xl:w-48 flex w-46 place-items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 py-2 backdrop-blur-xl md:w-40">
          <Image
            src="terminal.svg"
            alt="ML Icon"
            height={20}
            width={20}
            className=""
          />
          <p className="3xl:text-sm text-xs">IT Support</p>
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
          className="pointer-events-auto w-fit cursor-pointer rounded-sm bg-white px-10 py-2 text-xs sm:text-sm lg:text-base font-bold text-black"
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
  )
}