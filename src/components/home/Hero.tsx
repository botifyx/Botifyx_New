import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import NeuralMesh from '@/components/NeuralMesh';
import {
  MagneticButton,
  MaskWords,
  TypedRotator,
  Reveal,
  Eyebrow,
} from '@/components/ui-kit';
import { SERVICES, TRUST_MICRO } from '@/lib/site';

/* ─── service constellation (right side) ─────────────────── */

const ORBIT_RADIUS = 130;
const CENTER = 160;
const SVG_SIZE = 320;

/** Animated constellation showing 7 service disciplines orbiting a central hub */
const ServiceConstellation: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const autoRef = useRef(true);

  // Auto-cycle
  useEffect(() => {
    const id = setInterval(() => {
      if (autoRef.current) {
        setActiveIdx((p) => (p + 1) % SERVICES.length);
      }
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const handleHover = useCallback((i: number | null) => {
    autoRef.current = i === null;
    setHoveredIdx(i);
    if (i !== null) setActiveIdx(i);
  }, []);

  const effectiveIdx = hoveredIdx ?? activeIdx;

  return (
    <div className="relative flex flex-col items-center">
      {/* SVG constellation */}
      <div className="relative" style={{ width: SVG_SIZE, height: SVG_SIZE }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className="h-full w-full"
          style={{ filter: 'drop-shadow(0 0 40px rgba(0,255,157,0.08))' }}
        >
          {/* Orbit ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT_RADIUS}
            fill="none"
            stroke="rgba(0,255,157,0.06)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />

          {/* Connection lines from active node to center */}
          {SERVICES.map((_, i) => {
            const angle = (i / SERVICES.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = CENTER + ORBIT_RADIUS * Math.cos(rad);
            const y = CENTER + ORBIT_RADIUS * Math.sin(rad);
            const isActive = i === effectiveIdx;
            return (
              <line
                key={`line-${i}`}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke={isActive ? 'rgba(0,255,157,0.3)' : 'rgba(0,255,157,0.04)'}
                strokeWidth={isActive ? 1.5 : 0.5}
                strokeDasharray={isActive ? 'none' : '2 6'}
                className="transition-all duration-700"
              />
            );
          })}

          {/* Arc between adjacent active nodes */}
          {SERVICES.map((_, i) => {
            const next = (i + 1) % SERVICES.length;
            const isConnected = i === effectiveIdx || next === effectiveIdx;
            if (!isConnected) return null;
            const a1 = (i / SERVICES.length) * 360 - 90;
            const a2 = (next / SERVICES.length) * 360 - 90;
            const r1 = (a1 * Math.PI) / 180;
            const r2 = (a2 * Math.PI) / 180;
            const x1 = CENTER + ORBIT_RADIUS * Math.cos(r1);
            const y1 = CENTER + ORBIT_RADIUS * Math.sin(r1);
            const x2 = CENTER + ORBIT_RADIUS * Math.cos(r2);
            const y2 = CENTER + ORBIT_RADIUS * Math.sin(r2);
            return (
              <line
                key={`arc-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(0,229,255,0.2)"
                strokeWidth="1"
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        {/* Center hub */}
        <div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
          style={{ width: 96, height: 96 }}
        >
          {/* Pulsing rings */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,157,0.1) 0%, transparent 70%)',
              animation: 'hero-pulse 3s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full border border-mint-ink/20"
            style={{
              inset: -8,
              animation: 'hero-pulse 3s ease-in-out infinite 0.5s',
            }}
          />
          {/* Inner content */}
          <div
            className="relative flex flex-col items-center justify-center rounded-full border border-hairline"
            style={{
              width: 80,
              height: 80,
              background: 'rgb(var(--surface) / 0.8)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 30px rgba(0,255,157,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
              BOTIFYX
            </span>
            <span
              className="mt-0.5 text-[20px] font-bold"
              style={{
                background: 'linear-gradient(135deg, #00ff9d, #00e5ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              7
            </span>
            <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-ink-faint">
              DISCIPLINES
            </span>
          </div>
        </div>

        {/* Service nodes */}
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          const angle = (i / SERVICES.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = CENTER + ORBIT_RADIUS * Math.cos(rad);
          const y = CENTER + ORBIT_RADIUS * Math.sin(rad);
          const isActive = i === effectiveIdx;

          return (
            <button
              key={service.slug}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y, zIndex: isActive ? 10 : 1 }}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleHover(null)}
              onClick={() => {
                autoRef.current = false;
                setActiveIdx(i);
              }}
              aria-label={service.short}
            >
              {/* Glow ring */}
              <div
                className="absolute rounded-full transition-all duration-500"
                style={{
                  inset: isActive ? -6 : -2,
                  background: isActive
                    ? 'radial-gradient(circle, rgba(0,255,157,0.2) 0%, transparent 70%)'
                    : 'transparent',
                }}
              />
              {/* Node */}
              <div
                className="relative flex items-center justify-center rounded-full border transition-all duration-500"
                style={{
                  width: isActive ? 44 : 32,
                  height: isActive ? 44 : 32,
                  borderColor: isActive ? 'rgba(0,255,157,0.5)' : 'var(--hairline)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(0,255,157,0.15), rgba(0,229,255,0.08))'
                    : 'rgb(var(--surface) / 0.6)',
                  boxShadow: isActive
                    ? '0 0 24px rgba(0,255,157,0.3), inset 0 1px 0 rgba(0,255,157,0.15)'
                    : 'none',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Icon
                  className="transition-all duration-300"
                  style={{
                    width: isActive ? 18 : 14,
                    height: isActive ? 18 : 14,
                    color: isActive ? '#00ff9d' : 'var(--ink-muted)',
                    filter: isActive ? 'drop-shadow(0 0 6px rgba(0,255,157,0.5))' : 'none',
                  }}
                />
              </div>
              {/* Label */}
              <span
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] transition-all duration-300"
                style={{
                  top: isActive ? 52 : 38,
                  opacity: isActive ? 1 : 0,
                  color: '#00ff9d',
                  textShadow: '0 0 8px rgba(0,255,157,0.4)',
                }}
              >
                {service.short.length > 20 ? service.short.split(' ').slice(0, 3).join(' ') : service.short}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active service detail card */}
      <div
        className="mt-4 w-full max-w-[340px] overflow-hidden rounded-2xl border border-hairline/60 transition-all duration-500"
        style={{
          background: 'rgb(var(--surface) / 0.5)',
          backdropFilter: 'blur(16px)',
          borderColor:
            effectiveIdx >= 0 ? 'rgba(0,255,157,0.15)' : 'var(--hairline)',
        }}
      >
        {/* Top accent */}
        <div
          className="h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #00ff9d 30%, #00e5ff 70%, transparent)',
          }}
        />
        <div className="p-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-mint-ink">
              0{effectiveIdx + 1}
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
              {SERVICES[effectiveIdx].short}
            </span>
          </div>
          <p
            key={effectiveIdx}
            className="mt-2 text-[12.5px] leading-relaxed text-ink-muted"
            style={{ animation: 'hero-fadeIn 0.4s ease-out' }}
          >
            {SERVICES[effectiveIdx].description.length > 140
              ? SERVICES[effectiveIdx].description.slice(0, 140) + '…'
              : SERVICES[effectiveIdx].description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SERVICES[effectiveIdx].chips.slice(0, 3).map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-hairline/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-faint"
                style={{ background: 'rgba(0,255,157,0.04)' }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes hero-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.5; }
        }
        @keyframes hero-fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* ─── main hero ──────────────────────────────────────────── */

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
          <ServiceConstellation />
        </Reveal>
      </div>
    </div>
  </section>
);

export default Hero;
