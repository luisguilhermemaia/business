'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { Container } from '../design-system/primitives';
import { Icon } from '../icons/Icon';
import { FeatureHighlightSection } from './FeatureHighlightSection';
import { siteRoutes } from '../layout/siteRoutes';
import { hexToRgba } from '../utils/colors';

const Breadcrumb = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.58)};
`;

const BreadcrumbLink = styled(Link)<{ href: string }>`
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.7)};
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

const IntroList = styled.ul`
  display: grid;
  gap: 0;
`;

const IntroItem = styled.li`
  position: relative;
  margin: 0;
  padding: 7px 0 11px 34px;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.7)};
  line-height: 1.72;
  font-size: clamp(1rem, 0.56vw + 0.86rem, 1.12rem);

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.16)};
  }

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0.92em;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: ${({ theme }) => theme.radii.round};
    border: 1.5px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.58)};
    background: ${({ theme }) => hexToRgba(theme.colors.surface, 0.72)};
  }

  &::after {
    content: '';
    position: absolute;
    left: 13px;
    top: 0.92em;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: ${({ theme }) => theme.radii.round};
    background: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.9)};
  }
`;

const HeroActions = styled.div`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const HeroPrimaryCta = styled.a`
  min-height: 58px;
  max-width: 620px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.primary, 0.72)};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast} !important;
  -webkit-text-fill-color: ${({ theme }) => theme.colors.primaryContrast};
  text-decoration: none;
  padding: 11px ${({ theme }) => theme.spacing.lg}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: clamp(0.9rem, 0.24vw + 0.84rem, 1rem);
  line-height: 1.35;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.028em;
  text-transform: uppercase;
  box-shadow: 0 10px 20px ${({ theme }) => hexToRgba(theme.colors.primary, 0.22)};
  transition:
    background-color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    border-color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    transform ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    box-shadow ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &::after {
    content: none !important;
    display: none !important;
  }

  &:visited {
    color: ${({ theme }) => theme.colors.primaryContrast} !important;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.primaryContrast};
  }

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.86)};
    background: ${({ theme }) => theme.colors.primaryStrong};
    box-shadow: 0 14px 24px ${({ theme }) => hexToRgba(theme.colors.primaryStrong, 0.28)};
    color: ${({ theme }) => theme.colors.primaryContrast} !important;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.primaryContrast};
  }

  &:focus-visible {
    color: ${({ theme }) => theme.colors.primaryContrast} !important;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.primaryContrast};
  }
`;

const ActionLink = styled.a<{ $tone?: 'primary' | 'neutral' }>`
  min-height: 46px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid
    ${({ theme, $tone = 'neutral' }) =>
      $tone === 'primary' ? hexToRgba(theme.colors.primary, 0.7) : hexToRgba(theme.colors.text, 0.2)};
  background: ${({ theme, $tone = 'neutral' }) =>
    $tone === 'primary' ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $tone = 'neutral' }) =>
    $tone === 'primary' ? theme.colors.primaryContrast : theme.colors.text};
  text-decoration: none;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition:
    background-color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    border-color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'},
    transform ${({ theme }) => theme.motion?.duration.fast || '150ms'}
      ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &::after {
    content: none !important;
    display: none !important;
  }

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme, $tone = 'neutral' }) =>
      $tone === 'primary'
        ? hexToRgba(theme.colors.primaryStrong, 0.85)
        : hexToRgba(theme.colors.text, 0.34)};
    background: ${({ theme, $tone = 'neutral' }) =>
      $tone === 'primary' ? theme.colors.primaryStrong : hexToRgba(theme.colors.text, 0.04)};
  }
`;

const Segment = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl}px 0;
`;

const SegmentHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const SegmentEyebrow = styled.p`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.64)};
`;

const SegmentTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.65rem, 2.2vw + 0.45rem, 2.4rem);
`;

const SegmentText = styled.p`
  margin: 0;
  max-width: 860px;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.82)};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: 0.95fr 1.25fr;
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg}px;
  box-shadow: 0 10px 24px ${({ theme }) => hexToRgba(theme.colors.text, 0.07)};
`;

const CardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
`;

const Address = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.84)};
  line-height: 1.7;
`;

const DetailList = styled.ul`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const DetailItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.84)};
`;

const DetailAnchor = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }
`;

const CardActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const MapCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const MapFrame = styled.iframe`
  width: 100%;
  min-height: 460px;
  border: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 340px;
  }
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

export const ContactBookingHubPage = () => {
  const { content } = useBrand();

  const whatsappBase = `https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, '')}`;
  const phoneHref = `tel:${content.contact.phone.replace(/[^0-9+]/g, '')}`;
  const serviceBullets = useMemo(
    () => [
      'Atendimento particular com hora marcada e plano terapêutico individualizado.',
      `Consultas presenciais em ${content.location.city}/${content.location.state} e suporte remoto quando indicado.`,
      'O agendamento da primeira consulta é feito de forma prática pelo WhatsApp da clínica.',
      'Pacientes de outras cidades podem iniciar o atendimento com planejamento prévio.',
    ],
    [content.location.city, content.location.state]
  );
  const backToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <FeatureHighlightSection
        tone="radial"
        title="Atendimento"
        imageSrc={content.doctor.headshot || content.hero.images?.[0] || '/brands/karinne-azin/banner.jpg'}
        imageAlt={content.doctor.name}
        imageObjectPosition="center top"
        imageOverlay
        overlayTone="medium"
        paragraphs={[]}
        lead={
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbLink href={siteRoutes.home}>Home</BreadcrumbLink>
            <span>›</span>
            <BreadcrumbCurrent>Atendimento</BreadcrumbCurrent>
          </Breadcrumb>
        }
        actions={
          <>
            <IntroList>
              {serviceBullets.map((item) => (
                <IntroItem key={item}>{item}</IntroItem>
              ))}
            </IntroList>
            <HeroActions>
              <HeroPrimaryCta href={whatsappBase} target="_blank" rel="noreferrer noopener">
                Agendar uma primeira consulta com a Dra. Karinne e equipe
              </HeroPrimaryCta>
            </HeroActions>
          </>
        }
      />

      <Segment>
        <Container width="wide">
          <SegmentHeader>
            <SegmentEyebrow>Consultório</SegmentEyebrow>
            <SegmentTitle>Localização e mapa</SegmentTitle>
            <SegmentText>
              Veja os dados completos de atendimento presencial e use o mapa para traçar a rota até
              o consultório.
            </SegmentText>
          </SegmentHeader>

          <LocationGrid>
            <Card>
              <CardTitle>{`Consultório ${content.location.city}/${content.location.state}`}</CardTitle>

              <Address>
                {content.location.addressLine}
                <br />
                {content.location.neighborhood} • {content.location.city}/{content.location.state}
              </Address>

              <DetailList>
                <DetailItem>
                  <Icon name="phone" size={16} />
                  <DetailAnchor href={phoneHref}>{content.contact.phone}</DetailAnchor>
                </DetailItem>
                <DetailItem>
                  <Icon name="whatsapp" size={16} />
                  <DetailAnchor href={whatsappBase} target="_blank" rel="noreferrer noopener">
                    WhatsApp para agendamento
                  </DetailAnchor>
                </DetailItem>
                <DetailItem>
                  <Icon name="check" size={16} />
                  <DetailAnchor href={`mailto:${content.contact.email}`}>{content.contact.email}</DetailAnchor>
                </DetailItem>
                {content.location.openingHours.map((line) => (
                  <DetailItem key={line}>
                    <Icon name="clock" size={16} />
                    <span>{line}</span>
                  </DetailItem>
                ))}
              </DetailList>

              <CardActions>
                {content.location.mapsLink ? (
                  <ActionLink href={content.location.mapsLink} target="_blank" rel="noreferrer noopener" $tone="primary">
                    Abrir no Google Maps
                    <Icon name="location" size={15} />
                  </ActionLink>
                ) : null}
              </CardActions>
            </Card>

            <MapCard>
              {content.location.mapEmbedUrl ? (
                <MapFrame
                  src={content.location.mapEmbedUrl}
                  loading="lazy"
                  allowFullScreen
                  title="Localização do consultório"
                />
              ) : (
                <div style={{ padding: '24px' }}>
                  <SegmentText>Mapa indisponível no momento.</SegmentText>
                </div>
              )}
            </MapCard>
          </LocationGrid>
        </Container>
      </Segment>

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
