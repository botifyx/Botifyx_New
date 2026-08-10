import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Home,
  Layers,
  Briefcase,
  Leaf,
  Users,
  FileText,
  Mail,
  Phone,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import { SERVICES, CASES, CONTACT } from '@/lib/site';
import { ARTICLES } from '@/lib/articles';
import { cn } from '@/lib/utils';
import BotifyXLogo from '@/components/BotifyXLogo';

type Item = {
  id: string;
  label: string;
  group: string;
  icon: LucideIcon;
  to?: string;
  href?: string;
  hint?: string;
};

const BASE_ITEMS: Item[] = [
  { id: 'home', label: 'Home', group: 'Pages', icon: Home, to: '/' },
  { id: 'services', label: 'Services', group: 'Pages', icon: Layers, to: '/services' },
  { id: 'work', label: 'Work — case studies', group: 'Pages', icon: Briefcase, to: '/work' },
  { id: 'carbon', label: 'Green AI & carbon methodology', group: 'Pages', icon: Leaf, to: '/carbon' },
  { id: 'about', label: 'About BotifyX', group: 'Pages', icon: Users, to: '/about' },
  { id: 'insights', label: 'Insights', group: 'Pages', icon: FileText, to: '/insights' },
  { id: 'contact', label: 'Contact & start a project', group: 'Pages', icon: Mail, to: '/contact' },
  {
    id: 'estimator',
    label: 'Carbon savings estimator',
    group: 'Tools',
    icon: Leaf,
    to: '/carbon#estimator',
    hint: 'client-side',
  },
  {
    id: 'demo',
    label: 'AI architecture advisor',
    group: 'Tools',
    icon: Layers,
    to: '/#architect',
    hint: 'interactive',
  },
  { id: 'email', label: CONTACT.email, group: 'Contact', icon: Mail, href: `mailto:${CONTACT.email}` },
  { id: 'phone', label: CONTACT.phone, group: 'Contact', icon: Phone, href: CONTACT.phoneHref },
  { id: 'wa', label: 'WhatsApp us', group: 'Contact', icon: MessageCircle, href: CONTACT.whatsapp },
];

const ALL_ITEMS: Item[] = [
  ...BASE_ITEMS,
  ...SERVICES.map((s) => ({
    id: `svc-${s.slug}`,
    label: s.title,
    group: 'Services',
    icon: s.icon,
    to: `/services#${s.slug}`,
  })),
  ...CASES.map((c) => ({
    id: `case-${c.slug}`,
    label: c.title,
    group: 'Case studies',
    icon: Briefcase,
    to: `/work/${c.slug}`,
    hint: c.industry,
  })),
  ...ARTICLES.map((a) => ({
    id: `art-${a.slug}`,
    label: a.title,
    group: 'Insights',
    icon: FileText,
    to: `/insights/${a.slug}`,
    hint: a.category,
  })),
];

const CommandPalette: React.FC<{ open: boolean; onOpenChange: (v: boolean) => void }> = ({
  open,
  onOpenChange,
}) => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ITEMS.slice(0, 10);
    return ALL_ITEMS.filter(
      (i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q)
    ).slice(0, 12);
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      const t = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => (a + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = results[active];
        if (item) run(item);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const run = (item: Item) => {
    onOpenChange(false);
    if (item.href) {
      window.open(item.href, item.href.startsWith('http') ? '_blank' : '_self');
      return;
    }
    if (item.to) {
      const [path, hash] = item.to.split('#');
      navigate(path || '/');
      if (hash) {
        window.setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 220);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="glass relative w-full max-w-xl overflow-hidden shadow-[0_30px_90px_-30px_rgba(0,255,157,0.35)] animate-slide-in">
        <div className="flex items-center gap-3 border-b border-hairline px-4 py-3.5">
          <Search className="h-4 w-4 text-mint-ink" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a page, service, case study or article…"
            aria-label="Search the site"
            className="w-full bg-transparent font-mono text-[13px] text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd className="hidden shrink-0 rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-ink-faint sm:block">
            ESC
          </kbd>
        </div>
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center font-mono text-[12px] text-ink-faint">
              No matches for “{query}”
            </p>
          ) : (
            results.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(item)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                    i === active ? 'bg-mint-soft' : 'hover:bg-mint-soft'
                  )}
                >
                  <Icon
                    className={cn('h-4 w-4 shrink-0', i === active ? 'text-mint-ink' : 'text-ink-faint')}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 truncate text-[14px] text-ink">{item.label}</span>
                  {item.hint ? (
                    <span className="hidden font-mono text-[10px] uppercase tracking-wider text-ink-faint sm:block">
                      {item.hint}
                    </span>
                  ) : null}
                  <span className="mono-label hidden sm:block">{item.group}</span>
                  <ArrowRight
                    className={cn(
                      'h-3.5 w-3.5 shrink-0 transition-opacity',
                      i === active ? 'opacity-100 text-mint-ink' : 'opacity-0'
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })
          )}
        </div>
        <div className="flex items-center justify-between border-t border-hairline px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          <span>↑↓ navigate · ⏎ open</span>
          <div className="flex items-center gap-1.5">
            <BotifyXLogo variant="icon" height={14} alt="BotifyX Icon" />
            <span>BotifyX command</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
