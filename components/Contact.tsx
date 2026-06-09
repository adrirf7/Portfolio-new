"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Github, Figma, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── PERSONALIZA: tus datos de contacto ──
const CONTACT_LINKS = [
  {
    index: "01",
    label: "Email",
    icon: Mail,
    href: "mailto:tu@email.com",
  },
  {
    index: "02",
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/tu-perfil",
  },
  {
    index: "03",
    label: "GitHub",
    icon: Github,
    href: "https://github.com/tu-usuario",
  },
  {
    index: "04",
    label: "Figma",
    icon: Figma,
    href: "https://figma.com/@tu-usuario",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
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
        ".contact-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-row",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".contact-email",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-email",
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="grid-bg py-28 px-8 md:px-16"
    >
      <p className="section-label contact-header mb-4">Available for Work</p>
      <h2 className="heading-split contact-header mb-16">
        Get In <span className="gray">Touch</span>
      </h2>

      {/* Contact list */}
      <div className="flex flex-col border-t border-zinc-100 max-w-3xl">
        {CONTACT_LINKS.map(({ index, label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="contact-row group flex items-center justify-between py-5 border-b border-zinc-100 hover:bg-zinc-50 -mx-4 px-4 transition-colors duration-200 rounded-lg"
          >
            <div className="flex items-center gap-5">
              <span className="font-body text-[10px] text-zinc-300 tracking-widest tabular-nums">
                {index}
              </span>
              <span className="font-display font-black text-sm tracking-widest uppercase text-primary">
                {label}
              </span>
            </div>
            <Icon
              size={18}
              strokeWidth={1.5}
              className="text-zinc-300 group-hover:text-primary transition-colors duration-200"
            />
          </a>
        ))}
      </div>

      {/* Email display */}
      <div className="contact-email mt-20">
        {/* ── PERSONALIZA: tu ciudad ── */}
        <p className="font-body text-[10px] tracking-widest2 uppercase text-muted mb-3">
          Based in Tu Ciudad
        </p>
        <div className="flex items-center gap-4">
          {/* ── PERSONALIZA: tu email ── */}
          <a
            href="mailto:tu@email.com"
            className="font-display font-black text-xl md:text-2xl uppercase tracking-wider text-primary hover:text-muted transition-colors duration-200"
          >
            TU@EMAIL.COM
          </a>
          <a
            href="mailto:tu@email.com"
            className="w-9 h-9 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 flex-shrink-0"
          >
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-24 font-body text-[10px] text-zinc-300 tracking-widest uppercase">
        {/* ── PERSONALIZA: tu nombre ── */}
        © {new Date().getFullYear()} Tu Nombre — Todos los derechos reservados
      </p>
    </section>
  );
}
