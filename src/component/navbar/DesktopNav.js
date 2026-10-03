import Link from "next/link";
import { NAVIGATION_LINKS } from "./nav-config";

export default function DesktopNav({ pathname, onNavigate }) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {NAVIGATION_LINKS.map((link) => {
        const isActive =
          pathname === link.path || pathname?.startsWith(`${link.path}/`);
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.path}
            onClick={onNavigate}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              isActive
                ? "text-white bg-white/[0.08] border border-white/[0.08] shadow-sm"
                : "text-slate-300/70 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Icon
              className={`h-3 w-3 transition-colors ${
                isActive ? "text-slate-200" : "text-slate-400/60"
              }`}
            />
            <span>{link.name}</span>
            {isActive && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] w-3 rounded-full bg-slate-300" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
