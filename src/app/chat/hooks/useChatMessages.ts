"use client";
import { useCallback, useEffect, useState } from "react";
import type { ChatMessage, ChatPostPayload } from "@/lib/chat-types";
import { fetchChatHistory, revertToMessage, sendChatMessage } from "../services/chat-api";

const OPTIMISTIC_PREFIX = "optimistic-";

interface ExchangeResult {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}

type ExchangeExecutor = (sessionId: string) => Promise<ExchangeResult>;

function createOptimisticMessage(sessionId: string, payload: ChatPostPayload): ChatMessage {
  return {
    id: `${OPTIMISTIC_PREFIX}${crypto.randomUUID()}`,
    sessionId,
    role: "user",
    content: payload.content,
    model: payload.model,
    attachments: payload.attachments,
    createdAt: new Date().toISOString(),
  };
}

export function useChatMessages(sessionId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    let isCancelled = false;
    setMessages([]);
    setError(null);
    setIsLoadingHistory(true);

    fetchChatHistory(sessionId)
      .then((history) => {
        if (!isCancelled) setMessages(history);
      })
      .catch((loadError: Error) => {
        if (!isCancelled) setError(loadError.message);
      })
      .finally(() => {
        if (!isCancelled) setIsLoadingHistory(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [sessionId]);

  const submitExchange = useCallback(
    async (payload: ChatPostPayload, executeExchange: ExchangeExecutor): Promise<boolean> => {
      if (!sessionId || isSending) return false;

      const optimisticMessage = createOptimisticMessage(sessionId, payload);
      setMessages((current) => [...current, optimisticMessage]);
      setIsSending(true);
      setError(null);

      try {
        const { userMessage, assistantMessage } = await executeExchange(sessionId);
        setMessages((current) => [
          ...current.filter((message) => message.id !== optimisticMessage.id),
          userMessage,
          assistantMessage,
        ]);
        return true;
      } catch (sendError) {
        setMessages((current) => current.filter((message) => message.id !== optimisticMessage.id));
        setError(sendError instanceof Error ? sendError.message : "Failed to send message");
        return false;
      } finally {
        setIsSending(false);
      }
    },
    [sessionId, isSending]
  );

  const sendMessage = useCallback(
    (payload: ChatPostPayload) => submitExchange(payload, (activeSessionId) => sendChatMessage(activeSessionId, payload)),
    [submitExchange]
  );

  const dismissError = useCallback(() => setError(null), []);

  const revertFrom = useCallback(
    async (messageId: string, shouldKeepAnchorFiles: boolean): Promise<boolean> => {
      if (!sessionId || isSending || isReverting) return false;
      setIsReverting(true);
      setError(null);

      try {
        await revertToMessage(sessionId, messageId, shouldKeepAnchorFiles);
        setMessages((current) => {
          const anchorIndex = current.findIndex((message) => message.id === messageId);
          return anchorIndex < 0 ? current : current.slice(0, anchorIndex);
        });
        return true;
      } catch (revertError) {
        setError(revertError instanceof Error ? revertError.message : "Failed to revert chat");
        return false;
      } finally {
        setIsReverting(false);
      }
    },
    [sessionId, isSending, isReverting]
  );

  return { messages, isLoadingHistory, isSending, isReverting, error, sendMessage, submitExchange, revertFrom, dismissError };
}
