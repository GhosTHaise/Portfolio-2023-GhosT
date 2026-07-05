import { Header, Footer, About, Testimonial, Work, Skills } from "@/Container";
import { Navbar } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  keywords: "Fitiavana's portfolio 2024 | GhosTHaise",
  title: "Fitiavana's portfolio",
  description:
    "Explore the portfolio of Fitiavana, a passionate fullstack developer and data scientist. Dedicated to reaching the greatest heights in technology, Fitiavana showcases expertise in both development and data science.",
  other: {
    "theme-color": "#edf2f8",
    "color-scheme": "light",
    "twitter:image": "https://i.ibb.co/PT9VLfh/fitiavana-portfolio.png",
    "twitter:card": "summary_large_image",
    "twitter:title": "Fitiavana's portfolio",
    "twitter:description":
      "Explore the portfolio of Fitiavana, a passionate fullstack developer and data scientist. Dedicated to reaching the greatest heights in technology, Fitiavana showcases expertise in both development and data science.",
    "og:url": "https://fitiavanasambatraportfolio.netlify.app/",
    "og:image": "https://i.ibb.co/PT9VLfh/fitiavana-portfolio.png",
    "og:type": "website",
    "og:title": "Fitiavana's portfolio",
    "og:description":
      "Explore the portfolio of Fitiavana, a passionate fullstack developer and data scientist. Dedicated to reaching the greatest heights in technology, Fitiavana showcases expertise in both development and data science.",
  },
};

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Header />
        <About />
        <Work />
        {/* @ts-expect-error Async Server Component (React 18 types) */}
        <Skills />
        <Testimonial />
        <Footer />
      </main>
    </>
  );
}
