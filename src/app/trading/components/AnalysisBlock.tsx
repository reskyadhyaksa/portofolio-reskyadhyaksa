import type { ReactNode } from "react";
import SkeletonText from "./SkeletonText";

const ANALYSIS_TEXT_CLASS_NAME =
  "text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100";

interface AnalysisBlockProps {
  heading: ReactNode;
  headingClassName: string;
  wrapperClassName?: string;
  isLoading: boolean;
  skeletonWidths: string[];
  text: string | undefined;
  fallbackText: string;
}

export default function AnalysisBlock({
  heading,
  headingClassName,
  wrapperClassName,
  isLoading,
  skeletonWidths,
  text,
  fallbackText,
}: AnalysisBlockProps) {
  return (
    <div className={wrapperClassName}>
      <h4 className={headingClassName}>{heading}</h4>
      {isLoading ? (
        <div className="space-y-2 bg-slate-50 p-4 rounded-xl">
          {skeletonWidths.map((width) => (
            <SkeletonText key={width} className={`h-4 ${width}`} />
          ))}
        </div>
      ) : (
        <p className={ANALYSIS_TEXT_CLASS_NAME}>{text || fallbackText}</p>
      )}
    </div>
  );
}
