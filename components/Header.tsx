import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { SunIcon, MoonIcon } from './icons/FeatureIcons';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-brand-dark-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-300"
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
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Checkpoints', href: '#checkpoints' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-brand-dark-2' : 'bg-white/10 dark:bg-black/30 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-2">
            <Logo className="h-16 w-auto" />
          </a>

          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-accent' : 'text-gray-900 dark:text-gray-100 hover:text-brand-primary dark:hover:text-brand-accent drop-shadow-md'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="inline-block bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-brand-primary/25">
              Contact Us
            </a>
          </div>


          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button onClick={() => setIsOpen(!isOpen)} className={`focus:outline-none p-2 rounded-md transition-colors ${isScrolled ? 'text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-brand-dark-2' : 'text-gray-900 dark:text-white bg-white/20 hover:bg-white/30'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 bg-white/95 dark:bg-brand-dark-2/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-brand-primary/10">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-800 dark:text-gray-100 font-medium hover:text-brand-primary dark:hover:text-brand-accent hover:bg-gray-50 dark:hover:bg-brand-dark rounded-lg px-4 py-3 transition-colors duration-300 block" onClick={(e) => handleNavClick(e, link.href)}>
                  {link.name}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
                <a href="#contact" className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 block text-center w-full shadow-md" onClick={(e) => handleNavClick(e, '#contact')}>
                  Contact Us
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;