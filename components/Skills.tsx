"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

// icon: icono único · iconLight/iconDark: variantes por tema
const SKILLS: { name: string; icon?: string; iconLight?: string; iconDark?: string }[] = [
  { name: "HTML5",        icon: "html5.svg"                                                            },
  { name: "CSS3",         icon: "css_old.svg"                                                          },
  { name: "JavaScript",   icon: "javascript.svg"                                                       },
  { name: "TypeScript",   icon: "typescript.svg"                                                       },
  { name: "Node.js",      icon: "nodejs.svg"                                                           },
  { name: "Java",         icon: "java.svg"                                                             },
  { name: "React",        iconLight: "react_light.svg",        iconDark: "react_dark.svg"              },
  { name: "React Native", iconLight: "react_light.svg",        iconDark: "react_dark.svg"              },
  { name: "Astro",        iconLight: "astro-icon-light.svg",   iconDark: "astro-icon-dark.svg"         },
  { name: "Tailwind",     icon: "tailwindcss.svg"                                                      },
  { name: "Bootstrap",    icon: "bootstrap.svg"                                                        },
  { name: "Expo",         iconLight: "expo.svg",               iconDark: "expo_light.svg"             },
  { name: "MySQL",        iconLight: "mysql-icon-light.svg",    iconDark: "mysql-icon-dark.svg"        },
  { name: "MongoDB",      icon: "mongodb-icon-dark.svg"                                              },
  { name: "Firebase",     icon: "firebase.svg"                                                         },
  { name: "Vite",         icon: "vite.svg"                                                             },
  { name: "Git",          icon: "git.svg"                                                              },
];

function SkillPill({ name, icon, iconLight, iconDark }: (typeof SKILLS)[number]) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const pillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => setMounted(true), []);

  const src = icon
    ? `/icons/${icon}`
    : resolvedTheme === "dark"
    ? iconDark ? `/icons/${iconDark}` : undefined
    : iconLight ? `/icons/${iconLight}` : undefined;

  const handleMouseEnter = () => {
    gsap.to(pillRef.current, { y: -4, scale: 1.08, duration: 0.2, ease: "power2.out" });
  };
  const handleMouseLeave = () => {
    gsap.to(pillRef.current, { y: 0, scale: 1, duration: 0.25, ease: "power2.out" });
  };

  return (
    <span
      ref={pillRef}
      className="tag-pill flex items-center gap-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {mounted && src && !imgError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          style={{ height: "28px", width: "auto", display: "block", flexShrink: 0 }}
          onError={() => setImgError(true)}
        />
      )}
      {name}
    </span>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-label",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        pillsRef.current!.children,
        { opacity: 0, y: 25, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
          scrollTrigger: { trigger: pillsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="grid-bg py-16 px-16 md:px-32 bg-white dark:bg-zinc-950 transition-colors duration-300"
    >
      <p className="section-label skills-label mb-4">Inventory</p>
      <h2 className="heading-split skills-label mb-8">
        Tech <span className="gray">Stack</span>
      </h2>

      <div ref={pillsRef} className="flex flex-wrap gap-3 max-w-4xl">
        {SKILLS.map((skill) => (
          <SkillPill key={skill.name} {...skill} />
        ))}
      </div>
    </section>
  );
}
