import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";
import StatusPill from "@/component/common/StatusPill";
import MobileNavLink from "./MobileNavLink";
import MobileNavGroup from "./MobileNavGroup";
import { NAVIGATION_ITEMS, NAV_ITEM_TYPE } from "./nav-config";
import { isPathActive } from "./nav-matching";

interface MobileDrawerProps {
  isOpen: boolean;
  pathname: string | null;
  city: string | null;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, pathname, city, onClose }: MobileDrawerProps) {
  return (
    <div
      className={`absolute top-full left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0a111a]/98 via-[#050b12]/95 to-[#02060b]/98 backdrop-blur-2xl transition-all duration-200 shadow-2xl shadow-black/80 md:hidden ${
        isOpen
          ? "max-h-[520px] opacity-100 translate-y-0 visible"
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

        <nav aria-label="Mobile primary" className="flex flex-col gap-1">
          {NAVIGATION_ITEMS.map((item) => {
            if (item.type === NAV_ITEM_TYPE.GROUP) {
              return (
                <MobileNavGroup
                  key={item.name}
                  group={item}
                  pathname={pathname}
                  onSelect={onClose}
                />
              );
            }

            return (
              <MobileNavLink
                key={item.name}
                link={item}
                isActive={isPathActive(pathname, item.path)}
                onSelect={onClose}
              />
            );
          })}
        </nav>

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
