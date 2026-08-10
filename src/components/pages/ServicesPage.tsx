import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Wrench, Target } from 'lucide-react';
import Seo from '@/components/Seo';
import { PageHero } from '@/components/Cards';
import { Reveal, SectionHeading, GlowCard, MagneticButton, Aurora } from '@/components/ui-kit';
import { SERVICES, ENGAGEMENTS } from '@/lib/site';
import { cn } from '@/lib/utils';

const ServicesPage: React.FC = () => {
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSlug(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SERVICES.forEach((s) => {
      const el = document.getElementById(s.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Seo
        title="Services — AI, Platform & Cloud Engineering"
        description="Six engineering disciplines: AI/ML engineering, RAG and knowledge systems, enterprise AI platforms, web platform engineering, mobile applications, and cloud, DevOps and security."
        path="/services"
      />

      <PageHero
        eyebrow="// services"
        title={
          <>
            Engineering disciplines that <span className="grad-text">compound</span>.
          </>
        }
        sub="Each practice below stands on its own — and they are designed to combine. Most engagements draw on three of them at once."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton to="/contact" ariaLabel="Start a project with BotifyX">
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton to="/work" variant="ghost" ariaLabel="See BotifyX case studies">
            See the work
          </MagneticButton>
        </div>
      </PageHero>

      <section className="relative py-14 sm:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
            <nav aria-label="Services" className="lg:sticky lg:top-28 lg:h-fit">
              <p className="mono-label mb-4">// jump to</p>
              <ul className="space-y-1">
                {SERVICES.map((s, i) => (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      className={cn(
                        'flex items-baseline gap-3 rounded-xl px-3 py-2.5 text-[13.5px] leading-snug transition-all',
                        activeSlug === s.slug
                          ? 'bg-mint-soft text-mint-ink'
                          : 'text-ink-muted hover:bg-mint-soft hover:text-ink'
                      )}
                      aria-current={activeSlug === s.slug ? 'true' : undefined}
                    >
                      <span className="font-mono text-[10.5px] opacity-70">0{i + 1}</span>
                      {s.short}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-6">
              {SERVICES.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Reveal key={service.slug} as="section">

                    <div id={service.slug} className="scroll-mt-28">
                      <GlowCard className="p-6 sm:p-9">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <span
                              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-hairline"
                              style={{ background: 'rgba(0,255,157,0.08)' }}
                            >
                              <Icon className="h-5 w-5 text-mint-ink" aria-hidden="true" />
                            </span>
                            <div>
                              <p className="mono-label">service 0{i + 1}</p>
                              <h2 className="mt-1 text-[21px] font-bold leading-snug text-ink sm:text-[26px]">
                                {service.title}
                              </h2>
                            </div>
                          </div>
                        </div>

                        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                          {service.description}
                        </p>

                        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                          <div>
                            <h3 className="mono-label mb-4 flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
                              what&apos;s included
                            </h3>
                            <ul className="space-y-3">
                              {service.included.map((item) => (
                                <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-ink-muted">
                                  <span
                                    aria-hidden="true"
                                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm"
                                    style={{ background: 'linear-gradient(135deg,#00ff9d,#00e5ff)' }}
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-7">
                            <div>
                              <h3 className="mono-label mb-3 flex items-center gap-2">
                                <Wrench className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
                                tooling
                              </h3>
                              <div className="flex flex-wrap gap-1.5">
                                {service.tooling.map((t) => (
                                  <span key={t} className="chip">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="mono-label mb-3 flex items-center gap-2">
                                <Target className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
                                typical outcomes
                              </h3>
                              <ul className="space-y-2">
                                {service.outcomes.map((o) => (
                                  <li
                                    key={o}
                                    className="font-mono text-[11.5px] leading-relaxed text-ink-faint"
                                  >
                                    → {o}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </GlowCard>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-hairline py-20 sm:py-28">
        <Aurora className="-z-10" />
        <div className="container-x">
          <SectionHeading
            eyebrow="// engagement models"
            title={
              <>
                Three ways to <span className="grad-text">work with us</span>.
              </>
            }
            sub="Start small, scale when the evidence is in. Most clients move from a Discovery Sprint into a Build Pod, then into Managed AI Ops."
            align="center"
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {ENGAGEMENTS.map((eng, i) => (
              <Reveal key={eng.name} delay={i * 100}>
                <div
                  className={cn(
                    'glass glass-hover flex h-full flex-col p-6 sm:p-7',
                    eng.highlight && 'lg:-translate-y-3'
                  )}
                  style={
                    eng.highlight
                      ? {
                          borderColor: 'rgba(0,255,157,0.4)',
                          boxShadow: '0 24px 70px -34px rgba(0,255,157,0.6)',
                        }
                      : undefined
                  }
                >
                  {eng.highlight ? (
                    <span className="mb-4 self-start rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#04140f]"
                      style={{ background: 'linear-gradient(135deg,#00ff9d,#00e5ff)' }}
                    >
                      most chosen
                    </span>
                  ) : null}
                  <h3 className="text-[20px] font-bold text-ink">{eng.name}</h3>
                  <div className="mt-2 flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-mint-ink">
                      {eng.duration}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                      {eng.price}
                    </span>
                  </div>
                  <p className="mt-4 border-t border-hairline pt-4 text-[13.5px] leading-relaxed text-ink-muted">
                    <span className="mono-label block">best for</span>
                    <span className="mt-1.5 block">{eng.best}</span>
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {eng.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-ink" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton
                    to="/contact"
                    variant={eng.highlight ? 'mint' : 'ghost'}
                    className="mt-7 w-full"
                    ariaLabel={`Enquire about ${eng.name}`}
                    onClick={() => window.supercool?.track('cta_click', { location: 'engagements', label: eng.name })}
                  >
                    Enquire
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <caption className="mono-label mb-4 text-left">
                // side-by-side comparison
              </caption>
              <thead>
                <tr className="border-b border-hairline">
                  <th scope="col" className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                    capability
                  </th>
                  {ENGAGEMENTS.map((e) => (
                    <th
                      key={e.name}
                      scope="col"
                      className="py-3 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink"
                    >
                      {e.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Architecture & threat model', true, true, true],
                  ['Evaluated prototype', true, true, false],
                  ['Production delivery squad', false, true, false],
                  ['Eval suite + guardrails in CI', false, true, true],
                  ['24/7 monitoring & on-call', false, false, true],
                  ['Cost + carbon optimisation loop', false, true, true],
                  ['Quarterly security review', false, false, true],
                ].map((row) => (
                  <tr key={row[0] as string} className="border-b border-hairline">
                    <th scope="row" className="py-3.5 pr-4 text-[13.5px] font-medium text-ink">
                      {row[0] as string}
                    </th>
                    {row.slice(1).map((cell, ci) => (
                      <td key={ci} className="px-4 py-3.5">
                        {cell ? (
                          <Check className="h-4 w-4 text-mint-ink" aria-label="included" />
                        ) : (
                          <span className="font-mono text-[12px] text-ink-faint" aria-label="not included">
                            —
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
