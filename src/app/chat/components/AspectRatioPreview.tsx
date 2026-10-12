interface AspectRatioPreviewProps {
  width: number;
  height: number;
  boxSize?: number;
  className?: string;
}

export default function AspectRatioPreview({ width, height, boxSize = 28, className = "" }: AspectRatioPreviewProps) {
  const longestSide = Math.max(width, height);
  const previewWidth = Math.round((width / longestSide) * boxSize);
  const previewHeight = Math.round((height / longestSide) * boxSize);

  return (
    <span aria-hidden="true" style={{ width: boxSize, height: boxSize }} className="flex shrink-0 items-center justify-center">
      <span
        style={{ width: previewWidth, height: previewHeight }}
        className={`block rounded-[3px] border border-current bg-current/10 ${className}`}
      />
    </span>
  );
}
