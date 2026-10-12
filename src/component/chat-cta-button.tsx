import Link from "next/link";
import { Sparkles } from "lucide-react";

interface ChatCtaButtonProps {
  href?: string;
  label?: string;
}

export default function ChatCtaButton({
  href = "/chat",
  label = "Chat with AI",
}: ChatCtaButtonProps) {
  return (
    <Link
      href={href}
      className="pointer-events-auto flex w-fit cursor-pointer items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-6 py-2 text-xs font-bold text-white backdrop-blur-xl transition-all duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:scale-95 sm:text-sm lg:text-base"
    >
      <Sparkles aria-hidden="true" className="h-4 w-4" />
      {label}
    </Link>
  );
}
