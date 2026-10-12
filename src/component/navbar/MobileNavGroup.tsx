import { useId } from "react";
import MobileNavLink from "./MobileNavLink";
import { isPathActive } from "./nav-matching";
import type { NavGroupItem } from "./nav-types";

interface MobileNavGroupProps {
  group: NavGroupItem;
  pathname: string | null;
  onSelect: () => void;
}

export default function MobileNavGroup({ group, pathname, onSelect }: MobileNavGroupProps) {
  const GroupIcon = group.icon;
  const headingId = useId();

  return (
    <div
      role="group"
      aria-labelledby={headingId}
      className="flex flex-col gap-1 rounded-xl border border-white/[0.04] bg-white/[0.02] p-1"
    >
      <div
        id={headingId}
        className="flex items-center gap-1.5 px-2.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500"
      >
        <GroupIcon aria-hidden="true" className="h-3 w-3" />
        <span>{group.name}</span>
      </div>
      {group.links.map((link) => (
        <MobileNavLink
          key={link.path}
          link={link}
          isActive={isPathActive(pathname, link.path)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
