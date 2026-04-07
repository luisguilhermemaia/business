'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { Container } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { siteRoutes } from '../layout/siteRoutes';
import { hexToRgba } from '../utils/colors';

type AboutTabKey = 'perfil' | 'curriculum' | 'historia' | 'inspiracao';

interface AboutTab {
  key: AboutTabKey;
  label: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.xl}px 0 ${({ theme }) => theme.spacing.xxl}px;
  background: ${({ theme }) => hexToRgba(theme.colors.backgroundAlt, 0.3)};
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

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 40%) minmax(0, 60%);
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Visual = styled.div`
  position: relative;
  min-height: clamp(420px, 52vw, 760px);
  overflow: hidden;
  border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 420px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 350px;
  }
`;

const ContentBlock = styled.div`
  margin-top: 24px;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 0;
  }
`;

const TabsBar = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
  margin: 0 0 -1px 28px;
  padding: 0 0 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 0 0;
    padding-top: ${({ theme }) => theme.spacing.md}px;
  }
`;

const TabButton = styled.button<{ $active?: boolean }>`
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  padding: 0 18px 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: clamp(0.72rem, 0.2vw + 0.68rem, 0.9rem);
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.weights.bold : theme.typography.weights.medium};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primaryStrong : hexToRgba(theme.colors.text, 0.66)};
  transition: color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }

  ${({ $active, theme }) =>
    $active
      ? `
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -1px;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid ${hexToRgba(theme.colors.surfaceMuted, 0.96)};
    }
  `
      : ''}
`;

const TabDivider = styled.span`
  color: ${({ theme }) => hexToRgba(theme.colors.primary, 0.46)};
  font-size: 0.95rem;
  line-height: 1;
`;

const ContentCard = styled.article`
  margin-left: -56px;
  padding: clamp(24px, 2.8vw, 40px) clamp(20px, 2.6vw, 40px) clamp(22px, 2.4vw, 34px);
  background: ${({ theme }) => hexToRgba(theme.colors.surfaceMuted, 0.96)};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.1)};
  border-right: 2px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.3)};
  min-height: clamp(380px, 42vw, 530px);
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.md}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    border-right: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.1)};
    min-height: 0;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: clamp(2rem, 2.2vw + 0.8rem, 3rem);
  line-height: 1.08;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.primary};
`;

const Paragraph = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.74)};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.8};
  font-size: clamp(1rem, 0.5vw + 0.86rem, 1.13rem);
`;

const PointList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const Point = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.76)};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.6;
`;

const BackToTopSection = styled.section`
  padding: ${({ theme }) => theme.spacing.sm}px 0 ${({ theme }) => theme.spacing.md}px;
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

export const AboutDoctorProfilePage = () => {
  const { content } = useBrand();
  const [activeTab, setActiveTab] = useState<AboutTabKey>('perfil');

  const tabs = useMemo<AboutTab[]>(
    () => [
      {
        key: 'perfil',
        label: 'Perfil',
        title: content.doctor.name,
        paragraphs: [
          'Combinar o que existe de mais moderno na medicina com atendimento humano, acolhedor e baseado em ciência é o princípio que orienta minha prática.',
          'Meu foco é oferecer uma experiência de consulta cuidadosa, com escuta ativa, clareza no raciocínio clínico e plano terapêutico individualizado para cada paciente.',
        ],
      },
      {
        key: 'curriculum',
        label: 'Curriculum',
        title: 'Curriculum',
        paragraphs: [
          'Atuação dedicada à saúde integral da mulher, com cuidado personalizado e condutas baseadas em evidências.',
          'Atualização contínua em diretrizes nacionais e internacionais para decisões clínicas seguras e efetivas.',
        ],
        points: [
          'Formação contínua e educação médica permanente',
          'Acompanhamento clínico com foco em segurança',
          'Experiência em menopausa, implantes hormonais e ginecologia avançada',
        ],
      },
      {
        key: 'historia',
        label: 'História',
        title: 'História',
        paragraphs: [
          'Ao longo da minha prática, percebi que muitas mulheres chegam ao consultório após tentativas de cuidado que não resolveram seus sintomas de forma completa.',
          'Essa percepção direcionou minha atuação para um acompanhamento mais profundo, estruturado e individualizado, respeitando contexto, objetivos e momento de vida de cada paciente.',
        ],
      },
      {
        key: 'inspiracao',
        label: 'Inspiração',
        title: 'Inspiração',
        paragraphs: [
          'Acredito em uma medicina que une tecnologia e precisão técnica com presença, empatia e escuta verdadeira.',
          'Mais do que tratar sintomas isolados, meu propósito é devolver qualidade de vida, segurança e autonomia para as mulheres em cada etapa do cuidado.',
        ],
      },
    ],
    [
      content.doctor.name,
    ]
  );

  const currentTab = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const aboutImage = content.hero.images?.[0] || content.doctor.headshot || '/brands/karinne-azin/banner.jpg';

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
            <BreadcrumbCurrent>{content.doctor.name}</BreadcrumbCurrent>
          </Breadcrumb>

          <IntroGrid>
            <Visual>
              <Image
                src={aboutImage}
                alt={content.doctor.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </Visual>

            <ContentBlock>
              <TabsBar role="tablist" aria-label="Seções sobre a médica">
                {tabs.map((tab, index) => (
                  <Fragment key={tab.key}>
                    {index > 0 ? <TabDivider aria-hidden="true">|</TabDivider> : null}
                    <TabButton
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.key}
                      $active={activeTab === tab.key}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                    </TabButton>
                  </Fragment>
                ))}
              </TabsBar>

              <ContentCard role="tabpanel" aria-live="polite">
                <Title>{currentTab.title}</Title>
                {currentTab.paragraphs.map((paragraph) => (
                  <Paragraph key={paragraph}>{paragraph}</Paragraph>
                ))}
                {currentTab.points?.length ? (
                  <PointList>
                    {currentTab.points.map((point) => (
                      <Point key={point}>
                        <Icon name="check" size={14} />
                        <span>{point}</span>
                      </Point>
                    ))}
                  </PointList>
                ) : null}
              </ContentCard>
            </ContentBlock>
          </IntroGrid>
        </Container>
      </Wrapper>

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
