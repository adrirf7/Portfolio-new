"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

type Category = "All" | "Web" | "Mobile";

type Tech = { icon?: string; iconLight?: string; iconDark?: string; label: string };

const PROJECTS = [
  {
    id: 1, category: "Mobile" as const,
    title: "PiggyBank",
    description: "Cross-platform mobile finance app with AI assistant, real-time analytics, multi-account support and production builds via EAS.",
    image: "/projects/dark/piggybank-dark.webp",
    href: "https://github.com/adrirf7/piggybank",
    github: "https://github.com/adrirf7/piggybank",
    techs: [
      { iconLight: "/icons/react_light.svg",       iconDark: "/icons/react_dark.svg",       label: "React Native" },
      { iconLight: "/icons/expo.svg",               iconDark: "/icons/expo_light.svg",        label: "Expo"         },
      { icon: "/icons/tailwindcss.svg",                                                        label: "Tailwind"     },
      { icon: "/icons/firebase.svg",                                                           label: "Firebase"     },
      { iconLight: "/icons/OpenRouter_light.svg",   iconDark: "/icons/OpenRouter_dark.svg",   label: "OpenRouter"   },
      { icon: "/icons/typescript.svg",                                                         label: "TypeScript"   },
    ] as Tech[],
  },
  {
    id: 2, category: "Web" as const,
    title: "Marketly",
    description: "Full-stack e-commerce platform with authenticated admin panel, content CRUD, competition API integration and GitHub API as CMS.",
    image: "/projects/dark/marketly-dark.webp",
    href: "https://marketly-adrirf7.vercel.app/",
    github: "https://github.com/adrirf7/Marketly",
    techs: [
      { icon: "/icons/typescript.svg",                                                      label: "TypeScript" },
      { iconLight: "/icons/astro-icon-light.svg", iconDark: "/icons/astro-icon-dark.svg",   label: "Astro"      },
      { iconLight: "/icons/react_light.svg",       iconDark: "/icons/react_dark.svg",        label: "React"      },
      { icon: "/icons/nodejs.svg",                                                           label: "Node.js"    },
      { iconLight: "/icons/mongodb-icon-dark.svg", iconDark: "/icons/mongodb-icon-dark.svg", label: "MongoDB"    },
      { icon: "/icons/tailwindcss.svg",                                                      label: "Tailwind"   },
    ] as Tech[],
  },
  {
    id: 3, category: "Web" as const,
    title: "React Shop",
    description: "Shopping cart app with product catalog, context API state management and dynamic filtering.",
    image: "/projects/dark/react-shop-dark.webp",
    href: "https://shopping-cart-gy9z.vercel.app/",
    github: "https://github.com/adrirf7/Shopping-Cart",
    techs: [
      { iconLight: "/icons/astro-icon-light.svg", iconDark: "/icons/astro-icon-dark.svg", label: "Astro"      },
      { icon: "/icons/javascript.svg",                                                      label: "JavaScript" },
      { icon: "/icons/css_old.svg",                                                         label: "CSS"        },
    ] as Tech[],
  },
  {
    id: 4, category: "Web" as const,
    title: "Black Jack",
    description: "Browser-based blackjack game with full card logic, bet system and responsive layout.",
    image: "/projects/dark/black-jack-dark.webp",
    href: "https://black-jack-adrirf7.vercel.app/",
    github: "https://github.com/adrirf7/Black-Jack",
    techs: [
      { icon: "/icons/javascript.svg", label: "JavaScript" },
      { icon: "/icons/vite.svg",       label: "Vite"       },
      { icon: "/icons/css_old.svg",    label: "CSS"        },
    ] as Tech[],
  },
  {
    id: 5, category: "Web" as const,
    title: "Snake Game",
    description: "Classic snake game built with canvas API, keyboard controls and increasing difficulty.",
    image: "/projects/dark/snake-game-dark.webp",
    href: "https://snake-adrirf7.vercel.app/",
    github: "https://github.com/adrirf7/Snake",
    techs: [
      { icon: "/icons/javascript.svg", label: "JavaScript" },
      { icon: "/icons/vite.svg",       label: "Vite"       },
      { icon: "/icons/css_old.svg",    label: "CSS"        },
    ] as Tech[],
  },
  {
    id: 6, category: "Web" as const,
    title: "Todo App",
    description: "Task manager with status filters, local storage persistence and smooth UI transitions.",
    image: "/projects/dark/todo-dark.webp",
    href: "https://todo-adrirf7.vercel.app/",
    github: "https://github.com/adrirf7/Todo",
    techs: [
      { icon: "/icons/javascript.svg",                                                      label: "JavaScript" },
      { iconLight: "/icons/astro-icon-light.svg", iconDark: "/icons/astro-icon-dark.svg",   label: "Astro"      },
    ] as Tech[],
  },
];

type Project = (typeof PROJECTS)[number];
const FILTERS: Category[] = ["All", "Web", "Mobile"];

function TechIcon({ tech, dark }: { tech: Tech; dark: boolean }) {
  const src = tech.icon ?? (dark ? tech.iconDark : tech.iconLight);
  if (!src) return null;
  return (
    <div className="relative group/tech flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={tech.label}
        style={{ height: 18, width: "auto", display: "block", flexShrink: 0 }}
      />
      <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-[10px] tracking-widest uppercase font-semibold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-full opacity-0 group-hover/tech:opacity-100 transition-opacity duration-150">
        {tech.label}
      </span>
    </div>
  );
}
const INITIAL_COUNT = 4;

function ProjectCard({ project }: { project: Project }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const src = isDark
    ? project.image
    : project.image.replace("/dark/", "/light/").replace("-dark.", "-light.");

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: x * 14,
      rotateX: -y * 10,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <a
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col cursor-pointer h-full"
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-colors duration-300"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={src}
          src={src}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowUpRight size={14} strokeWidth={2} className="text-zinc-900 dark:text-zinc-100" />
        </div>
      </div>
      <div style={{ transform: "translateZ(10px)" }} className="flex flex-col flex-1 pt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-body text-[10px] tracking-widest uppercase text-zinc-400 font-medium">
            {project.category === "Mobile" ? "Mobile App" : "Development"}
          </span>
          <ArrowUpRight size={14} strokeWidth={1.5} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
        </div>
        <h3 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100 transition-colors duration-300">{project.title}</h3>
        <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1 transition-colors duration-300 flex-1">{project.description}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            {project.techs.map((t) => (
              <TechIcon key={t.label} tech={t} dark={isDark} />
            ))}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(project.github, "_blank", "noopener,noreferrer");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 font-body text-[10px] tracking-widest uppercase font-semibold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-900 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-200 shrink-0 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Repo
          </button>
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const [active, setActive]     = useState<Category>("All");
  const [showAll, setShowAll]   = useState(false);
  const sectionRef              = useRef<HTMLElement>(null);
  const gridRef                 = useRef<HTMLDivElement>(null);
  const extraRef                = useRef<HTMLDivElement>(null);

  const filtered  = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const visible   = filtered.slice(0, INITIAL_COUNT);
  const extra     = filtered.slice(INITIAL_COUNT);
  const hasMore   = extra.length > 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setShowAll(false);
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, [active]);

  // Animate extra projects when revealed
  useEffect(() => {
    if (!extraRef.current || !showAll) return;
    gsap.fromTo(
      extraRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, [showAll]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="grid-bg py-16 px-16 md:px-32 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
        <div>
          <p className="section-label projects-header mb-4">Portfolio</p>
          <h2 className="heading-split projects-header mb-3">
            Featured <span className="gray">Works</span>
          </h2>
          <p className="projects-header font-body text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed transition-colors duration-300">
            Frontend development & UI/UX engineering — web, apps, games and interactive experiences.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-end">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`flex items-center gap-1.5 text-xs tracking-widest uppercase font-semibold font-body px-4 py-2 rounded-full border transition-all duration-200 ${
                active === f
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:border-zinc-900 dark:hover:border-zinc-300"
              }`}
            >
              {f === "All"    && <span className="opacity-60 text-[10px]">⊞</span>}
              {f === "Web"    && <span className="opacity-60 text-[10px]">&lt;/&gt;</span>}
              {f === "Mobile" && <span className="opacity-60 text-[10px]">◎</span>}
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Initial 4 */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 items-stretch">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Extra projects — revealed on toggle */}
      {showAll && extra.length > 0 && (
        <div ref={extraRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 items-stretch">
          {extra.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Toggle button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="flex flex-col items-center gap-2 group"
          >
            <span className="font-body text-[10px] tracking-widest uppercase text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors duration-200">
              {showAll ? "Show less" : "View more"}
            </span>
            <div className={`w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-zinc-100 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 group-hover:border-zinc-900 dark:group-hover:border-zinc-100 transition-all duration-200 ${showAll ? "rotate-180" : ""}`}
              style={{ transition: "transform 0.3s ease, background-color 0.2s, color 0.2s, border-color 0.2s" }}
            >
              <ChevronDown size={14} />
            </div>
          </button>
        </div>
      )}
    </section>
  );
}
