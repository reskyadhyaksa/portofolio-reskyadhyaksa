import Link from "next/link";
import { Mail, ArrowUpRight, Sparkles } from "lucide-react";
import StatusPill from "@/component/common/StatusPill";
import { NAVIGATION_LINKS } from "./nav-config";

export default function MobileDrawer({ isOpen, pathname, city, onClose }) {
  return (
    <div
      className={`absolute top-full left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0a111a]/98 via-[#050b12]/95 to-[#02060b]/98 backdrop-blur-2xl transition-all duration-200 shadow-2xl shadow-black/80 md:hidden ${
        isOpen
          ? "max-h-[420px] opacity-100 translate-y-0 visible"
          : "max-h-0 opacity-0 -translate-y-1 invisible"
      }`}
    >
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.04] mb-0.5">
          <StatusPill label="Available for Projects" variant="emerald" />
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Sparkles className="h-2.5 w-2.5 text-slate-300" />
            <span>{city || "Jakarta"}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {NAVIGATION_LINKS.map((link) => {
            const isActive =
              pathname === link.path || pathname?.startsWith(`${link.path}/`);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={onClose}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-white/[0.08] border border-white/[0.08] text-white"
                    : "text-slate-300/80 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-white/[0.03] text-slate-400 group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-medium">{link.name}</span>
                    <span className="text-[9px] text-slate-400/70">
                      {link.description}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  className={`h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isActive ? "text-slate-200" : "text-slate-500"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="my-1 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"></div>

        <div className="flex items-center gap-1.5 pt-0.5">
          <Link
            href="mailto:reskyadhyaksa19@gmail.com"
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] text-white hover:bg-white/[0.12] transition-colors active:scale-95"
          >
            <Mail className="h-3 w-3" />
            <span>Get in Touch</span>
          </Link>

          <Link
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center px-3.5 py-2 rounded-xl text-xs font-medium bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 transition-colors"
          >
            CV
          </Link>
        </div>
      </div>
    </div>
  );
}
