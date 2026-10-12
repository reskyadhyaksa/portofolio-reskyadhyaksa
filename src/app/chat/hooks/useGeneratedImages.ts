"use client";
import { useCallback, useEffect, useState } from "react";
import type { GeneratedImage } from "@/lib/chat-types";
import { deleteGeneratedImage, fetchGeneratedImages } from "../services/chat-api";

export function useGeneratedImages(activeSessionId: string | null, sessionIds: string[]) {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const sessionIdsKey = sessionIds.join(",");

  useEffect(() => {
    if (!activeSessionId) return;
    let isCancelled = false;

    fetchGeneratedImages(activeSessionId, sessionIdsKey ? sessionIdsKey.split(",") : [])
      .then((loaded) => {
        if (isCancelled) return;
        setImages(loaded);
        setError(null);
      })
      .catch((loadError: Error) => {
        if (!isCancelled) setError(loadError.message);
      });

    return () => {
      isCancelled = true;
    };
  }, [activeSessionId, sessionIdsKey]);

  const addImage = useCallback((image: GeneratedImage) => {
    setImages((current) => [image, ...current.filter((existing) => existing.id !== image.id)]);
  }, []);

  const removeImage = useCallback(
    async (imageId: string) => {
      if (!activeSessionId) return;
      setError(null);
      try {
        await deleteGeneratedImage(activeSessionId, imageId, sessionIdsKey.split(","));
        setImages((current) => current.filter((image) => image.id !== imageId));
      } catch (deleteError) {
        setError(deleteError instanceof Error ? deleteError.message : "Failed to delete image");
      }
    },
    [activeSessionId, sessionIdsKey]
  );

  const dismissError = useCallback(() => setError(null), []);

  return { images, error, addImage, removeImage, dismissError };
}
