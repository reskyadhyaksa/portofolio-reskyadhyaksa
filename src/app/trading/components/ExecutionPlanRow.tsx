import SkeletonText from "./SkeletonText";
import type { ExecutionTone } from "../trading-types";

const EXECUTION_TONE_CLASSES: Record<ExecutionTone, { container: string; text: string }> = {
  yellow: { container: "bg-yellow-50 border-yellow-200", text: "text-yellow-600" },
  cyan: { container: "bg-cyan-50 border-cyan-200", text: "text-cyan-600" },
  red: { container: "bg-red-50 border-red-200", text: "text-red-600" },
  emerald: { container: "bg-emerald-50 border-emerald-200", text: "text-emerald-600" },
  amber: { container: "bg-amber-50 border-amber-200", text: "text-amber-600" },
};

interface ExecutionPlanRowProps {
  label: string;
  value: string | undefined;
  tone: ExecutionTone;
  isLoading: boolean;
}

export default function ExecutionPlanRow({ label, value, tone, isLoading }: ExecutionPlanRowProps) {
  const toneClasses = EXECUTION_TONE_CLASSES[tone];

  return (
    <div className={`flex justify-between items-center p-3 rounded-xl border ${toneClasses.container}`}>
      <span className={`text-xs font-bold uppercase ${toneClasses.text}`}>{label}</span>
      {isLoading ? (
        <SkeletonText className="h-5 w-20" />
      ) : (
        <span className={`font-mono font-black ${toneClasses.text}`}>{value || "---"}</span>
      )}
    </div>
  );
}
