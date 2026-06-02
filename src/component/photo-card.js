"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const photos = [
  { src: "/ME.jpg", location: "MT. Prau", className: "-translate-y-32 scale-200 object-cover" },
  { src: "/me2.jpg", location: "MT. Merbabu", className: "object-cover object-center" },
  { src: "/me3.jpg", location: "Tambing Lake", className: "object-cover object-center" }
];

export default function PhotoCard() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPhoto]);

  return(
    <div className="3xl:h-172.5 3xl:w-125 hidden h-136 w-100 -translate-x-2 -translate-y-3 place-items-center overflow-hidden rounded-lg border border-white/20 backdrop-blur-xl lg:inline">
      <div className="flex w-full place-items-center justify-between bg-white/5 px-5 py-3 backdrop-blur-xl">
        <div className="pointer-events-auto flex place-items-center justify-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-red-400/80 bg-red-400/60 hover:bg-red-400"></span>
          <span className="h-3.5 w-3.5 rounded-full border-2 border-yellow-400/80 bg-yellow-400/60 hover:bg-yellow-400"></span>
          <span className="h-3.5 w-3.5 rounded-full border-2 border-green-400/80 bg-green-400/60 hover:bg-green-400"></span>
        </div>
        <p className="text-xs text-white/50">PROFILE.EXE</p>
      </div>
      <div className="3xl:h-125 mt-2 mb-2 h-96 w-[97%] relative place-items-center justify-center bg-white/5 backdrop-blur-xl">
        <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-blue-500 z-10" />
        <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-blue-500 z-10" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-blue-500 z-10" />
        <span className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-blue-500 z-10" />

        <div className="pointer-events-auto absolute top-1/2 left-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentPhoto ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={photo.src}
                fill
                alt={`Resky Adhyaksa at ${photo.location}`}
                className={photo.className}
              />
              <p className="absolute bottom-0 rounded-tr-sm border-white/5 bg-white/50 px-2 py-1 text-xs text-white backdrop-blur-xl">
                Location: {photo.location}
              </p>
            </div>
          ))}
          <div className="absolute bottom-2 right-2 z-20 flex gap-2">
            <button
              onClick={() => setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length)}
              className="flex items-center gap-1 rounded-sm bg-white px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200"
              aria-label="Previous photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button
              onClick={() => setCurrentPhoto((prev) => (prev + 1) % photos.length)}
              className="flex items-center gap-1 rounded-sm bg-white px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200"
              aria-label="Next photo"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
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
            {'"'}HC Service & Inf. System - Staff{'"'}
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
  )
}