"use client";
import { useCallback, useEffect, useState } from "react";
import type { StudioViewMode } from "../components/ChatToolbar";
import { buildChatUrl, extractChatRouteState } from "../services/chat-routing";

interface ChatRouteSyncProps {
  initialTab?: StudioViewMode;
  initialModel?: string | null;
  sessionId: string | null;
  onSelectSession: (id: string) => void;
}

export function useChatRouteSync({
  initialTab,
  initialModel,
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

  const [selectedModel, setSelectedModel] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const fromUrl = extractChatRouteState(window.location.pathname, window.location.search).model;
      if (fromUrl) return fromUrl;
    }
    return initialModel ?? null;
  });

  const navigateTo = useCallback(
    (
      nextSessionId: string | null,
      nextTab: StudioViewMode,
      nextModel?: string | null,
      replace = false
    ) => {
      if (typeof window === "undefined") return;
      const modelToUse = nextModel !== undefined ? nextModel : selectedModel;
      const targetUrl = buildChatUrl(nextSessionId, nextTab, modelToUse);
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      if (targetUrl === currentUrl) return;

      if (replace) {
        window.history.replaceState(null, "", targetUrl);
      } else {
        window.history.pushState(null, "", targetUrl);
      }
    },
    [selectedModel]
  );

  const selectStudioMode = useCallback(
    (mode: StudioViewMode, nextSessionId?: string | null) => {
      setStudioMode(mode);
      setSelectedModel(null);
      const targetSessionId = nextSessionId !== undefined ? nextSessionId : sessionId;
      navigateTo(targetSessionId, mode, null, false);
    },
    [navigateTo, sessionId]
  );

  const selectModel = useCallback(
    (modelId: string) => {
      setSelectedModel(modelId);
      navigateTo(sessionId, studioMode, modelId, false);
    },
    [navigateTo, sessionId, studioMode]
  );

  useEffect(() => {
    if (!sessionId) return;
    const current = extractChatRouteState(window.location.pathname, window.location.search);
    if (current.sessionId !== sessionId) {
      navigateTo(sessionId, studioMode, selectedModel, true);
    }
  }, [sessionId, studioMode, selectedModel, navigateTo]);

  useEffect(() => {
    const handlePopState = () => {
      const { sessionId: routeSessionId, tab: routeTab, model: routeModel } = extractChatRouteState(
        window.location.pathname,
        window.location.search
      );
      setStudioMode(routeTab);
      setSelectedModel(routeModel);
      if (routeSessionId && routeSessionId !== sessionId) {
        onSelectSession(routeSessionId);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [sessionId, onSelectSession]);

  return {
    studioMode,
    selectedModel,
    selectStudioMode,
    selectModel,
    navigateTo,
  };
}
