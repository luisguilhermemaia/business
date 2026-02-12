import { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const EASING_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
const EASING_SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  duration?: number;
  /** When true, animates immediately on mount (for above-the-fold content like hero) */
  immediate?: boolean;
  /** When true, fills parent (position absolute, inset 0) - for image containers */
  fill?: boolean;
}

const RevealWrapper = styled.div<{
  $direction: string;
  $duration: number;
  $isVisible: boolean;
  $delay: number;
  $easing: string;
  $fill?: boolean;
}>`
  ${({ $fill }) =>
    $fill &&
    `
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  `}
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition:
    opacity ${({ $duration }) => $duration}ms ${({ $easing }) => $easing},
    transform ${({ $duration }) => $duration}ms ${({ $easing }) => $easing};
  transition-delay: ${({ $delay }) => $delay}ms;
  will-change: opacity, transform;

  ${({ $direction, $isVisible }) => {
    if ($isVisible) {
      return 'transform: translate(0, 0) scale(1);';
    }
    switch ($direction) {
      case 'up':
        return 'transform: translateY(36px) scale(0.98);';
      case 'down':
        return 'transform: translateY(-36px) scale(0.98);';
      case 'left':
        return 'transform: translateX(-36px) scale(0.98);';
      case 'right':
        return 'transform: translateX(36px) scale(0.98);';
      case 'scale':
        return 'transform: scale(0.92);';
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
  immediate = false,
  fill = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      const t = setTimeout(() => setIsVisible(true), 120);
      return () => clearTimeout(t);
    }

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
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  const easing = direction === 'scale' ? EASING_SPRING : EASING_OUT;

  return (
    <RevealWrapper
      ref={ref}
      $direction={direction}
      $duration={duration}
      $isVisible={isVisible}
      $delay={Math.round(delay * 1000)}
      $easing={easing}
      $fill={fill}
    >
      {children}
    </RevealWrapper>
  );
};
