import { AppTheme } from './theme';

export type Locale = 'pt-BR' | 'en' | string;

export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'threads' | 'x' | 'youtube';

export type SectionKey =
  | 'hero'
  | 'trust'
  | 'services'
  | 'steps'
  | 'testimonials'
  | 'location'
  | 'blog'
  | 'cta';

export interface DoctorProfile {
  name: string;
  specialty: string;
  registrationLabel: string;
  bio: string;
  headshot?: string;
  highlights: string[];
}

export interface Service {
  title: string;
  shortDescription: string;
  longDescription?: string;
  iconKey: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title?: string;
}

export interface LocationInfo {
  addressLine: string;
  neighborhood: string;
  city: string;
  state: string;
  mapEmbedUrl?: string;
  mapsLink?: string;
  openingHours: string[];
}

export interface BookingConfig {
  mode: 'whatsapp' | 'api';
  defaultMessage: Record<Locale, string>;
}

export interface BrandContent {
  doctor: DoctorProfile;
  hero: {
    headline: string;
    subheadline: string;
    ctaLabel: string;
    secondaryCtaLabel: string;
    backgroundImage?: string;
  };
  services: Service[];
  steps: {
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  testimonials?: {
    enabled: boolean;
    items: Testimonial[];
  };
  location: LocationInfo;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    whatsappMessage?: string;
  };
  booking: BookingConfig;
  social?: { label: string; url: string; platform?: SocialPlatform }[];
  pagesMeta: Record<
    string,
    {
      title: string;
      description: string;
    }
  >;
  home: {
    sections: SectionKey[];
  };
  blog: {
    intro: {
      title: string;
      description: string;
    };
  };
  openGraph?: {
    image?: string;
  };
}

export interface BrandConfig {
  id: string;
  name: string;
  logo: string;
  theme: AppTheme;
  content: BrandContent;
  translations: Record<Locale, Record<string, unknown>>;
  defaultLocale: Locale;
  locales: Locale[];
}
