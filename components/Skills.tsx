"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── PERSONALIZA: añade o elimina skills de tu stack ──
const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind",
  "Python",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Git",
  "GitHub",
  "Figma",
  "Canva",
  "Wireframing",
  "Prototyping",
  "UI/UX Design",
  "AWS",
  "Docker",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-label",
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
        pillsRef.current!.children,
        { opacity: 0, y: 25, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pillsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="grid-bg py-28 px-8 md:px-16"
    >
      <p className="section-label skills-label mb-4">Inventory</p>
      <h2 className="heading-split skills-label mb-16">
        Tech <span className="gray">Stack</span>
      </h2>

      <div
        ref={pillsRef}
        className="flex flex-wrap gap-3 max-w-4xl"
      >
        {SKILLS.map((skill) => (
          <span key={skill} className="tag-pill">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
