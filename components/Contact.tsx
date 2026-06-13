"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_LINKS = [
  { index: "01", label: "Email",    icon: Mail,     href: "mailto:rodriguezfadrian7@gmail.com"                  },
  { index: "02", label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/adrian-rodriguez-fernandez/" },
  { index: "03", label: "GitHub",   icon: Github,   href: "https://github.com/adrirf7"                          },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".contact-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-row", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".contact-email",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-email", start: "top 90%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="grid-bg py-16 px-6 sm:px-10 md:px-16 lg:px-32 transition-colors duration-300"
    >
      <p className="section-label contact-header mb-4">Available for Work</p>
      <h2 className="heading-split contact-header mb-8">
        Get In <span className="gray">Touch</span>
      </h2>

      <div className="flex flex-col border-t border-zinc-100 dark:border-zinc-800 max-w-3xl transition-colors duration-300">
        {CONTACT_LINKS.map(({ index, label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="contact-row group flex items-center justify-between py-5 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 -mx-4 px-4 transition-colors duration-200 rounded-lg"
          >
            <div className="flex items-center gap-5">
              <span className="font-body text-[10px] text-zinc-300 dark:text-zinc-600 tracking-widest tabular-nums transition-colors duration-300">{index}</span>
              <span className="font-display font-black text-sm tracking-widest uppercase text-zinc-900 dark:text-zinc-100 transition-colors duration-300">{label}</span>
            </div>
            <Icon size={18} strokeWidth={1.5} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors duration-200" />
          </a>
        ))}
      </div>

      <div className="contact-email mt-10 md:mt-20">
        <p className="font-body text-[10px] tracking-widest text-zinc-400 uppercase mb-3">
          Based in Madrid, España
        </p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:rodriguezfadrian7@gmail.com"
            className="font-display font-black text-sm sm:text-lg md:text-2xl uppercase tracking-wider text-zinc-900 dark:text-zinc-100 hover:text-zinc-400 transition-colors duration-200 break-all"
          >
            RODRIGUEZFADRIAN7@GMAIL.COM
          </a>
          <a
            href="mailto:rodriguezfadrian7@gmail.com"
            className="w-10 h-10 rounded-full border border-zinc-900 dark:border-zinc-100 flex items-center justify-center hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-900 text-zinc-900 dark:text-zinc-100 transition-all duration-200 flex-shrink-0"
          >
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </div>
      </div>

      <p className="mt-24 font-body text-[10px] text-zinc-300 dark:text-zinc-700 tracking-widest uppercase transition-colors duration-300">
        © {new Date().getFullYear()} Adrian Rodriguez — All rights reserved
      </p>
    </section>
  );
}
