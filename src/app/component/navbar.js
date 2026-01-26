"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavigationBar({ pathname }) {
  const [open, SetOpen] = useState(null);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [temp, setTemp] = useState(null);

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
    console.log(location);

    const getAddress = async () => {
      const res = await fetch(
        `/api/location?lat=${location.lat}&lon=${location.lon}`,
      );
      const json = await res.json();
      setCity(json.address.city);
    };

    const getWeather = async () => {
      const res = await fetch(
        `/api/weather?lat=${location.lat}&lon=${location.lon}`,
      );
      const json = await res.json();

      setTemp({
        temp: json.current.temp,
        weather: json.current.weather[0].main,
      });
    };

    getAddress();
    getWeather();
  }, [location]);

  return (
    <header className="navigation animate-slide-down flex place-items-center justify-between rounded-full border border-white/10 bg-white/5 px-7 py-2 text-white backdrop-blur-xl">
      <Link
        href="/"
        className="flex place-items-center gap-2 font-bold text-white"
      >
        <div className="cloud relative h-2.5 w-9 translate-y-0.5 rounded-full bg-[#b9b9b9]">
          <div className="absolute z-1 flex w-full justify-center">
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#b9b9b9] [--i:11] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#b9b9b9] [--i:14] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#b9b9b9] [--i:10] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#b9b9b9] [--i:18] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#b9b9b9] [--i:13] [animation-delay:calc(var(--i)*100ms)]"></span>
            <span className="animate-raining relative mr-px h-0.75 w-0.75 rounded-full bg-[#b9b9b9] [--i:16] [animation-delay:calc(var(--i)*100ms)]"></span>
          </div>
        </div>
        <div className="flex flex-col">
          {location && <p className="font-bold">{city}</p>}
          {temp && (
            <p className="text-xs text-white/50">
              {temp.temp}&#176;|{temp.weather}
            </p>
          )}
        </div>
      </Link>
      <section className="hidden place-items-center gap-6 font-bold md:flex">
        <Link href="/" className="text-white/70 hover:text-white">
          Experiences
        </Link>
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
          <div className="fixed top-16 left-0 flex w-full flex-col rounded-sm border-white/10 bg-blue-900 px-5 py-2 backdrop-blur-xl">
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
