import type { ReactNode } from "react";

interface ModelCardGridProps {
  label: string;
  children: ReactNode;
}

export default function ModelCardGrid({ label, children }: ModelCardGridProps) {
  return (
    <ul aria-label={label} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  );
}
