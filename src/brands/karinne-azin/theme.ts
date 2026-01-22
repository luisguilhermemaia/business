import { createBrandTheme } from '../../core/design-system/theme';

const teal = {
  dark: '#2A4242',
  darker: '#1E3636',
  medium: '#3D5A5A',
} as const;

const brown = {
  dark: '#593c2c',
  medium: '#a77e5d',
  light: '#c4a082',
} as const;

const taupe = {
  main: '#9A816C',
  light: '#C4B5A5',
  soft: 'rgba(154, 129, 108, 0.2)',
} as const;

const gold = {
  main: '#D4AF37',
  strong: '#B8941F',
  soft: 'rgba(212, 175, 55, 0.15)',
} as const;

const cream = {
  main: '#FBF8ED',
  dark: '#F5F0E0',
  surface: '#FFFEF9',
} as const;

export const karinneTheme = createBrandTheme({
  name: 'karinne-azin',
  colors: {
    background: cream.main,
    backgroundAlt: cream.dark,
    surface: cream.surface,
    surfaceMuted: taupe.light,
    surfaceElevated: cream.surface,
    primary: gold.main,
    primaryStrong: gold.strong,
    primaryContrast: teal.dark,
    accent: gold.main,
    accentContrast: teal.dark,
    muted: taupe.main,
    border: 'rgba(154, 129, 108, 0.35)',
    text: teal.dark,
    textMuted: '#6B5D4F',
    success: gold.main,
    warning: gold.main,
    danger: '#c46d7a',
    overlay: 'rgba(42, 66, 66, 0.75)',
    gradientHero: `radial-gradient(ellipse at 30% 20%, ${gold.soft} 0%, transparent 55%),
      radial-gradient(ellipse at 70% 80%, ${taupe.soft} 0%, transparent 50%),
      linear-gradient(180deg, ${cream.main} 0%, ${cream.dark} 100%)`,
    gradientCard: `linear-gradient(180deg, ${cream.surface} 0%, ${cream.dark} 100%)`,
    tealDark: teal.dark,
    tealDarkContrast: cream.main,
    brownDark: brown.dark,
    brownMedium: brown.medium,
  },
  typography: {
    fonts: {
      heading: 'var(--font-serif), "Times New Roman", Georgia, serif',
      body: 'var(--font-sans), "Inter", system-ui, -apple-system, sans-serif',
      accent: 'var(--font-serif), "Times New Roman", Georgia, serif',
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
    sm: '0 2px 8px rgba(42, 66, 66, 0.08), 0 0 0 1px rgba(154, 129, 108, 0.12)',
    md: '0 6px 20px rgba(42, 66, 66, 0.1), 0 0 0 1px rgba(154, 129, 108, 0.14)',
    lg: '0 12px 32px rgba(42, 66, 66, 0.12), 0 0 0 1px rgba(154, 129, 108, 0.16)',
    soft: '0 4px 16px rgba(42, 66, 66, 0.1)',
    medium: '0 8px 24px rgba(42, 66, 66, 0.12)',
    strong: '0 16px 40px rgba(42, 66, 66, 0.16)',
  },
});
