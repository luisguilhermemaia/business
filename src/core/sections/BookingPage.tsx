'use client';

import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Button } from '../design-system/components/Button';
import { Input, Select, Textarea } from '../design-system/components/FormControls';
import { InlineFeedback } from '../design-system/components/InlineFeedback';
import { Card, Container, Grid, Section, Stack } from '../design-system/primitives';
import { Icon } from '../icons/Icon';

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.typography.sizes.xxl});
  line-height: ${({ theme }) => theme.typography.lineHeights?.tight || 1.2};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 760px;
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed || 1.75};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

interface FormState {
  fullName: string;
  contact: string;
  preferredDate: string;
  preferredTimeWindow: string;
  message: string;
}

export const BookingPage = () => {
  const { content } = useBrand();
  const { t, locale, defaultLocale } = useI18n();
  const [form, setForm] = useState<FormState>({
    fullName: '',
    contact: '',
    preferredDate: '',
    preferredTimeWindow: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.fullName) nextErrors.fullName = t('forms.required');
    if (!form.contact) nextErrors.contact = t('forms.required');
    if (!form.preferredDate) nextErrors.preferredDate = t('forms.required');
    if (!form.preferredTimeWindow) nextErrors.preferredTimeWindow = t('forms.required');
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildMessage = () => {
    const template =
      content.booking.defaultMessage[locale] || content.booking.defaultMessage[defaultLocale] || '';
    return template
      .replace('{name}', form.fullName)
      .replace('{date}', form.preferredDate)
      .replace('{time}', form.preferredTimeWindow)
      .replace('{notes}', form.message || '-');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('idle');
    if (content.booking.mode === 'whatsapp') {
      const message = buildMessage();
      const formatted = content.contact.whatsapp.replace(/[^0-9]/g, '');
      const url = `https://wa.me/${formatted}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setStatus('success');
      return;
    }

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <Title>{t('booking.title')}</Title>
          <Subtitle>{t('booking.subtitle')}</Subtitle>
        </Stack>
        <Grid columns={2} gap="xl">
          <Card elevation="md">
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <Input
                placeholder={t('booking.fullName')}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              {errors.fullName && (
                <InlineFeedback tone="error" message={errors.fullName} icon="close" />
              )}
              <Input
                placeholder={t('booking.emailOrPhone')}
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
              {errors.contact && (
                <InlineFeedback tone="error" message={errors.contact} icon="close" />
              )}
              <Input
                type="date"
                value={form.preferredDate}
                onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
              />
              {errors.preferredDate && (
                <InlineFeedback tone="error" message={errors.preferredDate} icon="close" />
              )}
              <Select
                value={form.preferredTimeWindow}
                onChange={(e) => setForm({ ...form, preferredTimeWindow: e.target.value })}
              >
                <option value="">{t('booking.preferredTimeWindow')}</option>
                <option value={t('booking.morning')}>{t('booking.morning')}</option>
                <option value={t('booking.afternoon')}>{t('booking.afternoon')}</option>
                <option value={t('booking.evening')}>{t('booking.evening')}</option>
              </Select>
              {errors.preferredTimeWindow && (
                <InlineFeedback tone="error" message={errors.preferredTimeWindow} icon="close" />
              )}
              <Textarea
                placeholder={t('booking.message')}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <Button type="submit">{t('booking.submit')}</Button>
              {status === 'success' && (
                <InlineFeedback tone="success" message={t('booking.success')} icon="check" />
              )}
              {status === 'error' && (
                <InlineFeedback tone="error" message={t('forms.invalid')} icon="close" />
              )}
            </form>
          </Card>
          <Card elevation="md">
            <Stack gap="lg">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{t('contact.contact')}</h3>
              <Stack gap="md">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.95rem',
                  }}
                >
                  <a
                    href={`tel:${content.contact.phone.replace(/[^0-9+]/g, '')}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: 'inherit',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <Icon name="phone" size={18} /> {content.contact.phone}
                  </a>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.95rem',
                  }}
                >
                  <a
                    href={`https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      content.contact.whatsappMessage || 'Olá! Gostaria de mais informações.'
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: 'inherit',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <Icon name="whatsapp" size={18} /> {content.contact.whatsapp}
                  </a>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.95rem',
                  }}
                >
                  <a
                    href={`mailto:${content.contact.email}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: 'inherit',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <Icon name="check" size={18} /> {content.contact.email}
                  </a>
                </div>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
};
