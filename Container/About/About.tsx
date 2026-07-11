"use client";

import { useEffect, useState } from "react";
import {
  LuCode2,
  LuSmartphone,
  LuPenTool,
  LuLayers,
  LuSparkles,
  LuArrowUpRight,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { client } from "@/client";
import { Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";

type About = { title: string; description: string };

const FALLBACK: About[] = [
  { title: "Web Development", description: "Fast, accessible web apps built with React, Next.js & modern tooling." },
  { title: "Mobile Development", description: "Cross-platform mobile experiences with Flutter & React Native." },
  { title: "UI / UX Design", description: "Clean, considered interfaces — from wireframe to pixel-perfect build." },
  { title: "Fullstack & Data", description: "End-to-end MERN systems, APIs and data-science pipelines." },
];

function iconFor(title: string): IconType {
  const t = title.toLowerCase();
  if (t.includes("mobile")) return LuSmartphone;
  if (t.includes("ui") || t.includes("ux") || t.includes("design")) return LuPenTool;
  if (t.includes("stack") || t.includes("data") || t.includes("mern") || t.includes("back")) return LuLayers;
  if (t.includes("web") || t.includes("front")) return LuCode2;
  return LuSparkles;
}

export default function About() {
  const [abouts, setAbouts] = useState<About[]>([]);

  useEffect(() => {
    client
      .fetch<About[]>(`*[_type == "abouts"]{title, description}`)
      .then((data) => Array.isArray(data) && data.length && setAbouts(data))
      .catch(() => {});
  }, []);

  const items = abouts.length ? abouts : FALLBACK;

  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            Good apps mean <span className="accent-text">good business.</span>
          </>
        }
        description="I'm a fullstack developer and data scientist who cares about the details that make software feel effortless — speed, clarity and craft."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        {/* Philosophy card */}
        <Reveal className="lg:col-span-5">
          <div className="bento-card flex h-full flex-col justify-between">
            <div>
              <span className="chip">Philosophy</span>
              <p className="mt-6 font-display text-2xl font-semibold leading-snug text-ink sm:text-[1.7rem]">
                I build products that are{" "}
                <span className="text-accent">fast</span>, accessible, and a
                genuine joy to use.
              </p>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
                Every decision — from architecture to micro-interaction — serves
                the person on the other side of the screen. Performance and
                polish aren&apos;t extras; they&apos;re the product.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Performance", "Accessibility", "Craft", "Reliability"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-white/50 px-3 py-1 text-[0.78rem] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Capability grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {items.slice(0, 4).map((about, i) => {
            const Icon = iconFor(about.title);
            return (
              <Reveal key={about.title + i} delay={i * 0.08} className="h-full">
                <div className="bento-card group h-full">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <Icon size={22} />
                    </span>
                    <span className="font-mono text-xs text-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                    {about.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                    {about.description}
                  </p>
                  <LuArrowUpRight
                    size={18}
                    className="mt-5 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
