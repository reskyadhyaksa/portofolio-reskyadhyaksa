import { PROVIDER_LOGOS } from "./provider-logos";
import type { ModelProvider } from "@/lib/model-catalog";

interface ProviderLogoIconProps {
  provider: ModelProvider;
  className?: string;
}

export default function ProviderLogoIcon({ provider, className = "h-4 w-4" }: ProviderLogoIconProps) {
  const logo = PROVIDER_LOGOS[provider] ?? PROVIDER_LOGOS.gpt;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={`${className} ${logo.tintClassName}`}>
      {logo.paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}
