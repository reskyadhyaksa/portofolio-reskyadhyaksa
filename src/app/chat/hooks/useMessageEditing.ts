"use client";
import { useCallback, useState } from "react";
import { DEFAULT_MODEL_ID, isSupportedModel } from "@/lib/chat-config";
import type { ChatMessage } from "@/lib/chat-types";
import type { UserMessageControls } from "../components/MessageBubble";
import type { useChatMessages } from "./useChatMessages";

interface MessageEditingOptions {
  chat: ReturnType<typeof useChatMessages>;
  activeModel: string;
  onRestoreDraft: (content: string) => void;
}

export function useMessageEditing({ chat, activeModel, onRestoreDraft }: MessageEditingOptions): UserMessageControls {
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const isDisabled = chat.isSending || chat.isReverting;

  const onStartEdit = useCallback((messageId: string) => setEditingMessageId(messageId), []);
  const onCancelEdit = useCallback(() => setEditingMessageId(null), []);

  const onSubmitEdit = useCallback(
    async (message: ChatMessage, content: string) => {
      if (isDisabled) return;
      const hasAttachments = message.attachments.length > 0;
      const isReverted = await chat.revertFrom(message.id, hasAttachments);
      if (!isReverted) return;

      setEditingMessageId(null);
      const model = isSupportedModel(message.model) ? message.model : isSupportedModel(activeModel) ? activeModel : DEFAULT_MODEL_ID;
      const isSent = await chat.sendMessage({ model, content, attachments: message.attachments });
      if (!isSent) onRestoreDraft(content);
    },
    [activeModel, chat, isDisabled, onRestoreDraft]
  );

  const onRevert = useCallback(
    async (message: ChatMessage) => {
      if (isDisabled) return;
      const isReverted = await chat.revertFrom(message.id, false);
      if (isReverted) setEditingMessageId(null);
    },
    [chat, isDisabled]
  );

  return {
    editingMessageId,
    isDisabled,
    onStartEdit,
    onCancelEdit,
    onSubmitEdit,
    onRevert,
  };
}
