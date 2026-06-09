"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── PERSONALIZA: tu experiencia laboral ──
const EXPERIENCES = [
  {
    duration: "Ene 2025 — Presente",
    location: "Remoto",
    company: "EMPRESA ACTUAL",
    role: "Desarrollador Frontend",
    bullets: [
      "Descripción de logro 1 con métricas concretas si las tienes.",
      "Descripción de logro 2 que demuestre impacto técnico.",
      "Descripción de logro 3 con tecnologías usadas.",
    ],
    tools: ["React", "TypeScript", "Next.js", "Tailwind", "+2 más"],
  },
  {
    duration: "Jun 2024 — Dic 2024",
    location: "Tu Ciudad, País",
    company: "EMPRESA ANTERIOR",
    role: "Desarrollador Web",
    bullets: [
      "Descripción de logro 1 en esta empresa.",
      "Descripción de logro 2 con impacto medible.",
      "Descripción de logro 3 técnico o de diseño.",
    ],
    tools: ["JavaScript", "CSS", "Figma", "Git", "+3 más"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".exp-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-card",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="grid-bg py-28 px-8 md:px-16"
    >
      <p className="section-label exp-header mb-4">Experience</p>
      <h2 className="heading-split exp-header mb-16">
        Work &amp; <span className="gray">Impact</span>
      </h2>

      <div className="flex flex-col gap-0 border-t border-zinc-100">
        {EXPERIENCES.map((exp, i) => (
          <div
            key={i}
            className="exp-card grid md:grid-cols-[220px_1fr] gap-6 md:gap-16 py-12 border-b border-zinc-100"
          >
            {/* Left: date + location */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-body text-[10px] tracking-widest2 uppercase text-muted mb-1">
                  Duration
                </p>
                <p className="font-body text-sm font-semibold text-primary leading-snug">
                  {exp.duration}
                </p>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-widest2 uppercase text-muted mb-1">
                  Location
                </p>
                <p className="font-body text-sm font-semibold text-primary">
                  {exp.location}
                </p>
              </div>
            </div>

            {/* Right: company, role, bullets, tools */}
            <div>
              <h3 className="font-display font-black text-lg uppercase tracking-wide text-primary mb-1">
                {exp.company}
              </h3>
              <p className="font-body text-xs tracking-widest uppercase font-semibold text-teal mb-5">
                {exp.role}
              </p>

              <ul className="flex flex-col gap-2 mb-6">
                {exp.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="font-body text-sm text-muted leading-relaxed flex gap-2"
                  >
                    <span className="mt-1 text-teal">·</span>
                    {b}
                  </li>
                ))}
              </ul>

              <p className="font-body text-[10px] tracking-widest2 uppercase text-zinc-400">
                Tools :{" "}
                <span className="text-zinc-400 tracking-widest">
                  {exp.tools.join(", ")}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
