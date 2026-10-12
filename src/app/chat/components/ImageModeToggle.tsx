import { ImageIcon } from "lucide-react";

interface ImageModeToggleProps {
  isActive: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export default function ImageModeToggle({ isActive, onToggle, disabled = false }: ImageModeToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      aria-label="Image generation mode"
      title={isActive ? "Switch to text chat" : "Switch to image generation"}
      onClick={onToggle}
      disabled={disabled}
      className={`flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-40 ${
        isActive ? "bg-[#8ab4f8]/20 text-[#aecbfa] hover:bg-[#8ab4f8]/30" : "text-[#c4c7c5] hover:bg-white/[0.08] hover:text-white"
      }`}
    >
      <ImageIcon aria-hidden="true" className="h-3.5 w-3.5" />
      <span>Image</span>
      <span
        aria-hidden="true"
        className={`relative block h-3.5 w-6 shrink-0 overflow-hidden rounded-full transition-colors duration-200 ${isActive ? "bg-[#8ab4f8]" : "bg-white/[0.15]"}`}
      >
        <span
          className={`absolute top-0.5 block h-2.5 w-2.5 rounded-full bg-white transition-[left] duration-200 motion-reduce:transition-none ${
            isActive ? "left-[calc(100%-0.75rem)]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}