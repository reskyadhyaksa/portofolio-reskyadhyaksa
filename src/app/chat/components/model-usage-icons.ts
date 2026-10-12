import { Brain, MessageCircle, Zap, type LucideIcon } from "lucide-react";
import type { ModelUsage } from "@/lib/model-catalog";

export const USAGE_ICONS: Record<ModelUsage, LucideIcon> = {
  fast: Zap,
  daily: MessageCircle,
  complex: Brain,
};
