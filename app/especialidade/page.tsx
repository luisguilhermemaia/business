import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { siteRoutes } from '../../src/core/layout/siteRoutes';
import { buildMetadata } from '../../src/core/seo/metadata';
import { SpecialtyHubPage } from '../../src/core/sections/SpecialtyHubPage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'especialidade');
}

export default function EspecialidadePage() {
  return (
    <SpecialtyHubPage
      breadcrumbs={[{ label: 'Home', href: siteRoutes.home }, { label: 'Especialidade' }]}
      featured={{
        eyebrow: 'Especialidade',
        title: 'Menopausa e terapia hormonal com cuidado individual',
        description:
          'Acompanhamento especializado para menopausa, climatério e implantes hormonais com abordagem criteriosa, baseada em sintomas, exames e metas de qualidade de vida.',
        href: siteRoutes.specialty.menopause,
        ctaLabel: 'Conhecer menopausa',
        imageSrc:
          'https://images.pexels.com/photos/5215008/pexels-photo-5215008.jpeg?auto=compress&cs=tinysrgb&w=1600',
        imageAlt: 'Consulta especializada em menopausa e climatério',
      }}
      cardsTitle="Especialidades"
      cards={[
        {
          title: 'Menopausa & Climatério',
          subtitle: 'Controle de sintomas',
          description:
            'Manejo dos fogachos, sono, humor, libido e alterações metabólicas com plano terapêutico personalizado.',
          href: siteRoutes.specialty.menopause,
          imageSrc:
            'https://images.pexels.com/photos/5215008/pexels-photo-5215008.jpeg?auto=compress&cs=tinysrgb&w=1600',
          imageAlt: 'Atendimento médico para menopausa e climatério',
        },
        {
          title: 'Implantes Hormonais',
          subtitle: 'Indicação responsável',
          description:
            'Avaliação criteriosa, indicação segura e monitoramento contínuo para terapias hormonais de precisão.',
          href: siteRoutes.specialty.hormonalImplants,
          imageSrc:
            'https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg?auto=compress&cs=tinysrgb&w=1600',
          imageAlt: 'Consulta médica sobre implantes hormonais',
        },
      ]}
    />
  );
}
