import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Label fade in
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      )

      // Headline characters wave in
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.hero-char')
        tl.fromTo(
          chars,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: 'back.out(1.7)',
          },
          0.5
        )
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.9
      )

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.1
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Wavy text animation for headline
  useEffect(() => {
    if (!headlineRef.current) return
    const chars = headlineRef.current.querySelectorAll('.hero-char-wavy')
    let rafId: number
    let startTime = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000
      chars.forEach((char, i) => {
        const y = Math.sin(elapsed * 2 + i * 0.3) * 6
        ;(char as HTMLElement).style.transform = `translateY(${y}px)`
      })
      rafId = requestAnimationFrame(animate)
    }

    // Start wave animation after entrance
    const timeout = setTimeout(() => {
      rafId = requestAnimationFrame(animate)
    }, 2000)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const splitText = (text: string, className: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className={className}
        style={{ display: 'inline-block', willChange: 'transform' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          poster="/pillar-fitness.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,8,6,0.4) 0%, rgba(10,8,6,0.6) 50%, rgba(10,8,6,0.85) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto pt-20">
        <p
          ref={labelRef}
          className="section-label mb-6 opacity-0"
        >
          LUSAKA WELLNESS HOUSE
        </p>

        <h1
          ref={headlineRef}
          className="font-playfair font-bold text-ysm-glow leading-none mb-6"
          style={{
            fontSize: 'clamp(48px, 10vw, 96px)',
            letterSpacing: '-0.02em',
          }}
        >
          <span className="block">
            {splitText('COMING', 'hero-char hero-char-wavy')}
          </span>
          <span className="block text-ysm-terracotta">
            {splitText('SOON.', 'hero-char hero-char-wavy')}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-inter text-ysm-sand text-base sm:text-lg leading-relaxed max-w-[560px] mx-auto mb-10 opacity-0"
        >
          Something bold is taking root in Lusaka — a home for real food, real
          movement, and real self-care.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <a
            href="#early-access"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#early-access')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="pill-button-primary"
          >
            Get Early Access
          </a>
          <a
            href="https://wa.me/260975228899"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button-secondary"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <ChevronDown
          size={24}
          className="text-ysm-mist animate-bounce-gentle"
        />
        <span className="font-inter text-xs text-ysm-mist tracking-wide">
          Scroll
        </span>
      </div>
    </section>
  )
}
