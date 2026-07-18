export type Category = 'programmer' | 'analis' | 'desainer';

export interface MetricRow { 
  label: string; 
  before: string; 
  after: string; 
  improvement: string; 
}

export interface ArchRow { 
  component: string; 
  tech: string; 
  desc: string; 
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  image: string;
  tech: string[];
  link?: string;
  achievement?: string;
  accent: string;
  // Extended detail fields (from full case study docs)
  role?: string;
  team?: string;
  problem?: string[];
  solution?: string[];
  architecture?: ArchRow[];
  metrics?: MetricRow[];
  codeSnippet?: { lang: string; code: string };
}
