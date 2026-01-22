'use client';

import styled from 'styled-components';
import { useI18n } from '../i18n/I18nProvider';

const Switcher = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    padding: 6px;
  }
`;

const Option = styled.button<{ $active: boolean }>`
  cursor: pointer;
  border: none;
  background: ${({ $active, theme }) =>
    $active 
      ? `linear-gradient(135deg, ${theme.colors.primaryStrong}, ${theme.colors.primary})` 
      : 'transparent'};
  color: ${({ $active, theme }) => 
    $active 
      ? theme.colors.primaryContrast 
      : theme.colors.textMuted};
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  transition: all ${({ theme }) => theme.motion?.duration.fast || '150ms'} ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  min-width: 48px;
  text-align: center;
  
  &:hover {
    background: ${({ $active, theme }) => 
      $active 
        ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryStrong})` 
        : theme.colors.surface};
    color: ${({ $active, theme }) => 
      $active 
        ? theme.colors.primaryContrast 
        : theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 1;
    min-width: 0;
    padding: 10px 0;
  }
`;

export const LanguageSwitcher = () => {
  const { locale, locales, setLocale } = useI18n();
  return (
    <Switcher aria-label="Switch language">
      {locales.map((loc) => (
        <Option 
          key={loc} 
          $active={loc === locale} 
          onClick={() => setLocale(loc)}
        >
          {loc.toUpperCase()}
        </Option>
      ))}
    </Switcher>
  );
};
