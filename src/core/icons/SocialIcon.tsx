'use client';

import type { IconBaseProps } from 'react-icons';
import { SiInstagram, SiFacebook, SiLinkedin, SiThreads, SiX, SiYoutube } from 'react-icons/si';
import type { SocialPlatform } from '../types/brand';

const icons: Record<SocialPlatform, React.ComponentType<IconBaseProps>> = {
  instagram: SiInstagram,
  facebook: SiFacebook,
  linkedin: SiLinkedin,
  threads: SiThreads,
  x: SiX,
  youtube: SiYoutube,
};

interface Props extends IconBaseProps {
  platform: SocialPlatform;
  size?: number;
}

export const SocialIcon = ({ platform, size = 20, ...rest }: Props) => {
  const IconComponent = icons[platform];
  if (!IconComponent) return null;
  return <IconComponent size={size} {...rest} />;
};
