"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Linkedin, Github, Twitter } from "lucide-react";

const SOCIALS = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/tu-perfil", // ── PERSONALIZA
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/tu-usuario", // ── PERSONALIZA
    label: "GitHub",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/tu-usuario", // ── PERSONALIZA
    label: "Twitter",
  },
];

export default function SocialSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current!.children,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        delay: 1.2,
      }
    );
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="fixed right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-5"
    >
      {SOCIALS.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-zinc-300 hover:text-primary transition-colors duration-200"
        >
          <Icon size={18} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}
