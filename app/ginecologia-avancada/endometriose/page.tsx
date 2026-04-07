import { getBrandConfig } from '../../../src/brands/getBrandConfig';
import { siteRoutes } from '../../../src/core/layout/siteRoutes';
import { buildMetadata } from '../../../src/core/seo/metadata';
import { TopicPageTemplate } from '../../../src/core/sections/TopicPageTemplate';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'ginecologia-avancada/endometriose');
}

export default function EndometriosePage() {
  return (
    <TopicPageTemplate
      breadcrumbs={[
        { label: 'Home', href: siteRoutes.home },
        { label: 'Ginecologia Avançada', href: siteRoutes.advancedGynecology.overview },
        { label: 'Endometriose' },
      ]}
      eyebrow="Ginecologia Avançada"
      title="Endometriose"
      subtitle="Diagnóstico e tratamento direcionados para controle da dor, preservação de fertilidade e melhora sustentada da qualidade de vida."
      heroImageSrc="https://images.pexels.com/photos/3958567/pexels-photo-3958567.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Paciente com dor pélvica em avaliação para investigação de endometriose"
      heroImagePosition="center center"
      blocks={[
        {
          title: 'Diagnóstico com estratégia',
          description:
            'A investigação considera sintomas, exame clínico e exames complementares para definir extensão da doença e impacto funcional.',
          points: [
            'Mapeamento de dor e sintomas associados',
            'Exames direcionados para confirmação diagnóstica',
            'Classificação clínica para definição terapêutica',
          ],
        },
        {
          title: 'Plano terapêutico individualizado',
          description:
            'O tratamento pode incluir medidas clínicas e cirúrgicas, sempre com foco em controle de sintomas e funcionalidade da paciente.',
          points: [
            'Manejo medicamentoso da dor',
            'Estratégias hormonais individualizadas',
            'Indicação cirúrgica quando necessária',
          ],
        },
      ]}
      sideTitle="Sinais de atenção"
      sidePoints={[
        'Cólicas intensas e progressivas',
        'Dor pélvica fora do período menstrual',
        'Dor na relação sexual',
        'Alterações intestinais ou urinárias no ciclo',
      ]}
      ctaLabel="Marcar avaliação"
      ctaHref={siteRoutes.attendance}
      relatedLinks={[
        {
          label: 'Cirurgia Ginecológica',
          href: siteRoutes.advancedGynecology.gynecologicalSurgery,
        },
        { label: 'Menopausa & Climatério', href: siteRoutes.specialty.menopause },
      ]}
    />
  );
}
