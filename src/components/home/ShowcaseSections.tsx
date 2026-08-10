import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Phone,
  Quote,
} from 'lucide-react';
import {
  Reveal,
  SectionHeading,
  GlowCard,
  Marquee,
  MagneticButton,
  useReducedMotion,
} from '@/components/ui-kit';
import { CaseCard, ArticleCard } from '@/components/Cards';
import { CASES, TECH_STACK, SECURITY, TESTIMONIALS, FAQS, CONTACT } from '@/lib/site';
import { ARTICLES } from '@/lib/articles';
import { cn } from '@/lib/utils';

/* -------------------------------- case studies ----------------------------- */

export const FeaturedWork: React.FC = () => (
  <section id="work" className="relative py-20 sm:py-28">
    <div className="container-x">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="// selected work"
          title={
            <>
              Outcomes, <span className="grad-text">measured</span>.
            </>
          }
          sub="Three platforms in production. Every number below was instrumented, not estimated."
        />
        <Reveal delay={120}>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-mint-ink transition-transform hover:translate-x-1"
          >
            All case studies
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CASES.filter((c) => c.featured).map((item, i) => (
          <Reveal key={item.slug} delay={i * 110}>
            <CaseCard item={item} tilt />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------- marquee -------------------------------- */

export const StackMarquee: React.FC = () => (
  <section className="relative border-y border-hairline py-12">
    <div className="container-x mb-6">
      <p className="mono-label">// tools we run in production</p>
    </div>
    <Marquee items={TECH_STACK} />
  </section>
);

/* -------------------------------- security --------------------------------- */

export const SecurityTrust: React.FC = () => (
  <section id="security" className="relative py-20 sm:py-28">
    <div className="container-x">
      <SectionHeading
        eyebrow="// enterprise security & trust"
        title={
          <>
            Built to survive an <span className="grad-text">adversarial audit</span>.
          </>
        }
        sub="Security is a core mathematical and architectural constraint from day zero — never a sprint before launch."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SECURITY.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={i * 90}>
              <GlowCard className="h-full p-6">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline"
                  style={{ background: 'rgba(0,255,157,0.08)' }}
                >
                  <Icon className="h-5 w-5 text-mint-ink" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-[17px] font-bold leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">{item.body}</p>
                <div className="mt-5 border-t border-hairline pt-3.5">
                  <span className="hud-badge text-[10px]">
                    {item.badge}
                  </span>
                </div>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ------------------------------- testimonials ------------------------------ */

export const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6200);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  return (
    <section
      className="relative border-y border-hairline py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="// what clients say"
          title={
            <>
              Trusted by teams who <span className="grad-text">ship</span>.
            </>
          }
          align="center"
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="relative min-h-[240px] sm:min-h-[180px]">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                aria-hidden={i !== active}
                className={cn(
                  'glass absolute inset-0 m-0 flex flex-col justify-center p-6 transition-all duration-700 sm:p-9',
                  i === active
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-3 opacity-0'
                )}
              >
                <Quote className="h-6 w-6 text-mint-ink shrink-0" aria-hidden="true" />
                <blockquote className="mt-4 text-[16px] leading-relaxed text-ink sm:text-[18px] font-normal italic">
                  “{t.quote}”
                </blockquote>
              </figure>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === active}
                className="group/dot h-2.5 rounded-full transition-all"
                style={{
                  width: i === active ? 38 : 10,
                  background:
                    i === active ? 'linear-gradient(90deg,#00ff9d,#00e5ff)' : 'var(--hairline)',
                  boxShadow: i === active ? '0 0 12px rgba(0,255,157,0.5)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ----------------------------- insights preview ---------------------------- */

export const InsightsPreview: React.FC = () => (
  <section className="relative py-20 sm:py-28">
    <div className="container-x">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="// insights"
          title={
            <>
              Field notes from <span className="grad-text">production</span>.
            </>
          }
          sub="Written by the engineers doing the work. No thought leadership, no listicles."
        />
        <Reveal delay={120}>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-mint-ink transition-transform hover:translate-x-1"
          >
            All insights
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.slice(0, 3).map((a, i) => (
          <Reveal key={a.slug} delay={i * 110}>
            <ArticleCard item={a} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------ faq ---------------------------------- */

export const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative border-t border-hairline py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="// faq"
            title={
              <>
                Questions we get <span className="grad-text">every week</span>.
              </>
            }
            sub="Still unanswered? Ask us directly — we reply within one business day."
          />
          <div>
            <ul className="divide-y divide-[color:var(--hairline)] border-y border-hairline">
              {FAQS.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <li key={faq.q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-start justify-between gap-6 py-5 text-left"
                      >
                        <span
                          className={cn(
                            'text-[15.5px] font-semibold transition-colors sm:text-[17px]',
                            isOpen ? 'text-mint-ink' : 'text-ink'
                          )}
                        >
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={cn(
                            'mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300',
                            isOpen ? 'rotate-180 text-mint-ink' : 'text-ink-faint'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      className="grid transition-all duration-300 ease-out"

                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pr-8 text-[14.5px] leading-relaxed text-ink-muted">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --------------------------------- final cta ------------------------------- */

export const FinalCta: React.FC = () => (
  <section className="relative overflow-hidden py-24 sm:py-32">
    <div className="container-x">
      <Reveal>
        <div
          className="glass relative overflow-hidden px-6 py-16 text-center sm:px-14 sm:py-24"
          style={{ borderColor: 'rgba(0,255,157,0.3)', boxShadow: '0 24px 80px -20px rgba(0,255,157,0.25)' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 80% at 50% 0%, rgba(0,255,157,0.22), transparent 70%), radial-gradient(60% 70% at 50% 100%, rgba(0,229,255,0.18), transparent 70%), radial-gradient(40% 50% at 80% 50%, rgba(99,102,241,0.12), transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="flex justify-center">
              <span className="hud-badge text-[11px]">
                // NEXT GENERATION DIGITAL ENGINEERING
              </span>
            </div>
            <h2 className="mx-auto mt-6 max-w-3xl font-heading text-[36px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[54px] lg:text-[60px]">
              Let&apos;s engineer something that <span className="grad-text">outperforms</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted sm:text-[18px]">
              Tell us the technical or business outcome you need. We will return with a vetted architecture, measurable benchmarks, and carbon delta attached.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <MagneticButton
                to="/contact"
                ariaLabel="Start a project with BotifyX"
                onClick={() =>
                  window.supercool?.track('cta_click', { location: 'final_cta', label: 'start_a_project' })
                }
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <a
                href={`mailto:${CONTACT.email}`}
                className="btn-ghost"
                aria-label={`Email BotifyX at ${CONTACT.email}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 font-mono text-[13px] font-medium tracking-wide text-ink-muted transition-colors hover:text-mint-ink"
                aria-label={`Call BotifyX on ${CONTACT.phone}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
