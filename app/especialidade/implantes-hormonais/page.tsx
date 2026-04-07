import { getBrandConfig } from '../../../src/brands/getBrandConfig';
import { siteRoutes } from '../../../src/core/layout/siteRoutes';
import { buildMetadata } from '../../../src/core/seo/metadata';
import { TopicPageTemplate } from '../../../src/core/sections/TopicPageTemplate';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'especialidade/implantes-hormonais');
}

export default function ImplantesHormonaisPage() {
  return (
    <TopicPageTemplate
      breadcrumbs={[
        { label: 'Home', href: siteRoutes.home },
        { label: 'Especialidade', href: siteRoutes.specialty.overview },
        { label: 'Implantes Hormonais' },
      ]}
      eyebrow="Especialidade"
      title="Implantes Hormonais"
      subtitle="Indicação criteriosa e acompanhamento estruturado para terapias hormonais, com foco em segurança, previsibilidade e resultado clínico."
      heroImageSrc="https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Médica orientando paciente sobre terapia com implantes hormonais"
      heroImagePosition="center 32%"
      blocks={[
        {
          title: 'Indicação responsável',
          description:
            'O tratamento inicia com avaliação clínica e laboratorial detalhada para confirmar indicação, contraindicações e metas terapêuticas individuais.',
          points: [
            'Histórico clínico completo',
            'Exames laboratoriais e rastreio de risco',
            'Definição conjunta de objetivos do tratamento',
          ],
        },
        {
          title: 'Monitoramento e ajustes',
          description:
            'Após o início da terapia, o seguimento periódico permite ajustes precisos para manter eficácia e reduzir riscos ao longo do tempo.',
          points: [
            'Reavaliações programadas',
            'Controle de sintomas e efeitos adversos',
            'Ajustes individualizados de conduta',
          ],
        },
      ]}
      sideTitle="Etapas do cuidado"
      sidePoints={[
        'Consulta de avaliação e elegibilidade',
        'Planejamento terapêutico individual',
        'Acompanhamento clínico periódico',
        'Revisão de exames e metas terapêuticas',
      ]}
      ctaLabel="Agendar avaliação"
      ctaHref={siteRoutes.attendance}
      relatedLinks={[
        { label: 'Menopausa & Climatério', href: siteRoutes.specialty.menopause },
        { label: 'Ginecologia Avançada', href: siteRoutes.advancedGynecology.overview },
      ]}
    />
  );
}
