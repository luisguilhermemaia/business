'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../icons/Icon';
import { useI18n } from '../i18n/I18nProvider';

const LOCALE_LABELS: Record<string, string> = {
  'pt-BR': 'Português',
  en: 'English',
};

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
`;

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radii.round};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion?.duration.fast || '150ms'} ease,
    background ${({ theme }) => theme.motion?.duration.fast || '150ms'} ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) =>
      theme.colors.tealDark ? 'rgba(42, 66, 66, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Dropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 152px;
  padding: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 8px 24px rgba(42, 66, 66, 0.14);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transform: translateY(${({ $open }) => ($open ? 0 : -4)}px);
  transition:
    opacity ${({ theme }) => theme.motion?.duration.fast || '150ms'} ease,
    visibility ${({ theme }) => theme.motion?.duration.fast || '150ms'} ease,
    transform ${({ theme }) => theme.motion?.duration.fast || '150ms'} ease;
  z-index: ${({ theme }) => (theme.zIndex?.overlay ?? 200) + 50};

  @media (max-width: ${({ theme }) => theme.breakpoints?.md ?? '768px'}) {
    top: auto;
    bottom: calc(100% + 6px);
    transform: translateY(${({ $open }) => ($open ? 0 : 4)}px);
  }
`;

const Option = styled.button<{ $active: boolean }>`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.md}px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $active, theme }) =>
    $active && theme.colors.tealDark
      ? theme.colors.tealDark
      : $active
        ? theme.colors.primary
        : 'transparent'};
  color: ${({ $active, theme }) =>
    $active
      ? (theme.colors.tealDarkContrast ?? theme.colors.primaryContrast ?? theme.colors.surface)
      : theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.typography.weights.semi : theme.typography.weights.regular};
  text-align: left;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.motion?.duration.fast || '150ms'} ease,
    color ${({ theme }) => theme.motion?.duration.fast || '150ms'} ease;

  &:hover {
    background: ${({ $active, theme }) =>
      $active && theme.colors.tealDark ? theme.colors.tealDark : theme.colors.surfaceMuted};
  }

  &:not(:first-child) {
    margin-top: 2px;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

export const LanguageSwitcher = () => {
  const { locale, locales, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, close]);

  const handleSelect = useCallback(
    (loc: string) => {
      setLocale(loc);
      close();
    },
    [setLocale, close]
  );

  return (
    <Wrapper ref={wrapperRef}>
      <Trigger
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Icon name="globe" size={18} />
      </Trigger>
      <Dropdown $open={open} role="listbox" aria-label="Select language">
        {locales.map((loc) => (
          <Option
            key={loc}
            role="option"
            $active={loc === locale}
            onClick={() => handleSelect(loc)}
            aria-selected={loc === locale}
          >
            {LOCALE_LABELS[loc] ?? loc}
          </Option>
        ))}
      </Dropdown>
    </Wrapper>
  );
};
