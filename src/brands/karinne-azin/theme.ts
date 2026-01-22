import { createBrandTheme } from '../../core/design-system/theme';

export const karinneTheme = createBrandTheme({
  name: 'karinne-azin',
  colors: {
    // Warm, elegant palette inspired by the reference layout
    background: '#FDF8F3',
    backgroundAlt: '#F6EEE6',
    surface: '#FFFFFF',
    surfaceMuted: '#FAF3ED',
    surfaceElevated: 'rgba(255,255,255,0.98)',
    primary: '#B36A62',
    primaryStrong: '#9E574F',
    primaryContrast: '#FFFFFF',
    accent: '#E9C8B8',
    accentContrast: '#3B2E2A',
    muted: '#8B7C76',
    border: '#EADFD6',
    text: '#3B2E2A',
    textMuted: '#7A6A64',
    success: '#7AAE9B',
    warning: '#D0A36D',
    danger: '#C46D7A',
    overlay: 'rgba(51, 36, 32, 0.55)',
    gradientHero:
      'radial-gradient(ellipse at 20% 10%, rgba(179, 106, 98, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(233, 200, 184, 0.12) 0%, transparent 60%), linear-gradient(180deg, #FDF8F3 0%, #F6EEE6 100%)',
    gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FBF7F2 100%)'
  },
  typography: {
    sizes: {
      display: 'clamp(2.5rem, 5vw + 0.5rem, 4rem)',
      xxl: 'clamp(1.8rem, 3vw + 0.4rem, 2.6rem)'
    },
    lineHeights: {
      tight: 1.15,
      normal: 1.6,
      relaxed: 1.8
    }
  },
  spacing: {
    hero: 140
  },
  shadows: {
    sm: '0 1px 3px rgba(59, 46, 42, 0.06)',
    md: '0 4px 12px rgba(59, 46, 42, 0.08)',
    lg: '0 12px 24px rgba(59, 46, 42, 0.12)',
    soft: '0 2px 10px rgba(59, 46, 42, 0.06)',
    medium: '0 6px 18px rgba(59, 46, 42, 0.1)',
    strong: '0 16px 32px rgba(59, 46, 42, 0.14)'
  }
});
