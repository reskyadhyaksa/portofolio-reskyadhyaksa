'use client'

import React, { useState, useEffect } from 'react';
import { TrendingDown, AlertCircle, Target, ShieldCheck, Activity, Loader2, Gauge, Zap, Ban, ListCheck, ListChecks, FileWarning, LucideMessageSquareWarning } from 'lucide-react';

export default function TradingDashboard() {
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const data = {
    "skor_keyakinan": "75%",
    "rekomendasi": "SELL LIMIT",
    "harga_entry": "4551.50",
    "stop_loss": "4560.00",
    "tp1": "4535.00",
    "tp2": "4515.00",
    "entry_time": "14:45",
    "analisis_tren_momentum": "Tren utama pada timeframe M5 adalah bearish kuat yang ditandai oleh kemiringan MA50 yang menurun secara konsisten dari 4565 ke 4551. Harga saat ini berada di bawah MA50, namun sedang mengalami koreksi naik setelah mencapai kondisi jenuh jual (oversold) ekstrem dengan RSI mencapai 15.8. Saat ini RSI telah naik ke 52.3, mengindikasikan kekuatan momentum koreksi yang mendekati area resistance dinamis (MA50).",
    "panduan_entry_timing": "Disarankan untuk melakukan entry SELL ketika harga menyentuh atau mendekati level resistance MA50 di kisaran 4551-4552. Waktu entri ideal diperkirakan terjadi pada 14:45 saat momentum koreksi RSI mulai mencapai area netral-bearish (55-60) dan harga menunjukkan penolakan (rejection) di area MA50.",
    "manajemen_risiko": "Stop Loss ditempatkan di 4560.00, yang merupakan area di atas level psikologis MA50 dan di atas swing high lokal terakhir untuk memberikan ruang napas terhadap volatilitas ATR yang saat ini berada di angka 7.72. Target profit dibagi menjadi dua tahap untuk mengamankan keuntungan sebagian pada level support terdekat.",
    "invalidation_point": "4562.00. Rencana trading ini dianggap gagal jika harga mampu melakukan 'close' di atas level 4562 secara konsisten pada grafik M5, karena hal tersebut menandakan perubahan struktur tren dari bearish menjadi bullish (break of structure).",
    "kesimpulan": "XAUUSD berada dalam tren turun yang jelas, namun sedang mengalami fase 'mean reversion' ke arah MA50. Memanfaatkan koreksi ini untuk mengambil posisi jual di harga yang lebih tinggi (sell high) adalah langkah yang paling rasional sesuai dengan prinsip 'trend following' pada timeframe rendah."
  }

  const displayTime = React.useMemo(() => {
    if (!data?.entry_time) return "N/A";
    
    const [h, m] = data.entry_time.split(':').map(Number);
    let newH = (h + 7) % 24;
    
    const formattedH = newH.toString().padStart(2, '0');
    const formattedM = m.toString().padStart(2, '0');
    
    return `${formattedH}:${formattedM} WIB`;
  }, [data?.entry_time]);


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(`/api/trading`);
  //       const json = await res.json();
        
  //       const parsedAnalysis = typeof json.analysis === 'string' 
  //         ? JSON.parse(json.analysis) 
  //         : json.analysis;
          
  //       setData(parsedAnalysis);
  //     } catch (error) {
  //       console.error("Gagal mengambil data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium animate-pulse">Menghubungkan ke MT5 & Gemini AI...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 p-6 rounded-xl border border-dashed border-slate-300">
        <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
        <h3 className="text-lg font-bold text-slate-800">Data Tidak Ditemukan</h3>
        <p className="text-slate-500 text-center max-w-xs">Pastikan FastAPI dan Terminal MT5 Anda sudah berjalan di latar belakang.</p>
      </div>
    );
  }

  const isNoTrade = data.rekomendasi === "WAIT" || data.harga_entry.includes("No Trade");

  return (
    <div className="max-w-full p-6 min-h-screen transition-all">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-2xl border-2 flex items-center gap-4 shadow-sm ${isNoTrade ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
          <div className={`p-2 rounded-lg ${isNoTrade ? 'bg-amber-500' : 'bg-emerald-500'}`}>
            <AlertCircle className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Rekomendasi</p>
            <p className={`text-md font-black leading-none ${isNoTrade ? 'text-amber-700' : 'text-emerald-700'}`}>
              {data.rekomendasi || 'ANALYZING'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center gap-4">
          <div className="p-2 rounded-lg bg-indigo-100">
            <Gauge className="text-indigo-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Confidence Score</p>
            <p className="text-md font-black text-slate-800 leading-none">{data.skor_keyakinan || 'None'}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-100">
            <Activity className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Entry Timing</p>
            <p className="text-md font-black text-slate-800 leading-none font-mono tracking-tighter">{data.entry_time} UTC / {displayTime} +7 UTC</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-900 shadow-sm flex items-center gap-4">
          <div className="p-2 rounded-lg bg-amber-400 text-slate-900">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold leading-none mb-1 text-white/50">Target Entry</p>
            <p className="text-sm font-bold text-amber-400 leading-tight">{data.harga_entry}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <TrendingDown className="text-indigo-600 w-6 h-6" /> 
              Market Intelligence
            </h2>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">1. Tren & Momentum</h4>
                <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {data.analisis_tren_momentum}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">2. Timing & Konfirmasi</h4>
                <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {data.panduan_entry_timing}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2 italic flex place-items-center gap-2"> 
                  <LucideMessageSquareWarning className="w-4 h-4"/>
                  Invalidation Point
                </h4>
                <p className="text-slate-500 text-xs italic">{data.invalidation_point}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-16 h-16 text-indigo-600" />
            </div>
            
            <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" /> Execution Plan
            </h3>

            <div className="space-y-5">
              <div className="flex justify-between items-center p-3 rounded-xl bg-cyan-50 border border-emerald-100">
                <span className="text-xs font-bold text-cyan-600 flex place-items-center gap-2">
                  <Target className="w-6 h-6" />
                  ENTRY POSITION</span>
                <span className="font-mono font-black text-cyan-700">{data.harga_entry}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-red-50 border border-red-100">
                <span className="text-xs font-bold text-red-400 flex place-items-center gap-2">
                  <Ban className="w-6 h-6" />
                  STOP LOSS
                </span>
                <span className="font-mono font-black text-red-500">{data.stop_loss}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-xs font-bold text-emerald-600 flex place-items-center gap-2">
                  <ListCheck className="w-6 h-6" />
                  TAKE PROFIT 1
                </span>
                <span className="font-mono font-black text-emerald-700">{data.tp1}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-lime-50 border border-lime-100 text-lime-700">
                <span className="text-xs font-bold text-lime-600 flex place-items-center gap-2">
                  <ListChecks className="w-6 h-6" />
                  TAKE PROFIT 2
                </span>
                <span className="font-mono font-black text-lime-800">{data.tp2}</span>
              </div>

              <div className="mt-6">
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Summary Verdict</p>
                <p className="text-xs text-slate-500 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                  &quot;{data.kesimpulan}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}