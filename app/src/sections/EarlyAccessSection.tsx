import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function EarlyAccessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.early-access-content > *',
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="early-access"
      className="relative py-24 sm:py-32 bg-ysm-deepest"
    >
      <div className="early-access-content max-w-[600px] mx-auto px-6 text-center">
        <p className="section-label opacity-0">BE FIRST</p>
        <h2 className="section-heading mt-4 opacity-0">Get Early Access</h2>
        <p className="section-body mt-4 opacity-0">
          Drop your email and we&apos;ll reach you the moment the doors open.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-10 opacity-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="Your email address"
                className={`flex-1 bg-ysm-earth border rounded-xl px-5 py-3.5 text-ysm-sand placeholder-ysm-mist font-inter text-sm outline-none transition-colors duration-300 focus:border-ysm-terracotta ${
                  error ? 'border-red-500' : 'border-ysm-clay/15'
                }`}
              />
              <button
                type="submit"
                className="pill-button-primary relative overflow-hidden group"
              >
                <span className="relative z-10">Notify Me</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2 text-left">{error}</p>
            )}
          </form>
        ) : (
          <div className="mt-10 glass-card py-8 opacity-0">
            <p className="font-inter text-ysm-clay text-lg">
              Thank you! We&apos;ll be in touch.
            </p>
          </div>
        )}

        {!submitted && (
          <div className="mt-6 opacity-0">
            <div className="flex items-center justify-center gap-4">
              <span className="w-10 h-px bg-ysm-mist/30" />
              <span className="font-inter text-sm text-ysm-mist">or</span>
              <span className="w-10 h-px bg-ysm-mist/30" />
            </div>
            <a
              href="https://wa.me/260975228899?text=Hi%20YSM,%20I'd%20love%20to%20know%20more%20before%20you%20launch!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 font-inter font-medium text-xs tracking-[0.12em] uppercase text-ysm-clay hover:text-ysm-terracotta transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat us on WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
