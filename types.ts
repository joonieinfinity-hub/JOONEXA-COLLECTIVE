/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export enum ProjectCategory {
  WEB_DESIGN = 'Web Design',
  MARKETING_CAMPAIGNS = 'Marketing Campaigns',
  INFLUENCER_CAMPAIGNS = 'Influencer Campaigns',
  BRAND_GROWTH = 'Brand Growth',
  CREATIVE_DIRECTION = 'Creative Direction',
}

export interface CaseStudyMedia {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface CaseStudyExecution {
  title: string;
  content: string;
  media?: CaseStudyMedia[];
}

export interface CaseStudyResult {
  label: string;
  value: string;
  icon?: string;
}

export interface CaseStudy {
  overview: {
    industry: string;
    services: string[];
  };
  problem: string;
  strategy: string;
  execution: CaseStudyExecution[];
  results: CaseStudyResult[];
}

export interface Project {
  id: string;
  brandName: string;
  projectName: string;
  category: ProjectCategory;
  serviceType: string;
  description: string;
  result: string;
  image: string;
  slug: string;
  caseStudy?: CaseStudy;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  image?: string;
}

export enum Page {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  WORK = 'work',
  PRICING = 'pricing',
  CONTACT = 'contact',
}
