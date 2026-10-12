import AspectRatioPreview from "./AspectRatioPreview";

interface ImageSizePickerProps {
  options: readonly { id: string; ratioLabel: string; orientationLabel: string; width: number; height: number }[];
  value: string;
  onChange: (sizeId: string) => void;
  disabled?: boolean;
}

export default function ImageSizePicker({ options, value, onChange, disabled = false }: ImageSizePickerProps) {
  return (
    <div role="radiogroup" aria-label="Image size" className="grid grid-cols-4 gap-1.5">
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${option.orientationLabel} ${option.ratioLabel}, ${option.width} by ${option.height}`}
            disabled={disabled}
            onClick={() => onChange(option.id)}
            className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border px-1 py-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-40 ${
              isSelected
                ? "border-[#8ab4f8]/60 bg-[#8ab4f8]/15 text-[#aecbfa]"
                : "border-white/[0.08] text-[#9aa0a6] hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <AspectRatioPreview width={option.width} height={option.height} />
            <span className="text-[11px] font-medium">{option.ratioLabel}</span>
            <span className="text-[10px] opacity-70">{option.width}×{option.height}</span>
          </button>
        );
      })}
    </div>
  );
}
