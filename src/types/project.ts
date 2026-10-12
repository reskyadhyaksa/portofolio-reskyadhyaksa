export interface ProjectCategory {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  tech: string[];
  category: string;
  summary: string;
  bullets: string[];
  image?: string;
  detailUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
  desc: string;
}

export interface ArchitectureStep {
  step: string;
  name: string;
  desc: string;
}

export interface ProjectArchitecture {
  title: string;
  flow: ArchitectureStep[];
}

export interface ProjectCodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

export interface InfrastructureItem {
  label: string;
  value: string;
  color: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  liveUrl?: string;
  githubUrl?: string;
  image: string | null;
  role: string;
  roleType: string;
  timeline: string;
  status: string;
  metrics: ProjectMetric[];
  about: string[];
  architecture: ProjectArchitecture;
  codeSnippet: ProjectCodeSnippet;
  features: ProjectFeature[];
  techStack: string[];
  infrastructure: InfrastructureItem[];
}

export interface AdjacentProjects {
  prev: ProjectDetail | null;
  next: ProjectDetail | null;
}
