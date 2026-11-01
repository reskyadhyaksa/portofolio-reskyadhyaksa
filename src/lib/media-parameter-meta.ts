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
  "auto": {
    ratio: "auto",
    title: "Auto Framing",
    category: "square",
    useCase: "Model detects best composition automatically",
    numericRatio: 1,
  },
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
  "9:19.5": {
    ratio: "9:19.5",
    title: "Modern Smartphone",
    category: "portrait",
    useCase: "Bezel-less iPhone and Android vertical display",
    numericRatio: 9 / 19.5,
  },
  "19.5:9": {
    ratio: "19.5:9",
    title: "Smartphone Landscape",
    category: "ultrawide",
    useCase: "Full screen mobile panoramic presentation",
    numericRatio: 19.5 / 9,
  },
  "9:20": {
    ratio: "9:20",
    title: "Ultra Tall Screen",
    category: "portrait",
    useCase: "Tall ratio smartphone scrolling feeds",
    numericRatio: 9 / 20,
  },
  "20:9": {
    ratio: "20:9",
    title: "Cinematic Mobile",
    category: "ultrawide",
    useCase: "Mobile widescreen cinematic view",
    numericRatio: 20 / 9,
  },
  "7:5": {
    ratio: "7:5",
    title: "Photo Print",
    category: "landscape",
    useCase: "7x5 photo frame, print album",
    numericRatio: 7 / 5,
  },
  "5:7": {
    ratio: "5:7",
    title: "Portrait Print",
    category: "portrait",
    useCase: "5x7 vertical invitation, greeting card",
    numericRatio: 5 / 7,
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
  "512": {
    id: "512",
    title: "Draft 512px",
    badge: "512px",
    dimensionEstimate: "~512 × 512",
    detail: "Fast generation speed, ideal for rapid prototyping.",
  },
  "768": {
    id: "768",
    title: "Compact 768px",
    badge: "768px",
    dimensionEstimate: "~768 × 768",
    detail: "Optimized resolution for quick iterations.",
  },
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
  "1.5K": {
    id: "1.5K",
    title: "Enhanced 1.5K",
    badge: "1.5K",
    dimensionEstimate: "~1536 × 1536",
    detail: "High detail with fast rendering speed.",
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
