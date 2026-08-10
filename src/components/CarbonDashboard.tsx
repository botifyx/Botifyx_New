import React from 'react';
import { Activity, Globe, Zap } from 'lucide-react';
import { useInView, Counter } from '@/components/ui-kit';
import { cn } from '@/lib/utils';

const BARS = [
  { label: 'Typical stack', value: 100, tone: 'rgba(148,163,184,0.5)', mono: '2.41 gCO₂e/req' },
  { label: 'Right-sized model', value: 64, tone: 'linear-gradient(90deg,#6366f1,#00e5ff)', mono: '1.54 gCO₂e/req' },
  { label: '+ batching & cache', value: 41, tone: 'linear-gradient(90deg,#00e5ff,#00ff9d)', mono: '0.99 gCO₂e/req' },
  { label: 'BotifyX stack', value: 28, tone: 'linear-gradient(90deg,#00ff9d,#00e5ff)', mono: '0.67 gCO₂e/req' },
];

const REGIONS = [
  { name: 'ap-south-1', x: 68, y: 56, intensity: 'clean', delay: '0s' },
  { name: 'eu-north-1', x: 50, y: 26, intensity: 'cleanest', delay: '0.6s' },
  { name: 'us-west-2', x: 16, y: 38, intensity: 'clean', delay: '1.2s' },
  { name: 'sa-east-1', x: 31, y: 72, intensity: 'mixed', delay: '1.8s' },
  { name: 'ap-northeast-1', x: 82, y: 40, intensity: 'mixed', delay: '2.4s' },
];

const Gauge: React.FC<{ value: number; size?: number }> = ({ value, size = 148 }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="cd-gauge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00ff9d" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(148,163,184,0.18)"
          strokeWidth="9"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#cd-gauge)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={inView ? c * (1 - value / 100) : c}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[26px] font-bold text-ink">
          <Counter value={value} suffix="%" />
        </span>
        <span className="mono-label mt-0.5 text-[9.5px]">efficiency</span>
      </div>
    </div>
  );
};

const CarbonDashboard: React.FC<{ variant?: 'compact' | 'full'; className?: string }> = ({
  variant = 'compact',
  className,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className={cn('space-y-4', className)}>
      <div className="glass p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-mint-ink" aria-hidden="true" />
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
              gCO₂e per request
            </h3>
          </div>
          <span className="chip">live model</span>
        </div>
        <ul className="space-y-4">
          {BARS.map((bar, i) => (
            <li key={bar.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-[13px] font-medium text-ink">{bar.label}</span>
                <span className="font-mono text-[11px] text-ink-faint tabular">{bar.mono}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/20 dark:bg-white/[0.06]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: inView ? `${bar.value}%` : '2%',
                    background: bar.tone,
                    transition: `width 1.3s cubic-bezier(.2,.7,.2,1) ${i * 130}ms`,
                    boxShadow: i === BARS.length - 1 ? '0 0 16px rgba(0,255,157,0.5)' : 'none',
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-hairline pt-4 font-mono text-[11px] leading-relaxed text-ink-faint">
          Measured across 4 production workloads · GPU-seconds × instance draw × regional grid
          intensity + amortised embodied hardware.
        </p>
      </div>

      <div className={cn('grid gap-4', variant === 'full' ? 'sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2')}>
        <div className="glass flex items-center gap-4 p-5">
          <Gauge value={72} size={variant === 'full' ? 160 : 132} />
          <div>
            <p className="mono-label">vs. baseline</p>
            <p className="mt-1 text-[15px] font-semibold leading-snug text-ink">
              72% lower compute carbon
            </p>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-faint">
              Weighted average across live BotifyX workloads, rolling 90 days.
            </p>
          </div>
        </div>

        <div className="glass p-5">
          <div className="mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-mint-ink" aria-hidden="true" />
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
              carbon-aware region routing
            </h3>
          </div>
          <div
            className="relative h-[132px] w-full overflow-hidden rounded-2xl border border-hairline"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 40%, rgba(0,255,157,0.08), transparent 70%)',
            }}
          >
            <svg
              viewBox="0 0 100 60"
              className="absolute inset-0 h-full w-full opacity-30"
              aria-hidden="true"
            >
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  x2="100"
                  y1={i * 10}
                  y2={i * 10}
                  stroke="rgba(0,255,157,0.35)"
                  strokeWidth="0.2"
                />
              ))}
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  y1="0"
                  y2="60"
                  x1={i * 10}
                  x2={i * 10}
                  stroke="rgba(0,229,255,0.28)"
                  strokeWidth="0.2"
                />
              ))}
            </svg>
            {REGIONS.map((rg) => (
              <span
                key={rg.name}
                className="absolute"
                style={{ left: `${rg.x}%`, top: `${rg.y}%` }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inset-0 animate-pulse-dot rounded-full motion-reduce:animate-none"
                    style={{
                      background: rg.intensity === 'mixed' ? '#6366f1' : '#00ff9d',
                      animationDelay: rg.delay,
                    }}
                  />
                  <span
                    className="relative h-2 w-2 rounded-full"
                    style={{
                      background: rg.intensity === 'cleanest' ? '#00ff9d' : rg.intensity === 'clean' ? '#00e5ff' : '#6366f1',
                      boxShadow: '0 0 8px currentColor',
                    }}
                  />
                </span>
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-1.5">
            {REGIONS.slice(0, 3).map((rg) => (
              <li
                key={rg.name}
                className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint"
              >
                <span className="flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-mint-ink" aria-hidden="true" />
                  {rg.name}
                </span>
                <span className={rg.intensity === 'mixed' ? '' : 'text-mint-ink'}>{rg.intensity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarbonDashboard;
