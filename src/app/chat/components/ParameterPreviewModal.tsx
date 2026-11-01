"use client";
import { useMemo } from "react";
import {
  Check,
  Clock,
  Film,
  Image as ImageIcon,
  Layers,
  Monitor,
  Smartphone,
  Sparkles,
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
  const themeAccent = isVideo ? "purple" : "cyan";

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

  return (
    <ModalDialog
      isOpen={isOpen}
      size="lg"
      title={isVideo ? "Video Parameters & Framing Preview" : "Image Parameters & Framing Preview"}
      subtitle={`${modelName} · Visual framing, resolution clarity, and duration controls.`}
      onClose={onClose}
    >
      <div className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-3.5 lg:col-span-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Live Framing Viewfinder
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] font-mono text-slate-300">
                <CategoryIcon className="h-3 w-3 text-slate-400" />
                <span>{currentAspectMeta.title}</span>
              </span>
            </div>

            <div className="relative flex min-h-[260px] sm:min-h-[290px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.12] bg-[#161718] p-4 shadow-inner">
              <div className="pointer-events-none absolute inset-3 rounded-xl border border-dashed border-white/[0.08]" />

              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-slate-500" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-slate-500" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-slate-500" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-slate-500" />

              <div
                style={{ aspectRatio: normalizedCssRatio }}
                className={`relative flex max-h-[200px] max-w-[92%] items-center justify-center rounded-xl border transition-all duration-300 shadow-2xl ${
                  isVideo
                    ? "border-purple-500/50 bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-slate-900/80 shadow-purple-950/30"
                    : "border-cyan-500/50 bg-gradient-to-br from-cyan-950/40 via-cyan-900/20 to-slate-900/80 shadow-cyan-950/30"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-25">
                  <div className="border-b border-r border-white/20" />
                  <div className="border-b border-r border-white/20" />
                  <div className="border-b border-white/20" />
                  <div className="border-b border-r border-white/20" />
                  <div className="border-b border-r border-white/20" />
                  <div className="border-b border-white/20" />
                  <div className="border-r border-white/20" />
                  <div className="border-r border-white/20" />
                  <div />
                </div>

                <div className="relative flex flex-col items-center justify-center p-3 text-center">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-mono font-bold shadow-sm ${
                      isVideo
                        ? "bg-purple-500/20 text-purple-200 border border-purple-500/30"
                        : "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30"
                    }`}
                  >
                    {selectedAspectRatio}
                  </span>
                  <span className="mt-1 text-[11px] font-medium text-slate-300">
                    {currentAspectMeta.title}
                  </span>
                  {currentResMeta && (
                    <span className="mt-0.5 text-[10px] font-mono text-slate-400">
                      {currentResMeta.dimensionEstimate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Recommended For:</span>
                <span className="font-semibold text-slate-200 text-right truncate max-w-[200px]">
                  {currentAspectMeta.useCase}
                </span>
              </div>
              {currentResMeta && (
                <div className="flex items-center justify-between text-xs border-t border-white/[0.06] pt-2">
                  <span className="text-slate-400">Resolution Standard:</span>
                  <span className="font-semibold text-slate-200">{currentResMeta.badge} ({currentResMeta.dimensionEstimate})</span>
                </div>
              )}
              {isVideo && selectedDuration !== undefined && (
                <div className="flex items-center justify-between text-xs border-t border-white/[0.06] pt-2">
                  <span className="text-slate-400">Target Duration:</span>
                  <span className="font-semibold text-purple-300 font-mono">{selectedDuration} Seconds</span>
                </div>
              )}
              {maxInputImages !== null && maxInputImages !== undefined && (
                <div className="flex items-center justify-between text-xs border-t border-white/[0.06] pt-2">
                  <span className="text-slate-400">Max Reference Images:</span>
                  <span className="font-semibold text-cyan-300 font-mono">{maxInputImages} {maxInputImages === 1 ? "Image" : "Images"}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-7">
            <section className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <CategoryIcon className={`h-3.5 w-3.5 ${isVideo ? "text-purple-400" : "text-cyan-400"}`} />
                  <span>Aspect Ratio ({availableAspectRatios.length} available)</span>
                </div>
                <span className="text-[11px] text-slate-400">Pick frame proportion</span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {availableAspectRatios.map((ratio) => {
                  const meta = getAspectRatioMeta(ratio);
                  const isSelected = ratio === selectedAspectRatio;
                  return (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => onSelectAspectRatio(ratio)}
                      className={`group relative flex flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                        isSelected
                          ? isVideo
                            ? "border-purple-400 bg-purple-500/[0.12] shadow-sm shadow-purple-500/20 ring-1 ring-purple-400"
                            : "border-cyan-400 bg-cyan-500/[0.12] shadow-sm shadow-cyan-500/20 ring-1 ring-cyan-400"
                          : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-mono text-xs font-bold text-white">
                          {ratio}
                        </span>
                        {isSelected && (
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-slate-900 ${
                              isVideo ? "bg-purple-400" : "bg-cyan-400"
                            }`}
                          >
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        <p className="text-[11px] font-medium text-slate-200 leading-tight">
                          {meta.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-400 line-clamp-1">
                          {meta.useCase}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {availableResolutions && availableResolutions.length > 0 && onSelectResolution && (
              <section className="flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                    <Layers className={`h-3.5 w-3.5 ${isVideo ? "text-purple-400" : "text-cyan-400"}`} />
                    <span>Resolution Quality ({availableResolutions.length} supported)</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Pixel density & fidelity</span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {availableResolutions.map((res) => {
                    const meta = getResolutionMeta(res);
                    const isSelected = res === selectedResolution;
                    return (
                      <button
                        key={res}
                        type="button"
                        onClick={() => onSelectResolution(res)}
                        className={`group relative flex flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                          isSelected
                            ? isVideo
                              ? "border-purple-400 bg-purple-500/[0.12] shadow-sm shadow-purple-500/20 ring-1 ring-purple-400"
                              : "border-cyan-400 bg-cyan-500/[0.12] shadow-sm shadow-cyan-500/20 ring-1 ring-cyan-400"
                            : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="font-mono text-xs font-bold text-white">
                            {res}
                          </span>
                          <span className="rounded bg-white/[0.06] px-1 py-0.5 text-[9.5px] font-mono text-slate-300">
                            {meta.badge}
                          </span>
                        </div>
                        <div className="mt-1">
                          <p className="text-[11px] font-medium text-slate-200 leading-tight">
                            {meta.title}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-400 line-clamp-1">
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
              <section className="flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                    <Clock className="h-3.5 w-3.5 text-purple-400" />
                    <span>Video Duration ({availableDurations.length} options)</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Total generated footage</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableDurations.map((sec) => {
                    const isSelected = sec === selectedDuration;
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => onSelectDuration(sec)}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-mono font-semibold transition-all ${
                          isSelected
                            ? "border-purple-400 bg-purple-500/[0.16] text-purple-200 shadow-sm shadow-purple-500/20 ring-1 ring-purple-400"
                            : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <span>{sec}s</span>
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-end gap-2 border-t border-white/[0.06] px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition-all active:scale-95 ${
            isVideo
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110"
              : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110"
          }`}
        >
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Apply Parameters</span>
        </button>
      </footer>
    </ModalDialog>
  );
}
