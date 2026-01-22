import styled from 'styled-components';

export const Badge = styled.span<{ tone?: 'primary' | 'accent' | 'muted' }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  color: ${({ theme, tone = 'primary' }) =>
    tone === 'accent' ? theme.colors.accentContrast : tone === 'muted' ? theme.colors.textMuted : theme.colors.primaryContrast};
  background: ${({ theme, tone = 'primary' }) =>
    tone === 'accent'
      ? theme.colors.accent
      : tone === 'muted'
        ? `rgba(184, 87, 122, 0.1)`
        : `linear-gradient(135deg, ${theme.colors.primaryStrong}, ${theme.colors.primary})`};
  box-shadow: ${({ theme, tone }) => 
    tone === 'muted' 
      ? 'none' 
      : `0 4px 12px ${tone === 'accent' ? 'rgba(40, 167, 69, 0.25)' : 'rgba(184, 87, 122, 0.25)'}`};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'} ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme, tone }) => 
      tone === 'muted' 
        ? '0 2px 8px rgba(184, 87, 122, 0.1)' 
        : `0 6px 16px ${tone === 'accent' ? 'rgba(40, 167, 69, 0.3)' : 'rgba(184, 87, 122, 0.3)'}`};
  }
`;
