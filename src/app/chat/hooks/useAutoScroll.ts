"use client";
import { useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement>(trigger: string, isSending: boolean = false) {
  const anchorRef = useRef<T | null>(null);
  const userScrolledUpRef = useRef(false);
  const wasSendingRef = useRef(isSending);

  useEffect(() => {
    if (isSending && !wasSendingRef.current) {
      userScrolledUpRef.current = false;
    }
    wasSendingRef.current = isSending;
  }, [isSending]);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const scrollContainer = anchor.closest<HTMLElement>(".overflow-y-auto");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const distance = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight;
      userScrolledUpRef.current = distance > 80;
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (userScrolledUpRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    anchorRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "end" });
  }, [trigger]);

  return anchorRef;
}
