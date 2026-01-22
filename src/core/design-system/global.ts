import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fonts.body};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.sizes.md};
    line-height: ${({ theme }) => theme.typography.lineHeights?.normal || 1.6};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    min-height: 100vh;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentContrast};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fonts.heading};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacings.tight};
    line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.1};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.sizes.display};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.text};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.sizes.xxl};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    letter-spacing: -0.015em;
    color: ${({ theme }) => theme.colors.text};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
    font-weight: ${({ theme }) => theme.typography.weights.semi};
    letter-spacing: -0.008em;
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    font-weight: ${({ theme }) => theme.typography.weights.semi};
  }

  p {
    margin: 0;
    line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.85};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.motion?.duration.fast || '150ms'} ${({ theme }) => theme.motion?.easing.ease || 'ease'};
    position: relative;
    font-weight: ${({ theme }) => theme.typography.weights.medium};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryStrong};
    }

    /* Elegant underline animation */
    &:not([class*="Button"]):not([class*="NavLink"]):not([aria-label]):not([class*="Card"]) {
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 0;
        height: 1.5px;
        background: ${({ theme }) => theme.colors.primary};
        transition: width ${({ theme }) => theme.motion?.duration.normal || '250ms'} ${({ theme }) => theme.motion?.easing.easeOut || 'ease-out'};
        opacity: 0.6;
      }

      &:hover::after {
        width: 100%;
        opacity: 1;
      }
    }
  }

  /* Accessible focus states */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radii.sm};
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  img {
    max-width: 100%;
    display: block;
    height: auto;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes floatSoft {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  .animate-fade-up {
    opacity: 0;
    animation: fadeUp 0.6s ${({ theme }) => theme.motion?.easing.easeOut || 'ease-out'} forwards;
  }

  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ${({ theme }) => theme.motion?.easing.easeOut || 'ease-out'}, 
                transform 0.6s ${({ theme }) => theme.motion?.easing.easeOut || 'ease-out'};
  }

  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Smooth scrolling for anchor links */
  html {
    scroll-padding-top: 100px;
  }
`;
