"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavigationBar() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [temp, setTemp] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        if (err.code === 1) {
          setLocation({
            lat: -6.252832,
            lon: 106.796543,
          });
        } else {
          return;
        }
      },
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    const getAddress = async () => {
      try {
        const res = await fetch(
          `/api/location?lat=${location.lat}&lon=${location.lon}`,
        );
        const json = await res.json();
        setCity(json.address.city);
      } catch (error) {
        console.error(error);
      }
    };

    const getWeather = async () => {
      try {
        const res = await fetch(
          `/api/weather?lat=${location.lat}&lon=${location.lon}`,
        );
        const json = await res.json();
        
        if(!json.current?.temp) {
          setTemp({
            temp: 'N/A',
            weather: 'Unknown',
          });
          return;
        }
        
        setTemp({
          temp: json.current.temp,
          weather: json.current.weather[0].main,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getAddress();
    getWeather();
  }, [location]);

  const navLinks = [
    { name: "Experiences", path: "/experiences" },
    { name: "Trading", path: "/trading" },
    { name: "Projects", path: "/projects" },
    { name: "About Me", path: "/about-me" },
  ];

  return (
    <header className="navigation animate-slide-down relative flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white backdrop-blur-xl shadow-2xl shadow-blue-900/20 z-[9999]">
      
      {/* Kiri: Widget Cuaca */}
      <Link
        href="/"
        className="flex items-center gap-3 font-bold group"
      >
        <div className="cloud relative h-2.5 w-9 translate-y-0.5 rounded-full bg-[#b9b9b9] group-hover:bg-white transition-colors duration-300">
          <div className="absolute -z-1 flex w-full justify-center">
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#274C83] [--i:11] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#274C83] [--i:14] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#274C83] [--i:10] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#274C83] [--i:18] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#274C83] [--i:13] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#274C83] [--i:16] [animation-delay:calc(var(--i)*100ms)]"></span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {city ? (
            <p className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 leading-tight">
              {city}
            </p>
          ) : (
            <p className="font-bold text-sm text-white/50 leading-tight">Mendeteksi...</p>
          )}
          {temp && (
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-0.5">
              {temp.temp}&#176;C &bull; {temp.weather}
            </p>
          )}
        </div>
      </Link>

      {/* Tengah: Link Navigasi Desktop */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          // Highlight link if the current pathname exactly matches or starts with the path (e.g. /projects/tinaku)
          const isActive = pathname === link.path || pathname?.startsWith(`${link.path}/`);
          return (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`relative text-sm font-medium transition-all duration-300 py-1 ${
                isActive ? "text-white" : "text-white/60 hover:text-white hover:-translate-y-0.5"
              }`}
            >
              {link.name}
              {/* Indikator Active berupa garis berpendar (glow) di bawah teks */}
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] ${
                isActive ? "w-full" : "w-0"
              }`}></span>
            </Link>
          );
        })}
      </nav>

      {/* Kanan: Tombol CTA & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        {/* Desktop CTA */}
        <Link 
          href="#" 
          className="hidden md:block px-5 py-2 text-xs md:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:-translate-y-0.5"
        >
          Contact Me
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} className="text-blue-400" /> : <Menu size={22} />}
        </button>
      </div>

      {/* Dropdown Mobile Menu */}
      <div className={`absolute top-full left-0 w-full mt-3 flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#021526]/95 backdrop-blur-3xl transition-all duration-300 shadow-2xl md:hidden ${
        open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
      }`}>
        <div className="p-5 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || pathname?.startsWith(`${link.path}/`);
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center ${
                  isActive ? "bg-white/10 text-blue-400 shadow-inner" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {/* Bulatan indikator menu aktif */}
                <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 ${
                  isActive ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,1)] scale-100" : "bg-transparent scale-0"
                }`}></span>
                {link.name}
              </Link>
            );
          })}
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-3"></div>
          
          <Link
            href="#"
            onClick={() => setOpen(false)}
            className="w-full text-center py-3.5 text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-900/50 active:scale-95 transition-transform"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </header>
  );
}
