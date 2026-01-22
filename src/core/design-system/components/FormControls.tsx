import { hexToRgba } from '@core/utils/colors';
import styled, { css } from 'styled-components';

const baseControl = css<{ error?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  line-height: ${({ theme }) => theme.typography.lineHeights?.normal || 1.5};
  transition:
    border-color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    box-shadow ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.primary)};
    box-shadow: 0 0 0 3px
      ${({ theme, error }) =>
        error ? hexToRgba(theme.colors.danger, 0.2) : hexToRgba(theme.colors.primary, 0.2)};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.7;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Input = styled.input<{ error?: boolean }>`
  ${baseControl}
  height: 48px;
`;

export const Textarea = styled.textarea<{ error?: boolean }>`
  ${baseControl}
  min-height: 120px;
  resize: vertical;
  padding-top: ${({ theme }) => theme.spacing.md}px;
`;

export const Select = styled.select<{ error?: boolean }>`
  ${baseControl}
  height: 48px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%233D2A33' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-position: calc(100% - ${({ theme }) => theme.spacing.md}px) center;
  background-repeat: no-repeat;
  background-size: 12px;
  padding-right: ${({ theme }) => theme.spacing.xl + theme.spacing.md}px;
`;

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const HelperText = styled.p<{ error?: boolean }>`
  margin: ${({ theme }) => theme.spacing.xs}px 0 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.textMuted)};
  line-height: ${({ theme }) => theme.typography.lineHeights?.normal || 1.5};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  &:last-child {
    margin-bottom: 0;
  }
`;
