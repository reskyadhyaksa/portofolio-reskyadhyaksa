"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage, ChatPostPayload } from "@/lib/chat-types";
import { fetchChatHistory, revertToMessage, streamChatMessage } from "../services/chat-api";

const OPTIMISTIC_PREFIX = "optimistic-";

interface ExchangeResult {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}

type ExchangeExecutor = (sessionId: string, signal: AbortSignal) => Promise<ExchangeResult>;

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
  const [streamingReply, setStreamingReply] = useState<string | null>(null);
  const exchangeControllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => exchangeControllerRef.current?.abort(), []);

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
      const controller = new AbortController();
      exchangeControllerRef.current = controller;
      setMessages((current) => [...current, optimisticMessage]);
      setIsSending(true);
      setError(null);

      try {
        const { userMessage, assistantMessage } = await executeExchange(sessionId, controller.signal);
        setMessages((current) => [
          ...current.filter((message) => message.id !== optimisticMessage.id),
          userMessage,
          assistantMessage,
        ]);
        return true;
      } catch (sendError) {
        setMessages((current) => current.filter((message) => message.id !== optimisticMessage.id));
        if (!controller.signal.aborted) {
          setError(sendError instanceof Error ? sendError.message : "Failed to send message");
        }
        return false;
      } finally {
        if (exchangeControllerRef.current === controller) exchangeControllerRef.current = null;
        setIsSending(false);
      }
    },
    [sessionId, isSending]
  );

  const stopExchange = useCallback(() => exchangeControllerRef.current?.abort(), []);

  const sendMessage = useCallback(
    (payload: ChatPostPayload) =>
      submitExchange(payload, async (activeSessionId, signal) => {
        setStreamingReply("");
        try {
          const onDelta = (text: string) => setStreamingReply((current) => (current ?? "") + text);
          return await streamChatMessage(activeSessionId, payload, { onDelta }, signal);
        } finally {
          setStreamingReply(null);
        }
      }),
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

  return {
    messages,
    streamingReply,
    isLoadingHistory,
    isSending,
    isReverting,
    error,
    sendMessage,
    submitExchange,
    stopExchange,
    revertFrom,
    dismissError,
  };
}
