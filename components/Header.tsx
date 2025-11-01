import React, { useState, useEffect } from 'react';
import LogoIcon from './icons/LogoIcon';
import { SunIcon, MoonIcon } from './icons/FeatureIcons';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-brand-dark-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.substring(1));
    if (element) {
        const headerOffset = 80; // Height of the fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    if (isOpen) {
        setIsOpen(false);
    }
  };


  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Checkpoints', href: '#checkpoints' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-brand-dark/80 backdrop-blur-lg border-b border-gray-200 dark:border-brand-dark-2/50' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-2">
            <LogoIcon className="h-10 w-auto" />
          </a>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-300">
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="inline-block bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300">
              Contact Us
            </a>
          </div>


          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 bg-white dark:bg-brand-dark-2 rounded-lg p-4 shadow-lg">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-300 block text-center" onClick={(e) => handleNavClick(e, link.href)}>
                  {link.name}
                </a>
              ))}
              <a href="#contact" className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 block text-center" onClick={(e) => handleNavClick(e, '#contact')}>
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;