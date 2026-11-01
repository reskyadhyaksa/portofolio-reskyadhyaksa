"use client";
import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useDismissibleLayer } from "@/hooks/useDismissibleLayer";

interface ModalDialogProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  size?: "md" | "lg";
  onClose: () => void;
  children: ReactNode;
}

const PANEL_WIDTH_CLASS = { md: "max-w-lg", lg: "max-w-5xl" } as const;

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ModalDialog({ isOpen, title, subtitle, size = "md", onClose, children }: ModalDialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useDismissibleLayer({ containerRef: panelRef, isActive: isOpen, onDismiss: onClose });

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 sm:items-center sm:p-4 backdrop-blur-sm">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`flex max-h-[90dvh] w-full ${PANEL_WIDTH_CLASS[size]} flex-col overflow-hidden rounded-t-2xl border border-white/[0.08] bg-[#1e1f20] shadow-2xl shadow-black/80 animate-fade-in-soft focus:outline-none sm:max-h-[88dvh] sm:rounded-2xl`}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.06] px-3.5 py-2.5 sm:px-5 sm:py-3">
          <div className="min-w-0">
            <h2 id={titleId} className="text-sm font-semibold text-[#e8eaed] sm:text-[15px]">
              {title}
            </h2>
            {subtitle && <p className="hidden mt-0.5 text-[12px] text-[#9aa0a6] sm:block">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#c4c7c5] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </header>
        {children}
      </div>
    </div>,
    document.body
  );
}
