"use client";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import { useDismissibleLayer, DISMISS_REASON, type DismissReason } from "@/hooks/useDismissibleLayer";
import { useArrowKeyFocus } from "@/hooks/useArrowKeyFocus";
import ActiveIndicator from "./ActiveIndicator";
import DropdownMenuItem from "./DropdownMenuItem";
import { isGroupActive, isPathActive } from "./nav-matching";
import {
  getDesktopNavItemClassName,
  getDesktopNavIconClassName,
} from "./nav-styles";
import type { NavGroupItem } from "./nav-types";

const OPEN_KEYS = new Set(["ArrowDown", "Enter", " "]);

interface NavDropdownProps {
  group: NavGroupItem;
  pathname: string | null;
  onNavigate?: () => void;
}

export default function NavDropdown({ group, pathname, onNavigate }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pendingFirstItemFocusRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const isActive = isGroupActive(pathname, group.links);
  const Icon = group.icon;
  const { focusFirstItem, handleKeyDown: handlePanelArrowKeys } =
    useArrowKeyFocus(panelRef);

  const closeDropdown = useCallback((reason: DismissReason) => {
    setIsOpen(false);
    if (reason === DISMISS_REASON.ESCAPE) triggerRef.current?.focus();
  }, []);

  useDismissibleLayer({
    containerRef,
    isActive: isOpen,
    onDismiss: closeDropdown,
  });

  useEffect(() => {
    if (!isOpen || !pendingFirstItemFocusRef.current) return;
    pendingFirstItemFocusRef.current = false;
    focusFirstItem();
  }, [isOpen, focusFirstItem]);

  const handleTriggerClick = () => setIsOpen((previous) => !previous);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!OPEN_KEYS.has(event.key)) return;
    event.preventDefault();
    if (isOpen) {
      focusFirstItem();
      return;
    }
    pendingFirstItemFocusRef.current = true;
    setIsOpen(true);
  };

  const handlePanelBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (containerRef.current?.contains(event.relatedTarget as Node | null)) return;
    setIsOpen(false);
  };

  const handleItemSelect = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={containerRef} className="relative" onBlur={handlePanelBlur}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        className={`${getDesktopNavItemClassName(isActive, isOpen)} cursor-pointer`}
      >
        <Icon
          aria-hidden="true"
          className={getDesktopNavIconClassName(isActive || isOpen)}
        />
        <span>{group.name}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-3 w-3 transition-transform duration-200 motion-reduce:transition-none ${
            isOpen ? "rotate-180 text-slate-200" : "text-slate-400/60"
          }`}
        />
        <ActiveIndicator isVisible={isActive && !isOpen} />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        onKeyDown={handlePanelArrowKeys}
        className={`absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 origin-top rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0a111a]/98 via-[#050b12]/95 to-[#02060b]/98 p-1.5 shadow-2xl shadow-black/80 backdrop-blur-2xl transition-all duration-200 motion-reduce:transition-none ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <p className="px-2.5 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {group.description}
        </p>
        <ul className="flex flex-col gap-0.5">
          {group.links.map((link) => (
            <li key={link.path}>
              <DropdownMenuItem
                link={link}
                isActive={isPathActive(pathname, link.path)}
                onSelect={handleItemSelect}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
