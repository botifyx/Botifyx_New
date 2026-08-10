import React from 'react';
import { useTheme } from '@/components/theme-provider';

interface BotifyXLogoProps {
  className?: string;
  variant?: 'full' | 'header' | 'icon';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  height?: number | string;
  alt?: string;
}

export const BotifyXLogo: React.FC<BotifyXLogoProps> = ({
  className = '',
  variant = 'header',
  showTagline = false,
  size = 'md',
  height,
  alt = 'BotifyX — Alfy | Autofy | Amplify',
}) => {
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  let logoSrc = '/botifyx-logo-header-dark.png';

  if (variant === 'icon') {
    logoSrc = '/botifyx-icon.png';
  } else if (variant === 'full' || showTagline) {
    logoSrc = isDark ? '/botifyx-logo-full-dark.png' : '/botifyx-logo-full.png';
  } else {
    logoSrc = isDark ? '/botifyx-logo-header-dark.png' : '/botifyx-logo-header.png';
  }

  const heightMap = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
    xl: 'h-16',
  };

  const styleHeight = height ? (typeof height === 'number' ? `${height}px` : height) : undefined;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={logoSrc}
        alt={alt}
        className={`object-contain transition-all duration-300 ${styleHeight ? '' : heightMap[size]}`}
        style={styleHeight ? { height: styleHeight } : undefined}
      />
    </div>
  );
};

export default BotifyXLogo;
