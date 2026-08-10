import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Command, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import CommandPalette from '@/components/CommandPalette';
import { MagneticButton } from '@/components/ui-kit';
import { NAV_LINKS } from '@/lib/site';
import { cn } from '@/lib/utils';
import BotifyXLogo from '@/components/BotifyXLogo';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const isDark = theme !== 'light';

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:text-black"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[75] transition-all duration-300',
          scrolled ? 'py-2.5' : 'py-4 sm:py-5'
        )}
      >
        <div className="container-x">
          <nav
            aria-label="Primary"
            className={cn(
              'flex items-center justify-between gap-4 rounded-full px-3.5 transition-all duration-300 sm:px-5',
              scrolled
                ? 'glass py-2 shadow-glass-glow backdrop-blur-xl'
                : 'border border-white/[0.06] bg-surface/60 py-2.5 backdrop-blur-lg'
            )}
          >
            <div className="flex items-center gap-3.5">
              <Link
                to="/"
                className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
                aria-label="BotifyX home"
              >
                <BotifyXLogo size="md" variant="full" />
              </Link>
              <span className="hidden items-center gap-1.5 rounded-full border border-mint/20 bg-mint/[0.06] px-2.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-mint-ink xl:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_6px_#00ff9d]" />
                ap-south-1
              </span>
            </div>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        'relative rounded-full px-4 py-2 text-[14px] font-medium tracking-tight transition-all duration-200',
                        isActive
                          ? 'bg-mint/[0.08] text-mint-ink font-semibold'
                          : 'text-ink-muted hover:bg-white/[0.04] hover:text-ink'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300',
                            isActive ? 'scale-x-100' : 'scale-x-0'
                          )}
                          style={{ background: 'linear-gradient(90deg,#00ff9d,#00e5ff)' }}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Open command palette"
                className="hidden items-center gap-2 rounded-full border border-hairline bg-surface/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-all hover:border-mint/50 hover:text-mint-ink md:flex"
              >
                <Command className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="font-semibold">K</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-all hover:border-mint/50 hover:text-mint-ink"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <MagneticButton
                to="/contact"
                className="!hidden !px-5 !py-2.5 !text-[13.5px] sm:!inline-flex"
                ariaLabel="Start a project with BotifyX"
              >
                Start a Project
              </MagneticButton>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-mint/50 lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* mobile full-screen overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[85] flex flex-col transition-all duration-300 lg:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        style={{ background: 'rgba(3,7,8,0.96)', backdropFilter: 'blur(14px)' }}
        role="dialog"
        aria-modal={mobileOpen}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Link to="/" onClick={() => setMobileOpen(false)} aria-label="BotifyX home">
            <BotifyXLogo size="md" variant="full" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-1 px-6">
          {[...NAV_LINKS, { label: 'Contact', to: '/contact' }].map((link, i) => (
            <li
              key={link.to}
              style={{
                transitionDelay: `${mobileOpen ? 90 + i * 60 : 0}ms`,
                transform: mobileOpen ? 'none' : 'translateY(18px)',
                opacity: mobileOpen ? 1 : 0,
                transition: 'opacity .5s ease, transform .5s cubic-bezier(.2,.7,.2,1)',
              }}
            >
              <NavLink
                to={link.to}
                className="flex items-baseline justify-between border-b border-white/[0.06] py-4 text-[30px] font-bold tracking-tight text-white"
              >
                {link.label}
                <span className="font-mono text-[11px] text-mint">0{i + 1}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="space-y-3 px-6 pb-10">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setPaletteOpen(true);
            }}
            className="flex w-full items-center justify-between rounded-full border border-white/10 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white/70"
          >
            Search the site
            <Command className="h-4 w-4" aria-hidden="true" />
          </button>
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn-mint w-full"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
};

export default Navbar;
