import { getBrandConfig } from '../../../src/brands/getBrandConfig';
import { siteRoutes } from '../../../src/core/layout/siteRoutes';
import { buildMetadata } from '../../../src/core/seo/metadata';
import { TopicPageTemplate } from '../../../src/core/sections/TopicPageTemplate';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'especialidade/menopausa-climaterio');
}

export default function MenopausaClimaterioPage() {
  return (
    <TopicPageTemplate
      breadcrumbs={[
        { label: 'Home', href: siteRoutes.home },
        { label: 'Especialidade', href: siteRoutes.specialty.overview },
        { label: 'Menopausa & Climatério' },
      ]}
      eyebrow="Especialidade"
      title="Menopausa & Climatério"
      subtitle="Manejo clínico completo para sintomas físicos, emocionais e metabólicos, com foco em qualidade de vida e segurança terapêutica."
      heroImageSrc="https://images.pexels.com/photos/5215008/pexels-photo-5215008.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Consulta ginecológica para avaliação de menopausa e climatério"
      heroImagePosition="center 30%"
      blocks={[
        {
          title: 'Avaliação clínica completa',
          description:
            'O plano de cuidado considera sintomas, histórico pessoal, perfil cardiovascular, saúde óssea e rotina da paciente para uma estratégia individualizada.',
          points: [
            'Análise hormonal e metabólica',
            'Investigação de sintomas vasomotores e do sono',
            'Rastreio de saúde óssea e cardiovascular',
          ],
        },
        {
          title: 'Tratamentos personalizados',
          description:
            'As condutas podem incluir mudanças de estilo de vida, terapias não hormonais e reposição hormonal quando indicada de forma segura.',
          points: [
            'Reposição hormonal com acompanhamento periódico',
            'Controle de sintomas com metas objetivas',
            'Monitoramento clínico contínuo',
          ],
        },
      ]}
      sideTitle="O que cuidamos"
      sidePoints={[
        'Ondas de calor e sudorese noturna',
        'Insônia e fadiga persistente',
        'Oscilações de humor e irritabilidade',
        'Queda de libido e desconforto íntimo',
      ]}
      ctaLabel="Quero agendar"
      ctaHref={siteRoutes.attendance}
      relatedLinks={[
        { label: 'Implantes Hormonais', href: siteRoutes.specialty.hormonalImplants },
        { label: 'Ginecologia Avançada', href: siteRoutes.advancedGynecology.overview },
      ]}
    />
  );
}
