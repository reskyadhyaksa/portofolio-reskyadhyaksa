"use client";
import TradingControls from "./components/TradingControls";
import TradingSummaryStats from "./components/TradingSummaryStats";
import MarketIntelligencePanel from "./components/MarketIntelligencePanel";
import ExecutionPlanPanel from "./components/ExecutionPlanPanel";
import { useTradingAnalysis } from "./useTradingAnalysis";

export default function TradingDashboard() {
  const {
    data,
    loading,
    selectedTf,
    setSelectedTf,
    selectedMar,
    setSelectedMar,
    selectedHb,
    setSelectedHb,
    displayTime,
    isNoTrade,
    fetchAnalysis,
  } = useTradingAnalysis();

  return (
    <div className="max-w-full min-h-full transition-all pointer-events-auto">
      <TradingControls
        selectedTf={selectedTf}
        onTimeframeChange={setSelectedTf}
        selectedMar={selectedMar}
        onMarketChange={setSelectedMar}
        selectedHb={selectedHb}
        onHoursBackChange={setSelectedHb}
        isLoading={loading}
        onAnalyze={fetchAnalysis}
      />

      <TradingSummaryStats data={data} isLoading={loading} isNoTrade={isNoTrade} displayTime={displayTime} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 space-y-6">
          <MarketIntelligencePanel data={data} isLoading={loading} />
        </div>
        <div className="space-y-4">
          <ExecutionPlanPanel data={data} isLoading={loading} />
        </div>
      </div>
    </div>
  );
}
