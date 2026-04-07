import { siteRoutes } from './siteRoutes';

export interface SiteNavItem {
  label: string;
  href: string;
  children?: SiteNavItem[];
}

export const mainNavigation: SiteNavItem[] = [
  { label: 'Home', href: siteRoutes.home },
  { label: 'Sobre a médica', href: siteRoutes.about },
  {
    label: 'Especialidade',
    href: siteRoutes.specialty.overview,
    children: [
      { label: 'Menopausa & Climatério', href: siteRoutes.specialty.menopause },
      { label: 'Implantes Hormonais', href: siteRoutes.specialty.hormonalImplants },
    ],
  },
  {
    label: 'Ginecologia Avançada',
    href: siteRoutes.advancedGynecology.overview,
    children: [
      { label: 'Laser Íntimo', href: siteRoutes.advancedGynecology.laserIntimo },
      { label: 'Endometriose', href: siteRoutes.advancedGynecology.endometriosis },
      {
        label: 'Cirurgia Ginecológica',
        href: siteRoutes.advancedGynecology.gynecologicalSurgery,
      },
      { label: 'Cirurgia Íntima', href: siteRoutes.advancedGynecology.intimateSurgery },
      { label: 'DIUs', href: siteRoutes.advancedGynecology.iuds },
    ],
  },
  { label: 'Blog', href: siteRoutes.blog },
  { label: 'Contato', href: siteRoutes.attendance },
];

export const footerColumns = [
  {
    title: 'Especialidade',
    links: [
      { label: 'Menopausa & Climatério', href: siteRoutes.specialty.menopause },
      { label: 'Implantes Hormonais', href: siteRoutes.specialty.hormonalImplants },
    ],
  },
  {
    title: 'Ginecologia Avançada',
    links: [
      { label: 'Laser Íntimo', href: siteRoutes.advancedGynecology.laserIntimo },
      { label: 'Endometriose', href: siteRoutes.advancedGynecology.endometriosis },
      {
        label: 'Cirurgia Ginecológica',
        href: siteRoutes.advancedGynecology.gynecologicalSurgery,
      },
      { label: 'Cirurgia Íntima', href: siteRoutes.advancedGynecology.intimateSurgery },
      { label: 'DIUs', href: siteRoutes.advancedGynecology.iuds },
    ],
  },
  {
    title: 'Conteúdo',
    links: [
      { label: 'Blog', href: siteRoutes.blog },
      { label: 'Política de Privacidade', href: siteRoutes.privacyPolicy },
      { label: 'Sobre a médica', href: siteRoutes.about },
      { label: 'Contato', href: siteRoutes.attendance },
    ],
  },
] as const;

const flattenItems = (items: SiteNavItem[]): string[] => {
  const routes: string[] = [];
  items.forEach((item) => {
    routes.push(item.href);
    if (item.children?.length) {
      routes.push(...flattenItems(item.children));
    }
  });
  return routes;
};

export const allStructuredRoutes = Array.from(new Set(flattenItems(mainNavigation)));
