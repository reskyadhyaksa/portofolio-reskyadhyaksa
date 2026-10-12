"use client";
import { useCallback, useEffect, useState } from "react";
import type { ConversationSummary } from "@/lib/chat-types";
import { deleteConversation, fetchConversations } from "../services/chat-api";

export function useConversationList(activeSessionId: string | null, sessionIds: string[], refreshKey: number) {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionIdsKey = sessionIds.join(",");

  useEffect(() => {
    if (!activeSessionId) return;
    let isCancelled = false;

    fetchConversations(activeSessionId, sessionIdsKey ? sessionIdsKey.split(",") : [])
      .then((loaded) => {
        if (!isCancelled) setConversations(loaded);
      })
      .catch((loadError: Error) => {
        if (!isCancelled) setError(loadError.message);
      });

    return () => {
      isCancelled = true;
    };
  }, [activeSessionId, sessionIdsKey, refreshKey]);

  const removeConversation = useCallback(async (sessionId: string): Promise<boolean> => {
    setDeletingId(sessionId);
    setError(null);
    try {
      await deleteConversation(sessionId);
      setConversations((current) => current.filter((conversation) => conversation.id !== sessionId));
      return true;
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete chat");
      return false;
    } finally {
      setDeletingId(null);
    }
  }, []);

  return { conversations, deletingId, error, removeConversation };
}
