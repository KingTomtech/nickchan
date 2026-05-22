import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const socialImages = [
  '/social-1.jpg',
  '/social-2.jpg',
  '/social-3.jpg',
  '/social-4.jpg',
  '/social-5.jpg',
  '/social-6.jpg',
]

export default function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.social-header',
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
        '.social-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.social-grid',
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
      className="relative py-24 sm:py-32 bg-ysm-deepest"
    >
      <div className="max-w-[900px] mx-auto px-6">
        <div className="social-header text-center opacity-0">
          <p className="section-label">FOLLOW ALONG</p>
          <h2 className="section-heading mt-4">Stay in the Loop</h2>
        </div>

        <div className="social-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Instagram Card */}
          <div className="social-card glass-card-hover overflow-hidden opacity-0">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ysm-clay/10">
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="6"
                    stroke="url(#ig-grad)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="url(#ig-grad)"
                    strokeWidth="2"
                  />
                  <circle cx="17" cy="7" r="1.5" fill="#D4956A" />
                  <defs>
                    <linearGradient
                      id="ig-grad"
                      x1="2"
                      y1="2"
                      x2="22"
                      y2="22"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F58529" />
                      <stop offset="0.5" stopColor="#DD2A7B" />
                      <stop offset="1" stopColor="#8134AF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="font-inter font-medium text-sm text-ysm-sand">
                  Instagram
                </span>
              </div>
              <span className="font-inter text-xs text-ysm-mist">
                @theysmbrand
              </span>
            </div>

            {/* Image Grid */}
            <div className="p-3">
              <div className="grid grid-cols-3 gap-1">
                {socialImages.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden rounded-sm"
                  >
                    <img
                      src={img}
                      alt={`YSM post ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-ysm-clay/10">
              <a
                href="https://www.instagram.com/theysmbrand/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-sm text-ysm-clay hover:text-ysm-terracotta transition-colors"
              >
                Follow @theysmbrand →
              </a>
            </div>
          </div>

          {/* Facebook Card */}
          <div className="social-card glass-card-hover overflow-hidden opacity-0">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ysm-clay/10">
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="font-inter font-medium text-sm text-ysm-sand">
                  Facebook
                </span>
              </div>
              <span className="font-inter text-xs text-ysm-mist">
                theysmbrand
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
              <img
                src="/ysm-logo.png"
                alt="The YSM Brand"
                className="w-20 h-20 rounded-full object-contain mb-4"
              />
              <div className="flex items-center gap-6">
                <div>
                  <p
                    className="font-playfair font-semibold text-ysm-terracotta"
                    style={{ fontSize: '28px' }}
                  >
                    6,972
                  </p>
                  <p className="font-inter text-xs text-ysm-mist mt-1">
                    likes
                  </p>
                </div>
                <div className="w-px h-10 bg-ysm-clay/20" />
                <div>
                  <p
                    className="font-playfair font-semibold text-ysm-terracotta"
                    style={{ fontSize: '28px' }}
                  >
                    6,418
                  </p>
                  <p className="font-inter text-xs text-ysm-mist mt-1">
                    followers
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-ysm-clay/10">
              <a
                href="https://www.facebook.com/theysmbrand/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-sm text-ysm-clay hover:text-ysm-terracotta transition-colors"
              >
                Visit our Facebook →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
