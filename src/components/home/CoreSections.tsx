import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Leaf } from 'lucide-react';
import {
  Counter,
  Reveal,
  SectionHeading,
  GlowCard,
  Aurora,
  MagneticButton,
} from '@/components/ui-kit';
import CarbonDashboard from '@/components/CarbonDashboard';
import { HOME_STATS, SERVICES, PROCESS, CARBON_LEVERS } from '@/lib/site';

/* ------------------------------- stats strip ------------------------------- */

export const StatsStrip: React.FC = () => (
  <section className="relative border-y border-hairline py-14 sm:py-16">
    <div className="container-x">
      <dl className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
        {HOME_STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="relative">
            <dd className="font-mono text-[36px] font-extrabold leading-none grad-text sm:text-[48px]">
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </dd>
            <dt className="mono-label mt-3.5 block font-semibold leading-relaxed tracking-wider text-ink-muted">
              {stat.label}
            </dt>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
);

/* ------------------------------ services grid ------------------------------ */

export const ServicesGrid: React.FC = () => (
  <section id="services" className="relative py-24 sm:py-32">
    <Aurora className="-z-10" />
    <div className="container-x">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="// engineering disciplines"
          title={
            <>
              Six disciplines,
              <br className="hidden sm:block" /> one <span className="grad-text">production standard</span>.
            </>
          }
          sub="We take products from a whiteboard hypothesis to a monitored, evaluated, low-carbon platform in production."
        />
        <Reveal delay={120}>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-mint-ink transition-all hover:translate-x-1 hover:text-cyan"
          >
            All service architecture
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.slug} delay={(i % 3) * 90}>
              <GlowCard className="h-full">
                <Link
                  to={`/services#${service.slug}`}
                  className="flex h-full flex-col p-7"
                  aria-label={`${service.title} — explore`}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-hairline transition-all duration-300 group-hover:border-mint/50 group-hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                    style={{ background: 'rgba(0,255,157,0.08)' }}
                  >
                    <Icon className="h-5 w-5 text-mint-ink" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-heading text-[20px] font-bold leading-snug text-ink transition-colors group-hover:text-mint-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-muted">
                    {service.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.chips.map((chip) => (
                      <span key={chip} className="chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 border-t border-hairline pt-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-mint-ink transition-transform duration-300 group-hover:translate-x-1">
                    Explore Architecture
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ------------------------------- process rail ------------------------------ */

export const ProcessRail: React.FC = () => {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = railRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.78 - r.top) / Math.max(r.height * 0.72, 1);
      setFill(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="process" className="relative border-y border-hairline py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="// how we work"
          title={
            <>
              A delivery model built for <span className="grad-text">certainty</span>.
            </>
          }
          sub="Four phases, each ending in something you can inspect: a document, a running prototype, a dashboard."
        />

        <div ref={railRef} className="relative mt-14">
          {/* track */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px lg:left-0 lg:top-[27px] lg:h-px lg:w-full"
            style={{ background: 'var(--hairline)' }}
          />
          {/* mobile vertical fill */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 w-px lg:hidden"
            style={{
              background: 'linear-gradient(180deg,#00ff9d,#00e5ff)',
              height: `calc((100% - 16px) * ${fill})`,
              boxShadow: '0 0 12px rgba(0,255,157,0.55)',
              transition: 'height .2s linear',
            }}
          />
          {/* desktop horizontal fill */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-[27px] hidden h-px w-full origin-left lg:block"
            style={{
              background: 'linear-gradient(90deg,#00ff9d,#00e5ff)',
              transform: `scaleX(${fill})`,
              boxShadow: '0 0 12px rgba(0,255,157,0.55)',
              transition: 'transform .2s linear',
            }}
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {PROCESS.map((step, i) => (
              <Reveal as="li" key={step.id} delay={i * 110} className="relative pl-14 lg:pl-0">
                <span
                  className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[12px] font-bold lg:relative lg:mb-6"
                  style={{
                    borderColor: fill > i / PROCESS.length ? 'rgba(0,255,157,0.7)' : 'var(--hairline)',
                    background: 'var(--bg)',
                    color: fill > i / PROCESS.length ? '#00ff9d' : 'var(--ink-faint)',
                    boxShadow: fill > i / PROCESS.length ? '0 0 20px -4px rgba(0,255,157,0.6)' : 'none',
                    transition: 'all .4s',
                  }}
                >

                  {step.id}
                </span>
                <h3 className="text-[17px] font-bold text-ink lg:mt-0">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{step.blurb}</p>
                <ul className="mt-4 space-y-1.5">
                  {step.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint"
                    >
                      <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-sm bg-mint" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------- green ai -------------------------------- */

export const GreenAI: React.FC = () => (
  <section id="green-ai" className="relative overflow-hidden py-20 sm:py-28">
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{
        background:
          'radial-gradient(60% 50% at 12% 20%, rgba(0,255,157,0.13), transparent 70%), radial-gradient(50% 45% at 88% 75%, rgba(16,185,129,0.12), transparent 70%)',
      }}
    />
    <div className="container-x">
      <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="// green ai · the differentiator"
            title={
              <>
                Intelligence shouldn&apos;t
                <br className="hidden sm:block" /> <span className="grad-text">cost the planet</span>.
              </>
            }
            sub="Every BotifyX platform reports grams of CO₂e per request beside latency and cost. Not as a badge — as an engineering metric we optimise every quarter."
          />

          <ul className="mt-9 space-y-4">
            {CARBON_LEVERS.map((lever, i) => {
              const Icon = lever.icon;
              return (
                <Reveal as="li" key={lever.title} delay={i * 90}>
                  <div className="glass glass-hover flex gap-4 p-4 sm:p-5">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: 'rgba(0,255,157,0.1)' }}
                    >
                      <Icon className="h-4 w-4 text-mint-ink" aria-hidden="true" />

                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-[15px] font-semibold text-ink">{lever.title}</h3>
                        <span className="font-mono text-[11px] font-semibold text-mint-ink tabular">
                          {lever.metric}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">
                        {lever.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={200} className="mt-8">
            <MagneticButton to="/carbon" variant="ghost" ariaLabel="Read the Green AI methodology">
              <Leaf className="h-4 w-4" aria-hidden="true" />
              Read the methodology
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <CarbonDashboard />
        </Reveal>
      </div>
    </div>
  </section>
);
