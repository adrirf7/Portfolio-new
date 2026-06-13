"use client";

const WORDS = [
  "FRONTEND DEVELOPER",
  "WEB DEVELOPER",
  "REACT",
  "TYPESCRIPT",
  "REACT NATIVE",
  "CLEAN CODE",
  "AVAILABLE FOR WORK",
  "MOBILE APPS",
  "NODE.JS",
  "UI / UX",
];

const ITEMS = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

function BannerRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="overflow-hidden">
      <div className={reverse ? "text-banner-track-reverse" : "text-banner-track"}>
        {ITEMS.map((word, i) => (
          <span key={i} className="flex items-center" style={{ marginRight: "2rem", flexShrink: 0 }}>
            <span className="font-display font-black text-sm sm:text-base md:text-xl uppercase tracking-widest text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
              {word}
            </span>
            <span className="ml-4 md:ml-8 text-teal" style={{ fontSize: "0.6rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TextBanner() {
  return (
    <div className="border-y border-zinc-200 dark:border-zinc-800 py-4 flex flex-col gap-3 transition-colors duration-300">
      <BannerRow />
      <BannerRow reverse />
    </div>
  );
}
