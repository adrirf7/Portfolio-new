"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

const SKILLS: { name: string; icon?: string; iconLight?: string; iconDark?: string }[] = [
  { name: "HTML5",        icon: "html5.svg"                                                  },
  { name: "CSS3",         icon: "css_old.svg"                                                },
  { name: "JavaScript",   icon: "javascript.svg"                                             },
  { name: "TypeScript",   icon: "typescript.svg"                                             },
  { name: "Node.js",      icon: "nodejs.svg"                                                 },
  { name: "Java",         icon: "java.svg"                                                   },
  { name: "React",        iconLight: "react_light.svg",       iconDark: "react_dark.svg"     },
  { name: "Next.js",    iconLight: "nextjs_icon_dark.svg",  iconDark: "nextjs_icon_dark.svg"},
  { name: "React Native", iconLight: "react_light.svg",       iconDark: "react_dark.svg"     },
  { name: "Astro",        iconLight: "astro-icon-light.svg",  iconDark: "astro-icon-dark.svg"},
  { name: "Tailwind",     icon: "tailwindcss.svg"                                            },
  { name: "Bootstrap",    icon: "bootstrap.svg"                                              },
  { name: "Expo",         iconLight: "expo.svg",              iconDark: "expo_light.svg"     },
  { name: "MySQL",        iconLight: "mysql-icon-light.svg",  iconDark: "mysql-icon-dark.svg"},
  { name: "MongoDB",      icon: "mongodb-icon-dark.svg"                                      },
  { name: "Firebase",     icon: "firebase.svg"                                               },
  { name: "Vite",         icon: "vite.svg"                                                   },
  { name: "Git",          icon: "git.svg"                                                    },
  { name: "OpenRouter",   iconLight: "OpenRouter_light.svg", iconDark: "OpenRouter_dark.svg" },
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
      className="tag-pill flex items-center gap-2 shrink-0"
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
        ".skill-pill-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out",
          scrollTrigger: { trigger: ".skills-grid", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="grid-bg py-16 px-16 md:px-32 transition-colors duration-300"
    >
      <p className="section-label skills-label mb-4">Inventory</p>
      <h2 className="heading-split skills-label mb-10">
        Tech <span className="gray">Stack</span>
      </h2>

      <div className="skills-grid flex flex-wrap gap-3">
        {SKILLS.map((skill) => (
          <div key={skill.name} className="skill-pill-item opacity-0">
            <SkillPill {...skill} />
          </div>
        ))}
      </div>
    </section>
  );
}
