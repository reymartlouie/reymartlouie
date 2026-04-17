'use client'

import { useState, useEffect, useRef } from 'react'
import ProjectModal from '../ui/ProjectModal'

const tags = ['React Native', 'Raspberry Pi Zero 2 W', 'Supabase', 'TinyML', 'Python', 'Arduino']

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handler = () => setModalOpen(true)
    window.addEventListener('open-firesafe', handler)
    return () => window.removeEventListener('open-firesafe', handler)
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <div ref={ref} className="reveal-item flex flex-col gap-4">

        {/* UI/UX Portfolio link */}
        <a
          href="https://reymartlouie.framer.website"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-lift block rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group"
          style={{ background: 'var(--bg-portfolio)' }}
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-rose-400/22 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-px h-3.5" style={{ background: 'var(--portfolio-label)' }} />
              <p className="font-sans text-xs uppercase tracking-widest" style={{ color: 'var(--portfolio-label)' }}>Portfolio</p>
            </div>
            <h3 className="font-display text-4xl lg:text-5xl" style={{ color: 'var(--portfolio-title)' }}>UI/UX Portfolio</h3>
            <p className="font-sans text-sm mt-2 max-w-md" style={{ color: 'var(--portfolio-body)' }}>
              Explore my design work — case studies, wireframes, and high-fidelity prototypes.
            </p>
          </div>
          <span className="btn-spring inline-flex items-center gap-2 font-sans font-semibold text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap" style={{ background: 'var(--portfolio-btn-bg)', color: 'var(--portfolio-btn-fg)', border: '1px solid var(--portfolio-btn-border)' }}>
            View Portfolio ↗
          </span>
        </a>

        {/* Selected work */}
        <div
          className="rounded-[32px] overflow-hidden relative"
          style={{
            backgroundImage: `
              linear-gradient(160deg, rgba(8,10,24,0.88) 0%, rgba(12,8,28,0.82) 60%, rgba(8,12,26,0.88) 100%),
              url('/projects-bg.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="px-6 md:px-8 lg:px-10 py-6 md:py-8 flex items-center justify-between relative">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-px h-3.5" style={{ background: 'rgba(130,100,210,0.55)' }} />
                <p className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(160,130,230,0.65)' }}>Selected Work</p>
              </div>
              <h2 className="font-display text-5xl" style={{ color: 'var(--fg)' }}>Projects</h2>
            </div>
            <span className="font-sans text-sm hidden md:block" style={{ color: 'rgba(130,100,210,0.45)' }}>1 project</span>
          </div>

          <div className="h-px mx-6" style={{ background: 'rgba(130,100,210,0.18)' }} />

          <div className="p-4 lg:p-5">
            {/* FireSafe featured card */}
            <div
              className="rounded-[24px] p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden group cursor-pointer"
              style={{ background: 'var(--bg-firesafe)' }}
              onClick={() => setModalOpen(true)}
            >
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-30 group-hover:opacity-55 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: '#fb923c' }}
              />
              <div className="relative">
                <span className="font-sans text-xs mb-5 block" style={{ color: 'var(--fg-20)' }}>01</span>
                <h3 className="font-display text-4xl md:text-5xl leading-tight mb-4" style={{ color: 'var(--fg)' }}>FireSafe</h3>
                <p className="font-sans text-sm leading-relaxed max-w-xl" style={{ color: 'var(--fg-50)' }}>
                  A thermal imaging-based wildfire detection system built for resource-limited rural barangays,
                  with real-time mobile alerting via push notifications and SMS.
                </p>
              </div>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-xs px-3 py-1 rounded-full border"
                      style={{
                        color: '#fb923c',
                        borderColor: 'rgba(251,146,60,0.28)',
                        backgroundColor: 'rgba(251,146,60,0.10)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-sans text-xs" style={{ color: 'var(--fg-20)' }}>2025</span>
                  <span className="font-sans text-sm font-medium" style={{ color: '#fb923c' }}>
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {modalOpen && <ProjectModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}
