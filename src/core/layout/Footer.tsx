import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { Container } from '../design-system/primitives';
import { hexToRgba } from '../utils/colors';
import { footerColumns } from './siteStructure';
import { OPEN_COOKIE_PREFERENCES_EVENT } from './CookieConsentBanner';

const FooterShell = styled.footer`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
`;

const EthicsBand = styled.div`
  border-top: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  border-bottom: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
  background: ${({ theme }) => hexToRgba(theme.colors.backgroundAlt, 0.7)};

  p {
    margin: 0;
    min-height: 56px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
`;

const ContentBand = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: ${({ theme }) => theme.spacing.xxl}px 0;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr 1.3fr;
  gap: ${({ theme }) => theme.spacing.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 1.2fr 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg}px;
  }
`;

const BrandCol = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const BrandTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  margin: 0;
`;

const BrandText = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.86)};
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const SectionTitle = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const LinkList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const FooterLink = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.9)};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContactCol = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const ContactLine = styled.a`
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.9)};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BottomBand = styled.div`
  background: ${({ theme }) => hexToRgba(theme.colors.text, 0.08)};
  border-top: 1px solid ${({ theme }) => hexToRgba(theme.colors.text, 0.12)};
`;

const BottomInner = styled.div`
  min-height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 72px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.md}px 0;
  }
`;

const Rights = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.78)};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  line-height: 1.7;
`;

const CookiePreferencesButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin-top: 4px;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.86)};
  text-decoration: underline;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  line-height: 1.5;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterLogo = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  display: inline-flex;

  img {
    width: auto;
    height: 38px;
    object-fit: contain;
  }
`;

export const Footer = () => {
  const { name, logo, content } = useBrand();
  const phoneHref = `tel:${content.contact.phone.replace(/[^0-9+]/g, '')}`;
  const whatsappHref = `https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, '')}`;
  const openCookiePreferences = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
  };

  return (
    <FooterShell>
      <EthicsBand>
        <Container width="wide">
          <p>
            Este site segue as normas de Ética Médica e de Publicidade Médica do Conselho Federal de
            Medicina.
          </p>
        </Container>
      </EthicsBand>

      <ContentBand>
        <Container width="wide">
          <FooterGrid>
            <BrandCol>
              <BrandTitle>{name}</BrandTitle>
              <BrandText>{content.doctor.bio}</BrandText>
            </BrandCol>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <SectionTitle>{column.title}</SectionTitle>
                <LinkList>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </LinkList>
              </div>
            ))}

            <ContactCol>
              <SectionTitle>Atendimento</SectionTitle>
              <ContactLine href={phoneHref}>{content.contact.phone}</ContactLine>
              <ContactLine href={whatsappHref} target="_blank" rel="noreferrer noopener">
                WhatsApp para agendamento
              </ContactLine>
              <ContactLine href={`mailto:${content.contact.email}`}>
                {content.contact.email}
              </ContactLine>
              <BrandText>
                {content.location.addressLine}
                <br />
                {content.location.neighborhood} • {content.location.city}/{content.location.state}
              </BrandText>
              <BrandText>
                {content.location.openingHours?.[0] || 'Atendimento com hora marcada.'}
              </BrandText>
            </ContactCol>
          </FooterGrid>
        </Container>
      </ContentBand>

      <BottomBand>
        <Container width="wide">
          <BottomInner>
            <Rights>
              © {new Date().getFullYear()} | Todos os direitos reservados.
              <br />
              Responsável técnica: {content.doctor.name} • {content.doctor.registrationLabel}
              <br />
              <CookiePreferencesButton type="button" onClick={openCookiePreferences}>
                Preferências de cookies
              </CookiePreferencesButton>
            </Rights>
            {logo ? (
              <FooterLogo href="/">
                <Image src={logo} alt={name} width={220} height={38} />
              </FooterLogo>
            ) : null}
          </BottomInner>
        </Container>
      </BottomBand>
    </FooterShell>
  );
};
