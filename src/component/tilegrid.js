"use client";

import { useEffect, useState } from "react";

export default function Grid() {
  const [count, setCount] = useState(0);

  const getTileSize = () => {
    if (window.innerWidth >= 1024) return 90;
    if (window.innerWidth >= 640) return 75;
    return 60;
  };

  useEffect(() => {
    const calc = () => {
      const size = getTileSize();
      const cols = Math.floor(window.innerWidth / size);
      const rows = Math.floor(window.innerHeight / size);
      setCount(cols * rows);
    };

    console.log(window.innerWidth);
    
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div className="fixed tile-grid inset-0 z-0">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="tile border bg-cy border-white/25 transition-colors ease-out duration-500 hover:duration-0 hover:-translate-x-1 hover:-translate-y-1 
          hover:nth-[2n]:bg-blue-400 hover:nth-[4n+1]:bg-blue-500 hover:nth-[4n+3]:bg-blue-600 hover:nth-[7n]:bg-blue-700 hover:nth-[7n+3]:bg-blue-800"
        />
      ))}
    </div>
  );
}
