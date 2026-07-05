"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LuEye, LuGithub, LuArrowUpRight } from "react-icons/lu";
import { client, urlFor } from "@/client";
import { images } from "@/constants";
import { Section, SectionHeading } from "@/components/Section";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  description: string;
  projectLink?: string;
  codeLink?: string;
  cover: string;
  tags: string[];
};

const FILTERS = ["All", "UI/UX", "Web App", "Mobile App", "React JS"];

const FALLBACK: Project[] = [
  { title: "Analytics Dashboard", description: "Real-time data-viz dashboard with a custom charting layer.", cover: images.about01.src, tags: ["Web App", "React JS"], projectLink: "#", codeLink: "#" },
  { title: "Fintech Mobile App", description: "Cross-platform wallet with biometric auth and instant transfers.", cover: images.about02.src, tags: ["Mobile App"], projectLink: "#", codeLink: "#" },
  { title: "Design System", description: "A component library and tokens powering a multi-product suite.", cover: images.about03.src, tags: ["UI/UX"], projectLink: "#", codeLink: "#" },
  { title: "E-commerce Platform", description: "Headless storefront with a MERN backend and Stripe checkout.", cover: images.about04.src, tags: ["Web App", "React JS"], projectLink: "#", codeLink: "#" },
  { title: "ML Insights Tool", description: "Data-science pipeline surfacing predictions through a clean UI.", cover: images.mu5.src, tags: ["Web App", "UI/UX"], projectLink: "#", codeLink: "#" },
  { title: "Booking Experience", description: "Motion-rich booking flow with a focus on conversion.", cover: images.api.src, tags: ["Mobile App", "UI/UX"], projectLink: "#", codeLink: "#" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Work() {
  const [works, setWorks] = useState<Project[]>([]);
  const [active, setActive] = useState("All");

  useEffect(() => {
    client
      .fetch(`*[_type == "works"]`)
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setWorks(
            data.map((w: any) => ({
              title: w.title,
              description: w.description,
              projectLink: w.projectLink,
              codeLink: w.codeLink,
              cover: w.imgUrl ? urlFor(w.imgUrl).url() : "",
              tags: w.tags ?? [],
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const items = works.length ? works : FALLBACK;

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((w) =>
      w.tags?.some((t) => t.toLowerCase() === active.toLowerCase())
    );
  }, [items, active]);

  return (
    <Section id="work">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          index="02"
          eyebrow="Work"
          title={
            <>
              Selected <span className="accent-text">work</span>.
            </>
          }
          description="A few projects where design and engineering meet. Every build is fast, responsive and considered."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "relative rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors",
                active === f ? "text-white" : "text-muted hover:text-ink"
              )}
            >
              {active === f && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-accent shadow-glow"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: EASE }}
              className={cn(
                "group relative aspect-[4/3] overflow-hidden rounded-bento border border-white/60 bg-white/40 shadow-glass backdrop-blur-md lg:aspect-auto",
                i === 0 && "lg:col-span-2 lg:row-span-2"
              )}
            >
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-accent-grad opacity-20" />
              )}

              {/* Readability gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

              {/* Hover actions */}
              <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                {p.projectLink && (
                  <a
                    href={p.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${p.title} live`}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink backdrop-blur-md transition-transform hover:scale-95"
                  >
                    <LuEye size={17} />
                  </a>
                )}
                {p.codeLink && (
                  <a
                    href={p.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${p.title} source`}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink backdrop-blur-md transition-transform hover:scale-95"
                  >
                    <LuGithub size={17} />
                  </a>
                )}
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {p.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-wider text-white/90 backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white sm:text-xl">
                  {p.title}
                  <LuArrowUpRight
                    size={18}
                    className="text-white/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </h3>
                <p className="mt-1.5 max-w-md text-[0.88rem] leading-relaxed text-white/75 line-clamp-2">
                  {p.description}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-12 grid place-items-center rounded-bento border border-dashed border-line py-16 text-center">
          <p className="font-display text-lg text-ink">Nothing here yet</p>
          <p className="mt-1 text-sm text-muted">
            No projects tagged “{active}” — check back soon.
          </p>
        </div>
      )}
    </Section>
  );
}
