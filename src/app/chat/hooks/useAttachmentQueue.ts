"use client";
import { useCallback, useState } from "react";
import { MAX_ATTACHMENTS_PER_MESSAGE } from "@/lib/chat-config";
import type { Attachment } from "@/lib/chat-types";
import { uploadAttachment } from "../services/chat-api";
import { preprocessFile } from "../services/file-preprocessing";

export interface PendingAttachment {
  localId: string;
  name: string;
  status: "uploading" | "ready" | "error";
  previewUrl: string | null;
  attachment: Attachment | null;
  error: string | null;
}

function createPendingAttachment(file: File): PendingAttachment {
  return {
    localId: crypto.randomUUID(),
    name: file.name,
    status: "uploading",
    previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    attachment: null,
    error: null,
  };
}

function releasePreview(item: PendingAttachment): void {
  if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
}

export function useAttachmentQueue(sessionId: string | null) {
  const [items, setItems] = useState<PendingAttachment[]>([]);

  const updateItem = useCallback((localId: string, patch: Partial<PendingAttachment>) => {
    setItems((current) => current.map((item) => (item.localId === localId ? { ...item, ...patch } : item)));
  }, []);

  const addFiles = useCallback(
    (files: File[]) => {
      if (!sessionId || files.length === 0) return;
      const availableSlots = MAX_ATTACHMENTS_PER_MESSAGE - items.length;
      const pending = files.slice(0, Math.max(availableSlots, 0)).map(createPendingAttachment);
      if (pending.length === 0) return;

      setItems((current) => [...current, ...pending]);
      pending.forEach((item, index) => {
        preprocessFile(files[index])
          .then((processedFile) => uploadAttachment(sessionId, processedFile))
          .then((attachment) => updateItem(item.localId, { status: "ready", attachment }))
          .catch((error: Error) => updateItem(item.localId, { status: "error", error: error.message }));
      });
    },
    [sessionId, items.length, updateItem]
  );

  const removeItem = useCallback((localId: string) => {
    setItems((current) => {
      const target = current.find((item) => item.localId === localId);
      if (target) releasePreview(target);
      return current.filter((item) => item.localId !== localId);
    });
  }, []);

  const clearItems = useCallback(() => {
    setItems((current) => {
      current.forEach(releasePreview);
      return [];
    });
  }, []);

  const readyAttachments = items
    .map((item) => item.attachment)
    .filter((attachment): attachment is Attachment => attachment !== null);

  return {
    items,
    readyAttachments,
    isUploading: items.some((item) => item.status === "uploading"),
    hasFailedUploads: items.some((item) => item.status === "error"),
    canAddMore: items.length < MAX_ATTACHMENTS_PER_MESSAGE,
    addFiles,
    removeItem,
    clearItems,
  };
}
