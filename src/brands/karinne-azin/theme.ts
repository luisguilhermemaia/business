import { createBrandTheme } from '../../core/design-system/theme';

const evergreen = {
  dark: '#29463f',
  main: '#3e6a5d',
  soft: 'rgba(62, 106, 93, 0.16)',
} as const;

const gold = {
  main: '#c3a24d',
  strong: '#a78534',
  soft: 'rgba(195, 162, 77, 0.2)',
} as const;

const ivory = {
  base: '#f9f6ef',
  alt: '#f2ecdf',
  surface: '#fffdf7',
  muted: '#e8dec9',
} as const;

const neutral = {
  text: '#2f3b36',
  textMuted: '#6e756d',
} as const;

export const karinneTheme = createBrandTheme({
  name: 'karinne-azin',
  colors: {
    background: ivory.base,
    backgroundAlt: ivory.alt,
    surface: ivory.surface,
    surfaceMuted: ivory.muted,
    surfaceElevated: ivory.surface,
    primary: gold.main,
    primaryStrong: gold.strong,
    primaryContrast: ivory.surface,
    accent: evergreen.main,
    accentContrast: ivory.surface,
    muted: evergreen.main,
    border: 'rgba(47, 59, 54, 0.18)',
    text: neutral.text,
    textMuted: neutral.textMuted,
    success: evergreen.main,
    warning: gold.main,
    danger: '#b86161',
    overlay: 'rgba(41, 70, 63, 0.72)',
    gradientHero: `radial-gradient(ellipse at 28% 20%, ${gold.soft} 0%, transparent 55%),
      radial-gradient(ellipse at 74% 78%, ${evergreen.soft} 0%, transparent 52%),
      linear-gradient(180deg, ${ivory.base} 0%, ${ivory.alt} 100%)`,
    gradientCard: `linear-gradient(180deg, ${ivory.surface} 0%, ${ivory.alt} 100%)`,
    tealDark: evergreen.dark,
    tealDarkContrast: ivory.surface,
    brownDark: gold.strong,
    brownMedium: gold.main,
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
    sm: '0 2px 8px rgba(41, 70, 63, 0.08), 0 0 0 1px rgba(195, 162, 77, 0.12)',
    md: '0 6px 20px rgba(41, 70, 63, 0.1), 0 0 0 1px rgba(195, 162, 77, 0.14)',
    lg: '0 12px 32px rgba(41, 70, 63, 0.12), 0 0 0 1px rgba(195, 162, 77, 0.16)',
    soft: '0 4px 16px rgba(41, 70, 63, 0.1)',
    medium: '0 8px 24px rgba(41, 70, 63, 0.12)',
    strong: '0 16px 40px rgba(41, 70, 63, 0.16)',
  },
});
