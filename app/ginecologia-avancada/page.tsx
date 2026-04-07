import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { siteRoutes } from '../../src/core/layout/siteRoutes';
import { buildMetadata } from '../../src/core/seo/metadata';
import { SpecialtyHubPage } from '../../src/core/sections/SpecialtyHubPage';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'ginecologia-avancada');
}

export default function GinecologiaAvancadaPage() {
  return (
    <SpecialtyHubPage
      breadcrumbs={[{ label: 'Home', href: siteRoutes.home }, { label: 'Ginecologia Avançada' }]}
      featured={{
        eyebrow: 'Ginecologia Avançada',
        title: 'Diagnóstico preciso e conduta especializada em casos complexos',
        description:
          'Tecnologia e técnica para tratar endometriose, cirurgias ginecológicas, cirurgia íntima, laser íntimo e contracepção de longa duração com equipe experiente.',
        href: siteRoutes.advancedGynecology.endometriosis,
        ctaLabel: 'Conhecer endometriose',
        imageSrc:
          'https://images.pexels.com/photos/3958567/pexels-photo-3958567.jpeg?auto=compress&cs=tinysrgb&w=1600',
        imageAlt: 'Avaliação especializada de endometriose em ginecologia avançada',
      }}
      cardsTitle="Subespecialidades"
      cards={[
        {
          title: 'Laser Íntimo',
          subtitle: 'Tratamento funcional',
          description:
            'Tecnologia para desconfortos íntimos, secura vaginal e sintomas funcionais com recuperação rápida.',
          href: siteRoutes.advancedGynecology.laserIntimo,
          imageSrc:
            'https://images.pexels.com/photos/4586744/pexels-photo-4586744.jpeg?auto=compress&cs=tinysrgb&w=1600',
          imageAlt: 'Procedimento de laser íntimo ginecológico',
        },
        {
          title: 'Endometriose',
          subtitle: 'Dor pélvica e fertilidade',
          description:
            'Plano diagnóstico e terapêutico individualizado para controle da dor e preservação funcional.',
          href: siteRoutes.advancedGynecology.endometriosis,
          imageSrc:
            'https://images.pexels.com/photos/3958567/pexels-photo-3958567.jpeg?auto=compress&cs=tinysrgb&w=1600',
          imageAlt: 'Paciente em avaliação para endometriose',
        },
        {
          title: 'Cirurgia Ginecológica',
          subtitle: 'Minimamente invasiva',
          description:
            'Procedimentos com planejamento detalhado, foco em segurança e retorno progressivo às atividades.',
          href: siteRoutes.advancedGynecology.gynecologicalSurgery,
          imageSrc:
            'https://images.pexels.com/photos/4769120/pexels-photo-4769120.jpeg?auto=compress&cs=tinysrgb&w=1600',
          imageAlt: 'Equipe em cirurgia ginecológica minimamente invasiva',
        },
        {
          title: 'Cirurgia Íntima',
          subtitle: 'Funcional e estética',
          description:
            'Abordagem individual para desconforto funcional e autoestima, com indicação responsável e técnica precisa.',
          href: siteRoutes.advancedGynecology.intimateSurgery,
          imageSrc:
            'https://images.pexels.com/photos/7659690/pexels-photo-7659690.jpeg?auto=compress&cs=tinysrgb&w=1600',
          imageAlt: 'Consulta para planejamento de cirurgia íntima',
        },
        {
          title: 'DIUs',
          subtitle: 'Contracepção de longa duração',
          description:
            'Escolha entre DIU hormonal e não hormonal, com inserção segura e acompanhamento ginecológico contínuo.',
          href: siteRoutes.advancedGynecology.iuds,
          imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Example_of_IUD.jpg',
          imageAlt: 'Dispositivo intrauterino para contracepção',
        },
      ]}
    />
  );
}
