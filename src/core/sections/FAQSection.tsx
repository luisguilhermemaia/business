'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useI18n } from '../i18n/I18nProvider';
import { Container, Section, Stack } from '../design-system/primitives';
import { Badge } from '../design-system/components/Badge';
import { Icon } from '../icons/Icon';
import { Reveal } from '../design-system/components/Reveal';
import { hexToRgba } from '../utils/colors';

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl * 2}px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.02em;
`;

const FAQList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const FAQItem = styled.div<{ $open: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm || theme.shadows.soft};
  overflow: hidden;
  transition: all ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  ${({ $open, theme }) =>
    $open &&
    `
    border-color: ${hexToRgba(theme.colors.primary, 0.3)};
    box-shadow: ${theme.shadows.md || theme.shadows.medium};
  `}
`;

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semi};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  transition: color ${({ theme }) => theme.motion?.duration.fast || '150ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

const FAQAnswer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};
`;

const FAQAnswerInner = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.lg}px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.75;
`;

const IconWrapper = styled.div<{ $open: boolean }>`
  flex-shrink: 0;
  transition: transform ${({ theme }) => theme.motion?.duration.normal || '250ms'}
    ${({ theme }) => theme.motion?.easing.ease || 'ease'};
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  color: ${({ theme }) => theme.colors.primary};
`;

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Como funciona o agendamento?',
    answer:
      'Você pode agendar sua consulta pelo WhatsApp ou através do formulário online. Após o envio, entramos em contato em até 24 horas para confirmar o horário e enviar todas as orientações necessárias.',
  },
  {
    question: 'A consulta online é eficaz?',
    answer:
      'Sim! A consulta online permite avaliação completa, orientações claras e prescrições quando necessário. É ideal para acompanhamento, esclarecimento de dúvidas e casos que não exigem exame físico imediato.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Aceitamos pagamento em dinheiro, cartão de débito/crédito e PIX. Para consultas online, o pagamento pode ser realizado via transferência bancária ou PIX antes da consulta.',
  },
  {
    question: 'Preciso de encaminhamento médico?',
    answer:
      'Não é necessário encaminhamento para consultas particulares. Você pode agendar diretamente. Se tiver convênio, verifique as regras específicas do seu plano.',
  },
  {
    question: 'Quanto tempo dura uma consulta?',
    answer:
      'As consultas têm duração de 40 a 60 minutos, garantindo tempo adequado para escuta ativa, avaliação completa e esclarecimento de todas as suas dúvidas.',
  },
  {
    question: 'Vocês atendem urgências?',
    answer:
      'Para casos de urgência, entre em contato imediatamente pelo WhatsApp. Avaliaremos a situação e orientaremos sobre os próximos passos, incluindo a necessidade de atendimento presencial ou encaminhamento para emergência.',
  },
];

export const FAQSection = () => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section background="muted">
      <Container width="wide">
        <SectionHeader>
          <Badge tone="teal">Dúvidas Frequentes</Badge>
          <Title>Perguntas que você pode ter</Title>
        </SectionHeader>
        <FAQList>
          {faqData.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 0.05} direction="left" duration={600}>
              <FAQItem $open={openIndex === idx}>
                <FAQQuestion onClick={() => toggleFAQ(idx)} aria-expanded={openIndex === idx}>
                  <span>{faq.question}</span>
                  <IconWrapper $open={openIndex === idx}>
                    <Icon name="arrow-right" size={18} />
                  </IconWrapper>
                </FAQQuestion>
                <FAQAnswer $open={openIndex === idx}>
                  <FAQAnswerInner>{faq.answer}</FAQAnswerInner>
                </FAQAnswer>
              </FAQItem>
            </Reveal>
          ))}
        </FAQList>
      </Container>
    </Section>
  );
};
