import { useId } from "react";
import type { LucideIcon } from "lucide-react";
import FilterChip from "./FilterChip";

interface FilterChipsProps<T extends string> {
  title: string;
  allLabel: string;
  options: readonly T[];
  labels: Record<T, string>;
  icons?: Partial<Record<T, LucideIcon>>;
  value: T | null;
  onChange: (value: T | null) => void;
  className?: string;
}

export default function FilterChips<T extends string>({
  title,
  allLabel,
  options,
  labels,
  icons,
  value,
  onChange,
  className,
}: FilterChipsProps<T>) {
  const titleId = useId();

  return (
    <div role="group" aria-labelledby={titleId} className={className}>
      <p id={titleId} className="pb-1 text-[10.5px] font-semibold uppercase tracking-wider text-[#9aa0a6] sm:pb-1.5 sm:text-[11px]">
        {title}
      </p>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto overscroll-x-contain px-4 pr-10 [mask-image:linear-gradient(to_right,black_calc(100%-2rem),transparent)] sm:mx-0 sm:flex-wrap sm:gap-1.5 sm:overflow-visible sm:px-0 sm:pr-0 sm:[mask-image:none]">
        <FilterChip label={allLabel} isActive={value === null} onClick={() => onChange(null)} />
        {options.map((option) => (
          <FilterChip
            key={option}
            label={labels[option]}
            Icon={icons?.[option]}
            isActive={value === option}
            onClick={() => onChange(value === option ? null : option)}
          />
        ))}
      </div>
    </div>
  );
}
