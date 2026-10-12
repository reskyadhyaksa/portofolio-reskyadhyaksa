"use client";
import { useCallback, useState } from "react";
import {
  CHAT_MODELS,
  DEFAULT_IMAGE_MODEL_ID,
  DEFAULT_MODEL_ID,
  IMAGE_MODELS,
  type ChatModelId,
  type ImageModelId,
  type ModelOption,
} from "@/lib/chat-config";

export type ComposerMode = "text" | "image";

export function useComposerMode() {
  const [mode, setMode] = useState<ComposerMode>("text");
  const [textModel, setTextModel] = useState<ChatModelId>(DEFAULT_MODEL_ID);
  const [imageModel, setImageModel] = useState<ImageModelId>(DEFAULT_IMAGE_MODEL_ID);

  const isImageMode = mode === "image";
  const activeModels: readonly ModelOption[] = isImageMode ? IMAGE_MODELS : CHAT_MODELS;
  const activeModel = isImageMode ? imageModel : textModel;

  const toggleImageMode = useCallback(() => {
    setMode((current) => (current === "image" ? "text" : "image"));
  }, []);

  const selectModel = useCallback(
    (modelId: string) => {
      if (isImageMode) {
        const matched = IMAGE_MODELS.find((model) => model.id === modelId);
        if (matched) setImageModel(matched.id);
        return;
      }
      const matched = CHAT_MODELS.find((model) => model.id === modelId);
      if (matched) setTextModel(matched.id);
    },
    [isImageMode]
  );

  return { mode, isImageMode, activeModels, activeModel, toggleImageMode, selectModel };
}