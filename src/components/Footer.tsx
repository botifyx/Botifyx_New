import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, MessageCircle, Twitter, Mail, Phone, Leaf, Loader2, Check } from 'lucide-react';
import { db } from '@/lib/db';
import { CONTACT, SERVICES } from '@/lib/site';
import { ARTICLES } from '@/lib/articles';
import BotifyXLogo from '@/components/BotifyXLogo';

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Work', to: '/work' },
  { label: 'Green AI', to: '/carbon' },
  { label: 'Contact', to: '/contact' },
];

const RESOURCE_LINKS = [
  { label: 'Insights', to: '/insights' },
  ...ARTICLES.slice(0, 3).map((a) => ({ label: a.title.slice(0, 34) + '…', to: `/insights/${a.slug}` })),
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [carbon, setCarbon] = useState(18432.6);

  useEffect(() => {
    const id = window.setInterval(() => setCarbon((c) => c + Math.random() * 1.7 + 0.4), 2200);
    return () => window.clearInterval(id);
  }, []);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'loading') return;
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setState('error');
      setMessage('Enter a valid email address.');
      return;
    }
    setState('loading');
    try {
      const { error } = await db.rpc('crm_submit_contact', {
        p_email: clean,
        p_name: null,
        p_phone: null,
        p_sms_opt_in: false,
        p_source: 'footer-newsletter',
        p_metadata: { page: window.location.pathname },
      });
      if (error) throw error;
      setState('done');
      setMessage('You are on the list. Expect signal, not noise.');
      setEmail('');
      window.supercool?.track('form_submit', { form: 'footer-newsletter' });
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="relative mt-28 border-t border-hairline pt-20">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" aria-label="BotifyX home" className="inline-block transition-transform hover:scale-[1.02]">
              <BotifyXLogo size="lg" showTagline />
            </Link>
            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-ink-muted">
              {CONTACT.tagline}
            </p>
            <form onSubmit={subscribe} className="mt-6 max-w-sm">
              <label
                htmlFor="footer-email"
                className="mono-label mb-2.5 block text-[11px] font-semibold text-mint-ink"
              >
                // Engineering Digest — monthly, technical
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state !== 'idle') setState('idle');
                  }}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="min-w-0 flex-1 rounded-full border border-hairline bg-surface px-4 py-2.5 font-mono text-[12.5px] text-ink outline-none transition-all placeholder:text-ink-faint focus:border-mint/60 focus:shadow-[0_0_16px_rgba(0,255,157,0.2)]"
                />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="btn-mint shrink-0 !px-5 !py-2.5 !text-[13px] disabled:opacity-70"
                >
                  {state === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : state === 'done' ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              {message ? (
                <p
                  role="status"
                  className={`mt-2 font-mono text-[11px] ${
                    state === 'error' ? 'text-red-400' : 'text-mint-ink'
                  }`}
                >
                  {message}
                </p>
              ) : null}
            </form>
          </div>

          <nav aria-label="Company">
            <h2 className="mono-label mb-4 font-bold text-ink">Company</h2>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[14px] text-ink-muted transition-colors hover:text-mint-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="mono-label mb-4 font-bold text-ink">Services</h2>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services#${s.slug}`}
                    className="text-[14px] text-ink-muted transition-colors hover:text-mint-ink"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h2 className="mono-label mb-4 font-bold text-ink">Resources</h2>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[14px] text-ink-muted transition-colors hover:text-mint-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mono-label mb-4 font-bold text-ink">Connect</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-[14px] text-ink-muted transition-colors hover:text-mint-ink"
                >
                  <Mail className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-2 text-[14px] text-ink-muted transition-colors hover:text-mint-ink"
                >
                  <Phone className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2.5">
              {[
                { href: CONTACT.linkedin, Icon: Linkedin, label: 'BotifyX on LinkedIn' },
                { href: CONTACT.whatsapp, Icon: MessageCircle, label: 'Message BotifyX on WhatsApp' },
                { href: CONTACT.x, Icon: Twitter, label: 'BotifyX on X' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-surface text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/50 hover:text-mint-ink hover:shadow-[0_0_14px_rgba(0,255,157,0.25)]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="hud-badge text-[10.5px]">
            <Leaf className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
            <span>Low-Carbon Compute Verified:</span>
            <span className="text-mint-ink font-bold tabular">
              {carbon.toFixed(1)} kg CO₂e offset
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            <Link to="/contact" className="transition-colors hover:text-mint-ink">
              Privacy Protocol
            </Link>
            <Link to="/contact" className="transition-colors hover:text-mint-ink">
              Terms
            </Link>
            <span className="text-ink-muted">© BotifyX 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
