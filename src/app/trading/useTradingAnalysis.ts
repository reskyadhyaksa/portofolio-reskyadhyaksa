"use client";
import { useState } from "react";
import { convertToWIB } from "@/services/time-formatting";
import {
  parseTradingAnalysis,
  type TradingAnalysis,
  type TradingApiResponse,
} from "./trading-types";

export function useTradingAnalysis() {
  const [data, setData] = useState<TradingAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTf, setSelectedTf] = useState("TIMEFRAME_M5");
  const [selectedMar, setSelectedMar] = useState("XAUUSDm");
  const [selectedHb, setSelectedHb] = useState(6);

  const displayTime = convertToWIB(data?.entry_time) || "N/A";
  const isNoTrade = data?.rekomendasi === "WAIT" || Boolean(data?.harga_entry?.includes("No Trade"));

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        market: selectedMar,
        timeframe: selectedTf,
        hours_back: String(selectedHb),
      });
      const res = await fetch(`/api/trading?${query.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil data dari server");

      const json: TradingApiResponse = await res.json();
      setData(parseTradingAnalysis(json));
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
