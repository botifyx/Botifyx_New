import React from 'react';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import Seo from '@/components/Seo';
import { PageHero } from '@/components/Cards';
import BotifyXLogo from '@/components/BotifyXLogo';
import {
  Reveal,
  SectionHeading,
  GlowCard,
  MagneticButton,
  Counter,
  Marquee,
} from '@/components/ui-kit';
import { VALUES, TIMELINE, TECH_STACK, CONTACT } from '@/lib/site';

const AboutPage: React.FC = () => (
  <>
    <Seo
      title="About — AI-Native Engineering Studio"
      description="BotifyX is an AI-native digital engineering company. Our mission, values, founding story and the engineers behind secure, low-carbon AI platforms."
      path="/about"
    />

    <PageHero
      eyebrow="// about botifyx"
      title={
        <>
          We build the systems we would be <span className="grad-text">happy to operate</span>.
        </>
      }
      sub="BotifyX is an engineering studio, not an agency. Small senior teams, production accountability, and a bias toward measurement over narrative."
    >
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <MagneticButton to="/contact" ariaLabel="Work with BotifyX">
          Work with us
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </MagneticButton>
        <span className="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
          <MapPin className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
          Chennai, India — delivering globally
        </span>
      </div>
    </PageHero>

    <section className="relative border-y border-hairline py-12">
      <div className="container-x">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { v: 7, s: ' yrs', l: 'building production ML', d: 0 },
            { v: 34, s: '+', l: 'platforms delivered', d: 0 },
            { v: 3, s: '', l: 'continents served', d: 0 },
            { v: 72, s: '%', l: 'average carbon reduction', d: 0 },
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
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          eyebrow="// mission"
          title={
            <>
              Intelligence at the core, <span className="grad-text">not the surface</span>.
            </>
          }
        />
          <div className="space-y-5">
            <Reveal delay={100} className="space-y-5 text-[15.5px] leading-relaxed text-ink-muted">
              <p>
                Most organisations adopt AI as a layer: a chat window on the edge of a product, a
                model behind a button. It demos well and rarely changes the economics of the
                business underneath.
              </p>
              <p>
                Our thesis is different. When intelligence sits in the core — in how work is routed,
                how decisions are made, how knowledge moves through the system — the compounding is
                structural rather than cosmetic. That requires real engineering: retrieval you can
                audit, evaluations that gate releases, guardrails that hold under adversarial input,
                and observability that makes the whole thing legible at 2am.
              </p>
              <p>
                It also requires restraint. The most sustainable AI decision is usually the smaller
                model, the warmer cache and the cleaner region — which is why our efficiency work
                and our climate work are the same work. {CONTACT.tagline}
              </p>
            </Reveal>
            <Reveal delay={150}>
              <GlowCard className="mt-6 flex flex-col items-center justify-center p-8 text-center sm:p-10">
                <BotifyXLogo variant="full" showTagline size="xl" height={68} />
                <p className="mono-label mt-4 text-[12px]">Official Identity & Engineering Methodology</p>
              </GlowCard>
            </Reveal>
          </div>
      </div>
    </section>

    <section className="relative border-y border-hairline py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="// values"
          title={
            <>
              Four commitments we can be <span className="grad-text">held to</span>.
            </>
          }
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 90}>
                <GlowCard className="h-full p-6">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ background: 'rgba(0,255,157,0.1)' }}
                  >
                    <Icon className="h-5 w-5 text-mint-ink" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[16px] font-bold leading-snug text-ink">{v.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted">{v.body}</p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="// founding story"
          title={
            <>
              How we got <span className="grad-text">here</span>.
            </>
          }
        />
        <ol className="relative mt-12 space-y-8 border-l border-hairline pl-8 sm:pl-12">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px"
            style={{ background: 'linear-gradient(180deg,#00ff9d,#00e5ff,transparent)' }}
          />
          {TIMELINE.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 80} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[38px] top-1.5 flex h-3 w-3 items-center justify-center sm:-left-[54px]"
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg,#00ff9d,#00e5ff)',
                    boxShadow: '0 0 14px rgba(0,255,157,0.7)',
                  }}
                />
              </span>
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-mint-ink">
                {t.year}
              </p>
              <h3 className="mt-2 text-[18px] font-bold text-ink sm:text-[21px]">{t.title}</h3>
              <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-ink-muted">{t.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>


    <section className="relative border-y border-hairline py-12">
      <div className="container-x mb-6">
        <p className="mono-label flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
          // what we build with
        </p>
      </div>
      <Marquee items={TECH_STACK} speed="slow" />
    </section>

    <section className="relative py-20">
      <div className="container-x">
        <Reveal>
          <div
            className="glass flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10"
            style={{ borderColor: 'rgba(0,255,157,0.22)' }}
          >
            <div>
              <p className="mono-label">// join or hire us</p>
              <h2 className="mt-3 max-w-lg text-[24px] font-bold leading-snug text-ink sm:text-[30px]">
                Bring us a hard problem.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton to="/contact" ariaLabel="Contact BotifyX">
                Start a Project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href={CONTACT.linkedin} variant="ghost" ariaLabel="BotifyX on LinkedIn">
                LinkedIn
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default AboutPage;
