"use client";
import { useEffect, type RefObject } from "react";

export const DISMISS_REASON = {
  ESCAPE: "escape",
  OUTSIDE: "outside",
} as const;

export type DismissReason = (typeof DISMISS_REASON)[keyof typeof DISMISS_REASON];

interface DismissibleLayerOptions {
  containerRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  onDismiss: (reason: DismissReason) => void;
}

export function useDismissibleLayer({ containerRef, isActive, onDismiss }: DismissibleLayerOptions) {
  useEffect(() => {
    if (!isActive) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      onDismiss(DISMISS_REASON.OUTSIDE);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onDismiss(DISMISS_REASON.ESCAPE);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [containerRef, isActive, onDismiss]);
}
