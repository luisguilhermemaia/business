import { getBrandConfig } from '../../../src/brands/getBrandConfig';
import { siteRoutes } from '../../../src/core/layout/siteRoutes';
import { buildMetadata } from '../../../src/core/seo/metadata';
import { TopicPageTemplate } from '../../../src/core/sections/TopicPageTemplate';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'ginecologia-avancada/laser-intimo');
}

export default function LaserIntimoPage() {
  return (
    <TopicPageTemplate
      breadcrumbs={[
        { label: 'Home', href: siteRoutes.home },
        { label: 'Ginecologia Avançada', href: siteRoutes.advancedGynecology.overview },
        { label: 'Laser Íntimo' },
      ]}
      eyebrow="Ginecologia Avançada"
      title="Laser Íntimo"
      subtitle="Procedimento indicado para tratar alterações funcionais e desconfortos íntimos, com técnica precisa e recuperação rápida."
      heroImageSrc="https://images.pexels.com/photos/4586744/pexels-photo-4586744.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Procedimento ginecológico com equipamento de laser íntimo"
      heroImagePosition="center center"
      blocks={[
        {
          title: 'Quando pode ser indicado',
          description:
            'O tratamento pode ser avaliado em casos de ressecamento vaginal, desconforto nas relações, alterações da mucosa e queixas urinárias leves.',
          points: [
            'Avaliação ginecológica detalhada',
            'Definição do protocolo de sessões',
            'Acompanhamento da resposta clínica',
          ],
        },
        {
          title: 'Como é conduzido',
          description:
            'A abordagem é ambulatorial, com tempo curto de procedimento e orientações claras para o pós-atendimento.',
          points: [
            'Conforto durante a aplicação',
            'Retorno rápido às atividades',
            'Revisão clínica programada',
          ],
        },
      ]}
      sideTitle="Benefícios esperados"
      sidePoints={[
        'Melhora da hidratação e elasticidade vaginal',
        'Redução de desconfortos íntimos',
        'Suporte complementar no climatério',
      ]}
      ctaLabel="Agendar consulta"
      ctaHref={siteRoutes.attendance}
      relatedLinks={[
        { label: 'Endometriose', href: siteRoutes.advancedGynecology.endometriosis },
        { label: 'DIUs', href: siteRoutes.advancedGynecology.iuds },
      ]}
    />
  );
}
