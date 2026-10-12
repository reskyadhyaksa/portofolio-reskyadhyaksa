import { TrendingDown, LucideMessageSquareWarning } from "lucide-react";
import AnalysisBlock from "./AnalysisBlock";
import type { TradingAnalysis } from "../trading-types";

const ANALYSIS_HEADING_CLASS_NAME = "text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2";
const INVALIDATION_HEADING_CLASS_NAME =
  "text-xs font-bold text-red-500 uppercase tracking-widest mb-2 italic flex place-items-center gap-2";

interface MarketIntelligencePanelProps {
  data: TradingAnalysis | null;
  isLoading: boolean;
}

export default function MarketIntelligencePanel({ data, isLoading }: MarketIntelligencePanelProps) {
  return (
    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
        <TrendingDown className="text-indigo-600 w-6 h-6" />
        Market Intelligence
      </h2>
      <div className="space-y-6">
        <AnalysisBlock
          heading="1. Tren & Momentum"
          headingClassName={ANALYSIS_HEADING_CLASS_NAME}
          isLoading={isLoading}
          skeletonWidths={["w-full", "w-[90%]", "w-[40%]"]}
          text={data?.analisis_tren_momentum}
          fallbackText="Klik analyze untuk melihat analisis tren."
        />
        <AnalysisBlock
          heading="2. Timing & Konfirmasi"
          headingClassName={ANALYSIS_HEADING_CLASS_NAME}
          isLoading={isLoading}
          skeletonWidths={["w-full", "w-[70%]"]}
          text={data?.panduan_entry_timing}
          fallbackText="Menunggu data entry..."
        />
        <AnalysisBlock
          heading={
            <>
              <LucideMessageSquareWarning className="w-4 h-4" />
              Invalidation Point
            </>
          }
          headingClassName={INVALIDATION_HEADING_CLASS_NAME}
          wrapperClassName="pt-4 border-t border-slate-100"
          isLoading={isLoading}
          skeletonWidths={["w-full", "w-[70%]"]}
          text={data?.invalidation_point}
          fallbackText="Menunggu data entry..."
        />
      </div>
    </section>
  );
}
