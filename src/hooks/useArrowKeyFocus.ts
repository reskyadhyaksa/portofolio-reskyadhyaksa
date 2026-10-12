"use client";
import { useCallback, type KeyboardEvent, type RefObject } from "react";

const FOCUSABLE_ITEM_SELECTOR = "a[href], button:not([disabled])";

function getFocusableItems(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_ITEM_SELECTOR));
}

function resolveNextIndex(key: string, currentIndex: number, lastIndex: number): number | null {
  if (key === "Home") return 0;
  if (key === "End") return lastIndex;
  if (key === "ArrowDown") return currentIndex >= lastIndex ? 0 : currentIndex + 1;
  if (key === "ArrowUp") return currentIndex <= 0 ? lastIndex : currentIndex - 1;
  return null;
}

export function useArrowKeyFocus(containerRef: RefObject<HTMLElement | null>) {
  const focusFirstItem = useCallback(() => {
    const [firstItem] = getFocusableItems(containerRef.current);
    firstItem?.focus();
  }, [containerRef]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const items = getFocusableItems(containerRef.current);
      if (items.length === 0) return;

      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      const nextIndex = resolveNextIndex(event.key, currentIndex, items.length - 1);
      if (nextIndex === null) return;

      event.preventDefault();
      items[nextIndex]?.focus();
    },
    [containerRef]
  );

  return { focusFirstItem, handleKeyDown };
}
