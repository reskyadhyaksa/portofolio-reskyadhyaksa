interface ActiveIndicatorProps {
  isVisible: boolean;
}

export default function ActiveIndicator({ isVisible }: ActiveIndicatorProps) {
  if (!isVisible) return null;

  return (
    <span
      aria-hidden="true"
      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] w-3 rounded-full bg-slate-300"
    />
  );
}
