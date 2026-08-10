import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { GlowCard } from '@/components/ui-kit';
import type { CaseStudy } from '@/lib/site';
import type { Article } from '@/lib/articles';
import { cn } from '@/lib/utils';

/** Abstract gradient cover — CSS/SVG only, no raster assets. */
export const GradientCover: React.FC<{
  gradient: string;
  label?: string;
  className?: string;
  height?: string;
}> = ({ gradient, label, className, height = 'h-40' }) => (
  <div
    className={cn('relative w-full overflow-hidden', height, className)}
    style={{ background: gradient }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <g stroke="rgba(3,7,8,0.28)" strokeWidth="0.5" fill="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M-10 ${12 + i * 11} C 40 ${2 + i * 12}, 120 ${34 + i * 8}, 210 ${6 + i * 11}`}
          />
        ))}
      </g>
      <g fill="rgba(3,7,8,0.35)">
        {Array.from({ length: 14 }).map((_, i) => (
          <circle key={i} cx={8 + i * 14} cy={50 + Math.sin(i * 1.4) * 26} r={1.6} />
        ))}
      </g>
    </svg>
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(160deg, rgba(3,7,8,0.05) 0%, rgba(3,7,8,0.55) 100%)' }}
    />
    {label ? (
      <span className="absolute bottom-3 left-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-black/70">
        {label}
      </span>
    ) : null}
  </div>
);

export const CaseCard: React.FC<{ item: CaseStudy; tilt?: boolean }> = ({ item, tilt = false }) => (
  <GlowCard tilt={tilt} className="h-full">
    <Link to={`/work/${item.slug}`} className="flex h-full flex-col">
      <GradientCover gradient={item.gradient} label={item.industry} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          {item.categories.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
        <h3 className="mt-5 font-heading text-[20px] font-bold leading-snug text-ink transition-colors group-hover:text-mint-ink">{item.title}</h3>
        <p className="mt-3 line-clamp-2 text-[14.5px] leading-relaxed text-ink-muted">
          {item.challenge}
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline pt-4">
          {item.results.slice(0, 2).map((r) => (
            <div key={r.label}>
              <dt className="mono-label text-[10px]">{r.label}</dt>
              <dd className="mt-1 font-mono text-[18px] font-bold grad-text">{r.value}</dd>
            </div>
          ))}
        </dl>
        <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-mint-ink transition-transform duration-300 group-hover:translate-x-1">
          Read case study
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  </GlowCard>
);

export const ArticleCard: React.FC<{ item: Article }> = ({ item }) => (
  <GlowCard className="h-full">
    <Link to={`/insights/${item.slug}`} className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="chip !text-mint-ink" style={{ borderColor: 'rgba(0,255,157,0.35)' }}>
          {item.category}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {item.readTime}
        </span>
      </div>
      <h3 className="mt-5 font-heading text-[19px] font-bold leading-snug text-ink transition-colors group-hover:text-mint-ink">{item.title}</h3>
      <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{item.excerpt}</p>
      <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          {item.date}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-mint-ink transition-transform duration-300 group-hover:translate-x-1">
          Read Article
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  </GlowCard>
);

export const PageHero: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
  children?: React.ReactNode;
}> = ({ eyebrow, title, sub, children }) => (
  <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{
        background:
          'radial-gradient(75% 65% at 20% 0%, rgba(0,255,157,0.12), transparent 70%), radial-gradient(55% 55% at 85% 10%, rgba(0,229,255,0.10), transparent 70%)',
      }}
    />
    <div className="grid-lines absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
    <div className="container-x">
      <div className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.06] px-3.5 py-1.5 backdrop-blur-md">
        <span aria-hidden="true" className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-mint" />
        </span>
        <span>{eyebrow}</span>
      </div>
      <h1 className="mt-6 max-w-4xl font-heading text-[38px] font-extrabold leading-[1.04] tracking-tight text-ink sm:text-[56px] lg:text-[62px]">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-muted sm:text-[18px]">
        {sub}
      </p>
      {children}
    </div>
  </section>
);
