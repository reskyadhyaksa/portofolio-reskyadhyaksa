'use client'

import React, { useState, useEffect } from 'react';
import { TrendingDown, AlertCircle, Target, ShieldCheck, Activity, Loader2, Gauge, Zap, Ban, ListCheck, ListChecks, FileWarning, LucideMessageSquareWarning } from 'lucide-react';

export default function TradingDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notSelected, setNotSelected] = useState(true);
  const [selectedTf, setSelectedTf] = useState("TIMEFRAME_M5");
  const [selectedMar, setSelectedMar] = useState("XAUUSDm");
  const [selectedHb, setSelectedHb] = useState(6)

  const timeframe = [
    {
      title: "M1",
      value: "TIMEFRAME_M1"
    },
    {
      title: "M5",
      value: "TIMEFRAME_M5"
    },
    {
      title: "M15",
      value: "TIMEFRAME_M15"
    },
    {
      title: "M30",
      value: "TIMEFRAME_M30"
    },
    {
      title: "H1",
      value: "TIMEFRAME_H1"
    },
    {
      title: "H4",
      value: "TIMEFRAME_H4"
    },
    {
      title: "D1",
      value: "TIMEFRAME_D1"
    },
  ];

  const market = [
    {
      title: "XAUUSD",
      value: "XAUUSDm",
    },
    {
      title: "GBPUSD",
      value: "GBPUSDm",
    },
    {
      title: "AUDUSD",
      value: "AUDUSDm",
    },
    {
      title: "BTCUSD",
      value: "BTCUSDm",
    },
  ]
  
  const hours_back = [
    {
      title: "6 HOURS",
      value: 6,
    },
    {
      title: "12 HOURS",
      value: 12,
    },
    {
      title: "24 HOURS",
      value: 24,
    },
  ]
  
  // const data = {
  //   "skor_keyakinan": "85%",
  //   "rekomendasi": "BUY ON PULLBACK",
  //   "harga_entry": "4592.00",
  //   "stop_loss": "4583.00",
  //   "tp1": "4602.00",
  //   "tp2": "4610.00",
  //   "entry_time": "12:30",
  //   "analisis_tren_momentum": "Tren saat ini sangat bullish (Strong Uptrend) dengan harga bergerak jauh di atas MA50 (4571.17). Momentum sangat kuat yang dikonfirmasi oleh kenaikan ATR secara signifikan dari 3.93 ke 5.25. Meskipun RSI berada di level 78.8 (overbought), ini sering kali menunjukkan kekuatan tren yang ekstrem dalam fase breakout, bukan sekadar jenuh beli.",
  //   "panduan_entry_timing": "Disarankan menunggu retracement (koreksi sehat) ke area support minor di 4591.00 - 4592.00. Pemicu entry adalah ketika candle M5 berikutnya (12:25 atau 12:30) gagal menembus ke bawah low 4587.43 dan mulai memantul kembali. Hindari melakukan 'chase' di harga tertinggi saat ini (4596.00).",
  //   "manajemen_risiko": "Stop Loss ditempatkan di bawah level support psikologis dan low candle breakout sebelumnya (4583.00) untuk memberikan ruang bagi volatilitas ATR yang sedang tinggi. Rasio Risk/Reward dijaga di kisaran 1:1.5 hingga 1:2.",
  //   "invalidation_point": "Rencana trading ini dianggap gagal jika harga ditutup di bawah 4582.00. Penembusan level ini menandakan kegagalan momentum (fakeout) dan kemungkinan harga akan kembali menguji MA50 di area 4570.00.",
  //   "kesimpulan": "XAUUSD berada dalam fase ekspansi bullish yang kuat. Strategi terbaik adalah menunggu diskon harga di area 4592.00 untuk memaksimalkan potensi keuntungan menuju target psikologis berikutnya di level 4600-4610.",
  //   "timeframe": "M5",
  //   "market": "XAUUSDm"
  // }

  const displayTime = React.useMemo(() => {
    if (!data?.entry_time) return "N/A";
    
    const [h, m] = data.entry_time.split(':').map(Number);
    let newH = (h + 7) % 24;
    
    const formattedH = newH.toString().padStart(2, '0');
    const formattedM = m.toString().padStart(2, '0');
    
    return `${formattedH}:${formattedM} WIB`;
  }, [data?.entry_time]);

  const getData = async () => {
    try {
      setLoading(true);
      setNotSelected(false);

      console.log('buasbduoabduoabod');
      
      const res = await fetch(
        `/api/trading?market=${selectedMar}&timeframe=${selectedTf}&hours_back=${selectedHb}`
      );
      
      if (!res.ok) throw new Error("Gagal mengambil data dari server");

      const json = await res.json();
      
      const parsedAnalysis = typeof json.analysis === 'string' 
        ? JSON.parse(json.analysis) 
        : json.analysis;

      console.log(parsedAnalysis);
      
        
      setData(parsedAnalysis);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  // if (!data) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-100 p-6 rounded-xl border border-dashed border-slate-300">
  //       <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
  //       <h3 className="text-lg font-bold text-slate-800">Data Tidak Ditemukan</h3>
  //       <p className="text-slate-500 text-center max-w-xs">Pastikan FastAPI dan Terminal MT5 Anda sudah berjalan di latar belakang.</p>
  //     </div>
  //   );
  // }

  const isNoTrade = data?.rekomendasi === "WAIT" || data?.harga_entry.includes("No Trade");
  const SkeletonText = ({ className }) => (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
  );

  return (
    <div className="max-w-full min-h-full transition-all pointer-events-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-black">
        <div>
          <label className="block text-sm font-medium text-white/50 mb-1">
            Select Timeframe
          </label>
          <select
            value={selectedTf}
            onChange={(e) => setSelectedTf(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {timeframe.map((tf) => (
              <option key={tf.value} value={tf.value}>
                {tf.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/50 mb-1">
            Select Market
          </label>
          <select
            value={selectedMar}
            onChange={(e) => setSelectedMar(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {market.map((mar) => (
              <option key={mar.value} value={mar.value}>
                {mar.title}
              </option>
            ))}
          </select>
        </div>

        <div className=''>
          <label className="block text-sm font-medium text-white/50 mb-1">
            Select Hours Back
          </label>
          <select
            value={selectedHb}
            onChange={(e) => setSelectedHb(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {hours_back.map((hb) => (
              <option key={hb.value} value={hb.value}>
                {hb.title}
              </option>
            ))}
          </select>
        </div>

        <div className=''>
          <label className="block text-sm font-medium text-white/50 mb-1">
            Start Analyze Selection
          </label>
          <button 
            onClick={getData}
            disabled={loading}
            className={`block border-cyan-300 border-2 bg-cyan-300 w-full rounded-md shadow-sm px-3 py-1 hover:bg-cyan-200 active:scale-98 cursor-pointer transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'ANALYZING...' : 'ANALYZE'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-2xl border-2 flex items-center gap-4 shadow-sm ${loading ? 'bg-slate-50 border-slate-200' : isNoTrade ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
          <div className={`p-2 rounded-lg ${loading ? 'bg-slate-300 animate-pulse' : isNoTrade ? 'bg-amber-500' : 'bg-emerald-500'}`}>
            <AlertCircle className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Rekomendasi</p>
            {loading ? (
              <SkeletonText className="h-5 w-24" />
            ) : (
              <p className={`text-md font-black leading-none ${isNoTrade ? 'text-amber-700' : 'text-emerald-700'}`}>
                {data?.rekomendasi || 'WAITING'}
              </p>
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center gap-4">
          <div className={`p-2 rounded-lg ${loading ? 'bg-slate-100 animate-pulse' : 'bg-indigo-100'}`}>
            <Gauge className="text-indigo-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Confidence Score</p>
            {loading ? <SkeletonText className="h-5 w-16" /> : <p className="text-md font-black text-slate-800">{data?.skor_keyakinan || '0%'}</p>}
          </div>
        </div>


        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center gap-4">
          <div className={`p-2 rounded-lg ${loading ? 'bg-slate-100 animate-pulse' : 'bg-indigo-100'}`}>
            <Activity className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Entry Timing</p>
            {loading ? <SkeletonText className="h-5 w-16" /> : <p className="text-md font-black text-slate-800">{data?.entry_time || `HH:MM`} UTC / {displayTime} +7 UTC</p>}
            <p className="text-md font-black text-slate-800 leading-none font-mono tracking-tighter"></p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-orange-400 bg-slate-800 shadow-sm flex items-center gap-4">
          <div className={`p-2 rounded-lg ${loading ? 'bg-slate-100 animate-pulse' : 'bg-orange-400'}`}>
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold leading-none mb-1 text-white/50">Target Entry</p>
            {loading ? <SkeletonText className="h-5 w-16" /> : <p className="text-md font-black text-orange-400">{data?.harga_entry || `0.000`}</p>}
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
                {loading ? (
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl">
                    <SkeletonText className="h-4 w-full" />
                    <SkeletonText className="h-4 w-[90%]" />
                    <SkeletonText className="h-4 w-[40%]" />
                  </div>
                ) : (
                  <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {data?.analisis_tren_momentum || "Klik analyze untuk melihat analisis tren."}
                  </p>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">2. Timing & Konfirmasi</h4>
                {loading ? (
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl">
                    <SkeletonText className="h-4 w-full" />
                    <SkeletonText className="h-4 w-[70%]" />
                  </div>
                ) : (
                  <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {data?.panduan_entry_timing || "Menunggu data entry..."}
                  </p>
                )}
              </div>
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2 italic flex place-items-center gap-2">
                  <LucideMessageSquareWarning className="w-4 h-4"/>
                  Invalidation Point
                </h4>
                {loading ? (
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl">
                    <SkeletonText className="h-4 w-full" />
                    <SkeletonText className="h-4 w-[70%]" />
                  </div>
                ) : (
                  <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {data?.invalidation_point || "Menunggu data entry..."}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR EXECUTION PLAN */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative h-full">
            <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" /> Execution Plan
            </h3>

            <div className="space-y-5">
              <div className='flex justify-between items-center p-3 rounded-xl bg-yellow-50 border border-yellow-200'>
                <span className={`text-xs font-bold text-yellow-600 uppercase`}>DIRECTION</span>
                  { loading ? (
                    <SkeletonText className="h-5 w-20" />
                  ) : (
                  <span className={`font-mono font-black text-yellow-600`}>{data?.rekomendasi || '---'}</span>
                )}
              </div>
              <div className='flex justify-between items-center p-3 rounded-xl bg-cyan-50 border border-cyan-200'>
                <span className={`text-xs font-bold text-cyan-600 uppercase`}>ENTRY POSITION</span>
                  { loading ? (
                    <SkeletonText className="h-5 w-20" />
                  ) : (
                  <span className={`font-mono font-black text-cyan-600`}>{data?.harga_entry || '---'}</span>
                )}
              </div>
              <div className='flex justify-between items-center p-3 rounded-xl bg-red-50 border border-red-200'>
                <span className={`text-xs font-bold text-red-600 uppercase`}>STOP LOSS</span>
                  { loading ? (
                    <SkeletonText className="h-5 w-20" />
                  ) : (
                  <span className={`font-mono font-black text-red-600`}>{data?.stop_loss || '---'}</span>
                )}
              </div>
              <div className='flex justify-between items-center p-3 rounded-xl bg-emerald-50 border border-emerald-200'>
                <span className={`text-xs font-bold text-emerald-600 uppercase`}>TAKE PROFIT</span>
                  { loading ? (
                    <SkeletonText className="h-5 w-20" />
                  ) : (
                  <span className={`font-mono font-black text-emerald-600`}>{data?.tp1 || '---'}</span>
                )}
              </div>
              <div className='flex justify-between items-center p-3 rounded-xl bg-amber-50 border border-amber-200'>
                <span className={`text-xs font-bold text-amber-600 uppercase`}>TAKE PROFIT 2</span>
                  { loading ? (
                    <SkeletonText className="h-5 w-20" />
                  ) : (
                  <span className={`font-mono font-black text-amber-600`}>{data?.tp2 || '---'}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
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
      </div> */}
    </div>
  );
}