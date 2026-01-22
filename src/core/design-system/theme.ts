import { AppTheme } from '../types/theme';

export const baseTheme: AppTheme = {
  name: 'base',
  colors: {
    background: '#05080F',
    backgroundAlt: '#0B1220',
    surface: '#0F172A',
    surfaceMuted: '#121C30',
    surfaceElevated: 'rgba(18, 28, 48, 0.8)',
    primary: '#1F5FFF',
    primaryStrong: '#0E3FC4',
    primaryContrast: '#F5F8FF',
    accent: '#9AE6B4',
    accentContrast: '#062013',
    muted: '#5B6B88',
    border: 'rgba(255, 255, 255, 0.08)',
    text: '#E7ECF5',
    textMuted: '#9BA7BE',
    success: '#3DD598',
    warning: '#F0B429',
    danger: '#F56565',
    overlay: 'rgba(5, 8, 15, 0.72)',
    gradientHero:
      'radial-gradient(circle at 20% 20%, rgba(31,95,255,0.18), transparent 30%), radial-gradient(circle at 80% 0%, rgba(154,230,180,0.16), transparent 32%), linear-gradient(135deg, #05080F 0%, #0A1224 60%, #05080F 100%)',
    gradientCard:
      'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.06) 100%)'
  },
  typography: {
    fonts: {
      heading: 'var(--font-serif), "Times New Roman", serif',
      body: 'var(--font-sans), "Inter", system-ui, -apple-system, sans-serif',
      accent: 'var(--font-serif), "Times New Roman", serif'
    },
    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      md: '1rem',         // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      xxl: '1.5rem',      // 24px
      display: '3.5rem'   // 56px
    },
    weights: {
      regular: 400,
      medium: 500,
      semi: 600,
      bold: 700
    },
    letterSpacings: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em'
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  spacing: {
    xs: 4,    // 4px
    sm: 8,    // 8px
    md: 16,   // 16px
    lg: 24,   // 24px
    xl: 40,   // 40px - generous
    xxl: 72,  // 72px - generous
    hero: 120 // 120px
  },
  radii: {
    sm: '6px',
    md: '12px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    pill: '999px',
    round: '50%'
  } as AppTheme['radii'],
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    soft: '0 10px 30px rgba(0,0,0,0.18)',
    medium: '0 16px 50px rgba(0,0,0,0.24)',
    strong: '0 20px 70px rgba(0,0,0,0.32)'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  zIndex: {
    header: 100,
    overlay: 200,
    modal: 300,
    floating: 400
  },
  containerWidth: {
    narrow: '640px',
    regular: '1200px',
    wide: '1400px'
  },
  motion: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms'
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};

export const createBrandTheme = (overrides: Partial<AppTheme>): AppTheme => ({
  ...baseTheme,
  ...overrides,
  colors: {
    ...baseTheme.colors,
    ...(overrides.colors ?? {})
  },
  typography: {
    ...baseTheme.typography,
    ...(overrides.typography ?? {}),
    fonts: {
      ...baseTheme.typography.fonts,
      ...(overrides.typography?.fonts ?? {})
    },
    sizes: {
      ...baseTheme.typography.sizes,
      ...(overrides.typography?.sizes ?? {})
    },
    weights: {
      ...baseTheme.typography.weights,
      ...(overrides.typography?.weights ?? {})
    },
    letterSpacings: {
      ...baseTheme.typography.letterSpacings,
      ...(overrides.typography?.letterSpacings ?? {})
    }
  },
  spacing: {
    ...baseTheme.spacing,
    ...(overrides.spacing ?? {})
  },
  radii: {
    ...baseTheme.radii,
    ...(overrides.radii ?? {})
  },
  shadows: {
    ...baseTheme.shadows,
    ...(overrides.shadows ?? {})
  },
  breakpoints: {
    ...baseTheme.breakpoints,
    ...(overrides.breakpoints ?? {})
  },
  zIndex: {
    ...baseTheme.zIndex,
    ...(overrides.zIndex ?? {})
  },
  containerWidth: {
    ...baseTheme.containerWidth,
    ...(overrides.containerWidth ?? {})
  }
});
