"use client";
import { useCallback, useEffect, useState } from "react";
import {
  CHAT_MODELS,
  DEFAULT_IMAGE_MODEL_ID,
  DEFAULT_MODEL_ID,
  IMAGE_MODELS,
  isSupportedImageModel,
  isSupportedModel,
  type ChatModelId,
  type ImageModelId,
  type ModelOption,
} from "@/lib/chat-config";
import { DEFAULT_IMAGE_OPTIONS, type ImageOptions } from "@/lib/image-options";

export type ComposerMode = "text" | "image";

export function useComposerMode(
  initialModel?: string | null,
  onModelChange?: (modelId: string) => void
) {
  const [mode, setMode] = useState<ComposerMode>("text");
  const [textModel, setTextModel] = useState<ChatModelId>(() => {
    if (initialModel && isSupportedModel(initialModel)) {
      return initialModel;
    }
    return DEFAULT_MODEL_ID;
  });
  const [imageModel, setImageModel] = useState<ImageModelId>(() => {
    if (initialModel && isSupportedImageModel(initialModel)) {
      return initialModel;
    }
    return DEFAULT_IMAGE_MODEL_ID;
  });
  const [imageOptions, setImageOptions] = useState<ImageOptions>(DEFAULT_IMAGE_OPTIONS);

  useEffect(() => {
    if (initialModel) {
      if (isSupportedModel(initialModel)) {
        setTextModel(initialModel);
      } else if (isSupportedImageModel(initialModel)) {
        setImageModel(initialModel);
      }
    }
  }, [initialModel]);

  const updateImageOption = useCallback(<Key extends keyof ImageOptions>(key: Key, value: ImageOptions[Key]) => {
    setImageOptions((current) => ({ ...current, [key]: value }));
  }, []);

  const isImageMode = mode === "image";
  const activeModels: readonly ModelOption[] = isImageMode ? IMAGE_MODELS : CHAT_MODELS;
  const activeModel = isImageMode ? imageModel : textModel;

  const toggleImageMode = useCallback(() => {
    setMode((current) => {
      const nextMode = current === "image" ? "text" : "image";
      const nextModel = nextMode === "image" ? imageModel : textModel;
      onModelChange?.(nextModel);
      return nextMode;
    });
  }, [imageModel, textModel, onModelChange]);

  const selectModel = useCallback(
    (modelId: string) => {
      if (isImageMode) {
        const matched = IMAGE_MODELS.find((model) => model.id === modelId);
        if (matched) {
          setImageModel(matched.id);
          onModelChange?.(matched.id);
        }
        return;
      }
      const matched = CHAT_MODELS.find((model) => model.id === modelId);
      if (matched) {
        setTextModel(matched.id);
        onModelChange?.(matched.id);
      }
    },
    [isImageMode, onModelChange]
  );

  return {
    mode,
    isImageMode,
    activeModels,
    activeModel,
    imageOptions,
    updateImageOption,
    toggleImageMode,
    selectModel,
  };
}
