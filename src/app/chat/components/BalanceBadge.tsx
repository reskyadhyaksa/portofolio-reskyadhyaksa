import { Wallet } from "lucide-react";

interface BalanceBadgeProps {
  remainingUsd: number | null;
  hasError: boolean;
}

const usdFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export default function BalanceBadge({ remainingUsd, hasError }: BalanceBadgeProps) {
  if (remainingUsd === null && !hasError) return null;

  const label = remainingUsd === null ? "Balance unavailable" : `Balance ${usdFormatter.format(remainingUsd)}`;

  return (
    <p title={label} className="flex shrink-0 items-center gap-1 tabular-nums text-[#c4c7c5]">
      <Wallet aria-hidden="true" className="h-3 w-3" />
      <span>{remainingUsd === null ? "—" : usdFormatter.format(remainingUsd)}</span>
      <span className="sr-only">{label}</span>
    </p>
  );
}
