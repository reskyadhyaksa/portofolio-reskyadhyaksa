export interface TradingAnalysis {
  skor_keyakinan?: string;
  rekomendasi?: string;
  harga_entry?: string;
  stop_loss?: string;
  tp1?: string;
  tp2?: string;
  entry_time?: string;
  analisis_tren_momentum?: string;
  panduan_entry_timing?: string;
  manajemen_risiko?: string;
  invalidation_point?: string;
  kesimpulan?: string;
  timeframe?: string;
  market?: string;
}

export interface TradingApiResponse {
  analysis?: string | TradingAnalysis;
}

export interface SelectOption<TValue extends string | number> {
  title: string;
  value: TValue;
}

export type ExecutionTone = "yellow" | "cyan" | "red" | "emerald" | "amber";

export const TIMEFRAME_OPTIONS: SelectOption<string>[] = [
  { title: "M1", value: "TIMEFRAME_M1" },
  { title: "M5", value: "TIMEFRAME_M5" },
  { title: "M15", value: "TIMEFRAME_M15" },
  { title: "M30", value: "TIMEFRAME_M30" },
  { title: "H1", value: "TIMEFRAME_H1" },
  { title: "H4", value: "TIMEFRAME_H4" },
  { title: "D1", value: "TIMEFRAME_D1" },
];

export const MARKET_OPTIONS: SelectOption<string>[] = [
  { title: "XAUUSD", value: "XAUUSDm" },
  { title: "GBPUSD", value: "GBPUSDm" },
  { title: "AUDUSD", value: "AUDUSDm" },
  { title: "BTCUSD", value: "BTCUSDm" },
];

export const HOURS_BACK_OPTIONS: SelectOption<number>[] = [
  { title: "6 HOURS", value: 6 },
  { title: "12 HOURS", value: 12 },
  { title: "24 HOURS", value: 24 },
];

export const FIELD_LABEL_CLASS_NAME = "block text-sm font-medium text-white/50 mb-1";

export function parseTradingAnalysis(payload: TradingApiResponse): TradingAnalysis | null {
  if (!payload.analysis) return null;
  if (typeof payload.analysis !== "string") return payload.analysis;
  return JSON.parse(payload.analysis) as TradingAnalysis;
}
