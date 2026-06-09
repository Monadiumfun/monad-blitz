import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Pixel-dissolve hover effect (canvas grid of small squares that reveal in a
 * wave from the pointer), ported from the dvb.xyz "pixel-hover-card".
 * Default palette is Monad purple instead of the original yellow.
 */
class Pixel {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  maxSize: number;
  speed: number;
  size = 0;
  targetSize = 0;
  delay = 0;
  startTime: number | null = null;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, maxSize: number, speed: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.maxSize = maxSize;
    this.speed = speed;
  }

  setTarget(target: number, delay: number) {
    this.targetSize = target;
    this.delay = delay;
    this.startTime = performance.now();
  }

  /** returns true while still animating */
  update(now: number): boolean {
    if (this.startTime === null) return false;
    if (now - this.startTime < this.delay) return true;
    const diff = this.targetSize - this.size;
    if (Math.abs(diff) < 0.01) {
      this.size = this.targetSize;
      return false;
    }
    this.size += diff * this.speed;
    return true;
  }

  draw() {
    if (this.size <= 0) return;
    const offset = (this.maxSize - this.size) * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }
}

interface Props {
  colors?: string; // comma-separated hex list
  gap?: number;
  spreadDuration?: number; // ms over which the reveal wave spreads from the pointer
  speed?: number;
  maxSize?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

function PixelCard({
  colors = "#6E54FF,#9751DC,#A78BFA,#452890,#CEBDE4",
  gap = 6,
  spreadDuration = 400,
  speed = 0.15,
  maxSize = 2,
  className,
  style,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = colors.split(",").map((c) => c.trim()).filter(Boolean);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const build = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w === 0 || h === 0) return;
      canvas.width = w;
      canvas.height = h;
      const pixels: Pixel[] = [];
      for (let x = 0; x < w; x += gap) {
        for (let y = 0; y < h; y += gap) {
          const color = palette[Math.floor(Math.random() * palette.length)] || "#ffffff";
          pixels.push(new Pixel(ctx, x, y, color, maxSize, speed));
        }
      }
      pixelsRef.current = pixels;
    };

    const delayFor = (px: number, py: number) => {
      if (reduced) return 0;
      const dx = px - pointerRef.current.x;
      const dy = py - pointerRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const diag = Math.sqrt(container.clientWidth ** 2 + container.clientHeight ** 2) || 1;
      return (dist / diag) * spreadDuration;
    };

    const animate = () => {
      if (rafRef.current !== null) return;
      const loop = () => {
        const c = canvasRef.current?.getContext("2d");
        if (!c || !canvasRef.current) {
          rafRef.current = null;
          return;
        }
        c.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const now = performance.now();
        let active = false;
        let visible = false;
        for (const p of pixelsRef.current) {
          if (p.update(now)) active = true;
          if (p.size > 0.01) {
            visible = true;
            p.draw();
          }
        }
        rafRef.current = active || visible ? requestAnimationFrame(loop) : null;
      };
      rafRef.current = requestAnimationFrame(loop);
    };

    const toggle = (show: boolean) => {
      for (const p of pixelsRef.current) {
        p.setTarget(show ? 1 + Math.random() * 0.8 : 0, delayFor(p.x, p.y));
      }
      animate();
    };

    const setPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onEnter = (e: PointerEvent) => {
      setPointer(e);
      toggle(true);
    };
    const onMove = (e: PointerEvent) => setPointer(e);
    const onLeave = (e: PointerEvent) => {
      setPointer(e);
      toggle(false);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(container);
    container.addEventListener("pointerenter", onEnter);
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);

    return () => {
      ro.disconnect();
      container.removeEventListener("pointerenter", onEnter);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [colors, gap, spreadDuration, speed, maxSize]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", ...style }}>
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default PixelCard;
