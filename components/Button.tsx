
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-[0.25em] transition-all duration-500 relative overflow-hidden group active:scale-95 text-center leading-none select-none";
  
  const variantStyles = {
    primary: "bg-brand-primary text-brand-base hover:bg-white hover:text-brand-base shadow-[0_15px_40px_-10px_rgba(0,255,157,0.4)]",
    secondary: "bg-brand-secondary text-white hover:bg-brand-primary hover:text-brand-base shadow-[0_15px_40px_-10px_rgba(99,102,241,0.4)]",
    outline: "border-2 border-brand-primary/40 text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5",
    ghost: "text-slate-400 hover:text-brand-primary"
  };

  const sizeStyles = {
    sm: "px-8 py-4 text-[11px] rounded-[1.2rem]",
    md: "px-12 py-6 text-xs rounded-[1.8rem]",
    lg: "px-16 py-8 text-sm rounded-[2.2rem]"
  };

  // We only apply variant styles if the user hasn't provided their own bg/text overrides for colors
  const hasBgOverride = className.includes('bg-');
  const hasTextOverride = className.includes('text-');
  
  const appliedVariant = variantStyles[variant];
  let finalVariantClass = appliedVariant;

  if (hasBgOverride) {
    finalVariantClass = finalVariantClass.split(' ').filter(c => !c.startsWith('bg-')).join(' ');
  }
  if (hasTextOverride) {
    finalVariantClass = finalVariantClass.split(' ').filter(c => !c.startsWith('text-')).join(' ');
  }

  return (
    <button 
      className={`${baseStyles} ${finalVariantClass} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">{children}</span>
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </button>
  );
};
