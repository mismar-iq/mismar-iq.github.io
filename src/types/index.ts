export type Language = 'ar' | 'en';

export interface BilingualText {
  ar: string;
  en: string;
}

export interface ProjectItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  category: string; // e.g. 'residential' | 'commercial' | 'palaces' | 'fitout'
  categoryName: BilingualText;
  location: BilingualText;
  status: 'completed' | 'in_progress' | 'design';
  statusName: BilingualText;
  year?: string;
  areaM2?: number | string;
  coverImage: string;
  galleryImages: string[];
  isVisible: boolean;
  order: number;
  featured?: boolean;
}

export interface ConstructionPackage {
  id: string;
  name: BilingualText;
  tagline: BilingualText;
  description: BilingualText;
  pricePerMeter: BilingualText;
  image: string;
  features: Array<{ id: string; ar: string; en: string }>;
  accentColor: string; // 'amber' | 'slate' | 'emerald' | 'bronze'
  isPopular?: boolean;
  isVisible: boolean;
  order: number;
  inquiryMessage?: string;
}

export interface ServiceItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  fullDetails?: BilingualText;
  iconName: string; // Lucide icon identifier
  image?: string;
  isVisible: boolean;
  order: number;
}

export interface AboutParagraph {
  id: string;
  title: BilingualText;
  content: BilingualText;
}

export interface StatItem {
  id: string;
  value: string;
  label: BilingualText;
  sublabel?: BilingualText;
}

export interface CoreValue {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: string;
}

export interface AboutData {
  title: BilingualText;
  subtitle: BilingualText;
  leadParagraph: BilingualText;
  paragraphs: AboutParagraph[];
  vision: BilingualText;
  mission: BilingualText;
  values: CoreValue[];
  stats: StatItem[];
  mainImage: string;
  galleryImages: string[];
}

export interface HeroSlide {
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  kicker: BilingualText;
  primaryCtaText: BilingualText;
  primaryCtaLink: string;
  secondaryCtaText: BilingualText;
  secondaryCtaLink: string;
  backgroundImage: string;
  isVisible: boolean;
}

export interface SocialLink {
  id: string;
  platform: 'whatsapp' | 'instagram' | 'linkedin' | 'x' | 'facebook' | 'snapchat' | 'youtube' | 'tiktok' | 'other';
  label: string;
  url: string;
  isVisible: boolean;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: BilingualText;
  googleMapsUrl: string;
  workingHours: BilingualText;
  crNumber: string; // Commercial Registration
  socialLinks: SocialLink[];
  quoteWhatsappTemplate: string;
}

export interface CustomSection {
  id: string;
  type: 'text' | 'gallery' | 'feature_cards' | 'cta_banner';
  title: BilingualText;
  subtitle: BilingualText;
  content?: BilingualText;
  images?: string[];
  ctaText?: BilingualText;
  ctaLink?: string;
  cards?: Array<{
    id: string;
    title: BilingualText;
    description: BilingualText;
    icon?: string;
  }>;
  isVisible: boolean;
  order: number;
}

export interface SectionConfig {
  id: string;
  key: 'hero' | 'stats' | 'about' | 'services' | 'packages' | 'projects' | 'custom' | 'quote' | 'contact';
  nameAr: string;
  nameEn: string;
  isVisible: boolean;
  order: number;
}

export interface SiteSettings {
  siteName: BilingualText;
  siteTagline: BilingualText;
  logoText: string;
  logoImage?: string;
  primaryColor: string; // hex or tailwind token
  secondaryColor: string;
  enableEnglish: boolean;
  defaultLanguage: Language;
  heroSlides: HeroSlide[];
  sectionsConfig: SectionConfig[];
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  sizeBytes?: number;
  uploadedAt: string;
  category?: string;
  dimensions?: string;
}

export interface MethodologyStep {
  id: string;
  num: string; // e.g. '01', '02', '03', '04'
  title: BilingualText;
  description: BilingualText;
}

export interface MethodologyData {
  kicker: BilingualText;
  heading: BilingualText;
  description: BilingualText;
  steps: MethodologyStep[];
}

export interface SiteContent {
  settings: SiteSettings;
  about: AboutData;
  methodology: MethodologyData;
  services: ServiceItem[];
  packages: ConstructionPackage[];
  projects: ProjectItem[];
  contact: ContactInfo;
  customSections: CustomSection[];
  mediaLibrary: MediaItem[];
  lastUpdated: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  projectType: string;
  estimatedArea: string;
  packageInterest: string;
  city: string;
  notes: string;
}
