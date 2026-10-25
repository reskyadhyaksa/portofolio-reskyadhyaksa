"use client";
import { useCallback, useRef, useState } from "react";
import { ChevronDown, ImageIcon, Sparkles } from "lucide-react";
import type { ModelOption } from "@/lib/chat-config";
import { getModelSummary } from "@/lib/model-summaries";
import ChatModelCatalog from "./ChatModelCatalog";
import ModalDialog from "./ModalDialog";
import ModelCard from "./ModelCard";
import ModelCardGrid from "./ModelCardGrid";

interface ModelSelectorProps {
  models: readonly ModelOption[];
  selectedModel: string;
  onSelect: (modelId: string) => void;
  isImageMode?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function ModelSelector({
  models,
  selectedModel,
  onSelect,
  isImageMode = false,
  disabled = false,
  className,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeModel = models.find((model) => model.id === selectedModel) ?? models[0];
  const TriggerIcon = isImageMode ? ImageIcon : Sparkles;

  const closeModal = useCallback(() => {
    setIsOpen(false);
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
        <TriggerIcon aria-hidden="true" className="h-3.5 w-3.5 text-[#8ab4f8]" />
        <span>{activeModel?.label}</span>
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 text-[#9aa0a6]" />
      </button>

      <ModalDialog
        isOpen={isOpen}
        size="lg"
        title={isImageMode ? "Select image model" : "Select AI model"}
        subtitle={isImageMode ? "Pick the model used to generate images." : "Filter by provider or usage, then pick a card."}
        onClose={closeModal}
      >
        {isImageMode ? (
          <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 sm:px-5 sm:pt-4">
            <ModelCardGrid label="Image models">
              {models.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  summary={getModelSummary(model.id)}
                  tagLabel="Image"
                  TagIcon={ImageIcon}
                  isSelected={model.id === selectedModel}
                  onSelect={handleSelect}
                />
              ))}
            </ModelCardGrid>
          </div>
        ) : (
          <ChatModelCatalog selectedModel={selectedModel} onSelect={handleSelect} />
        )}
      </ModalDialog>
    </>
  );
}
