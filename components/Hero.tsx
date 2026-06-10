"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const badgeRef    = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef  = useRef<HTMLHeadingElement>(null);
  const roleRef     = useRef<HTMLDivElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const btnsRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(badgeRef.current,   { opacity: 0, y: 20 },           { opacity: 1, y: 0, duration: 0.6 }, 0.5)
      .fromTo(firstNameRef.current, { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9 }, 0.7)
      .fromTo(lastNameRef.current,  { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9 }, 0.85)
      .fromTo(roleRef.current,    { opacity: 0, y: 20 },           { opacity: 1, y: 0, duration: 0.6 }, 1.2)
      .fromTo(descRef.current,    { opacity: 0, y: 20 },           { opacity: 1, y: 0, duration: 0.6 }, 1.35)
      .fromTo(btnsRef.current!.children, { opacity: 0, y: 20 },   { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 1.5);
  }, []);

  return (
    <section
      id="hero"
      className="grid-bg min-h-screen pt-24 pb-16 px-16 md:px-32 flex flex-col justify-center relative overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* Availability badge */}
      <div ref={badgeRef} className="opacity-0 mb-3">
        <span className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-1.5 text-[11px] tracking-widest font-body font-semibold uppercase text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {/* ── PERSONALIZA ── */}
          Available for Projects
        </span>
      </div>

      {/* Giant name — ~18vw para 6 chars, ~15vw para 7, ~13vw para 8, ~12vw para 9 */}
      <div className="overflow-hidden">
        <h1
          ref={firstNameRef}
          className="opacity-0 font-display font-black uppercase leading-none text-zinc-900 dark:text-zinc-100 transition-colors duration-300"
          style={{ fontSize: "clamp(4rem, 18vw, 18rem)", lineHeight: 0.85 }}
        >
          Adrian
        </h1>
      </div>
      <div className="overflow-hidden">
        <h1
          ref={lastNameRef}
          className="opacity-0 font-display font-black uppercase leading-none text-zinc-300 dark:text-zinc-700 transition-colors duration-300"
          style={{ fontSize: "clamp(3rem, 12vw, 12rem)", lineHeight: 0.9 }}
        >
          Rodriguez
        </h1>
      </div>

      {/* Role + description */}
      <div className="mt-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-24">
        <div ref={roleRef} className="opacity-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-8 h-px bg-zinc-900 dark:bg-zinc-100 inline-block transition-colors duration-300" />
            <span className="font-body text-xs tracking-widest uppercase font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
              {/* ── PERSONALIZA ── */}
              Web Developer &amp;
            </span>
          </div>
          <p className="font-body text-xs tracking-widest uppercase font-semibold ml-11 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            Mobile App Developer
          </p>
        </div>

        <p ref={descRef} className="opacity-0 font-body text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm transition-colors duration-300">
          {/* ── PERSONALIZA ── */}
          Designing and building web and mobile applications — combining user experience,
          performance and clean code.
        </p>
      </div>

      {/* CTA buttons */}
      <div ref={btnsRef} className="mt-10 flex items-center gap-4">
        <a href="#connect" className="btn-fill opacity-0">Collaborate →</a>
        <a href="/cv.pdf" download className="btn-outline opacity-0">Resume ↓</a>
      </div>
    </section>
  );
}
