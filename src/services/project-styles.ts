const CATEGORY_BADGE_STYLES: Record<string, string> = {
  web: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  ml: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  data: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

const DEFAULT_CATEGORY_BADGE_STYLE = "bg-blue-500/15 text-blue-300 border-blue-500/30";

export function getCategoryStyles(category: string): string {
  return CATEGORY_BADGE_STYLES[category] ?? DEFAULT_CATEGORY_BADGE_STYLE;
}
