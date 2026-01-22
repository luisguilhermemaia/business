'use client';

import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useBrand } from '../brand/BrandProvider';
import { useI18n } from '../i18n/I18nProvider';
import { Button } from '../design-system/components/Button';
import { Input, Textarea } from '../design-system/components/FormControls';
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
  name: string;
  contact: string;
  message: string;
}

export const ContactPage = () => {
  const { content } = useBrand();
  const { t } = useI18n();
  const [form, setForm] = useState<FormState>({ name: '', contact: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: { [k: string]: string } = {};
    if (!form.name) nextErrors.name = t('forms.required');
    if (!form.contact) nextErrors.contact = t('forms.required');
    if (!form.message) nextErrors.message = t('forms.required');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <Title>{t('contact.title')}</Title>
          <Subtitle>{t('contact.subtitle')}</Subtitle>
        </Stack>
        <Grid columns={2} gap="xl">
          <Card elevation="md">
            <Stack gap="lg">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{t('contact.formTitle')}</h3>
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <Input
                  placeholder={t('booking.fullName')}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <InlineFeedback tone="error" message={errors.name} icon="close" />}
                <Input
                  placeholder={t('contact.email')}
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                />
                {errors.contact && (
                  <InlineFeedback tone="error" message={errors.contact} icon="close" />
                )}
                <Textarea
                  placeholder={t('booking.message')}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && (
                  <InlineFeedback tone="error" message={errors.message} icon="close" />
                )}
                <Button type="submit">{t('actions.send')}</Button>
                {submitted && (
                  <InlineFeedback tone="success" message={t('contact.success')} icon="check" />
                )}
              </form>
            </Stack>
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
                  <Icon name="phone" size={18} /> {content.contact.phone}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.95rem',
                  }}
                >
                  <Icon name="whatsapp" size={18} /> {content.contact.whatsapp}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.95rem',
                  }}
                >
                  <Icon name="check" size={18} /> {content.contact.email}
                </div>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
};
