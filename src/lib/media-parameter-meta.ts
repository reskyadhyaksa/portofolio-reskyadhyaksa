export interface AspectRatioMeta {
  ratio: string;
  title: string;
  category: "square" | "landscape" | "portrait" | "ultrawide";
  useCase: string;
  numericRatio: number;
}

export interface ResolutionMeta {
  id: string;
  title: string;
  badge: string;
  dimensionEstimate: string;
  detail: string;
}

const DEFAULT_ASPECT_META: AspectRatioMeta = {
  ratio: "1:1",
  title: "Square",
  category: "square",
  useCase: "Instagram, Profile Picture, Avatar",
  numericRatio: 1,
};

const ASPECT_RATIO_PREVIEWS: Record<string, AspectRatioMeta> = {
  "1:1": {
    ratio: "1:1",
    title: "Square",
    category: "square",
    useCase: "Instagram post, Profile avatar, Album artwork",
    numericRatio: 1,
  },
  "16:9": {
    ratio: "16:9",
    title: "Widescreen",
    category: "landscape",
    useCase: "YouTube, Desktop monitors, TV display",
    numericRatio: 16 / 9,
  },
  "9:16": {
    ratio: "9:16",
    title: "Vertical Story",
    category: "portrait",
    useCase: "TikTok, Instagram Reels, YouTube Shorts",
    numericRatio: 9 / 16,
  },
  "4:3": {
    ratio: "4:3",
    title: "Classic Standard",
    category: "landscape",
    useCase: "Standard photo, Tablets, Retro screens",
    numericRatio: 4 / 3,
  },
  "3:4": {
    ratio: "3:4",
    title: "Standard Portrait",
    category: "portrait",
    useCase: "Portrait photography, E-commerce products",
    numericRatio: 3 / 4,
  },
  "3:2": {
    ratio: "3:2",
    title: "35mm Photo",
    category: "landscape",
    useCase: "DSLR cameras, Print magazines, Editorial",
    numericRatio: 3 / 2,
  },
  "2:3": {
    ratio: "2:3",
    title: "Tall Portrait",
    category: "portrait",
    useCase: "Book covers, Posters, Pinterest pins",
    numericRatio: 2 / 3,
  },
  "21:9": {
    ratio: "21:9",
    title: "Cinematic Ultrawide",
    category: "ultrawide",
    useCase: "Cinematic movies, Curved ultra-wide displays",
    numericRatio: 21 / 9,
  },
  "9:21": {
    ratio: "9:21",
    title: "Ultra Tall Story",
    category: "portrait",
    useCase: "Full smartphone scrolling feeds",
    numericRatio: 9 / 21,
  },
  "2:1": {
    ratio: "2:1",
    title: "Univisium",
    category: "landscape",
    useCase: "Modern streaming series, Cinematic banners",
    numericRatio: 2 / 1,
  },
  "1:2": {
    ratio: "1:2",
    title: "Tall Column",
    category: "portrait",
    useCase: "Smartphone story tall format",
    numericRatio: 1 / 2,
  },
  "4:5": {
    ratio: "4:5",
    title: "Social Portrait",
    category: "portrait",
    useCase: "Instagram feed vertical post",
    numericRatio: 4 / 5,
  },
  "5:4": {
    ratio: "5:4",
    title: "Large Format",
    category: "landscape",
    useCase: "Art gallery prints, Photography frames",
    numericRatio: 5 / 4,
  },
  "1:4": {
    ratio: "1:4",
    title: "Vertical Banner",
    category: "portrait",
    useCase: "Skyscraper banner ads",
    numericRatio: 1 / 4,
  },
  "4:1": {
    ratio: "4:1",
    title: "Horizontal Banner",
    category: "ultrawide",
    useCase: "Website headers, Panoramic showcases",
    numericRatio: 4 / 1,
  },
  "1:8": {
    ratio: "1:8",
    title: "Tower Banner",
    category: "portrait",
    useCase: "Vertical skyscraper column",
    numericRatio: 1 / 8,
  },
  "8:1": {
    ratio: "8:1",
    title: "Panoramic Billboard",
    category: "ultrawide",
    useCase: "Horizontal panorama header",
    numericRatio: 8 / 1,
  },
};

const DEFAULT_RES_META: ResolutionMeta = {
  id: "default",
  title: "Standard",
  badge: "Standard",
  dimensionEstimate: "Optimal",
  detail: "Auto-tuned resolution by model.",
};

const RESOLUTION_PREVIEWS: Record<string, ResolutionMeta> = {
  "720p": {
    id: "720p",
    title: "High Definition",
    badge: "HD",
    dimensionEstimate: "~1280 × 720",
    detail: "Fast generation speed, great for rapid drafts and mobile sharing.",
  },
  "1080p": {
    id: "1080p",
    title: "Full High Definition",
    badge: "FHD",
    dimensionEstimate: "~1920 × 1080",
    detail: "Crisp clarity, the standard for desktop monitors and video streams.",
  },
  "1K": {
    id: "1K",
    title: "Standard 1K",
    badge: "1K",
    dimensionEstimate: "~1024 × 1024",
    detail: "Balanced detail and quick rendering speed for image assets.",
  },
  "2K": {
    id: "2K",
    title: "Quad HD",
    badge: "2K QHD",
    dimensionEstimate: "~2048 × 1152",
    detail: "High fidelity with rich textures for digital illustrations and art.",
  },
  "4K": {
    id: "4K",
    title: "Ultra HD",
    badge: "4K UHD",
    dimensionEstimate: "~3840 × 2160",
    detail: "Studio-grade sharpness with maximum detail for hero showcases.",
  },
};

export function getAspectRatioMeta(ratio: string): AspectRatioMeta {
  return ASPECT_RATIO_PREVIEWS[ratio] ?? {
    ratio,
    title: ratio,
    category: "landscape",
    useCase: "Custom framing",
    numericRatio: 1,
  };
}

export function getResolutionMeta(resolution: string): ResolutionMeta {
  return RESOLUTION_PREVIEWS[resolution] ?? {
    id: resolution,
    title: resolution,
    badge: resolution,
    dimensionEstimate: "Dynamic",
    detail: "High-resolution output generated by model.",
  };
}
