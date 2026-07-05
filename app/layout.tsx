import "@/styles/globals.scss";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head />
      <body>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        {/* Ambient background — grid + soft brand glows */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-20 bg-grid bg-grid opacity-[0.5]"
          style={{
            maskImage:
              "radial-gradient(ellipse at 50% 0%, #000 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 0%, #000 0%, transparent 75%)",
          }}
        />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
          <div className="blob left-[-10%] top-[-8%] h-[38rem] w-[38rem] bg-accent/25 animate-pulseGlow" />
          <div className="blob right-[-12%] top-[30%] h-[34rem] w-[34rem] bg-plum/20 animate-floatySlow" />
          <div className="blob bottom-[-10%] left-[20%] h-[30rem] w-[30rem] bg-accent-300/25" />
        </div>

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
