"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const COUNT_DESKTOP = 30;
const COUNT_MOBILE  = 18;
const MAX_DIST      = 130;
const MAX_DIST_SQ   = MAX_DIST * MAX_DIST;
const SPEED         = 0.35;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef    = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mounted) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w   = canvas.offsetWidth  || window.innerWidth;
      const h   = canvas.offsetHeight || window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? COUNT_MOBILE : COUNT_DESKTOP;

    particles.current = [];
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < count; i++) {
      particles.current.push({
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        r:  Math.random() * 1.0 + 0.8,
      });
    }

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    const isDark    = resolvedTheme === "dark";
    const dotColor  = isDark ? "rgba(255,255,255,0.45)"  : "rgba(74,124,106,0.4)";
    const lineColor = isDark ? "rgba(255,255,255,0.10)"  : "rgba(74,124,106,0.12)";

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw  = canvas.width  / dpr;
      const ch  = canvas.height / dpr;
      ctx.clearRect(0, 0, cw, ch);

      const ps = particles.current;

      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > cw) p.vx *= -1;
        if (p.y < 0 || p.y > ch) p.vy *= -1;
      }

      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth   = 0.5;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          if (dx * dx + dy * dy < MAX_DIST_SQ) {
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
          }
        }
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = dotColor;
      for (const p of ps) {
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
