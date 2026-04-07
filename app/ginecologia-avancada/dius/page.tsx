import { getBrandConfig } from '../../../src/brands/getBrandConfig';
import { siteRoutes } from '../../../src/core/layout/siteRoutes';
import { buildMetadata } from '../../../src/core/seo/metadata';
import { TopicPageTemplate } from '../../../src/core/sections/TopicPageTemplate';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'ginecologia-avancada/dius');
}

export default function DiuPage() {
  return (
    <TopicPageTemplate
      breadcrumbs={[
        { label: 'Home', href: siteRoutes.home },
        { label: 'Ginecologia Avançada', href: siteRoutes.advancedGynecology.overview },
        { label: 'DIUs' },
      ]}
      eyebrow="Ginecologia Avançada"
      title="DIUs"
      subtitle="Escolha contraceptiva de longa duração com orientação personalizada, inserção segura e acompanhamento ginecológico contínuo."
      heroImageSrc="/brands/karinne-azin/banner.jpg"
      heroImageAlt="Consulta ginecológica sobre métodos contraceptivos de longa duração"
      heroImagePosition="center 32%"
      blocks={[
        {
          title: 'Escolha do método',
          description:
            'A definição do tipo de DIU considera histórico, objetivos reprodutivos, perfil hormonal e conforto da paciente.',
          points: [
            'DIU hormonal e não hormonal',
            'Discussão sobre duração e efeitos esperados',
            'Planejamento individual do procedimento',
          ],
        },
        {
          title: 'Inserção e seguimento',
          description:
            'O procedimento é conduzido com técnica segura, orientações de cuidados e revisão programada para adaptação adequada.',
          points: [
            'Inserção em ambiente ambulatorial',
            'Orientações pós-procedimento',
            'Revisão clínica para acompanhamento',
          ],
        },
      ]}
      sideTitle="Vantagens do método"
      sidePoints={[
        'Alta eficácia contraceptiva',
        'Longa duração',
        'Praticidade no dia a dia',
        'Acompanhamento simples e periódico',
      ]}
      ctaLabel="Agendar consulta"
      ctaHref={siteRoutes.attendance}
      relatedLinks={[
        { label: 'Laser Íntimo', href: siteRoutes.advancedGynecology.laserIntimo },
        { label: 'Endometriose', href: siteRoutes.advancedGynecology.endometriosis },
      ]}
    />
  );
}
