import styled from 'styled-components';
import { Icon, IconName } from '../../icons/Icon';

interface Props {
  tone?: 'success' | 'error' | 'info';
  message: string;
  icon?: IconName;
}

const Wrapper = styled.div<{ tone: NonNullable<Props['tone']> }>`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid
    ${({ tone, theme }) =>
      tone === 'success'
        ? 'rgba(120,180,163,0.45)'
        : tone === 'error'
          ? 'rgba(212,117,134,0.45)'
          : theme.colors.border};
  background: ${({ tone, theme }) =>
    tone === 'success'
      ? 'rgba(120,180,163,0.12)'
      : tone === 'error'
        ? 'rgba(212,117,134,0.12)'
        : theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const InlineFeedback = ({ tone = 'info', message, icon }: Props) => (
  <Wrapper tone={tone}>
    {icon && <Icon name={icon} size={18} />}
    <span>{message}</span>
  </Wrapper>
);
