"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ── PERSONALIZA: skills rápidos en la sección about ──
const QUICK_TAGS = ["React", "Next.js", "TypeScript", "Tailwind", "Figma", "+5 more"];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-animate",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="grid-bg py-28 px-8 md:px-16"
    >
      {/* Section label */}
      <p className="section-label about-animate mb-4">Biography</p>

      {/* Heading */}
      <h2 className="heading-split about-animate mb-16">
        What I <span className="gray">Do</span>
      </h2>

      {/* Two-column layout */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Photo */}
        <div className="about-animate">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100">
            {/* ── PERSONALIZA: reemplaza /profile.jpg con tu foto real ── */}
            {!imgError ? (
              <Image
                src="/profile.jpg"
                alt="Foto de perfil"
                fill
                className="object-cover object-center"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
                <span className="font-body text-xs text-zinc-400 tracking-widest text-center px-4">
                  Añade tu foto en<br />/public/profile.jpg
                </span>
              </div>
            )}
            <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
              <span className="font-body text-xs text-muted tracking-widest">v.1</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          {/* Subtitle */}
          <p className="about-animate flex items-center gap-2 text-xs tracking-widest font-body font-medium text-teal uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block" />
            The Digital Architect
          </p>

          {/* Headline */}
          <h3 className="about-animate font-display text-2xl md:text-3xl font-black leading-snug text-primary">
            {/* ── PERSONALIZA: tu propuesta de valor principal ── */}
            Construyendo productos digitales refinados con foco en{" "}
            <span className="text-muted font-bold">minimalismo funcional</span>{" "}
            e ingeniería a escala.
          </h3>

          {/* Bio */}
          <p className="about-animate font-body text-sm leading-relaxed text-muted">
            {/* ── PERSONALIZA: tu bio ── */}
            Conecto el diseño con la ingeniería de alto nivel. Basado en [Tu Ciudad], me
            enfoco en crear experiencias digitales que sean tan sólidas técnicamente como
            intuitivas visualmente.
          </p>

          {/* Metadata */}
          <div className="about-animate flex gap-12 pt-4 border-t border-zinc-100">
            <div>
              <p className="font-body text-[10px] tracking-widest2 text-muted uppercase mb-1">
                Location
              </p>
              {/* ── PERSONALIZA: tu ciudad ── */}
              <p className="font-body text-sm font-semibold text-primary">Tu Ciudad, País</p>
            </div>
            <div>
              <p className="font-body text-[10px] tracking-widest2 text-muted uppercase mb-1">
                Status
              </p>
              {/* ── PERSONALIZA: tu disponibilidad ── */}
              <p className="font-body text-sm font-semibold text-primary">Open to Work</p>
            </div>
          </div>

          {/* Quick tags + CTA */}
          <div className="about-animate flex flex-wrap items-center gap-2 pt-2">
            {QUICK_TAGS.map((tag) => (
              <span key={tag} className="tag-pill text-xs py-1">
                {tag}
              </span>
            ))}
          </div>

          <a
            href="#connect"
            className="about-animate self-end font-body text-xs tracking-widest uppercase font-semibold text-primary hover:text-muted transition-colors flex items-center gap-1"
          >
            Get In Touch →
          </a>
        </div>
      </div>
    </section>
  );
}
