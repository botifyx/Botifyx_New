import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Play, Activity, Cpu, Leaf, ShieldCheck, Zap, Sparkles, Terminal } from 'lucide-react';
import NeuralMesh from '@/components/NeuralMesh';
import BotifyXLogo from '@/components/BotifyXLogo';
import {
  MagneticButton,
  MaskWords,
  TypedRotator,
  Reveal,
  Sparkline,
  Eyebrow,
} from '@/components/ui-kit';
import { TRUST_MICRO } from '@/lib/site';

const seed = (n: number, base: number, spread: number) =>
  Array.from({ length: n }, (_, i) => base + Math.sin(i * 1.7) * spread + Math.random() * spread * 0.5);

const CAPABILITIES = [
  { label: 'LLM Fine-Tuning & Evals', icon: Zap },
  { label: 'Zero-Trust Architecture', icon: ShieldCheck },
  { label: 'Green AI & Low-Carbon', icon: Leaf },
  { label: 'Sub-400ms Production Inference', icon: Cpu },
];

const StatusWidget: React.FC = () => {
  const [latency, setLatency] = useState(384);
  const [carbon, setCarbon] = useState(0.62);
  const [inferences, setInferences] = useState(1482910);
  const [latSeries, setLatSeries] = useState(() => seed(22, 380, 28));
  const [carbSeries, setCarbSeries] = useState(() => seed(22, 0.65, 0.1));

  useEffect(() => {
    const id = window.setInterval(() => {
      setLatency((l) => Math.round(Math.max(290, Math.min(480, l + (Math.random() - 0.5) * 38))));
      setCarbon((c) => Math.max(0.38, Math.min(0.88, +(c + (Math.random() - 0.5) * 0.05).toFixed(2))));
      setInferences((n) => n + Math.floor(Math.random() * 8 + 3));
      setLatSeries((s) => [...s.slice(1), 350 + Math.random() * 60]);
      setCarbSeries((s) => [...s.slice(1), 0.5 + Math.random() * 0.25]);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="glass w-full max-w-[390px] p-6 shadow-glass-glow motion-safe:animate-float">
      <div className="flex items-center justify-between border-b border-hairline pb-3.5">
        <div className="flex items-center gap-2.5">
          <BotifyXLogo variant="icon" height={20} alt="BotifyX Icon" />
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
              TELEMETRY HUD
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-ink-faint">
              NODE CLUSTER · AP-SOUTH-1
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-mint" />
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-mint-ink">
            OPERATIONAL
          </span>
        </div>
      </div>

      <dl className="mt-4 space-y-4">
        <div>
          <div className="flex items-baseline justify-between">
            <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <Activity className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" /> Cluster SLA · 90d
            </dt>
            <dd className="font-mono text-[15px] font-bold text-ink tabular">99.994%</dd>
          </div>
          <Sparkline points={seed(24, 99.98, 0.02)} height={24} />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <Cpu className="h-3.5 w-3.5 text-cyan" aria-hidden="true" /> Latency p95 (vLLM)
            </dt>
            <dd className="font-mono text-[15px] font-bold text-cyan tabular">{latency}ms</dd>
          </div>
          <Sparkline points={latSeries} color="#00e5ff" height={24} />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <Leaf className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" /> Carbon Intensity
            </dt>
            <dd className="font-mono text-[15px] font-bold text-mint-ink tabular">
              {carbon.toFixed(2)} gCO₂e/req
            </dd>
          </div>
          <Sparkline points={carbSeries} height={24} />
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
        <span className="flex items-center gap-1.5 text-ink">
          <Terminal className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
          <span className="tabular">{inferences.toLocaleString()}</span> reqs routed
        </span>
        <span className="text-mint-ink font-semibold">Zero-Trust Verified</span>
      </div>
    </div>
  );
};

const Hero: React.FC = () => (
  <section className="relative min-h-[92vh] overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-40">
    <NeuralMesh className="absolute inset-0 -z-10 opacity-90" />
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{
        background:
          'radial-gradient(75% 55% at 50% 0%, rgba(0,255,157,0.12), transparent 70%), radial-gradient(60% 50% at 85% 30%, rgba(0,229,255,0.10), transparent 70%), radial-gradient(40% 40% at 15% 40%, rgba(99,102,241,0.08), transparent 60%)',
      }}
    />
    <div className="grid-lines absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

    <div className="container-x">
      <div className="grid items-center gap-14 lg:grid-cols-[1.18fr_0.82fr]">
        <div>
          <Reveal>
            <Eyebrow>// AI-native frontier digital engineering</Eyebrow>
          </Reveal>

          <h1 className="mt-6 font-heading text-[38px] font-extrabold leading-[1.03] tracking-tight text-ink sm:text-[56px] lg:text-[68px]">
            <MaskWords text="We engineer platforms" />
            <br className="hidden sm:block" />
            <MaskWords text="that are born" delay={240} />
            <span className="mt-1.5 block sm:mt-2">
              <TypedRotator
                words={['intelligent.', 'secure.', 'sustainable.', 'measurable.']}
                className="text-[34px] sm:text-[50px] lg:text-[62px]"
              />
            </span>
          </h1>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted sm:text-[18px]">
              BotifyX designs, builds, and scales AI-native digital platforms — embedding
              intelligence at the core of your business for secure hyper-growth and an
              industry-leading low-carbon footprint.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-6 flex flex-wrap gap-2">
              {CAPABILITIES.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-ink-muted transition-colors hover:border-mint/40 hover:text-ink"
                >
                  <Icon className="h-3 w-3 text-mint-ink" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <MagneticButton
                to="/contact"
                ariaLabel="Start a project with BotifyX"
                onClick={() => window.supercool?.track('cta_click', { location: 'hero', label: 'start_a_project' })}
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton
                to="/work"
                variant="ghost"
                ariaLabel="See BotifyX case studies"
                onClick={() => window.supercool?.track('cta_click', { location: 'hero', label: 'see_our_work' })}
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                Explore Our Work
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <ul className="mt-10 grid gap-x-6 gap-y-3 border-t border-hairline pt-6 sm:grid-cols-2">
              {TRUST_MICRO.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint shadow-[0_0_8px_#00ff9d]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160} className="flex justify-center lg:justify-end">
          <StatusWidget />
        </Reveal>
      </div>
    </div>
  </section>
);

export default Hero;
