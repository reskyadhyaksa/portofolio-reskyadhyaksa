import type { ReactNode } from "react";
import {
  IMAGE_OUTPUT_FORMAT_OPTIONS,
  IMAGE_QUALITY_OPTIONS,
  IMAGE_SIZE_OPTIONS,
  isImageOutputFormatId,
  isImageQualityId,
  isImageSizeId,
  type ImageOptions,
} from "@/lib/image-options";
import ImageSizePicker from "./ImageSizePicker";
import SegmentedControl from "./SegmentedControl";

interface ImageOptionsPanelProps {
  options: ImageOptions;
  onChange: <Key extends keyof ImageOptions>(key: Key, value: ImageOptions[Key]) => void;
  disabled?: boolean;
}

function OptionGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="px-0.5 text-[11px] font-medium text-[#9aa0a6]">{title}</span>
      {children}
    </div>
  );
}

export default function ImageOptionsPanel({ options, onChange, disabled = false }: ImageOptionsPanelProps) {
  return (
    <div className="flex flex-col gap-3 px-2 pb-1 pt-2">
      <OptionGroup title="Size">
        <ImageSizePicker
          options={IMAGE_SIZE_OPTIONS}
          value={options.size}
          disabled={disabled}
          onChange={(sizeId) => isImageSizeId(sizeId) && onChange("size", sizeId)}
        />
      </OptionGroup>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <OptionGroup title="Quality">
          <SegmentedControl
            label="Image quality"
            options={IMAGE_QUALITY_OPTIONS}
            value={options.quality}
            disabled={disabled}
            onChange={(qualityId) => isImageQualityId(qualityId) && onChange("quality", qualityId)}
          />
        </OptionGroup>
        <OptionGroup title="Format">
          <SegmentedControl
            label="Output format"
            options={IMAGE_OUTPUT_FORMAT_OPTIONS}
            value={options.outputFormat}
            disabled={disabled}
            onChange={(formatId) => isImageOutputFormatId(formatId) && onChange("outputFormat", formatId)}
          />
        </OptionGroup>
      </div>
    </div>
  );
}
