"use client";

import { useState } from "react";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuSend,
  LuCheck,
  LuArrowUp,
  LuAlertTriangle,
  LuArrowUpRight,
} from "react-icons/lu";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { client } from "@/client";
import { variable } from "@/constants";
import { Section } from "@/components/Section";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Form = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Form, string>>;
type Status = "idle" | "loading" | "success" | "error";

const CONTACTS = [
  { Icon: LuMail, label: "Email", value: "Ghostrex2@gmail.com", href: "mailto:Ghostrex2@gmail.com" },
  { Icon: LuPhone, label: "Phone", value: "+261 32 02 645 58", href: "tel:+261320264558" },
  { Icon: LuMapPin, label: "Based in", value: "Antananarivo, Madagascar", href: null },
];

const SOCIALS = [
  { href: variable.socialMedia.github, Icon: BsGithub, label: "GitHub" },
  { href: variable.socialMedia.facebook, Icon: FaFacebookF, label: "Facebook" },
  { href: variable.socialMedia.instagram, Icon: BsInstagram, label: "Instagram" },
];

export default function Footer() {
  const [form, setForm] = useState<Form>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (data: Form): Errors => {
    const e: Errors = {};
    if (!data.name.trim()) e.name = "Please enter your name.";
    if (!data.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "That email doesn't look right.";
    if (!data.message.trim()) e.message = "Tell me a little about it.";
    return e;
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof Form])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    const fieldErr = validate(form)[name as keyof Form];
    setErrors((prev) => ({ ...prev, [name]: fieldErr }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    try {
      setStatus("loading");
      await client.create({ _type: "contact", ...form });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Section id="contact">
        <Reveal className="glass overflow-hidden !rounded-[2rem] !p-0">
          <div className="lg:grid lg:grid-cols-[0.92fr_1.08fr]">
            {/* ── Left: indigo info panel ── */}
            <div className="relative overflow-hidden bg-accent-grad p-8 text-white sm:p-10">
              {/* decor */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                <span className="absolute -bottom-8 right-6 select-none font-display text-[9rem] font-bold leading-none text-white/[0.06]">
                  ✦
                </span>
              </div>

              <div className="relative">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-white/70">
                  04 — Contact
                </span>
                <h2 className="mt-5 font-display text-[clamp(2rem,4vw,2.9rem)] font-bold leading-[1.02] tracking-tighter">
                  Let&apos;s build
                  <br />
                  something great.
                </h2>
                <p className="mt-4 max-w-sm text-[0.98rem] leading-relaxed text-white/80">
                  Have a project, a role, or just want to say hi? My inbox is
                  always open — I typically reply within a day.
                </p>

                {/* contact rows */}
                <div className="mt-9 flex flex-col gap-3">
                  {CONTACTS.map(({ Icon, label, value, href }) => {
                    const inner = (
                      <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-3.5 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.16]">
                        <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-white/15 text-white">
                          <Icon size={18} />
                        </span>
                        <div className="min-w-0">
                          <div className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-white/60">
                            {label}
                          </div>
                          <div className="truncate text-[0.95rem] font-medium text-white">
                            {value}
                          </div>
                        </div>
                        {href && (
                          <LuArrowUpRight
                            size={16}
                            className="ml-auto text-white/50"
                          />
                        )}
                      </div>
                    );
                    return href ? (
                      <a key={label} href={href}>
                        {inner}
                      </a>
                    ) : (
                      <div key={label}>{inner}</div>
                    );
                  })}
                </div>

                {/* socials + status */}
                <div className="mt-9 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {SOCIALS.map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                      >
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-[0.75rem] font-medium text-white">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                    </span>
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="flex flex-col justify-center bg-white/60 p-8 sm:p-10">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center py-10 text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <LuCheck size={30} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                    Message sent — thank you!
                  </h3>
                  <p className="mt-2 max-w-sm text-muted">
                    I&apos;ll get back to you as soon as I can. In the meantime,
                    feel free to explore my work.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ name: "", email: "", message: "" });
                      setStatus("idle");
                    }}
                    className="btn-ghost mt-8"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="field-label">
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-err" : undefined}
                        className={cn("field", errors.name && "border-red-400")}
                      />
                      {errors.name && (
                        <p id="name-err" role="alert" className="field-error">
                          <LuAlertTriangle size={13} /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="field-label">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-err" : undefined}
                        className={cn("field", errors.email && "border-red-400")}
                      />
                      {errors.email && (
                        <p id="email-err" role="alert" className="field-error">
                          <LuAlertTriangle size={13} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="message" className="field-label">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={8}
                      placeholder="Tell me about your project, timeline and goals…"
                      value={form.message}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-err" : undefined}
                      className={cn("field resize-none", errors.message && "border-red-400")}
                    />
                    {errors.message && (
                      <p id="message-err" role="alert" className="field-error">
                        <LuAlertTriangle size={13} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <p role="alert" className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      <LuAlertTriangle size={16} />
                      Something went wrong sending your message. Please try again
                      or email me directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <LuSend size={16} />
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center text-[0.8rem] text-faint">
                    I usually reply within a day — no spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Footer bar */}
      <footer className="border-t border-line/70">
        <div className="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-grad text-sm font-bold text-white">
              F.
            </span>
            <span className="font-display text-[0.95rem] font-semibold text-ink">
              Fitiavana<span className="text-accent">.</span>
            </span>
          </a>

          <p className="text-center text-[0.82rem] text-muted">
            © {2024} Fitiavana Randriambololomanana — Designed &amp; built with care.
          </p>

          <a
            href="#home"
            className="group flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/15 bg-white/50 transition-transform group-hover:-translate-y-0.5">
              <LuArrowUp size={14} />
            </span>
          </a>
        </div>
      </footer>
    </>
  );
}
