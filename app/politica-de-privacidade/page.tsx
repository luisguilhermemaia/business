import { getBrandConfig } from '../../src/brands/getBrandConfig';
import { buildMetadata } from '../../src/core/seo/metadata';
import { Container, Section, Stack } from '../../src/core/design-system/primitives';

export async function generateMetadata() {
  const brand = await getBrandConfig();
  return buildMetadata(brand, 'politica-de-privacidade');
}

const paragraphStyle = {
  fontSize: '1rem',
  lineHeight: 1.8,
  margin: 0,
};

const listStyle = {
  margin: 0,
  paddingLeft: '20px',
  display: 'grid',
  gap: '8px',
  lineHeight: 1.7,
};

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <Container width="regular">
        <Stack gap="lg">
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Política de Privacidade</h1>

          <p style={paragraphStyle}>
            Esta página explica, de forma objetiva, como usamos cookies e informações de navegação
            para melhorar sua experiência no site.
          </p>

          <Stack gap="md">
            <h2 style={{ fontSize: '1.5rem' }}>1. Quais dados coletamos</h2>
            <ul style={listStyle}>
              <li>Dados técnicos do navegador e dispositivo.</li>
              <li>Preferências de navegação, idioma e sessão.</li>
              <li>Dados agregados de uso para análise de desempenho.</li>
            </ul>
          </Stack>

          <Stack gap="md">
            <h2 style={{ fontSize: '1.5rem' }}>2. Como usamos os cookies</h2>
            <ul style={listStyle}>
              <li>Cookies necessários para funcionamento básico do site.</li>
              <li>Cookies de análise para entender uso e melhorar conteúdo.</li>
              <li>Cookies de marketing quando autorizados por você.</li>
            </ul>
          </Stack>

          <Stack gap="md">
            <h2 style={{ fontSize: '1.5rem' }}>3. Controle e gerenciamento</h2>
            <p style={paragraphStyle}>
              Você pode aceitar todos os cookies, recusar os opcionais ou salvar preferências
              personalizadas no banner de consentimento exibido no site.
            </p>
          </Stack>

          <Stack gap="md">
            <h2 style={{ fontSize: '1.5rem' }}>4. Contato</h2>
            <p style={paragraphStyle}>
              Para dúvidas sobre privacidade e tratamento de dados, use os canais de contato
              disponíveis na página de atendimento.
            </p>
          </Stack>

          <p style={{ ...paragraphStyle, opacity: 0.7, fontSize: '0.9rem' }}>
            Última atualização: 06/04/2026.
          </p>
        </Stack>
      </Container>
    </Section>
  );
}
