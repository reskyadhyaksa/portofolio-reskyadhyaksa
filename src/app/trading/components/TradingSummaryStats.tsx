import { AlertCircle, Activity, Gauge, Target } from "lucide-react";
import SummaryStatCard from "./SummaryStatCard";
import type { TradingAnalysis } from "../trading-types";

type RecommendationTone = "neutral" | "warning" | "positive";

const RECOMMENDATION_CLASSES: Record<RecommendationTone, { container: string; icon: string; text: string }> = {
  neutral: { container: "border-2 bg-slate-50 border-slate-200", icon: "bg-slate-300 animate-pulse", text: "" },
  warning: { container: "border-2 bg-amber-50 border-amber-200", icon: "bg-amber-500", text: "text-amber-700" },
  positive: { container: "border-2 bg-emerald-50 border-emerald-200", icon: "bg-emerald-500", text: "text-emerald-700" },
};

interface TradingSummaryStatsProps {
  data: TradingAnalysis | null;
  isLoading: boolean;
  isNoTrade: boolean;
  displayTime: string;
}

export default function TradingSummaryStats({ data, isLoading, isNoTrade, displayTime }: TradingSummaryStatsProps) {
  const recommendationTone: RecommendationTone = isLoading ? "neutral" : isNoTrade ? "warning" : "positive";
  const recommendationClasses = RECOMMENDATION_CLASSES[recommendationTone];
  const neutralIconWrapper = isLoading ? "bg-slate-100 animate-pulse" : "bg-indigo-100";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <SummaryStatCard
        label="Rekomendasi"
        value={data?.rekomendasi || "WAITING"}
        icon={AlertCircle}
        isLoading={isLoading}
        containerClassName={recommendationClasses.container}
        iconWrapperClassName={recommendationClasses.icon}
        iconClassName="text-white"
        labelClassName="text-slate-400"
        valueClassName={`leading-none ${recommendationClasses.text}`}
      />
      <SummaryStatCard
        label="Confidence Score"
        value={data?.skor_keyakinan || "0%"}
        icon={Gauge}
        isLoading={isLoading}
        containerClassName="border border-slate-200 bg-white"
        iconWrapperClassName={neutralIconWrapper}
        iconClassName="text-indigo-600"
        labelClassName="text-slate-400"
        valueClassName="text-slate-800"
      />
      <SummaryStatCard
        label="Entry Timing"
        value={`${data?.entry_time || "HH:MM"} UTC / ${displayTime} +7 UTC`}
        icon={Activity}
        isLoading={isLoading}
        containerClassName="border border-slate-200 bg-white"
        iconWrapperClassName={neutralIconWrapper}
        iconClassName="text-blue-600"
        labelClassName="text-slate-400"
        valueClassName="text-slate-800"
      />
      <SummaryStatCard
        label="Target Entry"
        value={data?.harga_entry || "0.000"}
        icon={Target}
        isLoading={isLoading}
        containerClassName="border border-orange-400 bg-slate-800"
        iconWrapperClassName={isLoading ? "bg-slate-100 animate-pulse" : "bg-orange-400"}
        iconClassName="text-white"
        labelClassName="text-white/50"
        valueClassName="text-orange-400"
      />
    </div>
  );
}
