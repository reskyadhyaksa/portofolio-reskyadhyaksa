"use client";
import { useCallback, useEffect, useState } from "react";
import type { StudioViewMode } from "../components/ChatToolbar";
import { buildChatUrl, extractChatRouteState } from "../services/chat-routing";

interface ChatRouteSyncProps {
  initialTab?: StudioViewMode;
  sessionId: string | null;
  onSelectSession: (id: string) => void;
}

export function useChatRouteSync({
  initialTab,
  sessionId,
  onSelectSession,
}: ChatRouteSyncProps) {
  const [studioMode, setStudioMode] = useState<StudioViewMode>(() => {
    if (typeof window !== "undefined") {
      const fromUrl = extractChatRouteState(window.location.pathname, window.location.search).tab;
      if (fromUrl) return fromUrl;
    }
    return initialTab ?? "chat";
  });

  const navigateTo = useCallback(
    (nextSessionId: string | null, nextTab: StudioViewMode, replace = false) => {
      if (typeof window === "undefined") return;
      const targetUrl = buildChatUrl(nextSessionId, nextTab);
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      if (targetUrl === currentUrl) return;

      if (replace) {
        window.history.replaceState(null, "", targetUrl);
      } else {
        window.history.pushState(null, "", targetUrl);
      }
    },
    []
  );

  const selectStudioMode = useCallback(
    (mode: StudioViewMode, nextSessionId?: string | null) => {
      setStudioMode(mode);
      const targetSessionId = nextSessionId !== undefined ? nextSessionId : sessionId;
      navigateTo(targetSessionId, mode, false);
    },
    [navigateTo, sessionId]
  );

  useEffect(() => {
    if (!sessionId) return;
    const current = extractChatRouteState(window.location.pathname, window.location.search);
    if (current.sessionId !== sessionId) {
      navigateTo(sessionId, studioMode, true);
    }
  }, [sessionId, studioMode, navigateTo]);

  useEffect(() => {
    const handlePopState = () => {
      const { sessionId: routeSessionId, tab: routeTab } = extractChatRouteState(
        window.location.pathname,
        window.location.search
      );
      setStudioMode(routeTab);
      if (routeSessionId && routeSessionId !== sessionId) {
        onSelectSession(routeSessionId);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [sessionId, onSelectSession]);

  return {
    studioMode,
    selectStudioMode,
    navigateTo,
  };
}
