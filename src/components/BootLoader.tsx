import React, { useState, useEffect, useCallback } from 'react';

/* ─── seven disciplines ──────────────────────────────────── */
const DISCIPLINES = [
  { label: 'Generative AI & LLMs',            icon: '🧠' },
  { label: 'Enterprise RAG & Copilots',       icon: '🗄️' },
  { label: 'AI Agents & Automation',           icon: '⚡' },
  { label: 'Full-Stack Web Platforms',         icon: '🌐' },
  { label: 'Mobile App Development',           icon: '📱' },
  { label: 'Cloud Infrastructure & Security',  icon: '🛡️' },
  { label: 'AI Websites & Digital Experiences', icon: '✨' },
];

/* ─── component ──────────────────────────────────────────── */
const BootLoader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete' | 'exit'>('loading');

  // Simulated progress bar
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 3200; // total loader time in ms

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease-out curve for organic feel
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(eased * 100);

      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase('complete');
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Cycle through disciplines
  useEffect(() => {
    if (phase === 'exit') return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DISCIPLINES.length);
    }, 420);
    return () => clearInterval(interval);
  }, [phase]);

  // Exit sequence
  useEffect(() => {
    if (phase === 'complete') {
      const timer = setTimeout(() => setPhase('exit'), 400);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleTransitionEnd = useCallback(() => {
    if (phase === 'exit') {
      // Remove the static HTML loader if still present
      const staticLoader = document.getElementById('static-boot-loader');
      if (staticLoader) staticLoader.remove();
      onFinish();
    }
  }, [phase, onFinish]);

  return (
    <div
      className="boot-loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#030708',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Radial ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,255,157,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Orbiting ring */}
      <div
        style={{
          position: 'relative',
          width: 160,
          height: 160,
          marginBottom: 48,
        }}
      >
        {/* Orbital track */}
        <svg
          viewBox="0 0 160 160"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            animation: 'boot-spin 8s linear infinite',
          }}
        >
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(0,255,157,0.08)"
            strokeWidth="1"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="url(#boot-grad)"
            strokeWidth="2"
            strokeDasharray="110 330"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,157,0.5))' }}
          />
          <defs>
            <linearGradient id="boot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ff9d" />
              <stop offset="50%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#7a6bff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Seven discipline dots around the ring */}
        {DISCIPLINES.map((_, i) => {
          const angle = (i / DISCIPLINES.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 80 + 70 * Math.cos(rad);
          const y = 80 + 70 * Math.sin(rad);
          const isActive = i === activeIndex;
          const isPast = progress >= ((i + 1) / DISCIPLINES.length) * 100;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: isActive ? 12 : 6,
                height: isActive ? 12 : 6,
                borderRadius: '50%',
                background: isPast
                  ? isActive
                    ? '#00ff9d'
                    : 'rgba(0,255,157,0.6)'
                  : 'rgba(255,255,255,0.12)',
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: isActive
                  ? '0 0 16px rgba(0,255,157,0.6), 0 0 32px rgba(0,255,157,0.3)'
                  : 'none',
              }}
            />
          );
        })}

        {/* Center logo text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #00ff9d 0%, #00e5ff 55%, #7a6bff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(0,255,157,0.3))',
            }}
          >
            BotifyX
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8.5,
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              color: 'rgba(160,179,185,0.6)',
              marginTop: 4,
            }}
          >
            AI-Native Engineering
          </span>
        </div>
      </div>

      {/* Active discipline label */}
      <div
        style={{
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 32,
        }}
      >
        <span style={{ fontSize: 18 }}>{DISCIPLINES[activeIndex].icon}</span>
        <span
          key={activeIndex}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase' as const,
            color: '#00ff9d',
            animation: 'boot-fadeUp 0.4s ease-out',
            textShadow: '0 0 16px rgba(0,255,157,0.4)',
          }}
        >
          {DISCIPLINES[activeIndex].label}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 240,
          maxWidth: '60vw',
          height: 3,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            borderRadius: 4,
            background: 'linear-gradient(90deg, #00ff9d, #00e5ff)',
            boxShadow: '0 0 12px rgba(0,255,157,0.5)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Percentage readout */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.18em',
          color: 'rgba(160,179,185,0.4)',
          marginTop: 12,
        }}
      >
        {phase === 'complete' || phase === 'exit'
          ? 'SYSTEMS ONLINE'
          : `INITIALISING ${Math.round(progress)}%`}
      </span>

      {/* Discipline dots row */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 20,
        }}
      >
        {DISCIPLINES.map((d, i) => {
          const isPast = progress >= ((i + 1) / DISCIPLINES.length) * 100;
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              title={d.label}
              style={{
                width: isActive ? 20 : 8,
                height: 4,
                borderRadius: 4,
                background: isPast
                  ? isActive
                    ? '#00ff9d'
                    : 'rgba(0,255,157,0.35)'
                  : 'rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 0 8px rgba(0,255,157,0.5)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes boot-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes boot-fadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BootLoader;
