import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MapPin,
  Phone,
  PhoneCall,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Radio,
  Clock,
  Compass,
  Signal,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { LOCATIONS, type OfficeLocation } from '@/lib/site';

/* ─── extended location metadata ─────────────────────────── */

interface LocationMeta {
  role: string;
  badge: string;
  timezone: string;
  tzAbbr: string;
  pingMs: number;
  whatsapp: string;
  mapsUrl: string;
}

const LOCATION_META: Record<string, LocationMeta> = {
  Chennai: {
    role: 'Global Headquarters & Core Engineering Lab',
    badge: 'HQ / SYSTEMS LAB',
    timezone: 'Asia/Kolkata',
    tzAbbr: 'IST · UTC+5:30',
    pingMs: 24,
    whatsapp:
      'https://wa.me/919566443876?text=Hello%20BotifyX%20Chennai%20team%2C%20I%20would%20like%20to%20discuss%20a%20project',
    mapsUrl: 'https://maps.google.com/?q=Radiance+Jade+Garden,+Padappai,+Tamil+Nadu',
  },
  Bangalore: {
    role: 'Applied AI, RAG & Cloud Infrastructure Lab',
    badge: 'R&D / INNOVATION',
    timezone: 'Asia/Kolkata',
    tzAbbr: 'IST · UTC+5:30',
    pingMs: 29,
    whatsapp:
      'https://wa.me/917305018448?text=Hello%20BotifyX%20Bangalore%20team%2C%20I%20would%20like%20to%20discuss%20a%20project',
    mapsUrl: 'https://maps.google.com/?q=KHB+Colony,+Surya+Nagar,+Anekal,+Bangalore',
  },
  Phoenix: {
    role: 'Americas Client Operations & Enterprise Relations',
    badge: 'AMERICAS DESK',
    timezone: 'America/Phoenix',
    tzAbbr: 'MST · UTC-7:00',
    pingMs: 114,
    whatsapp:
      'https://wa.me/13107744375?text=Hello%20BotifyX%20US%20team%2C%20I%20would%20like%20to%20discuss%20a%20project',
    mapsUrl: 'https://maps.google.com/?q=Phoenix,+Arizona',
  },
  Nairobi: {
    role: 'East Africa & EMEA Market Operations Desk',
    badge: 'EMEA / AFRICA',
    timezone: 'Africa/Nairobi',
    tzAbbr: 'EAT · UTC+3:00',
    pingMs: 82,
    whatsapp:
      'https://wa.me/254114753800?text=Hello%20BotifyX%20Nairobi%20team%2C%20I%20would%20like%20to%20discuss%20a%20project',
    mapsUrl: 'https://maps.google.com/?q=Valley+View+Office+Park,+Parklands,+Nairobi',
  },
};

/* ─── coordinate projection (Mercator-ish equirectangular) ── */

const projectCoord = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 100,
  y: ((90 - lat) / 180) * 100,
});

/* ─── time & business hours helper ────────────────────────── */

interface LocalTimeInfo {
  formattedTime: string;
  isBusinessHours: boolean;
  isDaytime: boolean;
  statusLabel: string;
}

const getLocalTimeInfo = (timeZone: string, date: Date): LocalTimeInfo => {
  try {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    const hourFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      hour12: false,
    });
    const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
    });

    const formattedTime = timeFormatter.format(date);
    const hour = parseInt(hourFormatter.format(date), 10);
    const weekday = weekdayFormatter.format(date);
    const isWeekend = weekday === 'Sat' || weekday === 'Sun';

    const isDaytime = hour >= 6 && hour < 19;
    const isBusinessHours = !isWeekend && hour >= 9 && hour < 19;

    let statusLabel = 'ACTIVE · BUSINESS HOURS';
    if (isWeekend) {
      statusLabel = 'WEEKEND · MONITORED DISPATCH';
    } else if (isBusinessHours) {
      statusLabel = 'OPEN · DIRECT LINE ACTIVE';
    } else {
      statusLabel = 'AFTER HOURS · 24/7 PRIORITY';
    }

    return { formattedTime, isBusinessHours, isDaytime, statusLabel };
  } catch {
    return {
      formattedTime: '--:--:--',
      isBusinessHours: true,
      isDaytime: true,
      statusLabel: 'DIRECT LINE ONLINE',
    };
  }
};

/* ─── main component ───────────────────────────────────────── */

export const LocationsGlobe: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [now, setNow] = useState<Date>(new Date());

  // Real-time ticking clock
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Optional auto-cycle when user leaves idle
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % LOCATIONS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const activeLoc = LOCATIONS[activeIdx] || LOCATIONS[0];
  const activeMeta = LOCATION_META[activeLoc.city] || LOCATION_META.Chennai;
  const activeTime = useMemo(
    () => getLocalTimeInfo(activeMeta.timezone, now),
    [activeMeta.timezone, now]
  );

  const handleCopy = useCallback((phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2500);
  }, []);

  const activePos = projectCoord(activeLoc.lat, activeLoc.lng);

  return (
    <div className="relative w-full">
      {/* ─── section header ───────────────────────────────── */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="mono-label text-[11px] text-mint-ink">
              // locations &amp; direct lines
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-ink/20 bg-mint-ink/10 px-2.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-mint-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#00ff9d] animate-pulse" />
              Global Telephony Mesh
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Four Global Hubs.{' '}
            <span className="grad-text">Direct Engineering Lines.</span>
          </h2>
          <p className="mt-2.5 max-w-2xl text-[14.5px] leading-relaxed text-ink-muted">
            Connect immediately with technical directors, solution architects, and engineering
            leads across India, North America, and East Africa without call centers or waiting queues.
          </p>
        </div>

        {/* Global telemetry status pill */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
          <div className="flex items-center gap-2 rounded-xl border border-hairline bg-surface/70 px-3.5 py-2 backdrop-blur-md">
            <Radio className="h-3.5 w-3.5 text-mint-ink animate-pulse" />
            <span className="text-ink-muted">Network Status:</span>
            <span className="font-semibold text-mint-ink">4/4 Nodes Synced</span>
          </div>
          <button
            onClick={() => setAutoRotate((v) => !v)}
            className={`rounded-xl border px-3 py-2 transition-all ${
              autoRotate
                ? 'border-mint-ink/40 bg-mint-ink/10 text-mint-ink shadow-[0_0_15px_rgba(0,255,157,0.15)]'
                : 'border-hairline bg-surface/40 text-ink-faint hover:text-ink'
            }`}
            title="Auto-scan between global nodes"
          >
            {autoRotate ? 'Auto-Scan: ON' : 'Auto-Scan: OFF'}
          </button>
        </div>
      </div>

      {/* ─── main console: map deck + detail panel ──────────── */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* LEFT / TOP: High-Tech World Radar Deck (7 cols) */}
        <div className="relative flex flex-col overflow-hidden rounded-2xl border border-hairline/80 bg-surface/40 backdrop-blur-xl lg:col-span-7">
          {/* Top HUD bar */}
          <div className="flex items-center justify-between border-b border-hairline/60 bg-surface/60 px-4 py-2.5 font-mono text-[10.5px]">
            <div className="flex items-center gap-2 text-ink-faint">
              <Compass className="h-3.5 w-3.5 text-mint-ink" />
              <span>RADAR DECK · MERCATOR PROJECTED</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-ink-muted">
                <Signal className="h-3 w-3 text-mint-ink" />
                <span>AVG PING: {activeMeta.pingMs}ms</span>
              </span>
              <span className="text-hairline">|</span>
              <span className="text-mint-ink font-semibold">{activeMeta.badge}</span>
            </div>
          </div>

          {/* Interactive World Map SVG Viewport */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: '1.9 / 1',
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(0, 255, 157, 0.05) 0%, rgba(0, 229, 255, 0.02) 40%, rgba(3, 10, 8, 0.95) 100%)',
            }}
          >
            {/* World Coordinate Grid Lines */}
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="world-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(0, 255, 157, 0.04)"
                    strokeWidth="0.8"
                  />
                  <circle cx="0" cy="0" r="1" fill="rgba(0, 255, 157, 0.12)" />
                </pattern>
                {/* Radar sweep gradient */}
                <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 255, 157, 0.15)" />
                  <stop offset="70%" stopColor="rgba(0, 229, 255, 0.05)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Grid pattern */}
              <rect width="100%" height="100%" fill="url(#world-grid)" />

              {/* Equator & Meridians */}
              <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="rgba(0, 255, 157, 0.12)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                stroke="rgba(0, 255, 157, 0.08)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Continent Vector Silhouettes (Equirectangular scaled) */}
              <g
                fill="rgba(0, 255, 157, 0.035)"
                stroke="rgba(0, 255, 157, 0.18)"
                strokeWidth="0.75"
                className="transition-all duration-700"
              >
                {/* North America */}
                <path d="M 100 70 Q 180 50 260 80 Q 300 130 240 180 Q 210 220 180 270 Q 150 250 120 200 Q 80 150 100 70 Z" />
                {/* South America */}
                <path d="M 230 280 Q 300 300 320 360 Q 300 440 260 470 Q 240 430 230 360 Q 210 310 230 280 Z" />
                {/* Europe */}
                <path d="M 450 90 Q 540 80 550 140 Q 510 180 460 170 Q 430 140 450 90 Z" />
                {/* Africa */}
                <path d="M 450 190 Q 560 190 580 270 Q 550 390 490 420 Q 440 340 430 260 Q 430 210 450 190 Z" />
                {/* Asia & Eurasia */}
                <path d="M 550 90 Q 720 70 850 120 Q 880 210 800 260 Q 720 260 670 200 Q 590 210 550 150 Z" />
                {/* Australia */}
                <path d="M 760 320 Q 850 320 860 380 Q 810 420 750 390 Q 740 350 760 320 Z" />
              </g>

              {/* Active Location Crosshair Reticle / Radar rings */}
              <circle
                cx={`${activePos.x}%`}
                cy={`${activePos.y}%`}
                r="36"
                fill="none"
                stroke="rgba(0, 255, 157, 0.25)"
                strokeWidth="1"
                strokeDasharray="3 3"
                className="animate-[spin_10s_linear_infinite]"
              />
              <circle
                cx={`${activePos.x}%`}
                cy={`${activePos.y}%`}
                r="18"
                fill="none"
                stroke="rgba(0, 229, 255, 0.4)"
                strokeWidth="1"
              />

              {/* Connection flight lines between active node and other 3 locations */}
              {LOCATIONS.map((otherLoc, idx) => {
                if (idx === activeIdx) return null;
                const otherPos = projectCoord(otherLoc.lat, otherLoc.lng);
                const midX = (activePos.x + otherPos.x) / 2;
                const midY =
                  Math.min(activePos.y, otherPos.y) - 6 - Math.abs(activePos.x - otherPos.x) * 0.12;

                return (
                  <g key={`arc-${activeLoc.city}-${otherLoc.city}`}>
                    <path
                      d={`M ${activePos.x} ${activePos.y} Q ${midX} ${midY} ${otherPos.x} ${otherPos.y}`}
                      fill="none"
                      stroke="rgba(0, 255, 157, 0.45)"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      style={{
                        animation: 'dash-flow 2s linear infinite',
                        filter: 'drop-shadow(0 0 6px rgba(0,255,157,0.5))',
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Sweeping Radar Scanner Line */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, rgba(0,255,157,0.18) 0deg, transparent 60deg, transparent 360deg)',
                animation: 'radar-sweep 8s linear infinite',
              }}
            />

            {/* Interactive Location Beacons */}
            {LOCATIONS.map((loc, i) => {
              const pos = projectCoord(loc.lat, loc.lng);
              const isSelected = i === activeIdx;
              const meta = LOCATION_META[loc.city];

              return (
                <button
                  key={loc.city}
                  onClick={() => {
                    setAutoRotate(false);
                    setActiveIdx(i);
                  }}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  aria-label={`Select ${loc.city}, ${loc.region}`}
                >
                  {/* Outer pulse */}
                  <span
                    className="absolute -inset-3 rounded-full transition-all duration-500"
                    style={{
                      background: isSelected
                        ? 'radial-gradient(circle, rgba(0,255,157,0.4) 0%, transparent 75%)'
                        : 'radial-gradient(circle, rgba(0,255,157,0.15) 0%, transparent 70%)',
                      animation: 'pulse-ring 2.5s ease-in-out infinite',
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />

                  {/* Node Core */}
                  <span
                    className={`relative block rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'h-4 w-4 bg-gradient-to-tr from-mint to-cyan shadow-[0_0_20px_#00ff9d,0_0_35px_#00e5ff]'
                        : 'h-2.5 w-2.5 bg-mint-ink/80 group-hover:scale-125 group-hover:bg-mint'
                    }`}
                  />

                  {/* City Label Badge */}
                  <span
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      isSelected
                        ? 'bottom-5 border border-mint-ink/40 bg-surface/95 text-mint-ink shadow-[0_0_12px_rgba(0,255,157,0.3)]'
                        : 'bottom-4 border border-hairline/40 bg-surface/75 text-ink-muted opacity-80 group-hover:opacity-100'
                    }`}
                  >
                    {loc.countryFlag} {loc.city}
                  </span>
                </button>
              );
            })}

            {/* Bottom radar status readout */}
            <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-ink-faint">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-ink animate-ping" />
                TARGET: {activeLoc.city.toUpperCase()} [{activeLoc.lat.toFixed(2)}°
                {activeLoc.lat >= 0 ? 'N' : 'S'}, {Math.abs(activeLoc.lng).toFixed(2)}°
                {activeLoc.lng >= 0 ? 'E' : 'W'}]
              </span>
              <span className="hidden sm:inline text-mint-ink font-medium">
                {activeMeta.tzAbbr}
              </span>
            </div>
          </div>

          {/* Quick Hub Selector Pills */}
          <div className="grid grid-cols-2 gap-2 border-t border-hairline/60 bg-surface/30 p-3 sm:grid-cols-4">
            {LOCATIONS.map((loc, i) => {
              const isSelected = i === activeIdx;
              const meta = LOCATION_META[loc.city];
              const time = getLocalTimeInfo(meta.timezone, now);

              return (
                <button
                  key={loc.city}
                  onClick={() => {
                    setAutoRotate(false);
                    setActiveIdx(i);
                  }}
                  className={`group relative flex flex-col items-start rounded-xl p-2.5 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border border-mint-ink/40 bg-mint-ink/10 shadow-[0_0_20px_rgba(0,255,157,0.12)]'
                      : 'border border-hairline/60 bg-surface/40 hover:border-hairline hover:bg-surface/70'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-ink">
                      <span>{loc.countryFlag}</span>
                      <span>{loc.city}</span>
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSelected ? 'bg-mint shadow-[0_0_8px_#00ff9d]' : 'bg-ink-faint/40'
                      }`}
                    />
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
                    <Clock className="h-2.5 w-2.5 text-mint-ink/70" />
                    <span>{time.formattedTime.slice(0, 5)}</span>
                    <span className="text-[9px] text-ink-faint">{time.formattedTime.slice(-2)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT / DETAIL CONSOLE: Active Node & Direct Action Hub (5 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-hairline/80 bg-surface/50 p-6 backdrop-blur-xl lg:col-span-5">
          <div>
            {/* Top header badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-mint-ink/30 bg-mint-ink/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-mint-ink">
                <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_8px_#00ff9d]" />
                {activeMeta.badge}
              </span>
              <span className="font-mono text-[11px] text-ink-faint">
                NODE 0{activeIdx + 1} / 04
              </span>
            </div>

            {/* City & Region Title */}
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {activeLoc.city}
                </h3>
                <span className="text-lg font-medium text-ink-muted">· {activeLoc.region}</span>
                <span className="text-2xl">{activeLoc.countryFlag}</span>
              </div>
              <p className="mt-1.5 text-[13.5px] font-medium text-mint-ink">
                {activeMeta.role}
              </p>
            </div>

            {/* Live Timezone & Operating Hours Card */}
            <div className="mt-5 rounded-xl border border-hairline bg-surface/60 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
                  Local Desk Time
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold text-mint-ink">
                  {activeTime.isDaytime ? '☀️ Daytime' : '🌙 Night'}
                </span>
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-bold tracking-tight text-ink">
                    {activeTime.formattedTime}
                  </span>
                  <span className="font-mono text-[11px] text-ink-faint">
                    {activeMeta.tzAbbr}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 border-t border-hairline/60 pt-2.5 font-mono text-[11px]">
                <span
                  className={`h-2 w-2 rounded-full ${
                    activeTime.isBusinessHours ? 'bg-mint animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span
                  className={
                    activeTime.isBusinessHours
                      ? 'font-medium text-mint-ink'
                      : 'text-amber-300 font-medium'
                  }
                >
                  {activeTime.statusLabel}
                </span>
              </div>
            </div>

            {/* Physical Address */}
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-hairline/60 bg-surface/40 p-3.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint-ink" />
              <div className="flex-1 text-[13px] leading-relaxed text-ink-muted">
                <span>{activeLoc.address}</span>
              </div>
              <a
                href={activeMeta.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-ink-faint transition-colors hover:text-mint-ink"
                title="View on Google Maps"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Direct Lines Action Buttons */}
          <div className="mt-6 space-y-3 pt-4 border-t border-hairline">
            {/* Primary One-Click Call Button */}
            <a
              href={activeLoc.phoneHref}
              className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl border border-mint-ink/40 p-3.5 font-mono transition-all duration-300 hover:border-mint-ink hover:shadow-[0_0_25px_rgba(0,255,157,0.25)]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,255,157,0.12) 0%, rgba(0,229,255,0.06) 100%)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint-ink/20 text-mint-ink transition-transform group-hover:scale-110">
                  <PhoneCall className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <div className="text-[10.5px] uppercase tracking-wider text-ink-muted">
                    Direct Phone Line
                  </div>
                  <div className="text-[16px] font-bold tracking-tight text-ink group-hover:text-mint-ink">
                    {activeLoc.phone}
                  </div>
                </div>
              </div>
              <span className="rounded-lg border border-mint-ink/30 bg-mint-ink/10 px-3 py-1 text-[11px] font-bold text-mint-ink transition-colors group-hover:bg-mint-ink group-hover:text-[#04140f]">
                Call Direct
              </span>
            </a>

            {/* Quick Actions Grid: Copy Phone + WhatsApp */}
            <div className="grid grid-cols-2 gap-2.5 font-mono text-[11px]">
              <button
                onClick={() => handleCopy(activeLoc.phone)}
                className="flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface/60 py-2.5 text-ink transition-all hover:border-mint-ink/50 hover:bg-surface hover:text-mint-ink"
              >
                {copiedPhone === activeLoc.phone ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-mint" />
                    <span className="text-mint font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Number</span>
                  </>
                )}
              </button>

              <a
                href={activeMeta.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface/60 py-2.5 text-ink transition-all hover:border-mint-ink/50 hover:bg-surface hover:text-mint-ink"
              >
                <MessageCircle className="h-3.5 w-3.5 text-mint-ink" />
                <span>WhatsApp Desk</span>
                <ArrowUpRight className="h-3 w-3 text-ink-faint" />
              </a>
            </div>

            {/* SLA Guarantee micro-badge */}
            <div className="flex items-center justify-center gap-2 pt-1 font-mono text-[10.5px] text-ink-faint">
              <ShieldCheck className="h-3.5 w-3.5 text-mint-ink" />
              <span>Direct engineer routing · Mon–Fri 09:00–19:00 local time</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── bottom: all-offices quick dial matrix ───────────── */}
      <div className="mt-6 rounded-2xl border border-hairline/80 bg-surface/30 p-5 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <p className="mono-label text-[10.5px] text-ink-muted">
            // direct lines quick directory
          </p>
          <span className="font-mono text-[10px] text-ink-faint">
            Single-click telephone and messaging dispatch
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LOCATIONS.map((loc, i) => {
            const meta = LOCATION_META[loc.city];
            const isSelected = i === activeIdx;

            return (
              <div
                key={`quick-${loc.city}`}
                onClick={() => setActiveIdx(i)}
                className={`group cursor-pointer rounded-xl border p-3.5 transition-all duration-300 ${
                  isSelected
                    ? 'border-mint-ink/40 bg-surface/80 shadow-[0_4px_20px_rgba(0,255,157,0.08)]'
                    : 'border-hairline/60 bg-surface/40 hover:border-hairline hover:bg-surface/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-ink">
                    <span>{loc.countryFlag}</span>
                    <span>{loc.city}</span>
                    <span className="text-[10px] font-normal text-ink-faint">({loc.region})</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-mint-ink">
                    {meta.pingMs}ms
                  </span>
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <a
                    href={loc.phoneHref}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 font-mono text-[12px] font-semibold text-ink transition-colors hover:text-mint-ink"
                  >
                    <Phone className="h-3 w-3 text-mint-ink" />
                    <span>{loc.phone}</span>
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(loc.phone);
                    }}
                    className="rounded-lg p-1 text-ink-faint transition-colors hover:bg-surface hover:text-mint-ink"
                    title="Copy phone number"
                  >
                    {copiedPhone === loc.phone ? (
                      <Check className="h-3.5 w-3.5 text-mint" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.8); opacity: 0.15; }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
};

export default LocationsGlobe;
