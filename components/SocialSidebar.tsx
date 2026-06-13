"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Linkedin, Github } from "lucide-react";

const SOCIALS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/adrian-rodriguez-fernandez/", label: "LinkedIn" },
  { icon: Github,   href: "https://github.com/adrirf7",                              label: "GitHub"   },
];

export default function SocialSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current!.children,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: "power2.out", delay: 1.2 }
    );
  }, []);

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1.15, duration: 0.2, ease: "power2.out" });
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: "power2.out" });
  };

  return (
    <div ref={sidebarRef} className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {SOCIALS.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm text-zinc-400 dark:text-zinc-500 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-900 transition-colors duration-200"
        >
          <Icon size={16} strokeWidth={1.5} />
          {/* Tooltip */}
          <span className="pointer-events-none absolute right-11 whitespace-nowrap font-body text-[10px] tracking-widest uppercase font-semibold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
