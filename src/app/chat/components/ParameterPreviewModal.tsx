"use client";
import { useMemo, useState } from "react";
import {
  Check,
  Clock,
  Layers,
  Monitor,
  Smartphone,
  Square,
  Tv,
} from "lucide-react";
import { getAspectRatioMeta, getResolutionMeta } from "@/lib/media-parameter-meta";
import ModalDialog from "./ModalDialog";

interface ParameterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "image" | "video";
  modelName: string;
  availableAspectRatios: readonly string[];
  selectedAspectRatio: string;
  onSelectAspectRatio: (ratio: string) => void;
  availableResolutions?: readonly string[] | null;
  selectedResolution?: string;
  onSelectResolution?: (resolution: string) => void;
  availableDurations?: readonly number[];
  selectedDuration?: number;
  onSelectDuration?: (duration: number) => void;
  maxInputImages?: number | null;
}

export default function ParameterPreviewModal({
  isOpen,
  onClose,
  mode,
  modelName,
  availableAspectRatios,
  selectedAspectRatio,
  onSelectAspectRatio,
  availableResolutions,
  selectedResolution,
  onSelectResolution,
  availableDurations,
  selectedDuration,
  onSelectDuration,
  maxInputImages,
}: ParameterPreviewModalProps) {
  const isVideo = mode === "video";

  const [floatingTooltip, setFloatingTooltip] = useState<{
    title: string;
    detail: string;
    x: number;
    y: number;
  } | null>(null);

  const currentAspectMeta = useMemo(
    () => getAspectRatioMeta(selectedAspectRatio),
    [selectedAspectRatio]
  );

  const currentResMeta = useMemo(
    () => (selectedResolution ? getResolutionMeta(selectedResolution) : null),
    [selectedResolution]
  );

  const normalizedCssRatio = useMemo(() => {
    const parts = selectedAspectRatio.split(":");
    if (parts.length === 2) {
      const width = parseFloat(parts[0]);
      const height = parseFloat(parts[1]);
      if (!isNaN(width) && !isNaN(height) && height > 0) {
        return `${width} / ${height}`;
      }
    }
    return "1 / 1";
  }, [selectedAspectRatio]);

  const CategoryIcon = useMemo(() => {
    if (currentAspectMeta.category === "square") return Square;
    if (currentAspectMeta.category === "portrait") return Smartphone;
    if (currentAspectMeta.category === "ultrawide") return Tv;
    return Monitor;
  }, [currentAspectMeta.category]);

  const handleCardMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement>,
    title: string,
    detail: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clampedX = Math.max(120, Math.min(window.innerWidth - 120, rect.left + rect.width / 2));
    setFloatingTooltip({
      title,
      detail,
      x: clampedX,
      y: rect.top - 6,
    });
  };

  const handleCardMouseLeave = () => {
    setFloatingTooltip(null);
  };

  return (
    <ModalDialog
      isOpen={isOpen}
      size="lg"
      title={isVideo ? "Video Parameters & Framing Preview" : "Image Parameters & Framing Preview"}
      subtitle={`${modelName} · Visual framing, resolution clarity, and duration controls.`}
      onClose={onClose}
    >
      <div
        onScroll={handleCardMouseLeave}
        className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-6"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-3.5 lg:col-span-5">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">
                Live Framing Viewfinder
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-0.5 text-[9.5px] font-mono text-slate-300">
                <CategoryIcon className="h-3 w-3 text-slate-400" />
                <span>{currentAspectMeta.title}</span>
              </span>
            </div>

            <div className="relative flex min-h-[250px] sm:min-h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.12] bg-[#161718] p-4 shadow-inner">
              <div className="pointer-events-none absolute inset-3 rounded-xl border border-dashed border-white/[0.08]" />

              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-slate-500" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-slate-500" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-slate-500" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-slate-500" />

              <div
                style={{ aspectRatio: normalizedCssRatio }}
                className={`relative flex max-h-[190px] max-w-[92%] items-center justify-center rounded-xl border transition-all duration-300 shadow-2xl ${
                  isVideo
                    ? "border-purple-500/50 bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-slate-900/80 shadow-purple-950/30"
                    : "border-cyan-500/50 bg-gradient-to-br from-cyan-950/40 via-cyan-900/20 to-slate-900/80 shadow-cyan-950/30"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-25">
                  <div className="border-b border-r border-white/20" />
                  <div className="border-b border-r border-white/20" />
                  <div className="border-b border-r border-white/20" />
                  <div className="border-b border-r border-white/20" />
                  <div className="border-b border-r border-white/20" />
                  <div className="border-b border-r border-white/20" />
                  <div className="border-r border-white/20" />
                  <div className="border-r border-white/20" />
                  <div />
                </div>

                <div className="relative flex flex-col items-center justify-center p-2.5 text-center">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-mono font-bold shadow-sm ${
                      isVideo
                        ? "bg-purple-500/20 text-purple-200 border border-purple-500/30"
                        : "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30"
                    }`}
                  >
                    {selectedAspectRatio}
                  </span>
                  <span className="mt-0.5 text-[9.5px] font-medium text-slate-300">
                    {currentAspectMeta.title}
                  </span>
                  {currentResMeta && (
                    <span className="mt-0.5 text-[8.5px] font-mono text-slate-400">
                      {currentResMeta.dimensionEstimate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
              <div className="flex items-start justify-between gap-2 text-[10px]">
                <span className="text-slate-400 shrink-0">Recommended For:</span>
                <span className="font-medium text-slate-200 text-right leading-relaxed">
                  {currentAspectMeta.useCase}
                </span>
              </div>
              {currentResMeta && (
                <div className="flex items-center justify-between gap-2 text-[10px] border-t border-white/[0.06] pt-1.5">
                  <span className="text-slate-400 shrink-0">Resolution Standard:</span>
                  <span className="font-semibold text-slate-200 text-right">
                    {currentResMeta.badge} ({currentResMeta.dimensionEstimate})
                  </span>
                </div>
              )}
              {isVideo && selectedDuration !== undefined && (
                <div className="flex items-center justify-between gap-2 text-[10px] border-t border-white/[0.06] pt-1.5">
                  <span className="text-slate-400 shrink-0">Target Duration:</span>
                  <span className="font-semibold text-purple-300 font-mono text-right">{selectedDuration} Seconds</span>
                </div>
              )}
              {maxInputImages !== null && maxInputImages !== undefined && (
                <div className="flex items-center justify-between gap-2 text-[10px] border-t border-white/[0.06] pt-1.5">
                  <span className="text-slate-400 shrink-0">Max Reference Images:</span>
                  <span className="font-semibold text-cyan-300 font-mono text-right">
                    {maxInputImages} {maxInputImages === 1 ? "Image" : "Images"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-7">
            <section className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-200">
                  <CategoryIcon className={`h-3 w-3 ${isVideo ? "text-purple-400" : "text-cyan-400"}`} />
                  <span>Aspect Ratio ({availableAspectRatios.length} available)</span>
                </div>
                <span className="text-[9.5px] text-slate-400">Pick frame proportion</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                {availableAspectRatios.map((ratio) => {
                  const meta = getAspectRatioMeta(ratio);
                  const isSelected = ratio === selectedAspectRatio;
                  return (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => onSelectAspectRatio(ratio)}
                      onMouseEnter={(e) => handleCardMouseEnter(e, `${meta.title} (${ratio})`, meta.useCase)}
                      onMouseLeave={handleCardMouseLeave}
                      className={`group relative flex flex-col justify-between rounded-xl border p-2 text-left transition-all ${
                        isSelected
                          ? isVideo
                            ? "border-purple-400 bg-purple-500/[0.12] shadow-sm shadow-purple-500/20 ring-1 ring-purple-400"
                            : "border-cyan-400 bg-cyan-500/[0.12] shadow-sm shadow-cyan-500/20 ring-1 ring-cyan-400"
                          : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10.5px] font-bold text-white">
                          {ratio}
                        </span>
                        {isSelected && (
                          <span
                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-slate-900 ${
                              isVideo ? "bg-purple-400" : "bg-cyan-400"
                            }`}
                          >
                            <Check className="h-2 w-2 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        <p className="text-[9.5px] font-semibold text-slate-200 leading-tight truncate">
                          {meta.title}
                        </p>
                        <p className="mt-0.5 text-[8.5px] text-slate-400 line-clamp-1 leading-tight">
                          {meta.useCase}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {availableResolutions && availableResolutions.length > 0 && onSelectResolution && (
              <section className="flex flex-col gap-2 border-t border-white/[0.06] pt-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-200">
                    <Layers className={`h-3 w-3 ${isVideo ? "text-purple-400" : "text-cyan-400"}`} />
                    <span>Resolution Quality ({availableResolutions.length} supported)</span>
                  </div>
                  <span className="text-[9.5px] text-slate-400">Pixel density & fidelity</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {availableResolutions.map((res) => {
                    const meta = getResolutionMeta(res);
                    const isSelected = res === selectedResolution;
                    return (
                      <button
                        key={res}
                        type="button"
                        onClick={() => onSelectResolution(res)}
                        onMouseEnter={(e) => handleCardMouseEnter(e, `${meta.title} (${res})`, `${meta.dimensionEstimate} · ${meta.detail}`)}
                        onMouseLeave={handleCardMouseLeave}
                        className={`group relative flex flex-col justify-between rounded-xl border p-2 text-left transition-all ${
                          isSelected
                            ? isVideo
                              ? "border-purple-400 bg-purple-500/[0.12] shadow-sm shadow-purple-500/20 ring-1 ring-purple-400"
                              : "border-cyan-400 bg-cyan-500/[0.12] shadow-sm shadow-cyan-500/20 ring-1 ring-cyan-400"
                            : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10.5px] font-bold text-white">
                            {res}
                          </span>
                          <span className="rounded bg-white/[0.06] px-1 py-0.5 text-[8.5px] font-mono text-slate-300">
                            {meta.badge}
                          </span>
                        </div>
                        <div className="mt-1">
                          <p className="text-[9.5px] font-semibold text-slate-200 leading-tight truncate">
                            {meta.title}
                          </p>
                          <p className="mt-0.5 text-[8.5px] text-slate-400 line-clamp-1 leading-tight">
                            {meta.dimensionEstimate}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {isVideo && availableDurations && availableDurations.length > 0 && onSelectDuration && (
              <section className="flex flex-col gap-2 border-t border-white/[0.06] pt-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-200">
                    <Clock className="h-3 w-3 text-purple-400" />
                    <span>Video Duration ({availableDurations.length} options)</span>
                  </div>
                  <span className="text-[9.5px] text-slate-400">Total generated footage</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {availableDurations.map((sec) => {
                    const isSelected = sec === selectedDuration;
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => onSelectDuration(sec)}
                        onMouseEnter={(e) => handleCardMouseEnter(e, `${sec}s Video Duration`, "Total generated video footage")}
                        onMouseLeave={handleCardMouseLeave}
                        className={`flex items-center gap-1 rounded-xl border px-2.5 py-1 text-[10px] font-mono font-semibold transition-all ${
                          isSelected
                            ? "border-purple-400 bg-purple-500/[0.16] text-purple-200 shadow-sm shadow-purple-500/20 ring-1 ring-purple-400"
                            : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <span>{sec}s</span>
                        {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-end gap-2 border-t border-white/[0.06] px-4 py-2.5 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-md transition-all active:scale-95 ${
            isVideo
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110"
              : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110"
          }`}
        >
          <Check className="h-3 w-3 stroke-[2.5]" />
          <span>Apply Parameters</span>
        </button>
      </footer>

      {floatingTooltip && (
        <div
          style={{
            position: "fixed",
            left: `${floatingTooltip.x}px`,
            top: `${floatingTooltip.y}px`,
            transform: "translate(-50%, -100%)",
          }}
          className="pointer-events-none z-[100] flex max-w-[280px] sm:max-w-xs flex-col items-center animate-fade-in-soft"
        >
          <div className="rounded-lg border border-white/[0.18] bg-[#1e1f20]/95 px-2.5 py-1 text-[9.5px] font-medium text-slate-200 shadow-2xl backdrop-blur-md text-center leading-snug">
            <span className="font-bold text-white">{floatingTooltip.title}</span>
            <span className="text-slate-300">: {floatingTooltip.detail}</span>
          </div>
          <div className="h-1 w-2 border-x-4 border-t-4 border-x-transparent border-t-[#1e1f20]" />
        </div>
      )}
    </ModalDialog>
  );
}
