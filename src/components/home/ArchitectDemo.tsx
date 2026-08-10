import React, { useEffect, useRef, useState } from 'react';
import { Terminal, RotateCcw, Sparkles } from 'lucide-react';
import { DEMO_SCENARIOS } from '@/lib/site';
import { Reveal, SectionHeading, useReducedMotion } from '@/components/ui-kit';
import { cn } from '@/lib/utils';

/** Scripted, offline architecture advisor with a mono typing effect. */
const ArchitectDemo: React.FC = () => {
  const [activeId, setActiveId] = useState(DEMO_SCENARIOS[0].id);
  const [typed, setTyped] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const scenario = DEMO_SCENARIOS.find((s) => s.id === activeId) ?? DEMO_SCENARIOS[0];

  const start = (id: string) => {
    setActiveId(id);
    setTyped([]);
    setLineIndex(0);
    setCharIndex(0);
    setRunning(true);
    window.supercool?.track('demo_run', { scenario: id });
  };

  useEffect(() => {
    if (!running) return;
    const lines = scenario.lines;
    if (lineIndex >= lines.length) {
      setRunning(false);
      return;
    }
    if (reduced) {
      setTyped(lines);
      setRunning(false);
      return;
    }
    const current = lines[lineIndex];
    if (charIndex <= current.length) {
      const t = window.setTimeout(() => {
        setTyped((prev) => {
          const next = [...prev];
          next[lineIndex] = current.slice(0, charIndex);
          return next;
        });
        setCharIndex((c) => c + 1);
      }, current.length === 0 ? 40 : 9);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 60);
    return () => window.clearTimeout(t);
  }, [running, lineIndex, charIndex, scenario, reduced]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [typed]);

  return (
    <section id="architect" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="// AI architecture advisor"
          title={
            <>
              Pick an objective.{' '}
              <span className="grad-text">Receive a candidate architecture.</span>
            </>
          }
          sub="This mirrors the first technical review we conduct with engineering leadership — model strategy, latency targets, infrastructure topology, and carbon footprint before sprint planning."
        />

        <Reveal className="mt-12">
          <div className="glass overflow-hidden shadow-glass-glow">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-4 py-3.5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-mint shadow-[0_0_8px_#00ff9d]" />
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-mint-ink" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
                    BOTIFYX ARCHITECT // {scenario.goal}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-faint sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  interactive session
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr]">
              <div className="border-b border-hairline p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <p className="mono-label mb-3.5 font-semibold text-mint-ink">// select objective</p>
                <div className="flex flex-wrap gap-2.5 lg:flex-col lg:items-start">
                  {DEMO_SCENARIOS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => start(s.id)}
                      aria-pressed={activeId === s.id}
                      className={cn(
                        'rounded-xl border px-4 py-2.5 text-left font-mono text-[11.5px] uppercase tracking-[0.12em] transition-all duration-300 lg:w-full',
                        activeId === s.id
                          ? 'border-mint/80 bg-mint/10 text-mint-ink font-semibold shadow-[0_0_16px_-4px_rgba(0,255,157,0.4)]'
                          : 'border-hairline bg-surface/60 text-ink-muted hover:border-mint/40 hover:text-ink'
                      )}
                    >
                      {s.chip}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => start(activeId)}
                  className="mt-6 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint transition-all hover:text-mint-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  rerun simulation
                </button>
              </div>

              <div
                ref={scrollRef}
                className="max-h-[400px] min-h-[340px] overflow-y-auto p-5 sm:p-7"
                style={{ background: 'rgba(3,7,8,0.45)' }}
                aria-live="polite"
              >
                {typed.length === 0 ? (
                  <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3.5 text-center">
                    <Sparkles className="h-7 w-7 text-mint-ink animate-pulse" aria-hidden="true" />
                    <p className="max-w-[300px] font-mono text-[12.5px] leading-relaxed text-ink-faint">
                      Select an engineering objective on the left to generate an end-to-end technical blueprint.
                    </p>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap break-words font-mono text-[12px] leading-[1.9] text-ink-muted sm:text-[13px]">
                    {typed.map((line, i) => (
                      <span
                        key={i}
                        className={cn(
                          'block',
                          line.startsWith('>') && 'text-mint-ink font-bold',
                          /^[A-Z][A-Z .₂/]+$/.test(line.trim()) && 'font-bold text-ink',
                          /^(EST\.|MODEL APPROACH)/.test(line) && 'text-cyan font-semibold'
                        )}
                      >
                        {line}
                        {running && i === typed.length - 1 ? (
                          <span
                            aria-hidden="true"
                            className="ml-0.5 inline-block h-[1.1em] w-[8px] translate-y-[2px] animate-blink bg-mint align-middle"
                          />
                        ) : null}
                      </span>
                    ))}
                  </pre>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between border-t border-hairline px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint sm:px-6">
              <span>indicative candidate architecture · discovery sprint included</span>
              <span className="text-mint-ink">ESTIMATED CYCLE: 6–10 WEEKS</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ArchitectDemo;
