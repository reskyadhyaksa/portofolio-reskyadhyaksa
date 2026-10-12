const LINK_LABEL_RULES: { pattern: string; label: string }[] = [
  { pattern: "github.com", label: "GitHub" },
  { pattern: "drive.google.com", label: "Drive" },
  { pattern: "colab", label: "Colab" },
];

export function getLinkLabel(url: string | null | undefined): string {
  if (!url) return "Overview";
  const lowerUrl = url.toLowerCase();
  return LINK_LABEL_RULES.find((rule) => lowerUrl.includes(rule.pattern))?.label ?? "Overview";
}
