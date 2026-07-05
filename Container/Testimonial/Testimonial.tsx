"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LuQuote } from "react-icons/lu";
import { client, urlFor } from "@/client";
import { images } from "@/constants";
import { Section } from "@/components/Section";
import Reveal from "@/components/Reveal";

type Brand = { name: string; cover: string };
type Testimonial = {
  name: string;
  company: string;
  feedback: string;
  cover: string;
};

const FALLBACK_BRANDS: Brand[] = [
  { name: "Amazon", cover: images.amazon.src },
  { name: "Adidas", cover: images.adidas.src },
  { name: "Asus", cover: images.asus.src },
  { name: "Bolt", cover: images.bolt.src },
  { name: "New Balance", cover: images.nb.src },
  { name: "Skype", cover: images.skype.src },
  { name: "Spotify", cover: images.spotify.src },
];

export default function Testimonial() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "brands"]`)
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setBrands(
            data.map((b: any) => ({
              name: b.name,
              cover: b.imgUrl ? urlFor(b.imgUrl).url() : "",
            }))
          );
        }
      })
      .catch(() => {});

    client
      .fetch(`*[_type == "testimonials"]`)
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setTestimonials(
            data.map((t: any) => ({
              name: t.name,
              company: t.company,
              feedback: t.feedback,
              cover: t.imgurl ? urlFor(t.imgurl).url() : "",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const brandList = brands.length ? brands : FALLBACK_BRANDS;

  return (
    <Section id="testimonials" className="!py-16 sm:!py-20">
      {/* Trusted-by marquee */}
      <Reveal className="flex flex-col items-center text-center">
        <span className="eyebrow before:hidden">Trusted by teams &amp; brands</span>
      </Reveal>

      <div className="marquee-mask relative mt-10 overflow-hidden">
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
              aria-hidden={dup === 1}
            >
              {brandList.map((brand) => (
                <Image
                  key={`${dup}-${brand.name}`}
                  src={brand.cover}
                  alt={brand.name}
                  width={120}
                  height={34}
                  className="h-7 w-auto object-contain opacity-45 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial cards (only when CMS has them) */}
      {testimonials.length > 0 && (
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="h-full">
              <figure className="bento-card flex h-full flex-col">
                <LuQuote className="text-accent/40" size={30} />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink">
                  “{t.feedback}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  {t.cover && (
                    <Image
                      src={t.cover}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-display text-sm font-semibold text-ink">
                      {t.name}
                    </div>
                    <div className="font-mono text-[0.72rem] uppercase tracking-wider text-muted">
                      {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
