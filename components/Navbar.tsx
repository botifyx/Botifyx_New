
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo.tsx';
import { Menu, X, Terminal, Globe, Layers, BookOpen, Send } from 'lucide-react';
import { Button } from './Button.tsx';

interface NavbarProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeRoute, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', route: '#/services', icon: <Layers size={20} /> },
    { name: 'Industries', route: '#/industries', icon: <Globe size={20} /> },
    { name: 'Ecosystem', route: '#/ecosystem', icon: <Terminal size={20} /> },
    { name: 'Insights', route: '#/insights', icon: <BookOpen size={20} /> },
  ];

  const handleLinkClick = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    onNavigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled
      ? 'py-3 bg-white/90 dark:bg-brand-base/90 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5 shadow-2xl'
      : 'py-8 bg-transparent'
      }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#/" onClick={(e) => handleLinkClick(e, '#/')} className="hover:scale-105 transition-transform duration-500 block">
          <Logo className="h-12 lg:h-16" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.route}
              onClick={(e) => handleLinkClick(e, link.route)}
              className={`mono-label transition-all duration-500 relative px-6 py-3 rounded-2xl text-[12px] font-black group ${activeRoute.startsWith(link.route)
                ? 'text-brand-primary bg-brand-primary/10'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
            >
              {link.name}
              {activeRoute.startsWith(link.route) && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-primary rounded-full shadow-[0_0_10px_#00ff9d]" />
              )}
            </a>
          ))}

          <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-6" />

          <Button variant="primary" size="md" onClick={() => onNavigate('#/contact')} className="ml-4 gap-3 shadow-lg">
            <Send className="w-4 h-4" /> LET'S TALK
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-900 dark:text-white p-2"
          >
            {isMobileMenuOpen ? <X size={36} /> : <Menu size={36} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white dark:bg-brand-base flex flex-col p-8 space-y-4 animate-in slide-in-from-right duration-500 z-50 overflow-y-auto">
          <div className="mono-label text-slate-400 dark:text-slate-500 mb-4 font-black">Menu Navigation</div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.route}
              onClick={(e) => handleLinkClick(e, link.route)}
              className={`flex items-center justify-between text-4xl font-black uppercase italic border-b border-slate-100 dark:border-white/5 py-8 active:bg-brand-primary/5 transition-colors ${activeRoute.startsWith(link.route) ? 'text-brand-primary' : 'text-slate-900 dark:text-white'
                }`}
            >
              <span>{link.name}</span>
              <div className={`${activeRoute.startsWith(link.route) ? 'text-brand-primary' : 'text-slate-300 dark:text-slate-700'}`}>
                {link.icon}
              </div>
            </a>
          ))}
          <div className="pt-8">
            <Button size="lg" className="w-full py-10 rounded-[2.5rem] text-xl" onClick={() => onNavigate('#/contact')}>
              GET IN TOUCH
            </Button>
          </div>
          <div className="flex justify-center gap-8 pt-12">
            <a href="#" className="text-slate-400 font-black uppercase text-[10px] tracking-widest">LinkedIn</a>
            <a href="#" className="text-slate-400 font-black uppercase text-[10px] tracking-widest">X / Twitter</a>
            <a href="#" className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Privacy</a>
          </div>
        </div>
      )}
    </nav>
  );
};
