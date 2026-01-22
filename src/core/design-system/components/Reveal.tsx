import { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  duration?: number;
}

const RevealWrapper = styled.div<{
  $direction: string;
  $duration: number;
  $isVisible: boolean;
  $delay: number;
}>`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity ${({ $duration }) => $duration}ms
      ${({ theme }) => theme.motion?.easing.easeOut || 'cubic-bezier(0.4, 0, 0.2, 1)'},
    transform ${({ $duration }) => $duration}ms
      ${({ theme }) => theme.motion?.easing.easeOut || 'cubic-bezier(0.4, 0, 0.2, 1)'};
  transition-delay: ${({ $delay }) => $delay}ms;
  will-change: opacity, transform;

  ${({ $direction, $isVisible }) => {
    if ($isVisible) {
      return 'transform: translate(0, 0) scale(1);';
    }
    switch ($direction) {
      case 'up':
        return 'transform: translateY(50px) scale(0.96);';
      case 'down':
        return 'transform: translateY(-50px) scale(0.96);';
      case 'left':
        return 'transform: translateX(-50px) scale(0.96);';
      case 'right':
        return 'transform: translateX(50px) scale(0.96);';
      case 'scale':
        return 'transform: scale(0.85);';
      case 'fade':
      default:
        return 'transform: scale(1);';
    }
  }}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none !important;
    transition: none;
  }
`;

export const Reveal = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 800,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealWrapper
      ref={ref}
      $direction={direction}
      $duration={duration}
      $isVisible={isVisible}
      $delay={delay * 1000}
    >
      {children}
    </RevealWrapper>
  );
};
