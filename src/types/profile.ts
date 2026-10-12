export interface WorkExperience {
  company: string;
  location: string;
  period: string;
  role: string;
  bullets: string[];
}

export interface OrganizationalExperience {
  title: string;
  period: string;
  role: string;
  bullets: string[];
}

export interface EducationEntry {
  institution: string;
  location: string;
  period: string;
  degree: string;
  bullets: string[];
}

export interface SkillGroups {
  proficient: string[];
  experienced: string[];
  skilled: string[];
  soft: string[];
  languages: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
}
