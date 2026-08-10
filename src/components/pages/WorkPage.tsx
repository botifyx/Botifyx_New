import React, { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Seo from '@/components/Seo';
import { PageHero, CaseCard } from '@/components/Cards';
import { Reveal, MagneticButton } from '@/components/ui-kit';
import { CASES } from '@/lib/site';
import { cn } from '@/lib/utils';

const FILTERS = ['All', 'AI/ML', 'Web', 'Mobile', 'Cloud'] as const;

const WorkPage: React.FC = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const visible = useMemo(
    () => (filter === 'All' ? CASES : CASES.filter((c) => c.categories.includes(filter as never))),
    [filter]
  );

  return (
    <>
      <Seo
        title="Work — AI Platform Case Studies"
        description="Case studies from BotifyX: support copilots, document intelligence, demand forecasting, offline-first mobile, edge web platforms and zero-trust cloud hardening."
        path="/work"
      />

      <PageHero
        eyebrow="// selected work"
        title={
          <>
            Platforms in production, <span className="grad-text">numbers attached</span>.
          </>
        }
        sub="Six engagements across financial services, logistics, retail, healthcare, software and manufacturing. Every metric below came from instrumentation, not a deck."
      />

      <section className="relative pb-24">
        <div className="container-x">
          <div className="flex flex-wrap items-center gap-2 border-y border-hairline py-4">
            <span className="mono-label mr-2">// filter</span>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  'rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all',
                  filter === f
                    ? 'border-mint/70 bg-mint-soft text-mint-ink'
                    : 'border-hairline text-ink-muted hover:border-mint/40 hover:text-ink'
                )}
              >
                {f}
                <span className="ml-2 opacity-60">
                  {f === 'All' ? CASES.length : CASES.filter((c) => c.categories.includes(f as never)).length}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item, i) => (
              <div
                key={item.slug}
                className="animate-slide-in"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <CaseCard item={item} tilt={i < 3} />
              </div>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center font-mono text-[13px] text-ink-faint">
              Nothing in this category yet.
            </p>
          ) : null}

          <Reveal className="mt-16">
            <div
              className="glass flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10"
              style={{ borderColor: 'rgba(0,255,157,0.22)' }}
            >
              <div>
                <p className="mono-label">// your platform next</p>
                <h2 className="mt-3 max-w-md text-[24px] font-bold leading-snug text-ink sm:text-[30px]">
                  Tell us the outcome. We&apos;ll bring the architecture.
                </h2>
              </div>
              <MagneticButton to="/contact" ariaLabel="Start a project with BotifyX">
                Start a Project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default WorkPage;
