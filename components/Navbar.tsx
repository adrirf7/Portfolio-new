"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-16 py-4 md:py-5 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm border-b border-transparent dark:border-zinc-800/50 transition-colors duration-300"
      >
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleScroll(e, "#hero")} className="flex flex-col leading-tight">
          <span className="font-display font-black text-[14px] md:text-[18px] tracking-normal uppercase">
            <span className="text-zinc-900 dark:text-zinc-100">ADRIAN</span>{" "}
            <span className="text-zinc-400">RODRIGUEZ</span>
          </span>
          <span className="font-body text-[9px] tracking-widest text-zinc-400 uppercase mt-0.5 ml-5">
            — Developer
          </span>
        </a>

        {/* Desktop nav links + toggle */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div
          className="fixed z-40 md:hidden bg-white dark:bg-zinc-950 flex flex-col items-center justify-center gap-8"
          style={{ top: 0, left: 0, width: "100vw", height: "100vh", overflow: "hidden" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="font-display font-black text-2xl uppercase tracking-wide text-zinc-900 dark:text-zinc-100 hover:text-zinc-400 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
