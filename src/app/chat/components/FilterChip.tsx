import type { LucideIcon } from "lucide-react";

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  Icon?: LucideIcon;
}

export default function FilterChip({ label, isActive, onClick, Icon }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[12.5px] font-medium sm:min-h-0 sm:px-3 sm:py-1 sm:text-[12px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8] ${
        isActive ? "bg-[#8ab4f8]/20 text-[#aecbfa]" : "bg-white/[0.06] text-[#c4c7c5] hover:bg-white/[0.1] hover:text-white"
      }`}
    >
      {Icon && <Icon aria-hidden="true" className="h-3 w-3" />}
      {label}
    </button>
  );
}
