"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    duration: "Feb 2026 — Jun 2026",
    location: "Madrid, España",
    company: "UD SANSE",
    role: "Prácticas — Desarrollo Web",
    bullets: [
      "Desarrollé el sitio web oficial del club con React 19, Vite y Tailwind CSS 4.",
      "Implementé un panel de administración autenticado con CRUD completo de contenido y gestión de imágenes.",
      "Integré la API oficial de competición y automaticé la publicación vía GitHub API como CMS.",
    ],
    tools: ["React 19", "Vite", "Tailwind CSS 4", "GitHub API"],
  },
  {
    duration: "Jun 2024",
    location: "Madrid, España",
    company: "SEIDOR",
    role: "Prácticas — Desarrollo de Software",
    bullets: [
      "Desarrollé un sistema de gestión para tienda con Java y MySQL: base de datos, lógica de negocio y CRUD completo.",
      "Integré funciones de IA mediante API externa y construí una interfaz gráfica con Swing.",
      "Apliqué programación por capas, acceso a datos con JDBC y consumo de APIs REST.",
    ],
    tools: ["Java", "MySQL", "Swing", "JDBC", "REST API"],
  },
];

export default function Experience() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Timeline line draws down on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.2, ease: "power2.inOut",
          scrollTrigger: { trigger: lineRef.current, start: "top 80%", end: "bottom 60%", scrub: 0.6 },
        }
      );

      // Each card: left col slides from left, right col slides from right
      document.querySelectorAll(".exp-card").forEach((card) => {
        gsap.fromTo(
          card.querySelector(".exp-left"),
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%" },
          }
        );
        gsap.fromTo(
          card.querySelector(".exp-right"),
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%" },
          }
        );
        // Bullets stagger in
        const bullets = card.querySelectorAll(".exp-bullet");
        gsap.fromTo(
          bullets,
          { opacity: 0, x: 15 },
          {
            opacity: 1, x: 0, duration: 0.45, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 78%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="grid-bg py-16 px-16 md:px-32 transition-colors duration-300"
    >
      <p className="section-label exp-header mb-4">Experience</p>
      <h2 className="heading-split exp-header mb-8">
        Work &amp; <span className="gray">Impact</span>
      </h2>

      <div className="relative flex flex-col border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        {/* Animated vertical timeline line */}
        <div
          className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-teal origin-top"
          ref={lineRef}
          style={{ transformOrigin: "top center" }}
        />

        {EXPERIENCES.map((exp, i) => (
          <div
            key={i}
            className="exp-card grid md:grid-cols-[220px_1fr] gap-6 md:gap-16 py-12 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300 md:pl-6"
          >
            {/* Left */}
            <div className="exp-left flex flex-col gap-4 opacity-0">
              <div>
                <p className="font-body text-[10px] tracking-widest text-zinc-400 uppercase mb-1">Duration</p>
                <p className="font-body text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug transition-colors duration-300">{exp.duration}</p>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-widest text-zinc-400 uppercase mb-1">Location</p>
                <p className="font-body text-sm font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">{exp.location}</p>
              </div>
            </div>

            {/* Right */}
            <div className="exp-right opacity-0">
              <h3 className="font-display font-black text-lg uppercase tracking-wide text-zinc-900 dark:text-zinc-100 mb-1 transition-colors duration-300">{exp.company}</h3>
              <p className="font-body text-xs tracking-widest uppercase font-semibold text-teal mb-5">{exp.role}</p>

              <ul className="flex flex-col gap-2 mb-6">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="exp-bullet font-body text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex gap-2 transition-colors duration-300 opacity-0">
                    <span className="mt-1 text-teal">·</span>
                    {b}
                  </li>
                ))}
              </ul>

              <p className="font-body text-[10px] tracking-widest uppercase text-zinc-400">
                Tools : <span className="tracking-widest">{exp.tools.join(", ")}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
