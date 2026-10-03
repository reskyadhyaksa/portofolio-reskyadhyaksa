import Link from "next/link";
import { MapPin } from "lucide-react";
import WeatherVisual from "@/component/common/WeatherVisual";

export default function WeatherBrandWidget({ city, temp, isMounted }) {
  const displayCity = isMounted && city ? city : "Jakarta, ID";
  const displayTemp =
    isMounted && temp ? `${temp.temp}°C · ${temp.weather}` : "Live weather";

  return (
    <Link
      href="/"
      className="group flex items-center gap-2 py-0.5 pr-2 transition-all duration-200"
    >
      <div className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
        <WeatherVisual
          condition={isMounted ? temp?.weather : null}
          temperature={isMounted ? temp?.temp : null}
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <MapPin className="h-2.5 w-2.5 text-slate-400 shrink-0" />
          <p className="text-[11px] font-semibold text-slate-200 leading-none truncate max-w-[95px] sm:max-w-[130px]">
            {displayCity}
          </p>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-slate-400/80 font-medium leading-none mt-1">
          <span>{displayTemp}</span>
        </div>
      </div>
    </Link>
  );
}
