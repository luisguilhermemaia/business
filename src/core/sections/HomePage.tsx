'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { Container } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { siteRoutes } from '../layout/siteRoutes';
import { FeatureHighlightSection } from './FeatureHighlightSection';
import { hexToRgba } from '../utils/colors';

const HERO_AUTOPLAY_MS = 6200;

const Hero = styled.section`
  position: relative;
  min-height: clamp(520px, 74vh, 760px);
  overflow: hidden;
`;

const HeroSlide = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: ${({ $active }) => ($active ? 'scale(1)' : 'scale(1.03)')};
  transition:
    opacity 520ms ease,
    transform 1100ms ease;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.68)} 0%,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.46)} 38%,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.16)} 72%,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.06)} 100%
    ),
    linear-gradient(
      180deg,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.14)} 0%,
      ${({ theme }) => hexToRgba(theme.colors.text, 0.48)} 100%
    );
`;

const HeroContentWrap = styled.div`
  position: relative;
  z-index: 2;
  min-height: clamp(520px, 74vh, 760px);
  display: flex;
  align-items: center;
`;

const HeroInner = styled.div`
  width: min(720px, 100%);
  color: ${({ theme }) => theme.colors.surface};
`;

const HeroTitle = styled.h1`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: clamp(2.35rem, 4.8vw + 0.6rem, 4.3rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  max-width: 760px;
`;

const HeroDivider = styled.div`
  width: min(520px, 76vw);
  height: 2px;
  margin-bottom: 24px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => hexToRgba(theme.colors.primary, 0.96)} 0%,
    ${({ theme }) => hexToRgba(theme.colors.primary, 0.56)} 72%,
    transparent 100%
  );
`;

const HeroMeta = styled.div`
  margin: 0;
  max-width: 760px;
  display: grid;
  gap: 8px;
`;

const HeroMetaLine = styled.p<{ $credential?: boolean }>`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.surface, 0.9)};
  font-size: ${({ theme, $credential }) =>
    $credential ? theme.typography.sizes.lg : 'clamp(1.05rem, 0.85vw + 0.84rem, 1.4rem)'};
  line-height: ${({ theme }) => theme.typography.lineHeights?.normal || 1.6};
  font-weight: ${({ theme, $credential }) =>
    $credential ? theme.typography.weights.medium : theme.typography.weights.regular};
`;

const HeroActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const PrimaryAction = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  min-height: 46px;
  padding: 0 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.65)};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;

  &::after {
    content: none !important;
    display: none !important;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryStrong};
    border-color: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.82)};
    box-shadow: 0 10px 18px ${({ theme }) => hexToRgba(theme.colors.text, 0.2)};
    transform: translateY(-1px);
  }
`;

const SecondaryAction = styled(PrimaryAction)`
  background: transparent;
  border-color: ${({ theme }) => hexToRgba(theme.colors.surface, 0.54)};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.14)};
    border-color: ${({ theme }) => hexToRgba(theme.colors.surface, 0.82)};
    color: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 10px 18px ${({ theme }) => hexToRgba(theme.colors.text, 0.16)};
    transform: translateY(-1px);
  }
`;

const HeroControls = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 24px;
  z-index: 2;
`;

const HeroControlsInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeroArrowGroup = styled.div`
  display: inline-flex;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const HeroArrow = styled.button`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radii.round};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.surface, 0.52)};
  background: ${({ theme }) => hexToRgba(theme.colors.text, 0.32)};
  color: ${({ theme }) => theme.colors.surface};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => hexToRgba(theme.colors.text, 0.5)};
  }
`;

const HeroDots = styled.div`
  display: inline-flex;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const HeroDot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '28px' : '10px')};
  height: 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.surface, 0.55)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.surface : hexToRgba(theme.colors.surface, 0.26)};
  cursor: pointer;
  transition: all 200ms ease;
`;

const AboutPreview = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: clamp(64px, 8vw, 110px) 0 28px;
`;

const AboutGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 58%) minmax(0, 42%);
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const AboutImage = styled.div`
  position: relative;
  min-height: clamp(430px, 48vw, 620px);
  overflow: hidden;
  border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 380px;
  }
`;

const AboutContent = styled.article`
  margin: -48px 0 0 -72px;
  padding: clamp(24px, 3vw, 44px) clamp(20px, 2.6vw, 40px);
  background: ${({ theme }) => hexToRgba(theme.colors.surfaceMuted, 0.94)};
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
  z-index: 2;
  display: grid;
  gap: 12px;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0;
    border-right: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const AboutTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const AboutTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: clamp(2rem, 2.8vw + 0.6rem, 3rem);
  line-height: 1.08;
  letter-spacing: -0.01em;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.primary};
`;

const AboutPlus = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
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
  transform: translateY(2px);

  &::after {
    content: none !important;
    display: none !important;
  }
`;

const AboutText = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.7)};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.8};
  font-size: clamp(1rem, 0.62vw + 0.85rem, 1.15rem);
`;

const SpecialtySection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl * 1.2}px 0 ${({ theme }) => theme.spacing.lg}px;
`;

const BackToTopSection = styled.section`
  padding: ${({ theme }) => theme.spacing.md}px 0 ${({ theme }) => theme.spacing.md}px;
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

const SectionHead = styled.div`
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

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 2.6vw + 0.5rem, 2.4rem);
`;

const SectionTitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const SectionPlus = styled(AboutPlus)`
  transform: none;
`;

const SectionSubtitle = styled.p`
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

const SpecialtyLink = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const ctaCards = [
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

export const HomePage = () => {
  const { content } = useBrand();

  const heroImages = useMemo(() => {
    if (content.hero.images && content.hero.images.length > 0) {
      return content.hero.images;
    }
    return ['/brands/karinne-azin/banner.jpg'];
  }, [content.hero.images]);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const id = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % heroImages.length);
    }, HERO_AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [heroImages.length]);

  const goNext = () => {
    setCurrentSlide((previous) => (previous + 1) % heroImages.length);
  };

  const goPrevious = () => {
    setCurrentSlide((previous) => (previous - 1 + heroImages.length) % heroImages.length);
  };

  const backToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Hero>
        {heroImages.map((image, index) => (
          <HeroSlide key={`${image}-${index}`} $active={currentSlide === index}>
            <Image
              src={image}
              alt={content.doctor.name}
              fill
              priority={index === 0}
              style={{ objectFit: 'cover' }}
            />
            <HeroOverlay />
          </HeroSlide>
        ))}

        <HeroContentWrap>
          <Container width="wide">
            <HeroInner>
              <HeroTitle>{content.hero.headline || content.doctor.name}</HeroTitle>
              <HeroDivider />
              <HeroMeta>
                <HeroMetaLine>{content.doctor.specialty}</HeroMetaLine>
                <HeroMetaLine>{content.hero.subheadline}</HeroMetaLine>
                <HeroMetaLine $credential>{content.doctor.registrationLabel}</HeroMetaLine>
                {content.doctor.secondaryRegistrationLabel ? (
                  <HeroMetaLine $credential>
                    {content.doctor.secondaryRegistrationLabel}
                  </HeroMetaLine>
                ) : null}
              </HeroMeta>
              <HeroActions>
                <PrimaryAction href={siteRoutes.attendance}>
                  Agendar consulta
                  <Icon name="arrow-right" size={14} />
                </PrimaryAction>
                <SecondaryAction href={siteRoutes.about}>Conheça a médica</SecondaryAction>
              </HeroActions>
            </HeroInner>
          </Container>
        </HeroContentWrap>

        <HeroControls>
          <Container width="wide">
            <HeroControlsInner>
              <HeroArrowGroup>
                <HeroArrow onClick={goPrevious} aria-label="Slide anterior">
                  <Icon name="arrow-right" size={16} style={{ transform: 'rotate(-90deg)' }} />
                </HeroArrow>
                <HeroArrow onClick={goNext} aria-label="Próximo slide">
                  <Icon name="arrow-right" size={16} style={{ transform: 'rotate(90deg)' }} />
                </HeroArrow>
              </HeroArrowGroup>
              <HeroDots>
                {heroImages.map((_, index) => (
                  <HeroDot
                    key={`dot-${index}`}
                    $active={index === currentSlide}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Ir para o slide ${index + 1}`}
                  />
                ))}
              </HeroDots>
            </HeroControlsInner>
          </Container>
        </HeroControls>
      </Hero>

      <FeatureHighlightSection
        title={content.doctor.name}
        plusHref={siteRoutes.about}
        plusAriaLabel="Ir para a página Sobre a médica"
        imageSrc={content.hero.images?.[0] || '/brands/karinne-azin/banner.jpg'}
        imageAlt={content.doctor.name}
        imageObjectPosition="center center"
        imageOverlay
        overlayTone="soft"
        paragraphs={[
          '“Unir o que existe de mais moderno na Medicina com o acolhimento e a escuta do médico de antigamente. Isso é o que melhor me define.',
          'Ao longo da minha prática, percebi um padrão: muitas mulheres chegam ao consultório já frustradas, após tentativas de tratamentos que não resolveram seus sintomas.”',
          '“Foi a partir dessa percepção que decidi direcionar minha atuação para um cuidado mais aprofundado, individualizado e baseado em atualização constante nas principais diretrizes nacionais e internacionais.”',
        ]}
      />

      <SpecialtySection>
        <Container width="wide">
          <SectionHead>
            <div>
              <SectionTitleRow>
                <SectionTitle>Especialidades</SectionTitle>
                <SectionPlus
                  href={siteRoutes.advancedGynecology.overview}
                  aria-label="Ir para a página de especialidades"
                >
                  +
                </SectionPlus>
              </SectionTitleRow>
              <SectionSubtitle>
                Diagnóstico preciso e planos terapêuticos com foco em segurança, eficácia e
                qualidade de vida.
              </SectionSubtitle>
            </div>
          </SectionHead>

          <SpecialtyGrid>
            {ctaCards.map((card, index) => {
              const cardImage = heroImages[index % heroImages.length];

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
