import { Header, Footer, About, Testimonial, Work, Skills, } from '@/Container'
import { Navbar } from '@/components'
import { Metadata } from 'next'

export const metadata : Metadata = {
  title: "Fitiavana's portfolio",
  description: "Fitiavana's portfolio 2024",
  keywords: "Fitiavana's portfolio",
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
