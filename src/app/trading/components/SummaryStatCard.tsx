import type { LucideIcon } from "lucide-react";
import SkeletonText from "./SkeletonText";

interface SummaryStatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  isLoading: boolean;
  containerClassName: string;
  iconWrapperClassName: string;
  iconClassName: string;
  labelClassName: string;
  valueClassName: string;
}

export default function SummaryStatCard({
  label,
  value,
  icon: Icon,
  isLoading,
  containerClassName,
  iconWrapperClassName,
  iconClassName,
  labelClassName,
  valueClassName,
}: SummaryStatCardProps) {
  return (
    <div className={`p-4 rounded-2xl flex items-center gap-4 shadow-sm ${containerClassName}`}>
      <div className={`p-2 rounded-lg ${iconWrapperClassName}`}>
        <Icon className={`w-6 h-6 ${iconClassName}`} />
      </div>
      <div>
        <p className={`text-[10px] uppercase font-bold leading-none mb-1 ${labelClassName}`}>{label}</p>
        {isLoading ? <SkeletonText className="h-5 w-16" /> : <p className={`text-md font-black ${valueClassName}`}>{value}</p>}
      </div>
    </div>
  );
}
