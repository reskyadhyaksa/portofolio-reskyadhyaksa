"use client";
import { useCallback } from "react";
import type { GeneratedImage } from "@/lib/chat-types";
import { requestImageGeneration } from "../services/chat-api";
import type { useAttachmentQueue } from "./useAttachmentQueue";
import type { useChatMessages } from "./useChatMessages";
import type { useComposerMode } from "./useComposerMode";

interface ComposerSubmitOptions {
  sessionId: string | null;
  draft: string;
  onDraftChange: (value: string) => void;
  chat: ReturnType<typeof useChatMessages>;
  queue: ReturnType<typeof useAttachmentQueue>;
  composer: ReturnType<typeof useComposerMode>;
  onImageGenerated: (image: GeneratedImage) => void;
}

export function useComposerSubmit({ sessionId, draft, onDraftChange, chat, queue, composer, onImageGenerated }: ComposerSubmitOptions) {
  const trimmedDraft = draft.trim();
  const isComposerIdle = Boolean(sessionId) && !chat.isSending;
  const canSubmitText =
    isComposerIdle && (trimmedDraft.length > 0 || queue.readyAttachments.length > 0) && !queue.isUploading && !queue.hasFailedUploads;
  const canSubmitImage = isComposerIdle && trimmedDraft.length > 0;
  const canSubmit = composer.isImageMode ? canSubmitImage : canSubmitText;

  const submitImagePrompt = useCallback(async () => {
    const model = composer.activeModel;
    onDraftChange("");
    const isSent = await chat.submitExchange({ model, content: trimmedDraft, attachments: [] }, async (activeSessionId) => {
      const result = await requestImageGeneration(activeSessionId, trimmedDraft, model);
      onImageGenerated(result.image);
      return result;
    });
    if (!isSent) onDraftChange(draft);
  }, [chat, composer.activeModel, draft, onDraftChange, onImageGenerated, trimmedDraft]);

  const submitTextMessage = useCallback(async () => {
    const submittedAttachments = queue.readyAttachments;
    onDraftChange("");
    queue.clearItems();
    const isSent = await chat.sendMessage({ model: composer.activeModel, content: draft, attachments: submittedAttachments });
    if (!isSent) onDraftChange(draft);
  }, [chat, composer.activeModel, draft, onDraftChange, queue]);

  const submit = useCallback(async () => {
    if (!canSubmit) return;
    if (composer.isImageMode) {
      await submitImagePrompt();
      return;
    }
    await submitTextMessage();
  }, [canSubmit, composer.isImageMode, submitImagePrompt, submitTextMessage]);

  return { canSubmit, submit };
}