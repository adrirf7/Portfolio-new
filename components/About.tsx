"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const QUICK_TAGS = ["React", "TypeScript", "Node.js", "React Native", "MySQL", "+more"];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-animate",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="grid-bg py-16 px-16 md:px-32 bg-white dark:bg-zinc-950 transition-colors duration-300"
    >
      <p className="section-label about-animate mb-4">Biography</p>
      <h2 className="heading-split about-animate mb-8">
        What I <span className="gray">Do</span>
      </h2>

      <div className="flex flex-col md:flex-row gap-20 items-center">
        {/* Photo */}
        <div className="about-animate shrink-0">
          <div className="relative w-80 aspect-[1/1] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
            {!imgError ? (
              <Image
                src="/adri.webp"
                alt="Foto de perfil"
                fill
                className="object-cover object-center"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-body text-xs text-zinc-400 tracking-widest text-center px-4">
                  Add your photo at<br />/public/profile.jpg
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 flex-1">
          <p className="about-animate flex items-center gap-2 text-xs tracking-widest font-body font-medium text-teal uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block" />
            The Digital Architect
          </p>

          <h3 className="about-animate font-display text-2xl md:text-3xl font-black leading-snug text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            {/* ── PERSONALIZA ── */}
            Clean code,{" "}
            <span className="text-zinc-400 font-bold">solid product</span>
            , real impact.
          </h3>

          <p className="about-animate font-body text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
            {/* ── PERSONALIZA ── */}
           I build fast, scale well and prioritize the user without sacrificing technical quality. Adaptable and always focused on writing clean, maintainable code that drives real value.
          </p>

          <div className="about-animate flex gap-12 pt-4 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
            <div>
              <p className="font-body text-[10px] tracking-widest text-zinc-400 uppercase mb-1">Location</p>
              <p className="font-body text-sm font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Madrid, Spain</p>
            </div>
            <div>
              <p className="font-body text-[10px] tracking-widest text-zinc-400 uppercase mb-1">Status</p>
              <p className="font-body text-sm font-semibold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Open to Work</p>
            </div>
          </div>

          <div className="about-animate flex flex-wrap items-center gap-2 pt-2">
            {QUICK_TAGS.map((tag) => (
              <span key={tag} className="tag-pill text-xs py-1">{tag}</span>
            ))}
          </div>

          <a
            href="#connect"
            className="about-animate self-end font-body text-xs tracking-widest uppercase font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-400 transition-colors flex items-center gap-1"
          >
            Get In Touch →
          </a>
        </div>
      </div>
    </section>
  );
}
