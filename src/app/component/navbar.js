"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavigationBar({ pathname }) {
  const [open, SetOpen] = useState(null);

  return (
    <header className="navigation animate-slide-down flex place-items-center justify-between rounded-full border border-white/10 bg-white/5 px-10 py-3 text-white backdrop-blur-xl ">
      <Link href="/" className="font-bold text-white">
        {pathname}
      </Link>
      <section className="hidden place-items-center gap-6 font-bold md:flex">
        <Link href="/home" className="text-white/70 hover:text-white">
          Project
        </Link>
        <Link href="#" className="text-white/70 hover:text-white">
          About Me
        </Link>
        <Link href="#" className="rounded-full bg-blue-500 px-4 py-1">
          Contact
        </Link>
      </section>

      <section className="relative flex sm:hidden">
        <button
          onClick={() => SetOpen(!open)}
          className="flex gap-2 rounded-sm bg-blue-900 px-5 py-2"
        >
          <p className="text-sm">Menu</p>
          <Image
            src={"hamburger.svg"}
            height={15}
            width={15}
            alt="Hamburger Menu"
          />
        </button>
        {open && (
          <div className="fixed top-16 left-0 flex w-full flex-col rounded-sm border-white/10 bg-blue-900 px-5 py-2 backdrop-blur-xl ">
            <Link
              href="/"
              className="mb-2 border-b-2 text-white hover:text-white active:bg-white/50"
            >
              Skills
            </Link>
            <Link
              href="/"
              className="mb-2 border-b-2 text-white hover:text-white active:bg-white/50"
            >
              Project
            </Link>
            <Link
              href="/"
              className="mb-2 border-b-2 text-white hover:text-white active:bg-white/50"
            >
              About Me
            </Link>
            <Link
              href="/"
              className="mb-2 border-b-2 text-white hover:text-white active:bg-white/50"
            >
              Contact
            </Link>
          </div>
        )}
      </section>
    </header>
  );
}
