import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
}

export const Reveal = ({ children, delay = 0 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (delay) target.style.transitionDelay = `${delay}s`;
            target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
};
