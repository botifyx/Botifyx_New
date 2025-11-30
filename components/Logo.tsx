import React from 'react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
    return (
        <div className={`relative ${className}`}>
            {/* Light Mode Logo (Dark Text) - Shown when NOT dark mode */}
            <img
                src="/images/logo-light.png"
                alt="Botifyx Logo"
                className="block dark:hidden h-full w-auto object-contain"
            />

            {/* Dark Mode Logo (White Text) - Shown when dark mode IS active */}
            <img
                src="/images/logo-white-v2.png"
                alt="Botifyx Logo"
                className="hidden dark:block h-full w-auto object-contain"
            />
        </div>
    );
};

export default Logo;
