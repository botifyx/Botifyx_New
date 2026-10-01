import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import { LOCATIONS, type OfficeLocation } from '@/lib/site';

/* ── helpers ──────────────────────────────────────────────── */

/** Mercator-ish projection: map lat/lng → percentage coords on a 2D plane */
const project = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 100,
  y: ((90 - lat) / 180) * 100,
});

/** Generate deterministic "connection lines" between locations */
const connectionPairs: [number, number][] = [];
for (let i = 0; i < LOCATIONS.length; i++) {
  for (let j = i + 1; j < LOCATIONS.length; j++) {
    connectionPairs.push([i, j]);
  }
}

/* ── sub-components ───────────────────────────────────────── */

/** Pulsating dot on the map */
const MapDot: React.FC<{
  loc: OfficeLocation;
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
  onClick: (i: number) => void;
}> = ({ loc, index, isActive, onHover, onClick }) => {
  const pos = project(loc.lat, loc.lng);
  return (
    <button
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(index)}
      aria-label={`${loc.city}, ${loc.region}`}
    >
      {/* outer pulse ring */}
      <span
        className="absolute inset-0 rounded-full transition-all duration-700"
        style={{
          width: isActive ? 40 : 24,
          height: isActive ? 40 : 24,
          margin: 'auto',
          inset: 0,
          position: 'absolute',
          background: isActive
            ? 'radial-gradient(circle, rgba(0,255,157,0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,255,157,0.15) 0%, transparent 70%)',
          animation: 'pulse-ring 2.5s ease-in-out infinite',
          animationDelay: `${index * 0.6}s`,
        }}
      />
      {/* core dot */}
      <span
        className="relative block rounded-full transition-all duration-300"
        style={{
          width: isActive ? 14 : 8,
          height: isActive ? 14 : 8,
          background: isActive
            ? 'linear-gradient(135deg, #00ff9d, #00e5ff)'
            : '#00ff9d',
          boxShadow: isActive
            ? '0 0 20px rgba(0,255,157,0.6), 0 0 40px rgba(0,255,157,0.3)'
            : '0 0 8px rgba(0,255,157,0.4)',
        }}
      />
      {/* floating city label */}
      <span
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
        style={{
          bottom: isActive ? 24 : 18,
          opacity: isActive ? 1 : 0.6,
          color: isActive ? '#00ff9d' : 'var(--ink-muted)',
          textShadow: isActive ? '0 0 12px rgba(0,255,157,0.5)' : 'none',
        }}
      >
        {loc.city}
      </span>
    </button>
  );
};

/** Connection arc between two dots (SVG) */
const ConnectionLine: React.FC<{
  from: OfficeLocation;
  to: OfficeLocation;
  isHighlighted: boolean;
  index: number;
}> = ({ from, to, isHighlighted, index }) => {
  const p1 = project(from.lat, from.lng);
  const p2 = project(to.lat, to.lng);
  const midX = (p1.x + p2.x) / 2;
  const midY = Math.min(p1.y, p2.y) - 6 - Math.abs(p1.x - p2.x) * 0.08;
  return (
    <path
      d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
      fill="none"
      stroke={isHighlighted ? 'rgba(0,255,157,0.5)' : 'rgba(0,255,157,0.08)'}
      strokeWidth={isHighlighted ? 1.2 : 0.6}
      strokeDasharray={isHighlighted ? '6 4' : '3 6'}
      className="transition-all duration-500"
      style={{
        filter: isHighlighted ? 'drop-shadow(0 0 4px rgba(0,255,157,0.4))' : 'none',
        animation: isHighlighted ? `dash-flow 2s linear infinite` : 'none',
        animationDelay: `${index * 0.3}s`,
      }}
    />
  );
};

/** Detail card for a single location */
const LocationCard: React.FC<{
  loc: OfficeLocation;
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ loc, index, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="group relative w-full text-left transition-all duration-500"
    style={{
      animationDelay: `${index * 100}ms`,
    }}
  >
    <div
      className="relative overflow-hidden rounded-2xl border p-4 transition-all duration-500"
      style={{
        borderColor: isActive ? 'rgba(0,255,157,0.4)' : 'var(--hairline)',
        background: isActive
          ? 'linear-gradient(135deg, rgba(0,255,157,0.06) 0%, rgba(0,229,255,0.03) 100%)'
          : 'rgb(var(--surface) / 0.3)',
        boxShadow: isActive
          ? '0 8px 32px -8px rgba(0,255,157,0.2), inset 0 1px 0 rgba(0,255,157,0.1)'
          : 'none',
        transform: isActive ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* top accent bar */}
      <div
        className="absolute left-0 top-0 h-[2px] transition-all duration-500"
        style={{
          width: isActive ? '100%' : '0%',
          background: 'linear-gradient(90deg, #00ff9d, #00e5ff, transparent)',
        }}
      />

      <div className="flex items-start gap-3">
        {/* flag + status dot */}
        <div className="relative flex-shrink-0">
          <span className="text-2xl leading-none" role="img" aria-label={loc.region}>
            {loc.countryFlag}
          </span>
          <span
            className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full border-2"
            style={{
              borderColor: 'var(--bg)',
              background: '#00ff9d',
              boxShadow: '0 0 6px rgba(0,255,157,0.5)',
              animation: 'pulse-ring 3s ease-in-out infinite',
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          {/* region + city */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-mint-ink">
              {loc.region}
            </span>
            <span className="font-mono text-[10px] tracking-wider text-ink-faint">
              / {loc.city}
            </span>
          </div>

          {/* address */}
          <div className="mt-1.5 flex items-start gap-1.5">
            <MapPin
              className="mt-0.5 h-3 w-3 flex-shrink-0 text-mint-ink/60"
              aria-hidden="true"
            />
            <span className="text-[12.5px] leading-snug text-ink-muted">{loc.address}</span>
          </div>

          {/* phone */}
          <a
            href={loc.phoneHref}
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-mono text-[11px] text-ink transition-all duration-300 hover:text-mint-ink"
            style={{
              background: isActive ? 'rgba(0,255,157,0.08)' : 'rgba(var(--surface) / 0.5)',
              border: '1px solid',
              borderColor: isActive ? 'rgba(0,255,157,0.2)' : 'var(--hairline)',
            }}
          >
            <Phone className="h-3 w-3 text-mint-ink" aria-hidden="true" />
            <span className="text-ink-muted">Mobile:</span>
            <span>{loc.phone}</span>
            <ExternalLink className="h-2.5 w-2.5 text-ink-faint" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* subtle shimmer overlay on active */}
      {isActive && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(0,255,157,0.04) 50%, transparent 60%)',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />
      )}
    </div>
  </button>
);

/* ── main component ───────────────────────────────────────── */

const LocationsGlobe: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-cycle through locations when not hovered
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => ((prev ?? -1) + 1) % LOCATIONS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const handleHover = useCallback((i: number | null) => {
    setAutoRotate(i === null);
    setActiveIndex(i);
  }, []);

  const handleClick = useCallback((i: number) => {
    setAutoRotate(false);
    setActiveIndex(i);
  }, []);

  return (
    <div className="mt-6 border-t border-hairline pt-5">
      {/* section label */}
      <div className="mb-4 flex items-center justify-between">
        <p className="mono-label text-[11px] text-ink-muted">// locations &amp; direct lines</p>
        <div className="flex items-center gap-1.5">
          <span
            className="block h-1.5 w-1.5 rounded-full"
            style={{
              background: '#00ff9d',
              boxShadow: '0 0 6px rgba(0,255,157,0.5)',
              animation: 'pulse-ring 2s ease-in-out infinite',
            }}
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
            {LOCATIONS.length} offices worldwide
          </span>
        </div>
      </div>

      {/* interactive map */}
      <div
        className="relative mb-4 overflow-hidden rounded-2xl border border-hairline/60"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(0,255,157,0.03) 0%, transparent 60%), rgb(var(--surface) / 0.3)',
          aspectRatio: '2.2 / 1',
        }}
      >
        {/* faint grid overlay */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="loc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loc-grid)" />
        </svg>

        {/* equator line */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: '50%',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(0,255,157,0.1) 20%, rgba(0,255,157,0.1) 80%, transparent)',
          }}
        />

        {/* connection arcs */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {connectionPairs.map(([i, j], idx) => (
            <ConnectionLine
              key={`${i}-${j}`}
              from={LOCATIONS[i]}
              to={LOCATIONS[j]}
              isHighlighted={activeIndex === i || activeIndex === j}
              index={idx}
            />
          ))}
        </svg>

        {/* location dots */}
        {LOCATIONS.map((loc, i) => (
          <MapDot
            key={`${loc.city}-${i}`}
            loc={loc}
            index={i}
            isActive={activeIndex === i}
            onHover={handleHover}
            onClick={handleClick}
          />
        ))}

        {/* corner coordinates display */}
        <div className="absolute bottom-2 left-3 font-mono text-[9px] tracking-wider text-ink-faint/50">
          {activeIndex !== null
            ? `${LOCATIONS[activeIndex].lat.toFixed(2)}°${LOCATIONS[activeIndex].lat >= 0 ? 'N' : 'S'}, ${Math.abs(LOCATIONS[activeIndex].lng).toFixed(2)}°${LOCATIONS[activeIndex].lng >= 0 ? 'E' : 'W'}`
            : 'GLOBAL PRESENCE'}
        </div>
        <div className="absolute bottom-2 right-3 font-mono text-[9px] tracking-wider text-ink-faint/50">
          {activeIndex !== null ? LOCATIONS[activeIndex].city.toUpperCase() : ''}
        </div>
      </div>

      {/* location cards – horizontal scroll on mobile, grid on larger */}
      <div className="grid gap-2 sm:grid-cols-2">
        {LOCATIONS.map((loc, i) => (
          <LocationCard
            key={`${loc.city}-${i}`}
            loc={loc}
            index={i}
            isActive={activeIndex === i}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>

      {/* keyframes injected once */}
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.3; }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LocationsGlobe;
