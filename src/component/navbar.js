"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Mail, ArrowUpRight } from "lucide-react";
import { useWeatherGeo } from "@/hooks/useWeatherGeo";
import WeatherBrandWidget from "./navbar/WeatherBrandWidget";
import DesktopNav from "./navbar/DesktopNav";
import MobileDrawer from "./navbar/MobileDrawer";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const { city, temp, isMounted } = useWeatherGeo();

  const handleClose = () => setIsOpen(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      ref={navRef}
      className="relative w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2.5rem)] max-w-4xl rounded-full border border-white/[0.08] bg-gradient-to-b from-[#0a111a]/90 via-[#050b12]/85 to-[#02060b]/90 px-3 py-1.5 sm:px-4 sm:py-2 text-white backdrop-blur-2xl shadow-xl shadow-black/60 transition-all duration-300 animate-fade-in-down"
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <WeatherBrandWidget city={city} temp={temp} isMounted={isMounted} />

        <DesktopNav pathname={pathname} onNavigate={handleClose} />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="mailto:reskyadhyaksa19@gmail.com"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] text-slate-200 hover:text-white hover:border-white/20 hover:bg-white/[0.12] transition-all duration-200 active:scale-95"
          >
            <Mail className="h-3 w-3 text-slate-300" />
            <span>Contact</span>
            <ArrowUpRight className="h-2.5 w-2.5 text-slate-400" />
          </Link>

          <button
            type="button"
            onClick={handleToggle}
            aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={isOpen}
            className="flex h-7 w-7 items-center justify-center rounded-lg md:hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 transition-colors focus:outline-none"
          >
            {isOpen ? (
              <X className="h-3.5 w-3.5 text-slate-200" />
            ) : (
              <Menu className="h-3.5 w-3.5 text-slate-200" />
            )}
          </button>
        </div>
      </div>

      <MobileDrawer
        isOpen={isOpen}
        pathname={pathname}
        city={city}
        onClose={handleClose}
      />
    </header>
  );
}
