import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/* ---------------------------------- motion --------------------------------- */

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** Adds `.is-visible` to the element the first time it enters the viewport. */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (options?.once !== false) obs.unobserve(entry.target);
          } else if (options?.once === false) {
            setInView(false);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'span';
  style?: CSSProperties;
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  as = 'div',
  style,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
};

/* --------------------------------- counter --------------------------------- */

export const Counter: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}> = ({ value, suffix = '', prefix = '', decimals = 0, duration = 1600, className }) => {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

/* ---------------------------- magnetic CTA button --------------------------- */

type MagneticProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'mint' | 'ghost';
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

export const MagneticButton: React.FC<MagneticProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'mint',
  className,
  ariaLabel,
  type = 'button',
  disabled,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || reduced) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `translate3d(${dx * 6}px, ${dy * 4}px, 0)`;
    },
    [reduced]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'translate3d(0,0,0)';
  }, []);

  const classes = cn(
    variant === 'mint' ? 'btn-mint' : 'btn-ghost',
    'conic-ring group overflow-visible will-change-transform',
    'transition-transform duration-300 ease-out',
    disabled && 'opacity-60 pointer-events-none',
    className
  );

  const shared = {
    className: classes,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'aria-label': ariaLabel,
    'data-cursor': 'hover' as const,
  };

  if (to) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} to={to} {...shared} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
        {...shared}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...shared}
    >
      {children}
    </button>
  );
};

/* ------------------------------ spotlight card ----------------------------- */

export const GlowCard: React.FC<{
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  style?: CSSProperties;
}> = ({ children, className, tilt = false, style }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    if (tilt && !reduced) {
      const rx = ((y / r.height) - 0.5) * -6;
      const ry = ((x / r.width) - 0.5) * 8;
      el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (tilt) el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={cn(
        'glass glass-hover group relative overflow-hidden transition-all duration-300',
        tilt && 'transition-transform duration-500 ease-out will-change-transform',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mx, 50%) var(--my, 0%), rgba(0,255,157,0.18), rgba(0,229,255,0.08) 50%, transparent 80%)',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

/* -------------------------------- section bits ------------------------------ */

export const Eyebrow: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('eyebrow inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.06] px-3.5 py-1.5 backdrop-blur-md', className)}>
    <span aria-hidden="true" className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-mint" />
    </span>
    <span>{children}</span>
  </div>
);

export const SectionHeading: React.FC<{
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}> = ({ eyebrow, title, sub, align = 'left', className }) => (
  <Reveal className={cn(align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
    <div className={align === 'center' ? 'flex justify-center' : ''}>
      <Eyebrow>{eyebrow}</Eyebrow>
    </div>
    <h2 className="mt-4 font-heading text-[32px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[42px] lg:text-[48px]">
      {title}
    </h2>
    {sub ? (
      <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-muted sm:text-[17px]">
        {sub}
      </p>
    ) : null}
  </Reveal>
);

/* --------------------------------- aurora bg -------------------------------- */

export const Aurora: React.FC<{ className?: string }> = ({ className }) => (
  <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
    <div
      className="aurora animate-aurora"
      style={{
        width: 520,
        height: 520,
        left: '-8%',
        top: '-14%',
        background: 'radial-gradient(circle at 30% 30%, rgba(0,255,157,0.55), transparent 70%)',
      }}
    />
    <div
      className="aurora animate-aurora"
      style={{
        width: 460,
        height: 460,
        right: '-6%',
        bottom: '-16%',
        animationDelay: '-7s',
        background: 'radial-gradient(circle at 60% 40%, rgba(0,229,255,0.45), transparent 70%)',
      }}
    />
    <div
      className="aurora animate-aurora"
      style={{
        width: 380,
        height: 380,
        left: '48%',
        top: '30%',
        animationDelay: '-13s',
        background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.4), transparent 70%)',
      }}
    />
  </div>
);

/* ---------------------------------- rotator -------------------------------- */

export const TypedRotator: React.FC<{ words: string[]; className?: string }> = ({
  words,
  className,
}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    const word = words[index % words.length];
    let timeout: number;

    if (phase === 'typing') {
      if (text.length < word.length) {
        timeout = window.setTimeout(() => setText(word.slice(0, text.length + 1)), 62);
      } else {
        timeout = window.setTimeout(() => setPhase('holding'), 1500);
      }
    } else if (phase === 'holding') {
      timeout = window.setTimeout(() => setPhase('deleting'), 500);
    } else {
      if (text.length > 0) {
        timeout = window.setTimeout(() => setText(word.slice(0, text.length - 1)), 30);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }
    return () => window.clearTimeout(timeout);
  }, [text, phase, index, words, reduced]);

  return (
    <span className={cn('font-mono grad-text', className)} aria-live="polite">
      {text || '\u00A0'}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[1px] animate-blink align-middle"
        style={{ background: '#00ff9d' }}
      />
    </span>
  );
};

/* ---------------------------- word-mask headline ---------------------------- */

export const MaskWords: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className,
  delay = 0,
}) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[2px] align-bottom">
        <span
          className={cn('inline-block animate-clip-reveal', className)}
          style={{ animationDelay: `${delay + i * 85}ms` }}
        >
          {word}
          {'\u00A0'}
        </span>
      </span>
    ))}
  </>
);

/* ---------------------------------- marquee --------------------------------- */

export const Marquee: React.FC<{ items: string[]; speed?: 'normal' | 'slow' }> = ({
  items,
  speed = 'normal',
}) => (
  <div className="marquee-mask group relative w-full overflow-hidden py-3">
    <div
      className={cn(
        'flex w-max gap-3.5 group-hover:[animation-play-state:paused]',
        speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'
      )}
    >
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0 gap-3.5" aria-hidden={dup === 1}>
          {items.map((item) => (
            <span
              key={`${dup}-${item}`}
              className="glass whitespace-nowrap px-5 py-2.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-muted transition-all duration-300 hover:border-mint/50 hover:text-ink sm:text-[12.5px]"
              style={{ borderRadius: 999 }}
            >
              <span className="mr-1.5 text-mint opacity-70">/</span>
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/* -------------------------------- sparkline -------------------------------- */

export const Sparkline: React.FC<{
  points: number[];
  color?: string;
  className?: string;
  height?: number;
}> = ({ points, color = '#00ff9d', className, height = 28 }) => {
  const w = 100;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = height - ((p - min) / span) * (height - 4) - 2;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      className={cn('w-full', className)}
      style={{ height }}
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d={`${d} L${w},${height} L0,${height} Z`} fill={color} opacity="0.1" />
    </svg>
  );
};

/* ------------------------------ gradient avatar ---------------------------- */

export const InitialsAvatar: React.FC<{ name: string; size?: number; className?: string }> = ({
  name,
  size = 44,
  className,
}) => {
  const initials = name.startsWith('BotifyX')
    ? 'BX'
    : name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('');
  const hue = (name.charCodeAt(0) * 7) % 360;
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-mono font-semibold text-[#04140f]',
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: `linear-gradient(135deg, hsl(${150 + (hue % 40)} 100% 55%), hsl(${185 + (hue % 30)} 100% 55%))`,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
};
