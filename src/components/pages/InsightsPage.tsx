import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import Seo from '@/components/Seo';
import { PageHero, ArticleCard, GradientCover } from '@/components/Cards';
import { Reveal, MagneticButton } from '@/components/ui-kit';
import { ARTICLES, CATEGORIES } from '@/lib/articles';
import { cn } from '@/lib/utils';

const InsightsPage: React.FC = () => {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');

  const visible = useMemo(
    () => (category === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === category)),
    [category]
  );

  const lead = ARTICLES[0];

  return (
    <>
      <Seo
        title="Insights — AI Engineering, Green AI & Security"
        description="Technical field notes from the BotifyX engineering team: AI-native architecture, RAG evaluation, green inference, LLM security, agent workflows and measuring AI ROI."
        path="/insights"
      />

      <PageHero
        eyebrow="// insights"
        title={
          <>
            Field notes from <span className="grad-text">production</span>.
          </>
        }
        sub="Written by the engineers doing the work — architecture decisions, evaluation methods, security posture and the carbon maths behind them."
      />

      <section className="relative pb-8">
        <div className="container-x">
          <Reveal>
            <Link
              to={`/insights/${lead.slug}`}
              className="glass glass-hover group grid overflow-hidden lg:grid-cols-[1fr_1.1fr]"
            >
              <GradientCover gradient={lead.gradient} height="h-48 lg:h-full" label={lead.category} />
              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="chip !text-mint-ink" style={{ borderColor: 'rgba(0,255,157,0.35)' }}>
                    latest
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {lead.readTime} · {lead.date}
                  </span>
                </div>
                <h2 className="mt-4 text-[24px] font-bold leading-snug text-ink sm:text-[32px]">
                  {lead.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{lead.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mint-ink transition-transform duration-300 group-hover:translate-x-1">
                  Read the article
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24 pt-10">
        <div className="container-x">
          <div className="flex flex-wrap items-center gap-2 border-y border-hairline py-4">
            <span className="mono-label mr-2">// filter</span>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  'rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all',
                  category === c
                    ? 'border-mint/70 bg-mint-soft text-mint-ink'
                    : 'border-hairline text-ink-muted hover:border-mint/40 hover:text-ink'
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((a, i) => (
              <div key={a.slug} className="animate-slide-in" style={{ animationDelay: `${i * 70}ms` }}>
                <ArticleCard item={a} />
              </div>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center font-mono text-[13px] text-ink-faint">
              No articles in this category yet.
            </p>
          ) : null}

          <Reveal className="mt-16">
            <div
              className="glass flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10"
              style={{ borderColor: 'rgba(0,255,157,0.22)' }}
            >
              <div>
                <p className="mono-label">// go deeper</p>
                <h2 className="mt-3 max-w-md text-[22px] font-bold leading-snug text-ink sm:text-[28px]">
                  Want this applied to your stack?
                </h2>
              </div>
              <MagneticButton to="/contact" ariaLabel="Talk to a BotifyX engineer">
                Talk to an engineer
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default InsightsPage;
