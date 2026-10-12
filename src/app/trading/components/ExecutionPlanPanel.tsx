import { ShieldCheck } from "lucide-react";
import ExecutionPlanRow from "./ExecutionPlanRow";
import type { TradingAnalysis } from "../trading-types";

interface ExecutionPlanPanelProps {
  data: TradingAnalysis | null;
  isLoading: boolean;
}

export default function ExecutionPlanPanel({ data, isLoading }: ExecutionPlanPanelProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative h-full">
      <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
        <ShieldCheck className="text-emerald-500" /> Execution Plan
      </h3>
      <div className="space-y-5">
        <ExecutionPlanRow label="DIRECTION" value={data?.rekomendasi} tone="yellow" isLoading={isLoading} />
        <ExecutionPlanRow label="ENTRY POSITION" value={data?.harga_entry} tone="cyan" isLoading={isLoading} />
        <ExecutionPlanRow label="STOP LOSS" value={data?.stop_loss} tone="red" isLoading={isLoading} />
        <ExecutionPlanRow label="TAKE PROFIT" value={data?.tp1} tone="emerald" isLoading={isLoading} />
        <ExecutionPlanRow label="TAKE PROFIT 2" value={data?.tp2} tone="amber" isLoading={isLoading} />
      </div>
    </div>
  );
}
