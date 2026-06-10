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
  { id: 1, category: "Web" as const,    title: "Project Alpha", description: "Brief description of the project and its technical impact.", image: "/projects/project1.jpg", href: "https://github.com/tu-usuario/proyecto-alpha" },
  { id: 2, category: "Design" as const, title: "Project Beta",  description: "Brief description of the design or UX project.",           image: "/projects/project2.jpg", href: "https://github.com/tu-usuario/proyecto-beta"  },
  { id: 3, category: "Web" as const,    title: "Project Gamma", description: "Full-stack web infrastructure and development.",            image: "/projects/project3.jpg", href: "https://github.com/tu-usuario/proyecto-gamma" },
  { id: 4, category: "Design" as const, title: "Project Delta", description: "Design system and prototyping in Figma.",                  image: "/projects/project4.jpg", href: "https://github.com/tu-usuario/proyecto-delta" },
];

const FILTERS: Category[] = ["All", "Web", "Design"];
type Project = (typeof PROJECTS)[number];

function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3 cursor-pointer">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        {!imgError ? (
          <Image
            src={project.image} alt={project.title} fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
            <span className="font-body text-[10px] text-zinc-400 tracking-widest text-center px-4">
              Add image at<br />{project.image}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowUpRight size={14} strokeWidth={2} className="text-zinc-900 dark:text-zinc-100" />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-body text-[10px] tracking-widest uppercase text-zinc-400 font-medium">
            {project.category === "Web" ? "Development" : "Visual Design"}
          </span>
          <ArrowUpRight size={14} strokeWidth={1.5} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
        </div>
        <h3 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100 transition-colors duration-300">{project.title}</h3>
        <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1 transition-colors duration-300">{project.description}</p>
      </div>
    </a>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

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
      className="grid-bg py-16 px-16 md:px-32 bg-white dark:bg-zinc-950 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
        <div>
          <p className="section-label projects-header mb-4">Portfolio</p>
          <h2 className="heading-split projects-header mb-3">
            Featured <span className="gray">Works</span>
          </h2>
          <p className="projects-header font-body text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed transition-colors duration-300">
            Frontend development & UI/UX engineering — Figma prototypes, design systems and UX-first implementations.
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
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:border-zinc-900 dark:hover:border-zinc-300"
              }`}
            >
              {f === "All"    && <span className="opacity-60 text-[10px]">⊞</span>}
              {f === "Web"    && <span className="opacity-60 text-[10px]">&lt;/&gt;</span>}
              {f === "Design" && <span className="opacity-60 text-[10px]">◎</span>}
              {f}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
          <span className="font-body text-[10px] tracking-widest uppercase text-zinc-400">View More Projects</span>
          <div className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-zinc-100 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 group-hover:border-zinc-900 dark:group-hover:border-zinc-100 transition-all duration-200">
            <ArrowUpRight size={14} />
          </div>
        </a>
      </div>
    </section>
  );
}
