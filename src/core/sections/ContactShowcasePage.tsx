'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { Container } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { FeatureHighlightSection } from './FeatureHighlightSection';
import { hexToRgba } from '../utils/colors';
import { siteRoutes } from '../layout/siteRoutes';

const CONTACT_FREE_IMAGE_URL =
  'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1800&q=80';

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.xl}px 0 0;
  background: ${({ theme }) => hexToRgba(theme.colors.backgroundAlt, 0.42)};
`;

const Breadcrumb = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.6)};
`;

const BreadcrumbLink = styled(Link)<{ href: string }>`
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.74)};
  text-decoration: none;

  &::after {
    content: none !important;
    display: none !important;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }
`;

const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.86)};
`;

const Copy = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.76)};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  font-size: clamp(1rem, 0.5vw + 0.86rem, 1.13rem);
`;

const InlineAnchor = styled(Link)<{ href: string }>`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &::after {
    content: none !important;
    display: none !important;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }
`;

const SectionTitle = styled.h3`
  margin: ${({ theme }) => theme.spacing.md}px 0 0;
  font-size: clamp(1.36rem, 1.2vw + 0.7rem, 2rem);
  line-height: 1.25;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.67)};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
`;

const WhatsappButton = styled.a`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  min-height: 52px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid rgba(34, 165, 73, 0.7);
  background: linear-gradient(180deg, #2ebd57 0%, #25a844 100%);
  color: #fff !important;
  -webkit-text-fill-color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  box-shadow: 0 10px 18px rgba(37, 168, 68, 0.24);

  &::after {
    content: none !important;
    display: none !important;
  }

  &:hover {
    background: linear-gradient(180deg, #28ad4d 0%, #1f953b 100%);
    color: #fff !important;
    -webkit-text-fill-color: #fff;
  }
`;

const SpecialtySection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl * 1.2}px 0 ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => hexToRgba(theme.colors.backgroundAlt, 0.42)};
`;

const SpecialtyHead = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SpecialtyHeadTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const SpecialtyHeadTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.7rem, 2.6vw + 0.5rem, 2.4rem);
`;

const SpecialtyHeadPlus = styled(Link)<{ href: string }>`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radii.round};
  border: 2px solid ${({ theme }) => hexToRgba(theme.colors.surface, 0.9)};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.55rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: none !important;
    display: none !important;
  }
`;

const SpecialtyHeadSubtitle = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.82)};
`;

const SpecialtyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const SpecialtyCard = styled.article`
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.14)};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  display: grid;
  grid-template-rows: 200px auto;
`;

const SpecialtyVisual = styled.div`
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.08)} 0%,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.46)} 100%
    );
  }
`;

const SpecialtyBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg}px;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const SpecialtyTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
`;

const SpecialtySubtitle = styled.p`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.62)};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const SpecialtyText = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.83)};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const SpecialtyLink = styled(Link)<{ href: string }>`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &::after {
    content: none !important;
    display: none !important;
  }
`;

const BackToTopSection = styled.section`
  padding: ${({ theme }) => theme.spacing.md}px 0 ${({ theme }) => theme.spacing.md}px;
  background: ${({ theme }) => hexToRgba(theme.colors.backgroundAlt, 0.42)};
`;

const BackToTopWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const BackToTopButton = styled.button`
  width: 58px;
  height: 58px;
  border-radius: ${({ theme }) => theme.radii.round};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.26)};
  background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.88)};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover {
    background: ${({ theme }) => hexToRgba(theme.colors.surface, 1)};
    border-color: ${({ theme }) => hexToRgba(theme.colors.primary, 0.5)};
    box-shadow: 0 6px 14px ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
    transform: translateY(-1px);
  }
`;

const BackToTopChevronStack = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  margin-top: -1px;
`;

const BackToTopChevron = styled.span`
  width: 8px;
  height: 8px;
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
  transform: rotate(-45deg);
`;

const specialtyCards = [
  {
    title: 'Menopausa & Climatério',
    subtitle: 'Acompanhamento individualizado',
    description:
      'Avaliação completa dos sintomas, reposição hormonal quando indicada e acompanhamento contínuo para preservar bem-estar e qualidade de vida.',
    href: siteRoutes.specialty.menopause,
  },
  {
    title: 'Implantes Hormonais',
    subtitle: 'Indicação com segurança',
    description:
      'Planejamento terapêutico com exames, indicação criteriosa e monitoramento periódico para resultados seguros e sustentáveis.',
    href: siteRoutes.specialty.hormonalImplants,
  },
  {
    title: 'Ginecologia Avançada',
    subtitle: 'Abordagem moderna',
    description:
      'Laser íntimo, manejo da endometriose, cirurgias ginecológicas e opções contraceptivas de longa duração com técnica e cuidado.',
    href: siteRoutes.advancedGynecology.overview,
  },
] as const;

export const ContactShowcasePage = () => {
  const { content } = useBrand();
  const whatsappBase = `https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, '')}`;
  const cardImages = useMemo(() => {
    if (content.hero.images && content.hero.images.length > 0) return content.hero.images;
    if (content.doctor.headshot) return [content.doctor.headshot];
    return [CONTACT_FREE_IMAGE_URL];
  }, [content.doctor.headshot, content.hero.images]);

  const backToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Wrapper>
        <Container width="wide">
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbLink href={siteRoutes.home}>Home</BreadcrumbLink>
            <span>›</span>
            <BreadcrumbCurrent>Fale Conosco</BreadcrumbCurrent>
          </Breadcrumb>
        </Container>
      </Wrapper>

      <FeatureHighlightSection
        tone="alt"
        reverse
        title="Fale Conosco"
        subtitle="Agendamento de Consultas"
        plusHref={siteRoutes.attendance}
        plusAriaLabel="Ir para a página de atendimento"
        imageSrc={CONTACT_FREE_IMAGE_URL}
        imageAlt="Paciente em contato online"
        imageObjectPosition="center center"
        imageOverlay
        overlayTone="medium"
        paragraphs={[
          'Para pacientes já atendidas, o agendamento pode ser feito diretamente com nossa equipe pelos canais oficiais.',
          <>
            Para pacientes novas, o primeiro atendimento é feito de forma prática via WhatsApp. Se
            preferir conhecer antes como funciona o atendimento, acesse{' '}
            <InlineAnchor href={siteRoutes.attendance}>aqui</InlineAnchor>.
          </>,
        ]}
        actions={
          <>
            <SectionTitle>Dúvidas sobre tratamentos e cirurgias</SectionTitle>
            <Copy>
              Nossa equipe pode orientar sobre consultas, exames, procedimentos e etapas do cuidado.
            </Copy>
            <WhatsappButton href={whatsappBase} target="_blank" rel="noreferrer noopener">
              <FaWhatsapp size={18} aria-hidden="true" /> Entre em contato com nossa equipe
            </WhatsappButton>
          </>
        }
      />

      <SpecialtySection>
        <Container width="wide">
          <SpecialtyHead>
            <div>
              <SpecialtyHeadTitleRow>
                <SpecialtyHeadTitle>Especialidades</SpecialtyHeadTitle>
                <SpecialtyHeadPlus
                  href={siteRoutes.advancedGynecology.overview}
                  aria-label="Ir para a página de especialidades"
                >
                  +
                </SpecialtyHeadPlus>
              </SpecialtyHeadTitleRow>
              <SpecialtyHeadSubtitle>
                Diagnóstico preciso e planos terapêuticos com foco em segurança, eficácia e
                qualidade de vida.
              </SpecialtyHeadSubtitle>
            </div>
          </SpecialtyHead>

          <SpecialtyGrid>
            {specialtyCards.map((card, index) => {
              const cardImage = cardImages[index % cardImages.length];
              return (
                <SpecialtyCard key={card.title}>
                  <SpecialtyVisual>
                    <Image src={cardImage} alt={card.title} fill style={{ objectFit: 'cover' }} />
                  </SpecialtyVisual>
                  <SpecialtyBody>
                    <SpecialtyTitle>{card.title}</SpecialtyTitle>
                    <SpecialtySubtitle>{card.subtitle}</SpecialtySubtitle>
                    <SpecialtyText>{card.description}</SpecialtyText>
                    <SpecialtyLink href={card.href}>
                      Saiba mais
                      <Icon name="arrow-right" size={14} style={{ transform: 'rotate(90deg)' }} />
                    </SpecialtyLink>
                  </SpecialtyBody>
                </SpecialtyCard>
              );
            })}
          </SpecialtyGrid>
        </Container>
      </SpecialtySection>

      <BackToTopSection>
        <Container width="wide">
          <BackToTopWrap>
            <BackToTopButton type="button" onClick={backToTop} aria-label="Voltar para o topo">
              <BackToTopChevronStack aria-hidden="true">
                <BackToTopChevron />
                <BackToTopChevron />
              </BackToTopChevronStack>
            </BackToTopButton>
          </BackToTopWrap>
        </Container>
      </BackToTopSection>
    </>
  );
};
