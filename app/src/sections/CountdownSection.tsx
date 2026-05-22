import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass-card-hover flex flex-col items-center justify-center py-8 px-4 sm:py-10 sm:px-6">
      <span
        className="font-inter font-bold text-ysm-terracotta tabular-nums"
        style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
        aria-live="polite"
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="section-label mt-3 text-ysm-mist">{label}</span>
    </div>
  )
}

export default function CountdownSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const targetDate = new Date('2026-06-04T00:00:00+02:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setIsLive(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.countdown-label',
        { opacity: 0, y: 30 },
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
        '.countdown-headline',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.countdown-cell',
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

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="relative py-24 sm:py-32 bg-ysm-deepest"
    >
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <p className="countdown-label section-label opacity-0">LAUNCH COUNTDOWN</p>
        <h2 className="countdown-headline section-heading mt-4 opacity-0">
          4th June 2026
        </h2>

        {isLive ? (
          <div className="mt-12 glass-card py-12">
            <p
              className="font-playfair font-bold text-ysm-terracotta"
              style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
            >
              WE ARE LIVE
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12">
            <div className="countdown-cell opacity-0">
              <CountdownUnit value={timeLeft.days} label="DAYS" />
            </div>
            <div className="countdown-cell opacity-0">
              <CountdownUnit value={timeLeft.hours} label="HOURS" />
            </div>
            <div className="countdown-cell opacity-0">
              <CountdownUnit value={timeLeft.minutes} label="MINUTES" />
            </div>
            <div className="countdown-cell opacity-0">
              <CountdownUnit value={timeLeft.seconds} label="SECONDS" />
            </div>
          </div>
        )}

        <p className="countdown-label font-inter text-sm text-ysm-mist mt-8 opacity-0">
          Official launch: <span className="text-ysm-clay">4th June 2026</span>
        </p>
      </div>
    </section>
  )
}
