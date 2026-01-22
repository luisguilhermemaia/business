import { createBrandTheme } from '../../core/design-system/theme';

export const karinneTheme = createBrandTheme({
  name: 'karinne-azin',
  colors: {
    // Green palette inspired by Instagram profile
    background: '#F8F9FA',
    backgroundAlt: '#F0F2F5',
    surface: '#FFFFFF',
    surfaceMuted: '#FAFBFC',
    surfaceElevated: 'rgba(255,255,255,0.98)',
    primary: '#1A5F3F', // Dark green from Instagram
    primaryStrong: '#0F4A2F',
    primaryContrast: '#FFFFFF',
    accent: '#2D8F5F', // Lighter green accent
    accentContrast: '#FFFFFF',
    muted: '#6B7C7A',
    border: '#E1E8E6',
    text: '#1A1F1E',
    textMuted: '#5A6B69',
    success: '#1A5F3F',
    warning: '#D0A36D',
    danger: '#C46D7A',
    overlay: 'rgba(26, 31, 30, 0.55)',
    gradientHero:
      'radial-gradient(ellipse at 20% 10%, rgba(26, 95, 63, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(45, 143, 95, 0.12) 0%, transparent 60%), linear-gradient(180deg, #F8F9FA 0%, #F0F2F5 100%)',
    gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 100%)',
  },
  typography: {
    fonts: {
      heading: 'var(--font-serif), "Times New Roman", serif',
      body: 'var(--font-sans), "Inter", system-ui, -apple-system, sans-serif',
      accent: 'var(--font-serif), "Times New Roman", serif',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: 'clamp(1.8rem, 3vw + 0.4rem, 2.6rem)',
      display: 'clamp(2.5rem, 5vw + 0.5rem, 4rem)',
    },
    weights: {
      regular: 400,
      medium: 500,
      semi: 600,
      bold: 700,
    },
    letterSpacings: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em',
    },
    lineHeights: {
      tight: 1.15,
      normal: 1.6,
      relaxed: 1.8,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
    xxl: 72,
    hero: 140,
  },
  shadows: {
    sm: '0 1px 3px rgba(26, 95, 63, 0.06)',
    md: '0 4px 12px rgba(26, 95, 63, 0.08)',
    lg: '0 12px 24px rgba(26, 95, 63, 0.12)',
    soft: '0 2px 10px rgba(26, 95, 63, 0.06)',
    medium: '0 6px 18px rgba(26, 95, 63, 0.1)',
    strong: '0 16px 32px rgba(26, 95, 63, 0.14)',
  },
});
