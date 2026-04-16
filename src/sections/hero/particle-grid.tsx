import { useEffect, useRef } from 'react';

interface INode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
}

interface IPulse {
  x: number;
  y: number;
  horizontal: boolean;
  direction: 1 | -1;
  startedAt: number;
  duration: number;
  length: number;
  color: string;
}

const COLORS = ['59,130,246', '168,85,247', '6,182,212'];

export function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const ctxResult = el.getContext('2d');
    if (!ctxResult) return;

    const canvasEl = el;
    const ctx = ctxResult;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const spacing = isMobile ? 48 : 32;
    const maxPulseCount = isMobile ? 3 : 5;

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    let visible = false;
    let nodes: INode[] = [];
    let pulses: IPulse[] = [];
    let nextPulseAt = performance.now() + 600;

    function index(x: number, y: number) {
      return y * cols + x;
    }

    function createNodes() {
      cols = Math.ceil(W / spacing) + 2;
      rows = Math.ceil(H / spacing) + 2;
      nodes = [];

      const offsetX = (W - (cols - 1) * spacing) / 2;
      const offsetY = (H - (rows - 1) * spacing) / 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const baseX = offsetX + x * spacing;
          const baseY = offsetY + y * spacing;
          nodes.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            seed: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    function resize() {
      const parent = canvasEl.parentElement;
      if (!parent) return;

      W = parent.offsetWidth;
      H = parent.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = W * dpr;
      canvasEl.height = H * dpr;
      canvasEl.style.width = `${W}px`;
      canvasEl.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    }

    function spawnPulse(now: number) {
      if (reduceMotion || pulses.length >= maxPulseCount || cols < 2 || rows < 2) return;

      const horizontal = Math.random() > 0.42;
      const direction: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
      pulses.push({
        x: horizontal
          ? (direction > 0 ? -spacing : W + spacing)
          : Math.floor(Math.random() * cols) * spacing,
        y: horizontal
          ? Math.floor(Math.random() * rows) * spacing
          : (direction > 0 ? -spacing : H + spacing),
        horizontal,
        direction,
        startedAt: now,
        duration: 1900 + Math.random() * 900,
        length: spacing * (4 + Math.random() * 3),
        color: COLORS[(Math.random() * COLORS.length) | 0],
      });
    }

    function drawGrid(now: number) {
      const hasPointer = mx > -9000 && !reduceMotion;

      for (const node of nodes) {
        if (hasPointer) {
          const dx = node.baseX - mx;
          const dy = node.baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 180);
          if (influence > 0) {
            const force = influence * influence * 12;
            node.vx += (dx / Math.max(dist, 1)) * force * 0.08;
            node.vy += (dy / Math.max(dist, 1)) * force * 0.08;
          }
        }

        node.vx += (node.baseX - node.x) * 0.035;
        node.vy += (node.baseY - node.y) * 0.035;
        node.vx *= 0.82;
        node.vy *= 0.82;
        node.x += node.vx;
        node.y += node.vy;
      }

      ctx.lineWidth = 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const node = nodes[index(x, y)];
          if (!node) continue;

          if (x + 1 < cols) {
            const right = nodes[index(x + 1, y)];
            ctx.strokeStyle = 'rgba(130,145,190,0.045)';
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
          }
          if (y + 1 < rows) {
            const down = nodes[index(x, y + 1)];
            ctx.strokeStyle = 'rgba(130,145,190,0.04)';
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(down.x, down.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const pulse = 0.12 + Math.sin(now * 0.0012 + node.seed) * 0.06;
        const dist = hasPointer ? Math.hypot(node.x - mx, node.y - my) : 9999;
        const glow = Math.max(0, 1 - dist / 150) * 0.28;
        const radius = 1 + glow * 1.8;
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.48, pulse + glow).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawPulses(now: number) {
      if (reduceMotion) return;

      if (now > nextPulseAt) {
        spawnPulse(now);
        nextPulseAt = now + 1150 + Math.random() * 1250;
      }

      pulses = pulses.filter((pulse) => {
        const progress = (now - pulse.startedAt) / pulse.duration;
        if (progress > 1) return false;

        const travel = (pulse.horizontal ? W + pulse.length + spacing * 2 : H + pulse.length + spacing * 2) * progress;
        const head = pulse.direction > 0 ? travel - pulse.length : (pulse.horizontal ? W : H) - travel + pulse.length;
        const tail = pulse.direction > 0 ? head - pulse.length : head + pulse.length;

        const gradient = pulse.horizontal
          ? ctx.createLinearGradient(tail, pulse.y, head, pulse.y)
          : ctx.createLinearGradient(pulse.x, tail, pulse.x, head);
        gradient.addColorStop(0, `rgba(${pulse.color},0)`);
        gradient.addColorStop(0.65, `rgba(${pulse.color},0.18)`);
        gradient.addColorStop(1, `rgba(${pulse.color},0.72)`);

        ctx.save();
        ctx.lineWidth = 1.4;
        ctx.shadowColor = `rgba(${pulse.color},0.55)`;
        ctx.shadowBlur = 12;
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        if (pulse.horizontal) {
          ctx.moveTo(tail, pulse.y);
          ctx.lineTo(head, pulse.y);
        } else {
          ctx.moveTo(pulse.x, tail);
          ctx.lineTo(pulse.x, head);
        }
        ctx.stroke();
        ctx.restore();

        return true;
      });
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(8,10,18,0.08)';
      ctx.fillRect(0, 0, W, H);
      drawGrid(now);
      drawPulses(now);
    }

    function tick(now: number) {
      raf = 0;
      if (visible && !document.hidden) {
        draw(now);
        raf = requestAnimationFrame(tick);
      }
    }

    function start() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function stop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    const parent = canvasEl.parentElement;
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      mx = event.clientX - rect.left;
      my = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mx = -9999;
      my = -9999;
    };
    parent?.addEventListener('pointermove', onPointerMove);
    parent?.addEventListener('pointerleave', onPointerLeave);

    const obs = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else stop();
    }, { threshold: 0 });
    if (parent) obs.observe(parent);

    const onResize = () => resize();
    const onVisChange = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisChange);

    resize();
    draw(performance.now());

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisChange);
      parent?.removeEventListener('pointermove', onPointerMove);
      parent?.removeEventListener('pointerleave', onPointerLeave);
      obs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        borderRadius: 'inherit',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.78) 52%, transparent 100%)',
      }}
    />
  );
}
