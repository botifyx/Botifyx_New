import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/components/ui-kit';

/** Mint dot + lagging ring that scales over interactive elements. Desktop only. */
const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !prefersReducedMotion();
    if (!isFinePointer) return;
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        'a,button,[role="button"],input,textarea,select,summary,[data-cursor="hover"]'
      );
      targetScale = interactive ? 2.1 : 1;
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      scale += (targetScale - scale) * 0.14;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 17}px, ${ringY - 17}px, 0) scale(${scale.toFixed(3)})`;
        ringRef.current.style.opacity = scale > 1.4 ? '0.9' : '0.5';
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] hidden lg:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full"
        style={{ background: '#00ff9d', boxShadow: '0 0 10px rgba(0,255,157,0.9)' }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-[34px] w-[34px] rounded-full border transition-opacity duration-200"
        style={{ borderColor: 'rgba(0,255,157,0.55)' }}
      />
    </div>
  );
};

export default CustomCursor;
