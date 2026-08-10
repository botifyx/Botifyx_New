import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Layers, Target, Wrench } from 'lucide-react';
import Seo from '@/components/Seo';
import { GradientCover, CaseCard } from '@/components/Cards';
import { Reveal, MagneticButton, GlowCard } from '@/components/ui-kit';
import { CASES } from '@/lib/site';

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams();
  const item = CASES.find((c) => c.slug === slug);

  if (!item) {
    return (
      <section className="container-x py-40 text-center">
        <Seo title="Case study not found" description="This case study does not exist." path="/work" />
        <p className="mono-label">// 404</p>
        <h1 className="mt-4 text-[30px] font-bold text-ink">That case study moved.</h1>
        <p className="mt-3 text-ink-muted">Browse everything we have published instead.</p>
        <div className="mt-8 flex justify-center">
          <MagneticButton to="/work" ariaLabel="Back to all case studies">
            All case studies
          </MagneticButton>
        </div>
      </section>
    );
  }

  const related = CASES.filter((c) => c.slug !== item.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={item.title}
        description={item.challenge}
        path={`/work/${item.slug}`}
        type="article"
      />

      <section className="relative pt-32 sm:pt-40">
        <div className="container-x">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-mint-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            all case studies
          </Link>

          <div className="mt-8 flex flex-wrap gap-1.5">
            <span className="chip !text-mint-ink" style={{ borderColor: 'rgba(0,255,157,0.35)' }}>
              {item.industry}
            </span>
            {item.categories.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>

          <h1 className="mt-5 max-w-4xl text-[32px] font-extrabold leading-[1.07] tracking-tight text-ink sm:text-[50px]">
            {item.title}
          </h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-faint">
            client · {item.client}
          </p>

          <div className="mt-10 overflow-hidden rounded-glass border border-hairline">
            <GradientCover gradient={item.gradient} height="h-48 sm:h-72" />
          </div>

          <dl className="mt-8 grid gap-5 sm:grid-cols-3">
            {item.results.map((r, i) => (
              <Reveal key={r.label} delay={i * 90}>
                <div className="glass p-5">
                  <dd className="font-mono text-[26px] font-bold leading-none grad-text sm:text-[32px]">
                    {r.value}
                  </dd>
                  <dt className="mono-label mt-3 block">{r.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            <div className="space-y-12">
              <Reveal>
                <p className="mono-label mb-3">// the challenge</p>
                <h2 className="text-[22px] font-bold leading-snug text-ink sm:text-[28px]">
                  What was actually broken
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">{item.challenge}</p>
              </Reveal>

              <Reveal>
                <p className="mono-label mb-3 flex items-center gap-2">
                  <Target className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
                  // the approach
                </p>
                <h2 className="text-[22px] font-bold leading-snug text-ink sm:text-[28px]">
                  How we attacked it
                </h2>
                <ul className="mt-5 space-y-4">
                  {item.approach.map((a) => (
                    <li key={a} className="flex gap-3 text-[15px] leading-relaxed text-ink-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm"
                        style={{ background: 'linear-gradient(135deg,#00ff9d,#00e5ff)' }}
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <p className="mono-label mb-3 flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
                  // the architecture
                </p>
                <h2 className="text-[22px] font-bold leading-snug text-ink sm:text-[28px]">
                  What we shipped
                </h2>
                <ol className="mt-5 space-y-3">
                  {item.architecture.map((a, i) => (
                    <li
                      key={a}
                      className="glass flex items-start gap-4 p-4 font-mono text-[12.5px] leading-relaxed text-ink-muted"
                    >
                      <span className="text-mint-ink">{String(i + 1).padStart(2, '0')}</span>
                      {a}
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal>
                <p className="mono-label mb-3">// the results</p>
                <h2 className="text-[22px] font-bold leading-snug text-ink sm:text-[28px]">
                  Measured after rollout
                </h2>
                <dl className="mt-5 divide-y divide-[color:var(--hairline)] border-y border-hairline">
                  {item.results.map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="text-[14.5px] text-ink-muted">{r.label}</dt>
                      <dd className="font-mono text-[19px] font-bold grad-text">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
              <GlowCard className="p-6">
                <p className="mono-label mb-4 flex items-center gap-2">
                  <Wrench className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
                  stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 border-t border-hairline pt-5">
                  <p className="mono-label">industry</p>
                  <p className="mt-1.5 text-[14px] text-ink">{item.industry}</p>
                </div>
              </GlowCard>

              <div
                className="glass p-6"
                style={{ borderColor: 'rgba(0,255,157,0.22)' }}
              >
                <p className="text-[15px] font-semibold leading-snug text-ink">
                  Facing something similar?
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                  A discovery sprint turns this into a costed plan in two to three weeks.
                </p>
                <MagneticButton to="/contact" className="mt-5 w-full" ariaLabel="Start a project">
                  Start a Project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative border-t border-hairline py-16 sm:py-20">
        <div className="container-x">
          <p className="mono-label mb-8">// more work</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <CaseCard key={r.slug} item={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyPage;
