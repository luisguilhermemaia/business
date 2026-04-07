import { getBrandConfig } from '../../../src/brands/getBrandConfig';
import { siteRoutes } from '../../../src/core/layout/siteRoutes';
import { buildMetadata } from '../../../src/core/seo/metadata';
import { TopicPageTemplate } from '../../../src/core/sections/TopicPageTemplate';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'ginecologia-avancada/cirurgia-ginecologica');
}

export default function CirurgiaGinecologicaPage() {
  return (
    <TopicPageTemplate
      breadcrumbs={[
        { label: 'Home', href: siteRoutes.home },
        { label: 'Ginecologia Avançada', href: siteRoutes.advancedGynecology.overview },
        { label: 'Cirurgia Ginecológica' },
      ]}
      eyebrow="Ginecologia Avançada"
      title="Cirurgia Ginecológica"
      subtitle="Procedimentos planejados com foco em segurança, técnica minimamente invasiva e recuperação orientada."
      heroImageSrc="https://images.pexels.com/photos/4769120/pexels-photo-4769120.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Equipe médica em ambiente cirúrgico para procedimento ginecológico"
      heroImagePosition="center center"
      blocks={[
        {
          title: 'Planejamento pré-operatório',
          description:
            'A indicação cirúrgica considera diagnóstico preciso, avaliação global da paciente e definição da técnica mais adequada para cada caso.',
          points: [
            'Explicação detalhada do procedimento',
            'Orientações pré-operatórias individualizadas',
            'Critérios claros de segurança',
          ],
        },
        {
          title: 'Recuperação e acompanhamento',
          description:
            'O pós-operatório é conduzido com monitoramento próximo, controle de sintomas e revisões programadas para retorno seguro das atividades.',
          points: [
            'Controle de dor e conforto',
            'Revisões periódicas até alta completa',
            'Orientação de retorno progressivo à rotina',
          ],
        },
      ]}
      sideTitle="Indicações frequentes"
      sidePoints={[
        'Miomas e pólipos',
        'Cistos ovarianos',
        'Endometriose com indicação cirúrgica',
        'Outras condições ginecológicas estruturais',
      ]}
      ctaLabel="Solicitar consulta"
      ctaHref={siteRoutes.attendance}
      relatedLinks={[
        { label: 'Endometriose', href: siteRoutes.advancedGynecology.endometriosis },
        { label: 'Cirurgia Íntima', href: siteRoutes.advancedGynecology.intimateSurgery },
      ]}
    />
  );
}
