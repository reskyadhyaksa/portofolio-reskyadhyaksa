interface SkeletonTextProps {
  className: string;
}

export default function SkeletonText({ className }: SkeletonTextProps) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>;
}
