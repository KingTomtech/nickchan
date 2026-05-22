import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Pillar {
  icon: string
  pillarNum: string
  title: string
  description: string
  tags: string[]
  image: string
}

const pillars: Pillar[] = [
  {
    icon: '🍽️',
    pillarNum: 'PILLAR 01',
    title: 'CULINARY',
    description:
      'Real food, real flavour. We celebrate eating well — wholesome meals and culinary culture that fuels the body without compromise.',
    tags: ['REAL FOOD', 'FLAVOUR', 'FUEL'],
    image: '/pillar-culinary.jpg',
  },
  {
    icon: '💪',
    pillarNum: 'PILLAR 02',
    title: 'FITNESS',
    description:
      'Move with purpose. Our fitness arm is about building discipline, strength, and a community that shows up for each other every day.',
    tags: ['STRENGTH', 'DISCIPLINE', 'COMMUNITY'],
    image: '/pillar-fitness.jpg',
  },
  {
    icon: '✨',
    pillarNum: 'PILLAR 03',
    title: 'GLOW',
    description:
      'Care that feels personal. Skincare products, body scrubs, and care bundles crafted for the Lusaka YSM family.',
    tags: ['BODY SCRUBS', 'BUNDLES', 'GIFTING'],
    image: '/pillar-glow.jpg',
  },
]

export default function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pillars-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.pillar-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pillars-grid',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0A0806 0%, #1a1008 50%, #0A0806 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="pillars-header opacity-0">
          <p className="section-label">WHAT WE&apos;RE ABOUT</p>
          <h2 className="section-heading mt-4">
            Three Pillars.
            <br />
            One Life.
          </h2>
        </div>

        <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="pillar-card opacity-0 group relative overflow-hidden rounded-2xl border border-ysm-clay/15 bg-ysm-earth/80 transition-all duration-500 hover:-translate-y-2 hover:border-ysm-terracotta/40"
              style={{
                boxShadow: '0 0 0 rgba(200, 90, 42, 0)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 60px rgba(200, 90, 42, 0.12)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 0 rgba(200, 90, 42, 0)'
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ysm-earth to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <span className="text-4xl">{pillar.icon}</span>
                <p className="section-label mt-4 text-ysm-terracotta">
                  {pillar.pillarNum}
                </p>
                <h3 className="font-inter font-semibold text-xl sm:text-2xl text-ysm-glow mt-2 tracking-wide">
                  {pillar.title}
                </h3>
                <p className="section-body mt-4 text-sm leading-relaxed">
                  {pillar.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-ysm-terracotta/15 text-ysm-clay text-[11px] font-inter font-medium tracking-wider uppercase px-3.5 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
