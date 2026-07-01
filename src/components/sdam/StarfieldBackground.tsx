'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number; // depth 0..1
  r: number;
  baseAlpha: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

/**
 * Cosmic starfield with parallax depth + occasional shooting stars.
 * Reacts subtly to scroll position (parallax drift) and pointer (gentle pull).
 */
export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let stars: Star[] = [];
    let shooters: ShootingStar[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildStars = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / 6500);
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.3 + z * 1.6,
          baseAlpha: 0.25 + z * 0.65,
          twinklePhase: Math.random() * Math.PI * 2,
        };
      });
    };

    const spawnShooter = () => {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -50 : w + 50;
      const startY = Math.random() * h * 0.5;
      const dir = fromLeft ? 1 : -1;
      const speed = 6 + Math.random() * 4;
      shooters.push({
        x: startX,
        y: startY,
        vx: dir * speed,
        vy: 2 + Math.random() * 1.5,
        life: 0,
        maxLife: 90 + Math.random() * 40,
      });
    };

    let t = 0;
    let lastShooter = 0;

    const render = () => {
      t += 1;
      ctx.fillStyle = 'rgba(5, 5, 9, 0.35)';
      ctx.fillRect(0, 0, w, h);

      const scrollOff = scrollRef.current * 0.15;
      const px = (pointerRef.current.x - 0.5) * 30;
      const py = (pointerRef.current.y - 0.5) * 30;

      // Nebula glow blobs
      const blob1X = w * 0.25 + Math.sin(t * 0.0006) * 60 - scrollOff * 0.2;
      const blob1Y = h * 0.35 + Math.cos(t * 0.0005) * 40;
      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 0, blob1X, blob1Y, Math.max(w, h) * 0.45);
      grad1.addColorStop(0, 'rgba(212, 175, 55, 0.05)');
      grad1.addColorStop(0.4, 'rgba(107, 29, 42, 0.03)');
      grad1.addColorStop(1, 'rgba(5, 5, 9, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const blob2X = w * 0.78 - Math.sin(t * 0.0004) * 50;
      const blob2Y = h * 0.7 - Math.cos(t * 0.0007) * 30 - scrollOff * 0.15;
      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 0, blob2X, blob2Y, Math.max(w, h) * 0.4);
      grad2.addColorStop(0, 'rgba(26, 77, 74, 0.06)');
      grad2.addColorStop(0.5, 'rgba(212, 175, 55, 0.02)');
      grad2.addColorStop(1, 'rgba(5, 5, 9, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        const px2 = s.x + px * s.z;
        const py2 = s.y + py * s.z - scrollOff * s.z * 0.6;
        const wrappedY = ((py2 % h) + h) % h;
        const twinkle = 0.6 + 0.4 * Math.sin(t * 0.04 + s.twinklePhase);
        const alpha = s.baseAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(px2, wrappedY, s.r, 0, Math.PI * 2);
        // Gold tint for brighter stars, white for dim
        if (s.z > 0.75) {
          ctx.fillStyle = `rgba(244, 230, 180, ${alpha})`;
        } else if (s.z > 0.5) {
          ctx.fillStyle = `rgba(212, 175, 55, ${alpha * 0.8})`;
        } else {
          ctx.fillStyle = `rgba(244, 234, 213, ${alpha * 0.6})`;
        }
        ctx.fill();
        // halo for brightest
        if (s.z > 0.85) {
          ctx.beginPath();
          ctx.arc(px2, wrappedY, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 208, 98, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // Shooting stars
      if (t - lastShooter > 280 && Math.random() < 0.012) {
        spawnShooter();
        lastShooter = t;
      }
      shooters = shooters.filter((sh) => sh.life < sh.maxLife);
      for (const sh of shooters) {
        sh.life += 1;
        sh.x += sh.vx;
        sh.y += sh.vy;
        const lifeRatio = sh.life / sh.maxLife;
        const alpha = Math.sin(lifeRatio * Math.PI) * 0.9;
        const trailLen = 60;
        const grad = ctx.createLinearGradient(
          sh.x,
          sh.y,
          sh.x - sh.vx * trailLen / 6,
          sh.y - sh.vy * trailLen / 6
        );
        grad.addColorStop(0, `rgba(244, 208, 98, ${alpha})`);
        grad.addColorStop(1, 'rgba(244, 208, 98, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * trailLen / 6, sh.y - sh.vy * trailLen / 6);
        ctx.stroke();
        // head
        ctx.beginPath();
        ctx.arc(sh.x, sh.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 230, 180, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current.x = e.clientX / window.innerWidth;
      pointerRef.current.y = e.clientY / window.innerHeight;
    };
    const onResize = () => buildStars();

    buildStars();
    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-screen w-screen"
      aria-hidden="true"
    />
  );
}
