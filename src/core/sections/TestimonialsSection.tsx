 'use client';
 
 import styled from 'styled-components';
 import { useBrand } from '../brand/BrandProvider';
 import { useI18n } from '../i18n/I18nProvider';
 import { Container, Grid, Section } from '../design-system/primitives';
 import { Reveal } from '../design-system/components/Reveal';
 import { Icon } from '../icons/Icon';
 
 const SectionHeader = styled.div`
   text-align: center;
   margin-bottom: ${({ theme }) => theme.spacing.xl * 2}px;
   max-width: 700px;
   margin-left: auto;
   margin-right: auto;
 `;
 
 const SectionBadge = styled.div`
   display: inline-flex;
   align-items: center;
   gap: ${({ theme }) => theme.spacing.sm}px;
   padding: ${({ theme }) => theme.spacing.sm + 2}px ${({ theme }) => theme.spacing.lg}px;
   border-radius: ${({ theme }) => theme.radii.pill};
   background: ${({ theme }) => theme.colors.surface};
   border: 1px solid ${({ theme }) => theme.colors.border};
   color: ${({ theme }) => theme.colors.primary};
   font-size: ${({ theme }) => theme.typography.sizes.xs};
   font-weight: ${({ theme }) => theme.typography.weights.bold};
   letter-spacing: 0.1em;
   text-transform: uppercase;
   margin-bottom: ${({ theme }) => theme.spacing.lg}px;
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
 
 const TestimonialCard = styled.div`
   background: ${({ theme }) => theme.colors.surface};
   border-radius: ${({ theme }) => theme.radii.xl || theme.radii.lg};
   border: 1px solid ${({ theme }) => theme.colors.border};
   padding: ${({ theme }) => theme.spacing.lg}px;
   box-shadow: ${({ theme }) => theme.shadows.sm || theme.shadows.soft};
   display: grid;
   gap: ${({ theme }) => theme.spacing.md}px;
 `;
 
 const Quote = styled.p`
   color: ${({ theme }) => theme.colors.text};
   font-size: ${({ theme }) => theme.typography.sizes.md};
   line-height: 1.7;
   margin: 0;
   position: relative;
   padding-left: ${({ theme }) => theme.spacing.lg}px;
 
   &::before {
     content: '“';
     position: absolute;
     left: 0;
     top: -6px;
     font-size: 2.5rem;
     color: ${({ theme }) => theme.colors.primary};
     opacity: 0.25;
     font-family: ${({ theme }) => theme.typography.fonts.heading};
   }
 `;
 
 const Person = styled.div`
   display: flex;
   align-items: center;
   gap: ${({ theme }) => theme.spacing.md}px;
   color: ${({ theme }) => theme.colors.textMuted};
   font-size: ${({ theme }) => theme.typography.sizes.sm};
 `;
 
 const PersonIcon = styled.div`
   width: 38px;
   height: 38px;
   border-radius: ${({ theme }) => theme.radii.round};
   background: ${({ theme }) => theme.colors.surfaceMuted};
   color: ${({ theme }) => theme.colors.primary};
   display: grid;
   place-items: center;
 `;
 
 const PersonName = styled.div`
   font-weight: ${({ theme }) => theme.typography.weights.semi};
   color: ${({ theme }) => theme.colors.text};
 `;
 
 export const TestimonialsSection = () => {
   const { content } = useBrand();
   const { t } = useI18n();
   if (!content.testimonials?.enabled || !content.testimonials.items.length) return null;
 
   return (
     <Section>
       <Container width="wide">
         <SectionHeader>
           <SectionBadge>{t('testimonials.title')}</SectionBadge>
           <Title>{t('testimonials.headline')}</Title>
         </SectionHeader>
         <Grid min="260px" gap="lg">
           {content.testimonials.items.map((testimonial, idx) => (
             <Reveal key={testimonial.name} delay={0.05 + idx * 0.06}>
               <TestimonialCard>
                 <Quote>{testimonial.quote}</Quote>
                 <Person>
                   <PersonIcon>
                     <Icon name="user" size={18} />
                   </PersonIcon>
                   <div>
                     <PersonName>{testimonial.name}</PersonName>
                     {testimonial.title && <div>{testimonial.title}</div>}
                   </div>
                 </Person>
               </TestimonialCard>
             </Reveal>
           ))}
         </Grid>
       </Container>
     </Section>
   );
 };
