import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Leaf, Calculator, Clock, Cpu, Gauge } from 'lucide-react';
import Seo from '@/components/Seo';
import { PageHero } from '@/components/Cards';
import CarbonDashboard from '@/components/CarbonDashboard';
import { Reveal, SectionHeading, GlowCard, MagneticButton, Counter } from '@/components/ui-kit';
import { CARBON_LEVERS } from '@/lib/site';

const MODEL_TIERS = [
  { id: 'small', label: 'Small (≤8B)', baseline: 0.42, botifyx: 0.14 },
  { id: 'mid', label: 'Mid (8–70B)', baseline: 2.41, botifyx: 0.67 },
  { id: 'frontier', label: 'Frontier (>70B)', baseline: 8.9, botifyx: 2.35 },
] as const;

const METHOD_STEPS = [
  {
    icon: Cpu,
    title: 'Meter the compute',
    body: 'Every request is tagged with the GPU/CPU seconds it consumed, captured from the serving runtime rather than estimated from token counts alone.',
    formula: 'gpu_seconds × instance_watts',
  },
  {
    icon: Gauge,
    title: 'Apply real power draw',
    body: 'We use measured power draw for the instance class under load, plus a data-centre PUE factor for cooling and overhead.',
    formula: '× PUE (1.1–1.4)',
  },
  {
    icon: Leaf,
    title: 'Multiply by grid intensity',
    body: 'Regional grid carbon intensity for the hour the work actually ran — not an annual national average.',
    formula: '× gCO₂e/kWh (hourly)',
  },
  {
    icon: Clock,
    title: 'Amortise the hardware',
    body: 'Embodied emissions from manufacturing the accelerator are amortised across its expected service life and utilisation.',
    formula: '+ embodied / lifetime',
  },
];

const Estimator: React.FC = () => {
  const [requests, setRequests] = useState(2_000_000);
  const [tierIndex, setTierIndex] = useState(1);
  const [cacheRate, setCacheRate] = useState(30);

  const tier = MODEL_TIERS[tierIndex];

  const { baselineKg, botifyxKg, savedKg, trees } = useMemo(() => {
    const yearly = requests * 12;
    const effective = yearly * (1 - cacheRate / 100);
    const baseline = (yearly * tier.baseline) / 1000;
    const optimised = (effective * tier.botifyx) / 1000;
    const saved = Math.max(0, baseline - optimised);
    return {
      baselineKg: baseline,
      botifyxKg: optimised,
      savedKg: saved,
      trees: saved / 21,
    };
  }, [requests, tier, cacheRate]);

  const fmt = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}t` : `${n.toFixed(0)}kg`;

  return (
    <GlowCard className="p-6 sm:p-9" >
      <div className="flex items-center gap-2">
        <Calculator className="h-4 w-4 text-mint-ink" aria-hidden="true" />
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
          carbon savings estimator
        </h3>
      </div>

      <div className="mt-7 grid gap-9 lg:grid-cols-2">
        <div className="space-y-7">
          <div>
            <label htmlFor="est-requests" className="mono-label mb-3 flex items-baseline justify-between">
              <span>monthly model requests</span>
              <span className="text-mint-ink tabular">{requests.toLocaleString()}</span>
            </label>
            <input
              id="est-requests"
              type="range"
              min={50_000}
              max={20_000_000}
              step={50_000}
              value={requests}
              onChange={(e) => setRequests(Number(e.target.value))}
              className="w-full accent-[#00ff9d]"
              aria-describedby="est-requests-hint"
            />
            <p id="est-requests-hint" className="mt-2 font-mono text-[10.5px] text-ink-faint">
              50K — 20M requests / month
            </p>
          </div>

          <div>
            <span className="mono-label mb-3 block">model size</span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Model size">
              {MODEL_TIERS.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTierIndex(i)}
                  aria-pressed={tierIndex === i}
                  className={`rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-all ${
                    tierIndex === i
                      ? 'border-mint/70 bg-mint-soft text-mint-ink'
                      : 'border-hairline text-ink-muted hover:border-mint/40 hover:text-ink'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="est-cache" className="mono-label mb-3 flex items-baseline justify-between">
              <span>semantic cache hit rate</span>
              <span className="text-mint-ink tabular">{cacheRate}%</span>
            </label>
            <input
              id="est-cache"
              type="range"
              min={0}
              max={60}
              step={5}
              value={cacheRate}
              onChange={(e) => setCacheRate(Number(e.target.value))}
              className="w-full accent-[#00ff9d]"
            />
            <p className="mt-2 font-mono text-[10.5px] text-ink-faint">
              typical BotifyX deployment: 30–40%
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="rounded-2xl border p-6"
            style={{
              borderColor: 'rgba(0,255,157,0.3)',
              background: 'radial-gradient(120% 100% at 50% 0%, rgba(0,255,157,0.12), transparent 70%)',
            }}
          >
            <p className="mono-label">estimated annual saving</p>
            <p className="mt-2 font-mono text-[38px] font-bold leading-none grad-text sm:text-[46px]">
              {fmt(savedKg)}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              CO₂e avoided per year
            </p>
            <p className="mt-4 border-t border-hairline pt-4 text-[13px] leading-relaxed text-ink-muted">
              Roughly equivalent to the annual sequestration of{' '}
              <span className="font-mono text-mint-ink">{Math.round(trees).toLocaleString()}</span>{' '}
              mature trees.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4">
            <div className="glass p-4">
              <dt className="mono-label">typical stack</dt>
              <dd className="mt-1.5 font-mono text-[19px] font-semibold text-ink tabular">
                {fmt(baselineKg)}
              </dd>
            </div>
            <div className="glass p-4">
              <dt className="mono-label">BotifyX stack</dt>
              <dd className="mt-1.5 font-mono text-[19px] font-semibold text-mint-ink tabular">
                {fmt(botifyxKg)}
              </dd>
            </div>
          </dl>

          <p className="font-mono text-[10.5px] leading-relaxed text-ink-faint">
            Indicative model using measured gCO₂e/request from live BotifyX workloads
            ({tier.baseline} vs {tier.botifyx} gCO₂e per request at this tier). Your figures are
            confirmed during a discovery sprint.
          </p>
        </div>
      </div>
    </GlowCard>
  );
};

const CarbonPage: React.FC = () => (
  <>
    <Seo
      title="Green AI — Low-Carbon Inference Methodology"
      description="How BotifyX measures gCO₂e per request and cuts compute carbon 72% versus baseline: right-sized models, efficient inference, carbon-aware scheduling and edge caching."
      path="/carbon"
    />

    <PageHero
      eyebrow="// green ai"
      title={
        <>
          We measure the carbon of every request — then{' '}
          <span className="grad-text">engineer it down</span>.
        </>
      }
      sub="Sustainability claims without instrumentation are marketing. This page is the method: what we measure, how we measure it, and the levers that move the number."
    >
      <div className="mt-8 flex flex-wrap gap-3">
        <MagneticButton to="/contact" ariaLabel="Talk to BotifyX about carbon measurement">
          Talk to an engineer
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </MagneticButton>
        <MagneticButton href="#estimator" variant="ghost" ariaLabel="Jump to the carbon savings estimator">
          <Calculator className="h-4 w-4" aria-hidden="true" />
          Try the estimator
        </MagneticButton>
      </div>
    </PageHero>

    <section className="relative border-y border-hairline py-12">
      <div className="container-x">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { v: 72, s: '%', l: 'lower compute carbon vs. baseline', d: 0 },
            { v: 0.67, s: '', l: 'gCO₂e per request, median workload', d: 2 },
            { v: 37, s: '%', l: 'requests served from cache', d: 0 },
            { v: 4, s: '', l: 'levers instrumented in every build', d: 0 },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 90}>
              <dd className="font-mono text-[32px] font-bold leading-none grad-text sm:text-[42px]">
                <Counter value={s.v} suffix={s.s} decimals={s.d} />
              </dd>
              <dt className="mono-label mt-3 block leading-relaxed">{s.l}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>

    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="// how we measure"
          title={
            <>
              From GPU seconds to <span className="grad-text">grams of CO₂e</span>.
            </>
          }
          sub="Four multiplications, all of them observable. No offsets, no estimates dressed up as measurements."
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METHOD_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal as="li" key={step.title} delay={i * 90}>
                <GlowCard className="h-full p-5">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-mint-ink" aria-hidden="true" />
                    <span className="font-mono text-[11px] text-ink-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[15.5px] font-semibold leading-snug text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{step.body}</p>
                  <code className="mt-4 block rounded-lg px-2.5 py-2 font-mono text-[11px] text-mint-ink"
                    style={{ background: 'rgba(0,255,157,0.08)' }}
                  >
                    {step.formula}
                  </code>
                </GlowCard>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>

    <section className="relative border-y border-hairline py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="// the live dashboard"
          title={
            <>
              What clients see every day.
            </>
          }
          sub="Carbon sits on the same dashboard as latency and cost, per endpoint, so efficiency work competes for attention on equal terms."
        />
        <div className="mt-12">
          <CarbonDashboard variant="full" />
        </div>
      </div>
    </section>

    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="// efficiency levers"
          title={
            <>
              Four levers that actually <span className="grad-text">move the number</span>.
            </>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {CARBON_LEVERS.map((lever, i) => {
            const Icon = lever.icon;
            return (
              <Reveal key={lever.title} delay={i * 90}>
                <GlowCard className="h-full p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ background: 'rgba(0,255,157,0.1)' }}
                    >
                      <Icon className="h-5 w-5 text-mint-ink" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[13px] font-bold text-mint-ink tabular">
                      {lever.metric}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[17px] font-bold text-ink">{lever.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">{lever.body}</p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    <section id="estimator" className="relative scroll-mt-24 border-t border-hairline py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="// estimator"
          title={
            <>
              Estimate your own <span className="grad-text">annual saving</span>.
            </>
          }
          sub="Move the sliders. The maths runs entirely in your browser — nothing is sent anywhere."
        />
        <Reveal className="mt-10">
          <Estimator />
        </Reveal>

        <Reveal className="mt-10">
          <div
            className="glass flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center"
            style={{ borderColor: 'rgba(0,255,157,0.22)' }}
          >
            <div>
              <p className="mono-label">// next step</p>
              <h2 className="mt-3 max-w-lg text-[22px] font-bold leading-snug text-ink sm:text-[27px]">
                Want the real number for your workload?
              </h2>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink-muted">
                A discovery sprint instruments your existing endpoints and reports measured
                gCO₂e per request within three weeks.
              </p>
            </div>
            <MagneticButton to="/contact" ariaLabel="Book a carbon baseline discovery sprint">
              Book a baseline
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default CarbonPage;
