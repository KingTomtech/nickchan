import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './sections/Navigation'
import HeroSection from './sections/HeroSection'
import CountdownSection from './sections/CountdownSection'
import PillarsSection from './sections/PillarsSection'
import EarlyAccessSection from './sections/EarlyAccessSection'
import SocialSection from './sections/SocialSection'
import AboutSection from './sections/AboutSection'
import ContactSection from './sections/ContactSection'
import Footer from './sections/Footer'
import WhatsAppFloat from './sections/WhatsAppFloat'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialize ScrollTrigger for all sections
    const sections = document.querySelectorAll('.scroll-reveal')
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      <Navigation />
      <main ref={mainRef} className="relative">
        <HeroSection />
        <CountdownSection />
        <PillarsSection />
        <EarlyAccessSection />
        <SocialSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
      <WhatsAppFloat />
    </>
  )
}
