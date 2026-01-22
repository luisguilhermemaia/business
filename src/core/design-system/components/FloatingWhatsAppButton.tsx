import Link from 'next/link';
import { ComponentProps } from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

interface Props {
  phone: string;
  message?: string;
}

const FloatingButton = styled(Link)<Omit<ComponentProps<typeof Link>, 'href'> & { href: string }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: ${({ theme }) => theme.zIndex.floating};
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 12px rgba(18, 140, 126, 0.4),
    0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow:
      0 6px 20px rgba(18, 140, 126, 0.5),
      0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0) scale(1);
  }
`;

export const FloatingWhatsAppButton = ({ phone, message }: Props) => {
  const formatted = phone.replace(/[^0-9]/g, '');
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return (
    <FloatingButton
      href={`https://wa.me/${formatted}${query}`}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="WhatsApp"
    >
      <FaWhatsapp size={28} />
    </FloatingButton>
  );
};
