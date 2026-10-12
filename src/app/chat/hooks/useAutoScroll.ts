"use client";
import { useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement>(trigger: string) {
  const anchorRef = useRef<T | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    anchorRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "end" });
  }, [trigger]);

  return anchorRef;
}
