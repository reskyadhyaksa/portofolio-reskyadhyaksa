import type { LucideIcon } from "lucide-react";

type StatusPillVariant = "emerald" | "blue" | "amber";

interface StatusPillProps {
  label?: string;
  variant?: StatusPillVariant;
  icon?: LucideIcon | null;
  size?: "xs" | "sm";
}

const VARIANT_STYLES: Record<StatusPillVariant, { ping: string; dot: string; text: string }> = {
  emerald: {
    ping: "bg-emerald-400",
    dot: "bg-emerald-500",
    text: "text-emerald-400/90",
  },
  blue: {
    ping: "bg-blue-400",
    dot: "bg-blue-500",
    text: "text-blue-400/90",
  },
  amber: {
    ping: "bg-amber-400",
    dot: "bg-amber-500",
    text: "text-amber-400/90",
  },
};

export default function StatusPill({
  label = "Available for Projects",
  variant = "emerald",
  icon: Icon = null,
  size = "sm",
}: StatusPillProps) {
  const currentVariant = VARIANT_STYLES[variant] ?? VARIANT_STYLES.emerald;
  const textSize = size === "xs" ? "text-[9px]" : "text-[10px]";

  return (
    <div className="flex items-center gap-1.5">
      {Icon ? (
        <Icon className="h-2.5 w-2.5 text-slate-300" />
      ) : (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${currentVariant.ping} opacity-60`}
          ></span>
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${currentVariant.dot}`}
          ></span>
        </span>
      )}
      <span className={`${textSize} font-medium ${currentVariant.text}`}>
        {label}
      </span>
    </div>
  );
}
