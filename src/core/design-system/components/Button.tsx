import Link from 'next/link';
import { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { hexToRgba } from '../../utils/colors';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = BaseProps &
  Omit<ComponentProps<typeof Link>, 'children' | 'href'> & { href: string };

const buttonStyles = css<BaseProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  letter-spacing: 0.02em;
  cursor: ${({ disabled, loading }) => (disabled || loading ? 'not-allowed' : 'pointer')};
  transition: all ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  border: 1px solid transparent;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  text-decoration: none;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  ${({ size = 'md', theme }) => {
    const paddingMap: Record<Size, string> = {
      sm: `6px ${theme.spacing.md}px`,
      md: `${theme.spacing.sm + 2}px ${theme.spacing.lg}px`,
      lg: `${theme.spacing.md}px ${theme.spacing.xl}px`,
    };
    const fontMap: Record<Size, string> = {
      sm: theme.typography.sizes.sm,
      md: theme.typography.sizes.md,
      lg: theme.typography.sizes.lg,
    };
    const heightMap: Record<Size, string> = {
      sm: '32px',
      md: '40px',
      lg: '46px',
    };
    return css`
      padding: ${paddingMap[size]};
      font-size: ${fontMap[size]};
      min-height: ${heightMap[size]};
    `;
  }}

  ${({ variant = 'primary', theme }) => {
    if (variant === 'secondary') {
      return css`
        background: ${hexToRgba(theme.colors.primary, 0.06)};
        color: ${theme.colors.primaryStrong};
        border: 1.5px solid ${theme.colors.primaryStrong};
        box-shadow: none;
        &:hover:not(:disabled) {
          background: ${hexToRgba(theme.colors.primary, 0.14)};
          color: ${theme.colors.text};
          border-color: ${theme.colors.text};
          transform: translateY(-1px);
          box-shadow: 0 2px 12px ${hexToRgba(theme.colors.primary, 0.15)};
        }
        &:active:not(:disabled) {
          transform: translateY(0);
          background: ${hexToRgba(theme.colors.primary, 0.2)};
        }
      `;
    }
    if (variant === 'ghost') {
      return css`
        background: transparent;
        color: ${theme.colors.text};
        &:hover:not(:disabled) {
          background: ${theme.colors.surfaceMuted};
          color: ${theme.colors.primary};
        }
        &:active:not(:disabled) {
          transform: scale(0.98);
        }
      `;
    }
    return css`
      background: linear-gradient(135deg, ${theme.colors.primaryStrong}, ${theme.colors.primary});
      color: ${theme.colors.primaryContrast};
      box-shadow:
        0 4px 16px ${hexToRgba(theme.colors.primary, 0.25)},
        0 2px 4px ${hexToRgba(theme.colors.primary, 0.19)};
      font-weight: ${theme.typography.weights.semi};
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryStrong});
        transform: translateY(-2px);
        box-shadow:
          0 6px 24px ${hexToRgba(theme.colors.primary, 0.31)},
          0 4px 8px ${hexToRgba(theme.colors.primary, 0.21)};
      }
      &:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 8px ${hexToRgba(theme.colors.primary, 0.19)};
      }
    `;
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.2s ease;
    &:hover:not(:disabled) {
      transform: none;
    }
    &:active:not(:disabled) {
      transform: none;
    }
  }

  @media (max-width: 768px) {
    min-height: 48px;
    padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px;
    font-size: ${({ theme }) => theme.typography.sizes.md};
    ${({ variant, theme }) =>
      variant === 'primary' &&
      css`
        color: #fff;
        font-weight: ${theme.typography.weights.bold};
      `}
    ${({ variant, theme }) =>
      variant === 'secondary' &&
      css`
        color: ${theme.colors.text};
        border-color: ${theme.colors.text};
        background: ${hexToRgba(theme.colors.text, 0.06)};
      `}
  }
`;

const LoadingSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['fullWidth', 'loading', 'variant', 'size', 'icon'].includes(prop),
})<BaseProps>`
  ${buttonStyles}
`;

const StyledLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !['fullWidth', 'loading', 'variant', 'size', 'icon'].includes(prop),
})<BaseProps & Omit<ComponentProps<typeof Link>, 'children' | 'href'> & { href: string }>`
  ${buttonStyles}
`;

export const Button = (props: ButtonProps) => {
  const { children, icon, loading, disabled, ...rest } = props;
  return (
    <StyledButton {...rest} disabled={disabled || loading} loading={loading}>
      {loading ? <LoadingSpinner aria-hidden="true" /> : icon}
      {children}
    </StyledButton>
  );
};

export const LinkButton = (props: AnchorProps) => {
  const { children, icon, loading, disabled, ...rest } = props;
  if (disabled || loading) {
    return (
      <StyledButton as="span" disabled={true} loading={loading}>
        {loading ? <LoadingSpinner aria-hidden="true" /> : icon}
        {children}
      </StyledButton>
    );
  }
  return (
    <StyledLink {...rest}>
      {icon}
      {children}
    </StyledLink>
  );
};
