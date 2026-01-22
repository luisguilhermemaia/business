import { SVGProps } from 'react';

export type IconName =
  | 'stethoscope'
  | 'heart'
  | 'user'
  | 'shield'
  | 'clock'
  | 'location'
  | 'phone'
  | 'check'
  | 'arrow-right'
  | 'quote'
  | 'menu'
  | 'close'
  | 'whatsapp'
  | 'calendar'
  | 'search'
  | 'tag';

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const paths: Record<IconName, JSX.Element> = {
  stethoscope: (
    <>
      <path d="M7 4v5a5 5 0 0 0 10 0V4" />
      <path d="M7 9a3 3 0 0 1-3-3V4" />
      <path d="M17 9a3 3 0 0 0 3-3V4" />
      <path d="M12 19a4 4 0 0 0 8 0v-4" />
      <path d="M12 19V9" />
    </>
  ),
  heart: <path d="M12 20s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-7 10z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  location: (
    <>
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.17 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13 1.1.39 2.17.76 3.2a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.03.37 2.1.63 3.2.76A2 2 0 0 1 22 16.92z" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  'arrow-right': <path d="m5 12 7-7m0 0 7 7m-7-7v14" />,
  quote: (
    <>
      <path d="M7 17c-1.7-1.2-3-3-3-6 0-3.9 3.1-6 6-6v4c-1.1 0-2 .9-2 2 0 1.1.9 2 2 2v4H7z" />
      <path d="M17 17c-1.7-1.2-3-3-3-6 0-3.9 3.1-6 6-6v4c-1.1 0-2 .9-2 2 0 1.1.9 2 2 2v4h-3z" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4l4 4 4-4h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" />
      <path d="M8.5 9a3.5 3.5 0 0 0 7 0v-.5A2.5 2.5 0 0 0 13 6h-2a2.5 2.5 0 0 0-2.5 2.5z" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 11h16" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </>
  ),
  tag: (
    <>
      <path d="M2 12l10 10 10-10-10-10H6a4 4 0 0 0-4 4v6z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
};

export const Icon = ({ name, size = 22, strokeWidth = 1.75, ...rest }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
};
