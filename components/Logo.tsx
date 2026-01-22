
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center ${className || 'h-10'}`}>
    <img
      src="/assets/logo.png"
      alt="BotifyX Logo"
      className="h-full w-auto object-contain"
    />
  </div>
);
