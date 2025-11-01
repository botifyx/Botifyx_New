
import React from 'react';

const LogoIcon: React.FC<{ className?: string; showTagline?: boolean }> = ({ className, showTagline = false }) => {
  return (
    <div className={`font-sans leading-none ${className}`}>
      <svg viewBox={showTagline ? "0 0 220 55" : "0 0 220 40"} width="auto" height="100%">
        <defs>
          <linearGradient id="logo-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="x-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <text
          x="0"
          y="30"
          fontFamily="sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="url(#logo-text-grad)"
        >
          Botify
        </text>

        <text
          x="115"
          y="30"
          fontFamily="sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="#00f5d4"
          filter="url(#x-glow)"
        >
          x
        </text>
        
        {showTagline && (
          <text
            x="0"
            y="48"
            fontFamily="sans-serif"
            fontSize="10"
            letterSpacing="1"
            className="fill-gray-500 dark:fill-gray-400"
          >
            Aify | Autofy | Amplify
          </text>
        )}
      </svg>
    </div>
  );
};

export default LogoIcon;
