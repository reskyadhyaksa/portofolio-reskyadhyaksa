import Link from "next/link";

export default function NavigationBar() {
  return (
    <header className="navigation flex place-items-center justify-between rounded-full border border-white/10 bg-white/5 px-10 py-3 text-white backdrop-blur-xl animate-slide-down">
      <Link href="/" className="font-bold text-white">
        Resky Adhyaksa
      </Link>
      <div className="hidden place-items-center gap-6 font-bold md:flex">
        <Link href="/home" className="text-white/70 hover:text-white">
          Project
        </Link>
        <Link href="#" className="text-white/70 hover:text-white">
          About Me
        </Link>
        <Link href="#" className="rounded-full bg-blue-500 px-4 py-1">
          Contact
        </Link>
      </div>
    </header>
  );
}
