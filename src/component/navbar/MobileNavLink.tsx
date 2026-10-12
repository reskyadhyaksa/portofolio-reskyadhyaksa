import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NavLinkConfig } from "./nav-types";

interface MobileNavLinkProps {
  link: NavLinkConfig;
  isActive: boolean;
  onSelect: () => void;
}

export default function MobileNavLink({ link, isActive, onSelect }: MobileNavLinkProps) {
  const Icon = link.icon;

  return (
    <Link
      href={link.path}
      onClick={onSelect}
      aria-current={isActive ? "page" : undefined}
      className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 motion-reduce:transition-none ${
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
          <Icon aria-hidden="true" className="h-3.5 w-3.5" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-medium">{link.name}</span>
          <span className="text-[9px] text-slate-400/70">{link.description}</span>
        </div>
      </div>
      <ArrowUpRight
        aria-hidden="true"
        className={`h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
          isActive ? "text-slate-200" : "text-slate-500"
        }`}
      />
    </Link>
  );
}
