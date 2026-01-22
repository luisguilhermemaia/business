import { BrandConfig } from '../../core/types/brand';
import { karinneTheme } from './theme';
import { karinneContent } from './content';
import ptBR from './translations/pt-BR.json';
import en from './translations/en.json';

export const brandConfig: BrandConfig = {
  id: 'karinne-azin',
  name: 'Dra. Karinne Azin',
  logo: '/brands/karinne-azin/logo.svg',
  theme: karinneTheme,
  content: karinneContent,
  translations: {
    'pt-BR': ptBR,
    en
  },
  defaultLocale: 'pt-BR',
  locales: ['pt-BR', 'en']
};

export default brandConfig;
