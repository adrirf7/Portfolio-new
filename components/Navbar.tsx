"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Connect",    href: "#connect"    },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm border-b border-transparent dark:border-zinc-800/50 transition-colors duration-300"
    >
      {/* Logo */}
      <a href="#hero" onClick={(e) => handleScroll(e, "#hero")} className="flex flex-col leading-tight">
        <span className="font-display font-black text-[18px] tracking-normal uppercase">
          {/* ── PERSONALIZA ── */}
          <span className="text-zinc-900 dark:text-zinc-100">ADRIAN</span>{" "}
          <span className="text-zinc-400">RODRIGUEZ</span>
        </span>
        <span className="font-body text-[9px] tracking-widest text-zinc-400 uppercase mt-0.5 ml-5">
          — Developer
        </span>
      </a>

      {/* Nav links + toggle */}
      <div className="flex items-center gap-3">
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-full px-2 py-2 flex items-center gap-1 transition-colors duration-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="nav-link px-4 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
