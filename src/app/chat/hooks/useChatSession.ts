"use client";
import { useCallback, useSyncExternalStore } from "react";
import { MAX_TRACKED_SESSIONS, SESSION_LIST_STORAGE_KEY, SESSION_STORAGE_KEY } from "@/lib/chat-config";

interface SessionStoreState {
  activeSessionId: string;
  sessionIds: string[];
}

const sessionListeners = new Set<() => void>();
let cachedState: SessionStoreState | null = null;

function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch (storageError) {
    console.warn("Unable to persist chat session", storageError);
  }
}

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch (storageError) {
    console.warn("Unable to read chat session", storageError);
    return null;
  }
}

function parseSessionIds(serialized: string | null): string[] {
  if (!serialized) return [];
  try {
    const parsed: unknown = JSON.parse(serialized);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function withSession(sessionIds: string[], sessionId: string): string[] {
  return [sessionId, ...sessionIds.filter((id) => id !== sessionId)].slice(0, MAX_TRACKED_SESSIONS);
}

function loadInitialState(): SessionStoreState {
  const activeSessionId = readStorage(SESSION_STORAGE_KEY) ?? crypto.randomUUID();
  const sessionIds = withSession(parseSessionIds(readStorage(SESSION_LIST_STORAGE_KEY)), activeSessionId);
  return { activeSessionId, sessionIds };
}

function persistState(nextState: SessionStoreState): void {
  cachedState = nextState;
  writeStorage(SESSION_STORAGE_KEY, nextState.activeSessionId);
  writeStorage(SESSION_LIST_STORAGE_KEY, JSON.stringify(nextState.sessionIds));
}

function commitState(nextState: SessionStoreState): void {
  persistState(nextState);
  sessionListeners.forEach((listener) => listener());
}

function getSnapshot(): SessionStoreState {
  if (!cachedState) persistState(loadInitialState());
  return cachedState as SessionStoreState;
}

function getServerSnapshot(): null {
  return null;
}

function subscribe(listener: () => void): () => void {
  sessionListeners.add(listener);
  return () => sessionListeners.delete(listener);
}

export function useChatSession() {
  const state = useSyncExternalStore<SessionStoreState | null>(subscribe, getSnapshot, getServerSnapshot);

  const startNewSession = useCallback(() => {
    const current = getSnapshot();
    const nextSessionId = crypto.randomUUID();
    commitState({ activeSessionId: nextSessionId, sessionIds: withSession(current.sessionIds, nextSessionId) });
  }, []);

  const selectSession = useCallback((sessionId: string) => {
    const current = getSnapshot();
    if (current.activeSessionId === sessionId) return;
    commitState({ activeSessionId: sessionId, sessionIds: withSession(current.sessionIds, sessionId) });
  }, []);

  const forgetSession = useCallback((sessionId: string) => {
    const current = getSnapshot();
    const remainingIds = current.sessionIds.filter((id) => id !== sessionId);
    if (current.activeSessionId !== sessionId) {
      commitState({ ...current, sessionIds: remainingIds });
      return;
    }
    const replacementId = crypto.randomUUID();
    commitState({ activeSessionId: replacementId, sessionIds: withSession(remainingIds, replacementId) });
  }, []);

  return {
    sessionId: state?.activeSessionId ?? null,
    sessionIds: state?.sessionIds ?? [],
    startNewSession,
    selectSession,
    forgetSession,
  };
}

