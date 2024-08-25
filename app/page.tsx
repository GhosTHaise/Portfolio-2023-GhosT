import { Header, Footer, About, Testimonial, Work, Skills, } from '@/Container'
import { Navbar } from '@/components'
import { Metadata } from 'next'

export const metadata : Metadata = {
  title: "Fitiavana's portfolio",
  description: "Fitiavana's portfolio 2024",
  keywords: "Fitiavana's portfolio",
  other : {
    "theme-color" : "#0d1117",
    "color-scheme" : "dark-only",
    "twitter:image" : "https://i.ibb.co/bdSxqGf/New-Profil.png",
    "twitter:card" : "summary_large_image",
    "og:url" : "jsmastery.pro",
    "og:image" : "https://i.ibb.co/bdSxqGf/New-Profil.png",
    "og:type" : "website"
  }
}

export const dynamic = "force-static"

export default function Home() {
  return (
    <main className='app'>
      {/* Navbar */}
      <Navbar />
      {/* Header */}
      <Header />
      {/* About */}
      <About />
      {/* Work */}
      <Work />
      {/* Skills */}
      <Skills />
      {/* Testimonial */}
      <Testimonial />
      {/* Footer */}
      <Footer />
    </main>
  )
}
