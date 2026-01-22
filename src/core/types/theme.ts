export interface AppTheme {
  name: string;
  colors: {
    background: string;
    backgroundAlt: string;
    surface: string;
    surfaceMuted: string;
    surfaceElevated: string;
    primary: string;
    primaryStrong: string;
    primaryContrast: string;
    accent: string;
    accentContrast: string;
    muted: string;
    border: string;
    text: string;
    textMuted: string;
    success: string;
    warning: string;
    danger: string;
    overlay: string;
    gradientHero: string;
    gradientCard: string;
    tealDark?: string;
    tealDarkContrast?: string;
  };
  typography: {
    fonts: {
      heading: string;
      body: string;
      accent: string;
    };
    sizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      display: string;
    };
    weights: {
      regular: number;
      medium: number;
      semi: number;
      bold: number;
    };
    letterSpacings: {
      tight: string;
      normal: string;
      wide: string;
    };
    lineHeights?: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    hero: number;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    xl?: string;
    '2xl'?: string;
    pill: string;
    round: string;
  };
  shadows: {
    sm?: string;
    md?: string;
    lg?: string;
    soft: string;
    medium: string;
    strong: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  zIndex: {
    header: number;
    overlay: number;
    modal: number;
    floating: number;
  };
  containerWidth: {
    narrow: string;
    regular: string;
    wide: string;
  };
  motion?: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
}
