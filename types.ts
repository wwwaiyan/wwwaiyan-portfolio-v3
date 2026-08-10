
export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // We will map string names to Lucide icons
}

export interface Job {
  company: string;
  role: string;
  period: string;
  description: string[];
  highlightIndexes?: number[];
}

export interface SkillCategory {
  category: string;
  items: string[];
  evidence: string;
}

export interface Achievement {
  title: string;
  category: 'CI/CD' | 'Security' | 'Observability';
  description: string[];
  metric: string;
  evidence: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date?: string; // Made optional as resume didn't specify dates for all
  url: string;
  logo: string; // URL to the certificate logo
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: {
    email: string;
  };
  links: SocialLink[];
  experience: Job[];
  skills: SkillCategory[];
  achievements: Achievement[];
  certificates: Certificate[];
}
