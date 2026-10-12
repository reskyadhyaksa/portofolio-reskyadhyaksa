import SelectField from "./SelectField";
import {
  FIELD_LABEL_CLASS_NAME,
  HOURS_BACK_OPTIONS,
  MARKET_OPTIONS,
  TIMEFRAME_OPTIONS,
} from "../trading-types";

interface TradingControlsProps {
  selectedTf: string;
  onTimeframeChange: (value: string) => void;
  selectedMar: string;
  onMarketChange: (value: string) => void;
  selectedHb: number;
  onHoursBackChange: (value: number) => void;
  isLoading: boolean;
  onAnalyze: () => void;
}

export default function TradingControls({
  selectedTf,
  onTimeframeChange,
  selectedMar,
  onMarketChange,
  selectedHb,
  onHoursBackChange,
  isLoading,
  onAnalyze,
}: TradingControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-black">
      <SelectField label="Select Timeframe" value={selectedTf} options={TIMEFRAME_OPTIONS} onChange={onTimeframeChange} />
      <SelectField label="Select Market" value={selectedMar} options={MARKET_OPTIONS} onChange={onMarketChange} />
      <SelectField
        label="Select Hours Back"
        value={selectedHb}
        options={HOURS_BACK_OPTIONS}
        onChange={(rawValue) => onHoursBackChange(Number(rawValue))}
      />
      <div>
        <label className={FIELD_LABEL_CLASS_NAME}>Start Analyze Selection</label>
        <button
          type="button"
          onClick={onAnalyze}
          disabled={isLoading}
          className={`block border-cyan-300 border-2 bg-cyan-300 w-full rounded-md shadow-sm px-3 py-1 hover:bg-cyan-200 active:scale-98 cursor-pointer transition-all duration-200 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "ANALYZING..." : "ANALYZE"}
        </button>
      </div>
    </div>
  );
}
