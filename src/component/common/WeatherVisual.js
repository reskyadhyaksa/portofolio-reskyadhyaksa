export default function WeatherVisual({ condition, temperature, size = "md" }) {
  const normalized = condition?.toLowerCase() || "";
  const isHotSun = typeof temperature === "number" && temperature >= 32;

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  if (normalized.includes("rain") || normalized.includes("drizzle")) {
    return (
      <div className={`relative flex items-center justify-center ${currentSize}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(59,130,246,0.3)]"
        >
          <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
            fill="url(#rainCloudGrad)"
          />
          <defs>
            <linearGradient id="rainCloudGrad" x1="0" y1="0" x2="24" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#94a3b8" />
              <stop offset="1" stopColor="#475569" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute -bottom-1 flex gap-1 items-center justify-center">
          <span className="w-0.5 h-1.5 rounded-full bg-blue-400 animate-pulse [animation-delay:0ms]"></span>
          <span className="w-0.5 h-2 rounded-full bg-cyan-300 animate-pulse [animation-delay:200ms]"></span>
          <span className="w-0.5 h-1.5 rounded-full bg-blue-400 animate-pulse [animation-delay:400ms]"></span>
        </div>
      </div>
    );
  }

  if (normalized.includes("thunder")) {
    return (
      <div className={`relative flex items-center justify-center ${currentSize}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-[0_2px_6px_rgba(245,158,11,0.4)]"
        >
          <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
            fill="url(#stormCloudGrad)"
          />
          <path
            d="M11 13l-2 5h3l-1 4 4-6h-3l1-3h-2z"
            fill="#f59e0b"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="stormCloudGrad" x1="0" y1="0" x2="24" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#64748b" />
              <stop offset="1" stopColor="#334155" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (
    normalized.includes("cloud") ||
    normalized.includes("mist") ||
    normalized.includes("fog") ||
    normalized.includes("haze")
  ) {
    return (
      <div className={`relative flex items-center justify-center ${currentSize}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-[0_2px_6px_rgba(255,255,255,0.15)] animate-pulse [animation-duration:4s]"
        >
          <circle cx="8" cy="8" r="3.5" fill="url(#sunBehindCloud)" opacity="0.85" />
          <path
            d="M19.35 11.04C18.67 7.59 15.64 5 12 5 9.11 5 6.6 6.64 5.35 9.04 2.34 9.36 0 11.91 0 15c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
            fill="url(#cloudSoftGrad)"
          />
          <defs>
            <linearGradient id="sunBehindCloud" x1="4.5" y1="4.5" x2="11.5" y2="11.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde047" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="cloudSoftGrad" x1="0" y1="5" x2="24" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e2e8f0" />
              <stop offset="0.6" stopColor="#cbd5e1" />
              <stop offset="1" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (isHotSun) {
    return (
      <div className={`relative flex items-center justify-center ${currentSize}`}>
        <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping"></div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
        >
          <circle cx="12" cy="12" r="5" fill="url(#hotSunGrad)" />
          <g className="animate-spin [animation-duration:8s] origin-center">
            <line x1="12" y1="2" x2="12" y2="4" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="20" x2="12" y2="22" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="12" x2="4" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="12" x2="22" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          </g>
          <defs>
            <linearGradient id="hotSunGrad" x1="7" y1="7" x2="17" y2="17" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f97316" />
              <stop offset="1" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${currentSize}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-full h-full drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
      >
        <circle cx="12" cy="12" r="5" fill="url(#clearSunGrad)" />
        <g className="animate-spin [animation-duration:12s] origin-center opacity-80">
          <line x1="12" y1="2" x2="12" y2="4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="20" x2="12" y2="22" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="12" x2="4" y2="12" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="12" x2="22" y2="12" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <defs>
          <linearGradient id="clearSunGrad" x1="7" y1="7" x2="17" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fde047" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
