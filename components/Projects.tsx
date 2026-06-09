"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Category = "All" | "Web" | "Design";

// ── PERSONALIZA: tus proyectos ──
const PROJECTS = [
  {
    id: 1,
    category: "Web" as const,
    title: "Proyecto Alpha",
    description: "Descripción breve del proyecto y su impacto técnico.",
    image: "/projects/project1.jpg", // ruta a tu imagen
    href: "https://github.com/tu-usuario/proyecto-alpha",
  },
  {
    id: 2,
    category: "Design" as const,
    title: "Proyecto Beta",
    description: "Descripción breve del proyecto de diseño o UX.",
    image: "/projects/project2.jpg",
    href: "https://github.com/tu-usuario/proyecto-beta",
  },
  {
    id: 3,
    category: "Web" as const,
    title: "Proyecto Gamma",
    description: "Infraestructura y desarrollo web full-stack.",
    image: "/projects/project3.jpg",
    href: "https://github.com/tu-usuario/proyecto-gamma",
  },
  {
    id: 4,
    category: "Design" as const,
    title: "Proyecto Delta",
    description: "Sistema de diseño y prototipado en Figma.",
    image: "/projects/project4.jpg",
    href: "https://github.com/tu-usuario/proyecto-delta",
  },
];

const FILTERS: Category[] = ["All", "Web", "Design"];

type Project = (typeof PROJECTS)[number];

function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100">
        {!imgError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-50 flex items-center justify-center">
            <span className="font-body text-[10px] text-zinc-400 tracking-widest text-center px-4">
              Añade imagen en<br />{project.image}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowUpRight size={14} strokeWidth={2} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-body text-[10px] tracking-widest uppercase text-muted font-medium">
            {project.category === "Web" ? "Development" : "Visual Design"}
          </span>
          <ArrowUpRight size={14} strokeWidth={1.5} className="text-muted group-hover:text-primary transition-colors" />
        </div>
        <h3 className="font-display font-bold text-base text-primary">{project.title}</h3>
        <p className="font-body text-xs text-muted leading-relaxed mt-1">{project.description}</p>
      </div>
    </a>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="grid-bg py-28 px-8 md:px-16"
    >
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
        <div>
          <p className="section-label projects-header mb-4">Portfolio</p>
          <h2 className="heading-split projects-header mb-3">
            Featured <span className="gray">Works</span>
          </h2>
          <p className="projects-header font-body text-sm text-muted max-w-md leading-relaxed">
            {/* ── PERSONALIZA: tu descripción de proyectos ── */}
            Desarrollo frontend e ingeniería UI/UX — prototipos Figma, sistemas de
            diseño e implementaciones UX-first.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 self-start md:self-end">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`flex items-center gap-1.5 text-xs tracking-widest uppercase font-semibold font-body px-4 py-2 rounded-full border transition-all duration-200 ${
                active === f
                  ? "bg-primary text-white border-primary"
                  : "border-zinc-200 text-primary hover:border-primary"
              }`}
            >
              {f === "All" && <span className="opacity-60 text-[10px]">⊞</span>}
              {f === "Web" && <span className="opacity-60 text-[10px]">&lt;/&gt;</span>}
              {f === "Design" && <span className="opacity-60 text-[10px]">◎</span>}
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
      >
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* View more */}
      <div className="flex justify-center mt-16">
        <a
          href="https://github.com/tu-usuario" // ── PERSONALIZA
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 group"
        >
          <span className="font-body text-[10px] tracking-widest2 uppercase text-muted">
            View More Projects
          </span>
          <div className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
            <ArrowUpRight size={14} />
          </div>
        </a>
      </div>
    </section>
  );
}
