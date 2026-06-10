"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── PERSONALIZA ──
const EXPERIENCES = [
  {
    duration: "Jan 2025 — Present",
    location: "Remote",
    company: "CURRENT COMPANY",
    role: "Frontend Developer",
    bullets: [
      "Achievement 1 with concrete metrics if available.",
      "Achievement 2 demonstrating technical impact.",
      "Achievement 3 highlighting technologies used.",
    ],
    tools: ["React", "TypeScript", "Next.js", "Tailwind", "+2 more"],
  },
  {
    duration: "Jun 2024 — Dec 2024",
    location: "Your City, Country",
    company: "PREVIOUS COMPANY",
    role: "Web Developer",
    bullets: [
      "Achievement 1 at this company.",
      "Achievement 2 with measurable impact.",
      "Achievement 3 technical or design-related.",
    ],
    tools: ["JavaScript", "CSS", "Figma", "Git", "+3 more"],
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
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".exp-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ".exp-card", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="grid-bg py-16 px-16 md:px-32 bg-white dark:bg-zinc-950 transition-colors duration-300"
    >
      <p className="section-label exp-header mb-4">Experience</p>
      <h2 className="heading-split exp-header mb-8">
        Work &amp; <span className="gray">Impact</span>
      </h2>

      <div className="flex flex-col border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        {EXPERIENCES.map((exp, i) => (
          <div
            key={i}
            className="exp-card grid md:grid-cols-[220px_1fr] gap-6 md:gap-16 py-12 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300"
          >
            {/* Left */}
            <div className="flex flex-col gap-4">
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
            <div>
              <h3 className="font-display font-black text-lg uppercase tracking-wide text-zinc-900 dark:text-zinc-100 mb-1 transition-colors duration-300">{exp.company}</h3>
              <p className="font-body text-xs tracking-widest uppercase font-semibold text-teal mb-5">{exp.role}</p>

              <ul className="flex flex-col gap-2 mb-6">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="font-body text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex gap-2 transition-colors duration-300">
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
