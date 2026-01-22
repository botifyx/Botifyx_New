
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Industry {
  name: string;
  description: string;
  icon: string;
  id?: string;
}

export interface EcosystemPlatform {
  category: string;
  name: string;
  description: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  stat: string;
  context: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  whatWeBuild: string[];
  aiEmbeddedIn?: string[];
  problemsSolved?: string[];
  whyDifferent?: { title: string; description: string }[];
  idealFor: string[];
  technologies?: string[];
  focusAreas?: string[];
  standards?: string[];
  // Fix: Added missing optional properties used in ServiceDetailView in App.tsx
  detailedContent?: string;
  keyComparisons?: { feature: string; basic: string; advanced: string }[];
  useCaseScenarios?: { title: string; desc: string }[];
  governanceFramework?: string[];
}

export interface IndustryDetail {
  id: string;
  name: string;
  seoTitle?: string;
  metaDescription?: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  challenges: string[];
  solutions: string[];
  useCases: { title: string; description: string; icon: string }[];
  outcomes: { label: string; value: string }[];
  whyBotifyX: string;
  ctaText: string;
}