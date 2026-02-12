import styled, { css } from 'styled-components';
import { hexToRgba } from '../utils/colors';

export const Container = styled.div<{ width?: 'narrow' | 'regular' | 'wide' }>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme, width = 'regular' }) => theme.containerWidth[width]};
  padding: 0 ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.spacing.md}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.xl}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: 0 ${({ theme }) => theme.spacing.xxl}px;
  }
`;

export const Section = styled.section<{
  background?: 'default' | 'muted' | 'alt' | 'card';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}>`
  padding: ${({ theme, padding = 'lg' }) => {
    const paddingMap = {
      sm: theme.spacing.lg,
      md: theme.spacing.xl,
      lg: theme.spacing.xxl,
      xl: theme.spacing.hero,
    };
    return `${paddingMap[padding]}px 0`;
  }};
  background: ${({ background, theme }) => {
    if (background === 'muted') return theme.colors.surfaceMuted;
    if (background === 'alt') return theme.colors.backgroundAlt;
    if (background === 'card') return theme.colors.gradientCard;
    return 'transparent';
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme, padding = 'lg' }) => {
      const paddingMap = {
        sm: theme.spacing.lg,
        md: theme.spacing.xl,
        lg: theme.spacing.xl,
        xl: theme.spacing.xxl,
      };
      return `${paddingMap[padding]}px 0`;
    }};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme, padding = 'lg' }) => {
      const paddingMap = {
        sm: theme.spacing.lg,
        md: theme.spacing.xl,
        lg: theme.spacing.xxl,
        xl: theme.spacing.xxl,
      };
      return `${paddingMap[padding]}px 0`;
    }};
  }
`;

export const Stack = styled.div.withConfig({
  shouldForwardProp: (prop) => !['gap', 'align', 'justify', 'direction'].includes(prop),
})<{
  gap?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: string;
  justify?: string;
  direction?: 'row' | 'column';
}>`
  display: flex;
  flex-direction: ${({ direction = 'column' }) => direction};
  gap: ${({ gap = 'md', theme }) => {
    if (typeof gap === 'number') return `${gap}px`;
    const gapMap = {
      xs: theme.spacing.xs,
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };
    return `${gapMap[gap]}px`;
  }};
  align-items: ${({ align }) => align || 'stretch'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
`;

export const Grid = styled.div.withConfig({
  shouldForwardProp: (prop) => !['columns', 'min', 'gap'].includes(prop),
})<{
  columns?: number;
  min?: string;
  gap?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>`
  display: grid;
  gap: ${({ gap = 'md', theme }) => {
    if (typeof gap === 'number') return `${gap}px`;
    const gapMap = {
      xs: theme.spacing.xs,
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };
    return `${gapMap[gap]}px`;
  }};
  grid-template-columns: repeat(auto-fit, minmax(${({ min = '280px' }) => min}, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.lg}px;
  }

  ${({ columns }) =>
    columns &&
    css`
      grid-template-columns: repeat(${columns}, minmax(0, 1fr));
      @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        grid-template-columns: 1fr;
        gap: ${(props) => props.theme.spacing.lg}px;
      }
      @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        gap: ${(props) => props.theme.spacing.md}px;
      }
    `}
`;

export const Card = styled.div<{
  interactive?: boolean;
  elevation?: 'sm' | 'md' | 'lg';
}>`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.2)};
  border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg}px;
  }
  box-shadow: ${({ theme, elevation = 'sm' }) => {
    const shadowMap = {
      sm: `0 2px 12px ${hexToRgba(theme.colors.text, 0.08)}, 0 0 0 1px ${hexToRgba(theme.colors.border, 0.6)}`,
      md: `0 4px 20px ${hexToRgba(theme.colors.text, 0.1)}, 0 0 0 1px ${hexToRgba(theme.colors.border, 0.7)}`,
      lg: `0 8px 32px ${hexToRgba(theme.colors.text, 0.12)}, 0 0 0 1px ${hexToRgba(theme.colors.border, 0.8)}`,
    };
    return shadowMap[elevation];
  }};
  overflow: hidden;
  transition: all ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  ${({ theme }) =>
    theme.colors.tealDark &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: ${theme.colors.tealDark};
        border-radius: ${theme.radii.xl || theme.radii.lg} 0 0 ${theme.radii.xl || theme.radii.lg};
        pointer-events: none;
      }
    `}

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      ${({ theme }) => hexToRgba(theme.colors.muted, 0.06)} 0%,
      transparent 50%
    );
    pointer-events: none;
  }

  ${({ interactive }) =>
    interactive &&
    css`
      cursor: pointer;

      &:hover {
        transform: translateY(-6px);
        box-shadow:
          0 8px 32px ${({ theme }) => hexToRgba(theme.colors.primary, 0.16)},
          0 0 0 1px ${({ theme }) => hexToRgba(theme.colors.primary, 0.08)};
        border-color: ${({ theme }) => hexToRgba(theme.colors.primary, 0.2)};
      }

      &:active {
        transform: translateY(-3px);
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  margin: ${({ theme }) => theme.spacing.lg}px 0;
  background: ${({ theme }) => theme.colors.border};
`;
