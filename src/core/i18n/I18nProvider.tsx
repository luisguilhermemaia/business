'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Dictionary = Record<string, any>;

interface I18nContextValue {
  locale: string;
  defaultLocale: string;
  locales: string[];
  t: <T = string>(key: string, params?: Record<string, string | number>) => T;
  setLocale: (locale: string) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);
const STORAGE_KEY = 'site:locale';

const getNestedValue = (dict: Dictionary | undefined, key: string): string | undefined => {
  if (!dict) return undefined;
  return key.split('.').reduce<any>((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
};

const interpolate = (value: string, params?: Record<string, string | number>) => {
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (_, token) => (params[token] !== undefined ? String(params[token]) : `{${token}}`));
};

interface Props {
  translations: Record<string, Dictionary>;
  defaultLocale: string;
  locales: string[];
  children: ReactNode;
}

export const I18nProvider = ({ translations, defaultLocale, locales, children }: Props) => {
  const [locale, setLocaleState] = useState(defaultLocale);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
    }
  }, [locales]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  const setLocale = useCallback(
    (next: string) => {
      if (locales.includes(next)) {
        setLocaleState(next);
      }
    },
    [locales]
  );

  const t = useCallback(
    <T,>(key: string, params?: Record<string, string | number>) => {
      const fromCurrent = getNestedValue(translations[locale], key);
      const fromDefault = getNestedValue(translations[defaultLocale], key);
      const value = fromCurrent ?? fromDefault ?? key;
      if (Array.isArray(value) || typeof value === 'object') {
        return value as T;
      }
      return (typeof value === 'string' ? interpolate(value, params) : key) as T;
    },
    [locale, defaultLocale, translations]
  );

  const value = useMemo(
    () => ({
      locale,
      defaultLocale,
      locales,
      t,
      setLocale
    }),
    [defaultLocale, locale, locales, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
};
