interface SegmentedOption {
  id: string;
  label: string;
}

interface SegmentedControlProps {
  label: string;
  options: readonly SegmentedOption[];
  value: string;
  onChange: (optionId: string) => void;
  disabled?: boolean;
}

export default function SegmentedControl({ label, options, value, onChange, disabled = false }: SegmentedControlProps) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-full bg-white/[0.05] p-0.5">
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange(option.id)}
            className={`min-h-7 flex-1 cursor-pointer rounded-full px-2.5 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] disabled:cursor-not-allowed disabled:opacity-40 ${
              isSelected ? "bg-[#8ab4f8]/25 text-[#aecbfa]" : "text-[#9aa0a6] hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
