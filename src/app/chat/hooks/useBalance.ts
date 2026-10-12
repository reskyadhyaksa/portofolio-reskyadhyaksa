"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { BALANCE_CACHE_TTL_MS } from "@/lib/chat-config";
import { fetchBalance } from "../services/chat-api";

interface CachedBalance {
  remainingUsd: number | null;
  fetchedAt: number;
}

let cachedBalance: CachedBalance | null = null;

function isCacheFresh(): boolean {
  return cachedBalance !== null && Date.now() - cachedBalance.fetchedAt < BALANCE_CACHE_TTL_MS;
}

export function useBalance(sessionId: string | null, refreshKey: number) {
  const [remainingUsd, setRemainingUsd] = useState<number | null>(cachedBalance?.remainingUsd ?? null);
  const [hasError, setHasError] = useState(false);
  const isRequestingRef = useRef(false);

  const load = useCallback(async () => {
    if (!sessionId || isRequestingRef.current || isCacheFresh()) return;
    isRequestingRef.current = true;
    try {
      const balance = await fetchBalance(sessionId);
      cachedBalance = { remainingUsd: balance, fetchedAt: Date.now() };
      setRemainingUsd(balance);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      isRequestingRef.current = false;
    }
  }, [sessionId]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  return { remainingUsd, hasError };
}
