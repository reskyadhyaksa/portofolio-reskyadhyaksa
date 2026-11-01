"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDown, Film, ImageIcon, Sparkles } from "lucide-react";
import type { ModelOption } from "@/lib/chat-config";
import { getModelSummary } from "@/lib/model-summaries";
import ChatModelCatalog from "./ChatModelCatalog";
import ModalDialog from "./ModalDialog";
import ModelCard from "./ModelCard";
import ModelCardGrid from "./ModelCardGrid";
import ModelEmptyState from "./ModelEmptyState";
import ModelSearchBar from "./ModelSearchBar";

export type ModelSelectorMode = "chat" | "image" | "video";

interface ModelSelectorProps {
  models: readonly ModelOption[];
  selectedModel: string;
  onSelect: (modelId: string) => void;
  isImageMode?: boolean;
  mode?: ModelSelectorMode;
  disabled?: boolean;
  className?: string;
}

export default function ModelSelector({
  models,
  selectedModel,
  onSelect,
  isImageMode = false,
  mode,
  disabled = false,
  className,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const resolvedMode: ModelSelectorMode = mode ?? (isImageMode ? "image" : "chat");

  const activeModel = models.find((model) => model.id === selectedModel) ?? models[0];

  const TriggerIcon = useMemo(() => {
    if (resolvedMode === "video") return Film;
    if (resolvedMode === "image") return ImageIcon;
    return Sparkles;
  }, [resolvedMode]);

  const triggerIconColor = useMemo(() => {
    if (resolvedMode === "video") return "text-purple-400";
    if (resolvedMode === "image") return "text-cyan-400";
    return "text-[#8ab4f8]";
  }, [resolvedMode]);

  const modalMeta = useMemo(() => {
    if (resolvedMode === "video") {
      return {
        title: "Select Video Model",
        subtitle: "Browse and select generative video models with camera control and physics simulation.",
        tagLabel: "Video",
        searchPlaceholder: "Search video models...",
      };
    }
    if (resolvedMode === "image") {
      return {
        title: "Select Image Model",
        subtitle: "Browse and select vision models for photorealistic generation and editing.",
        tagLabel: "Image",
        searchPlaceholder: "Search image models...",
      };
    }
    return {
      title: "Select AI Model",
      subtitle: "Browse, search, and select from available AI models.",
      tagLabel: "Chat",
      searchPlaceholder: "Search models...",
    };
  }, [resolvedMode]);

  const filteredModels = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return models;
    return models.filter(
      (m) =>
        m.label.toLowerCase().includes(trimmed) ||
        m.description.toLowerCase().includes(trimmed) ||
        m.id.toLowerCase().includes(trimmed)
    );
  }, [models, searchQuery]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
    triggerRef.current?.focus();
  }, []);

  const handleSelect = (modelId: string) => {
    onSelect(modelId);
    closeModal();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className={
          className ??
          "flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full px-2.5 text-[13px] font-medium text-[#e3e3e3] transition-colors duration-200 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        <TriggerIcon aria-hidden="true" className={`h-3.5 w-3.5 ${triggerIconColor}`} />
        <span className="truncate max-w-[140px] sm:max-w-[200px]">{activeModel?.label}</span>
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 text-[#9aa0a6] shrink-0" />
      </button>

      <ModalDialog
        isOpen={isOpen}
        size="lg"
        title={modalMeta.title}
        subtitle={modalMeta.subtitle}
        onClose={closeModal}
      >
        {resolvedMode === "chat" ? (
          <ChatModelCatalog selectedModel={selectedModel} onSelect={handleSelect} />
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="border-b border-white/[0.06] px-4 py-3 sm:px-5">
              <ModelSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                resultCount={filteredModels.length}
                totalCount={models.length}
                placeholder={modalMeta.searchPlaceholder}
              />
            </div>
            <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 sm:px-5 sm:pt-4">
              {filteredModels.length === 0 ? (
                <ModelEmptyState onReset={() => setSearchQuery("")} />
              ) : (
                <ModelCardGrid label={`${modalMeta.tagLabel} models`}>
                  {filteredModels.map((model) => (
                    <ModelCard
                      key={model.id}
                      model={model}
                      summary={getModelSummary(model.id)}
                      tagLabel={modalMeta.tagLabel}
                      TagIcon={TriggerIcon}
                      isSelected={model.id === selectedModel}
                      onSelect={handleSelect}
                    />
                  ))}
                </ModelCardGrid>
              )}
            </div>
          </div>
        )}
      </ModalDialog>
    </>
  );
}
