import { getBrandConfig } from '../../../src/brands/getBrandConfig';
import { siteRoutes } from '../../../src/core/layout/siteRoutes';
import { buildMetadata } from '../../../src/core/seo/metadata';
import { TopicPageTemplate } from '../../../src/core/sections/TopicPageTemplate';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'ginecologia-avancada/cirurgia-intima');
}

export default function CirurgiaIntimaPage() {
  return (
    <TopicPageTemplate
      breadcrumbs={[
        { label: 'Home', href: siteRoutes.home },
        { label: 'Ginecologia Avançada', href: siteRoutes.advancedGynecology.overview },
        { label: 'Cirurgia Íntima' },
      ]}
      eyebrow="Ginecologia Avançada"
      title="Cirurgia Íntima"
      subtitle="Abordagem cirúrgica funcional e estética com avaliação individual, indicação responsável e acompanhamento pós-operatório."
      heroImageSrc="https://images.pexels.com/photos/7659690/pexels-photo-7659690.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Consulta médica para planejamento de cirurgia íntima feminina"
      heroImagePosition="center center"
      blocks={[
        {
          title: 'Consulta de indicação',
          description:
            'A avaliação inicial considera queixas funcionais, desconforto local e expectativas para definir se há benefício clínico com o procedimento.',
          points: [
            'Escuta qualificada das queixas',
            'Discussão franca de benefícios e limites',
            'Indicação com critérios técnicos',
          ],
        },
        {
          title: 'Técnica e recuperação',
          description:
            'Os cuidados cirúrgicos são planejados para preservar funcionalidade, reduzir trauma tecidual e garantir recuperação segura.',
          points: [
            'Planejamento individual da técnica',
            'Orientações claras de pós-operatório',
            'Retornos programados para acompanhamento',
          ],
        },
      ]}
      sideTitle="Quando avaliar"
      sidePoints={[
        'Desconforto em atividades físicas',
        'Irritações locais recorrentes',
        'Incômodo funcional ou estético persistente',
      ]}
      ctaLabel="Agendar avaliação"
      ctaHref={siteRoutes.attendance}
      relatedLinks={[
        { label: 'Laser Íntimo', href: siteRoutes.advancedGynecology.laserIntimo },
        {
          label: 'Cirurgia Ginecológica',
          href: siteRoutes.advancedGynecology.gynecologicalSurgery,
        },
      ]}
    />
  );
}
