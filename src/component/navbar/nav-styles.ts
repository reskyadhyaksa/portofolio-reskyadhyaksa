const DESKTOP_ITEM_BASE_CLASS =
  "relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full outline-none transition-all duration-200 motion-reduce:transition-none focus-visible:ring-1 focus-visible:ring-white/30";

const DESKTOP_ITEM_ACTIVE_CLASS =
  "text-white bg-white/[0.08] border border-white/[0.08] shadow-sm";

const DESKTOP_ITEM_IDLE_CLASS =
  "text-slate-300/70 hover:text-white hover:bg-white/[0.04]";

export function getDesktopNavItemClassName(isActive: boolean, isExpanded = false): string {
  const stateClass =
    isActive || isExpanded ? DESKTOP_ITEM_ACTIVE_CLASS : DESKTOP_ITEM_IDLE_CLASS;
  return `${DESKTOP_ITEM_BASE_CLASS} ${stateClass}`;
}

export function getDesktopNavIconClassName(isActive: boolean): string {
  const toneClass = isActive ? "text-slate-200" : "text-slate-400/60";
  return `h-3 w-3 transition-colors ${toneClass}`;
}
