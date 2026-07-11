"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { LuArrowUpRight, LuArrowDown } from "react-icons/lu";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { images, variable } from "@/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HEADLINE = [
  { text: "I design & build", accent: false },
  { text: "fast, elegant", accent: true },
  { text: "software.", accent: false },
];

const SERVICES = [
  "Web Development",
  "Data Science",
  "UI / UX Design",
  "Mobile Apps",
  "API Engineering",
  "Machine Learning",
];

/* ── Magnetic wrapper ── */
function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Rotating "open to work" seal ── */
function Seal() {
  return (
    <div className="relative grid h-24 w-24 place-items-center rounded-full border border-white/70 bg-white/60 shadow-glass backdrop-blur-md sm:h-28 sm:w-28">
      <div className="absolute inset-0 animate-spinSlow">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path
              id="sealPath"
              d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            />
          </defs>
          <text className="fill-ink font-mono text-[8.4px] uppercase tracking-[0.16em]">
            <textPath href="#sealPath">
              Open to work • Available for freelance •
            </textPath>
          </text>
        </svg>
      </div>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white">
        <LuArrowDown size={16} />
      </span>
    </div>
  );
}

export default function Header() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Indian/Antananarivo",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden pb-10 pt-28 sm:pt-32"
    >
      {/* Oversized ghost wordmark — brand watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[3%] top-[22%] -z-10 select-none whitespace-nowrap font-display text-[14vw] font-bold uppercase leading-none tracking-tighter text-accent/[0.05] sm:top-[14%]"
      >
        GHOST
      </span>

      <div className="container-x">
        {/* Editorial meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-10 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.2em] text-faint"
        >
          <span>Portfolio — &apos;24</span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Antananarivo, MG · {time || "--:--"} local
          </span>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          {/* ── Left: copy ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-[0.8rem] font-medium text-ink shadow-glass backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Fitiavana R. — Fullstack Developer &amp; Data Scientist
            </motion.div>

            {/* Kinetic clip-reveal headline */}
            <h1 className="font-display text-[clamp(2.7rem,7.4vw,6rem)] font-bold leading-[0.95] tracking-tighter text-ink">
              {HEADLINE.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    className="block"
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + i * 0.11, duration: 0.95, ease: EASE }}
                  >
                    {line.accent ? (
                      <span className="accent-text">{line.text}</span>
                    ) : (
                      line.text
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
              className="lede mt-7"
            >
              A fullstack developer &amp; data scientist shipping performant web
              and mobile products end-to-end — from data pipelines to
              pixel-perfect interfaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.7, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a href="#work" className="btn-primary">
                  View my work
                  <LuArrowUpRight size={18} />
                </a>
              </Magnetic>
              <a href="#contact" className="btn-ghost">
                Let&apos;s talk
              </a>

              <div className="ml-1 flex items-center gap-2">
                {[
                  { href: variable.socialMedia.github, Icon: BsGithub, label: "GitHub" },
                  { href: variable.socialMedia.facebook, Icon: FaFacebookF, label: "Facebook" },
                  { href: variable.socialMedia.instagram, Icon: BsInstagram, label: "Instagram" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-accent/12 bg-white/55 text-muted backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: portrait ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-white/70 shadow-lift">
              <motion.div style={{ y: yImg, scale: scaleImg }} className="absolute inset-0">
                <Image
                  priority
                  src={images.profile.src}
                  alt="Portrait of Fitiavana"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover object-top"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
              <div className="absolute inset-0 bg-accent/[0.06] mix-blend-multiply" />

              {/* status chip */}
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-3 py-1.5 text-[0.72rem] font-medium text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available
              </div>

              {/* name plate — right-aligned to clear the seal */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-end p-6 pl-24 text-right">
                <p className="font-display text-2xl font-semibold text-white">
                  Fitiavana R.
                </p>
                <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white/70">
                  Fullstack · Data · Design
                </p>
              </div>
            </div>

            {/* Rotating seal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
              className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8"
            >
              <Seal />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Kinetic services marquee */}
      <div className="marquee-mask relative mt-16 overflow-hidden border-y border-line/60 py-5 sm:mt-20">
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex shrink-0 items-center gap-8 pr-8"
              aria-hidden={dup === 1}
            >
              {SERVICES.map((s) => (
                <span key={`${dup}-${s}`} className="flex items-center gap-8">
                  <span className="font-display text-2xl font-medium text-ink/80 sm:text-3xl">
                    {s}
                  </span>
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
