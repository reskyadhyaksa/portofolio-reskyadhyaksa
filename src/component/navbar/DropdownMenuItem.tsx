import Link from "next/link";
import type { NavLinkConfig } from "./nav-types";

interface DropdownMenuItemProps {
  link: NavLinkConfig;
  isActive: boolean;
  onSelect: () => void;
}

export default function DropdownMenuItem({ link, isActive, onSelect }: DropdownMenuItemProps) {
  const Icon = link.icon;

  return (
    <Link
      href={link.path}
      onClick={onSelect}
      aria-current={isActive ? "page" : undefined}
      className={`group flex items-center gap-2.5 rounded-xl px-2.5 py-2 outline-none transition-colors duration-150 motion-reduce:transition-none focus-visible:bg-white/[0.06] focus-visible:ring-1 focus-visible:ring-white/20 ${
        isActive
          ? "bg-white/[0.08] text-white"
          : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] ${
          isActive
            ? "bg-white/15 text-white"
            : "bg-white/[0.03] text-slate-400 group-hover:text-white group-focus-visible:text-white"
        }`}
      >
        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      </span>
      <span className="flex flex-col text-left">
        <span className="text-xs font-medium">{link.name}</span>
        <span className="text-[10px] text-slate-400">{link.description}</span>
      </span>
    </Link>
  );
}
