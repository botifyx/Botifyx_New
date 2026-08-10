import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BadgeCheck,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { Counter, GlowCard, Reveal, SectionHeading, Aurora } from '@/components/ui-kit';
import { IMPACT_SECTORS } from '@/lib/site';
import { cn } from '@/lib/utils';

/** Presentational icon per sector (data itself lives in @/lib/site). */
const SECTOR_ICONS: Record<string, LucideIcon> = {
  'financial-services': Landmark,
  logistics: Truck,
  retail: ShoppingBag,
  healthcare: HeartPulse,
};

/**
 * Impact — aggregate outcomes per industry in a tabbed panel.
 * Counters re-run on every tab change (the panel is keyed by sector id).
 */
const ImpactTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const sector = IMPACT_SECTORS[active];

  const select = (index: number) => {
    const next = (index + IMPACT_SECTORS.length) % IMPACT_SECTORS.length;
    setActive(next);
    window.supercool?.track('impact_tab_select', { sector: IMPACT_SECTORS[next].id });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = IMPACT_SECTORS.length - 1;
    if (next === null) return;
    e.preventDefault();
    const target = (next + IMPACT_SECTORS.length) % IMPACT_SECTORS.length;
    select(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <section id="impact" className="relative border-t border-hairline py-20 sm:py-28">

      <Aurora className="-z-10" />
      <div className="container-x">
        <SectionHeading
          eyebrow="// impact by sector"
          title={
            <>
              The same standard,
              <br className="hidden sm:block" /> four very different{' '}
              <span className="grad-text">industries</span>.
            </>
          }
          sub="Aggregate numbers from platforms we run in production today. Pick a sector to see what it moved."
        />

        {/* tabs */}
        <Reveal delay={90} className="mt-10">
          <div
            role="tablist"
            aria-label="Impact by industry"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0"
          >
            {IMPACT_SECTORS.map((s, i) => {
              const Icon = SECTOR_ICONS[s.id] ?? BadgeCheck;
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`impact-tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls={`impact-panel-${s.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                    isActive ? 'text-ink' : 'text-ink-faint hover:text-ink'
                  )}
                  style={
                    isActive
                      ? {
                          borderColor: 'rgba(0,255,157,0.55)',
                          background: 'rgba(0,255,157,0.09)',
                          boxShadow: '0 0 26px -10px rgba(0,255,157,0.75)',
                        }
                      : { borderColor: 'var(--hairline)' }
                  }
                >
                  <Icon
                    className={cn('h-3.5 w-3.5', isActive ? 'text-mint-ink' : 'opacity-70')}
                    aria-hidden="true"
                  />
                  {s.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* panel — remounts per sector so counters animate again */}
        <div
          key={sector.id}
          role="tabpanel"
          id={`impact-panel-${sector.id}`}
          aria-labelledby={`impact-tab-${sector.id}`}
          className="mt-8"
        >
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="mono-label font-semibold text-mint-ink">{sector.scope}</p>
                <h3 className="mt-3 font-heading text-[20px] font-bold leading-snug text-ink sm:text-[24px]">
                  {sector.headline}
                </h3>
              </div>
              <Link
                to={`/work/${sector.caseSlug}`}
                onClick={() =>
                  window.supercool?.track('cta_click', {
                    location: 'impact',
                    label: sector.caseSlug,
                  })
                }
                className="inline-flex shrink-0 items-center gap-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-mint-ink transition-transform hover:translate-x-1"
              >
                {sector.caseLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {/* animated counters */}
          <dl className="mt-8 grid gap-5 sm:grid-cols-3">
            {sector.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 90}>
                <GlowCard className="h-full p-6 sm:p-7">
                  <dd className="font-mono text-[34px] font-extrabold leading-none grad-text sm:text-[44px]">
                    <Counter
                      value={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                      decimals={m.decimals}
                    />
                  </dd>
                  <dt className="mono-label mt-3.5 block font-semibold leading-relaxed text-ink">{m.label}</dt>
                  <p className="mt-2.5 border-t border-hairline pt-3 text-[13px] leading-relaxed text-ink-muted">
                    {m.note}
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </dl>

          {/* two proof points */}
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {sector.proof.map((p, i) => (
              <Reveal as="li" key={p.title} delay={140 + i * 90}>
                <GlowCard className="h-full p-6">
                  <div className="flex gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline"
                      style={{ background: 'rgba(0,255,157,0.08)' }}
                    >
                      <BadgeCheck className="h-5 w-5 text-mint-ink" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-heading text-[16.5px] font-bold leading-snug text-ink">
                        {p.title}
                      </h4>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{p.body}</p>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImpactTabs;
