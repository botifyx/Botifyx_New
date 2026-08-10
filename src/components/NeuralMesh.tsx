import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/components/ui-kit';

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Full-bleed drifting particle mesh. Nodes brighten and lines reach toward the
 * pointer. Falls back to a static CSS gradient mesh when canvas is unavailable
 * or the visitor prefers reduced motion.
 */
const NeuralMesh: React.FC<{ className?: string; density?: number }> = ({
  className,
  density = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setSupported(false);
      return;
    }
    if (prefersReducedMotion()) {
      setSupported(false);
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(
        Math.min(96, Math.max(26, (width * height) / 15000)) * density
      );
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.9 + Math.random() * 1.5,
      }));
    };

    let lastMove = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 16) return;
      lastMove = now;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(150, Math.max(90, width / 9));

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // gentle pull toward pointer
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 190 && d > 1) {
            n.x += (dx / d) * 0.35;
            n.y += (dy / d) * 0.35;
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const pd = pointer.active ? Math.hypot(pointer.x - midX, pointer.y - midY) : 9999;
          const proximity = pd < 220 ? 1 - pd / 220 : 0;
          const alpha = (1 - dist / linkDist) * (0.13 + proximity * 0.55);
          ctx.strokeStyle =
            proximity > 0.35
              ? `rgba(0,229,255,${alpha.toFixed(3)})`
              : `rgba(0,255,157,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.7 + proximity * 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const pd = pointer.active ? Math.hypot(pointer.x - n.x, pointer.y - n.y) : 9999;
        const near = pd < 200 ? 1 - pd / 200 : 0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${near > 0.5 ? '0,229,255' : '0,255,157'},${(0.32 + near * 0.6).toFixed(3)})`;
        ctx.fill();
        if (near > 0.55) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 8 * near, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,157,${(0.07 * near).toFixed(3)})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    canvas.addEventListener('pointerleave', onLeave);

    // stop the loop while off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !visible) {
          visible = true;
          raf = requestAnimationFrame(draw);
        } else if (!nowVisible && visible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [density]);

  return (
    <div className={className} aria-hidden="true">
      {supported ? (
        <canvas ref={canvasRef} className="h-full w-full" />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(60% 60% at 20% 25%, rgba(0,255,157,0.22), transparent 70%), radial-gradient(55% 55% at 80% 30%, rgba(0,229,255,0.18), transparent 70%), radial-gradient(50% 50% at 55% 85%, rgba(99,102,241,0.18), transparent 70%)',
          }}
        />
      )}
    </div>
  );
};

export default NeuralMesh;
