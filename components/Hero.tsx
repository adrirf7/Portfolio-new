"use client";

import { useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const badgeRef       = useRef<HTMLDivElement>(null);
  const firstName1Ref  = useRef<HTMLDivElement>(null);   // wrapper → GSAP entrance
  const lastName1Ref   = useRef<HTMLDivElement>(null);   // wrapper → GSAP entrance
  const roleRef        = useRef<HTMLDivElement>(null);
  const descRef        = useRef<HTMLParagraphElement>(null);
  const btnsRef        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(badgeRef.current,          { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 },              0.5)
      .fromTo(firstName1Ref.current,     { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 },              0.7)
      .fromTo(lastName1Ref.current,      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 },              0.85)
      .fromTo(roleRef.current,           { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 },              1.2)
      .fromTo(descRef.current,           { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 },              1.35)
      .fromTo(btnsRef.current!.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 1.5);
  }, []);

  return (
    <section
      id="hero"
      className="grid-bg min-h-screen pt-24 pb-16 px-16 md:px-32 flex flex-col justify-center relative overflow-hidden transition-colors duration-300"
    >
      {/* Floating background orbs */}
      <div
        className="hero-orb"
        style={{
          width: 620, height: 620,
          background: "radial-gradient(circle, rgba(74,124,106,0.55), transparent 70%)",
          top: -180, right: -160,
          animation: "float-orb 15s ease-in-out infinite",
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: 450, height: 450,
          background: "radial-gradient(circle, rgba(74,124,106,0.3), transparent 70%)",
          bottom: 60, left: "3%",
          animation: "float-orb-b 19s ease-in-out infinite",
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: 320, height: 320,
          background: "radial-gradient(circle, rgba(148,163,184,0.25), transparent 70%)",
          top: "42%", right: "22%",
          animation: "float-orb 24s ease-in-out infinite 7s",
        }}
      />

      {/* Availability badge */}
      <div ref={badgeRef} className="opacity-0 mb-3 relative z-30">
        <a
          href="https://www.linkedin.com/in/adrian-rodriguez-fernandez/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-1.5 text-[11px] tracking-widest font-body font-semibold uppercase text-zinc-900 dark:text-zinc-100 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors duration-200 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for Projects
        </a>
      </div>

      {/* Giant name — wrapper handles GSAP entrance, h1 handles CSS drift */}
      <div ref={firstName1Ref} className="opacity-0 relative z-10">
        <h1
          className="name-drift-a font-display font-black uppercase leading-none"
          style={{ fontSize: "clamp(4rem, 18vw, 18rem)", lineHeight: 0.85 }}
        >
          Adrian
        </h1>
      </div>
      <div ref={lastName1Ref} className="opacity-0 relative z-10">
        <h1
          className="name-drift-b font-display font-black uppercase leading-none"
          style={{ fontSize: "clamp(3rem, 12vw, 12rem)", lineHeight: 0.9 }}
        >
          Rodriguez
        </h1>
      </div>

      {/* Role + description */}
      <div className="mt-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-24 relative z-10">
        <div ref={roleRef} className="opacity-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-8 h-px bg-zinc-900 dark:bg-zinc-100 inline-block transition-colors duration-300" />
            <span className="font-body text-xs tracking-widest uppercase font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
              Web Developer &amp;
            </span>
          </div>
          <p className="font-body text-xs tracking-widest uppercase font-semibold ml-11 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            Mobile App Developer
          </p>
        </div>

        <p ref={descRef} className="opacity-0 font-body text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm transition-colors duration-300">
          Designing and building web and mobile applications — combining user experience,
          performance and clean code.
        </p>
      </div>

      {/* CTA buttons */}
      <div ref={btnsRef} className="mt-10 flex items-center gap-4 relative z-10">
        <a href="#connect" className="btn-fill opacity-0">Collaborate →</a>
        <a href="/_CV Adrian Rodriguez Fernandez (2).pdf" download className="btn-outline opacity-0 flex items-center gap-2">
          <FileText size={14} strokeWidth={1.5} />
          CV
        </a>
      </div>
    </section>
  );
}
