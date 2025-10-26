export interface Consultant {
  id: string;
  name: string;
  title: string;
  education: string[];
  specializations: string[];
  achievement: string;
  quote: string;
  rate: string;
  image: string;
}

export interface Service {
  id: string;
  consultant: string;
  category: string;
  services: string[];
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  timeline?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}

export interface ServicePackage {
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}
