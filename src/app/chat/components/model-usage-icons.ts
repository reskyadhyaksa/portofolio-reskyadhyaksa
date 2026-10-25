import { Brain, MessageCircle, Zap, Image as ImageIcon, FileText, Video, Mic, Sparkles, type LucideIcon } from "lucide-react";
import type { ModelUsage, CapabilityFilterKey } from "@/lib/model-catalog";

export const USAGE_ICONS: Record<ModelUsage, LucideIcon> = {
  fast: Zap,
  daily: MessageCircle,
  complex: Brain,
};

export const CAPABILITY_ICONS: Record<CapabilityFilterKey, LucideIcon> = {
  image: ImageIcon,
  file: FileText,
  video: Video,
  audio: Mic,
  reasoning: Brain,
  free: Sparkles,
};
