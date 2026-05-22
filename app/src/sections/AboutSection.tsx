import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const stats = [
  { value: '6,972', label: 'Facebook likes' },
  { value: '6,418', label: 'Instagram followers' },
  { value: '2020', label: 'Established' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-left > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.about-right',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0A0806 0%, #151008 50%, #0A0806 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <div className="about-left">
            <p className="section-label opacity-0">OUR STORY</p>
            <h2 className="section-heading mt-4 opacity-0">
              Rooted in daily wellness, made for the YSM family.
            </h2>
            <p className="section-body mt-6 opacity-0">
              The YSM Brand has grown its audience through Facebook and Instagram
              by presenting a focused identity: self-care products, food
              experiences, and nutrition support for customers who want quality
              with a local touch.
            </p>
            <p className="section-body mt-4 opacity-0">
              Located in Lusaka, Zambia. Public brand handle: @theysmbrand. Core
              promise: skincare, culinary, and fitness under one polished house.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10 opacity-0">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-playfair font-semibold text-ysm-terracotta"
                    style={{
                      fontSize: 'clamp(28px, 3vw, 44px)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-inter text-sm text-ysm-mist mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="about-right opacity-0">
            <div className="relative rounded-2xl overflow-hidden border border-ysm-clay/15">
              <img
                src="/about-brand.jpg"
                alt="The YSM Brand"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(10,8,6,0.5) 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
