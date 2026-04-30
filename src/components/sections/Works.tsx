'use client'

import { useState, useEffect, useRef } from 'react'
import ProjectModal from '../ui/ProjectModal'

const firesafeTags = ['React Native', 'Raspberry Pi Zero 2 W', 'Supabase', 'TinyML', 'Python', 'Arduino']
const graceyTags = ['Figma', 'Brand Identity', 'UI Design', 'Logo Design']

const workCount: number = 2

export default function Works() {
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
          className="bento-lift block rounded-[32px] relative overflow-hidden group"
        >
          {/* Background image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/portfolio-bg.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
            }}
          />
          {/* Frosted glass layer */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(6,2,12,0.38) 0%, rgba(6,2,12,0.58) 100%)' }}
          />
          {/* Content */}
          <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
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
          </div>
        </a>

        {/* Selected work */}
        <div className="rounded-[32px] overflow-hidden relative">
          {/* Background photo */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/works-bg.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Frosted glass overlay — light, not overpowering */}
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{ background: 'rgba(0,0,0,0.28)' }}
          />
          {/* Content */}
          <div className="relative">
          <div className="px-6 md:px-8 pt-6 md:pt-8 pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-px h-3.5" style={{ background: 'var(--portfolio-label)' }} />
                <p className="font-sans text-xs uppercase tracking-widest" style={{ color: 'var(--portfolio-label)' }}>Selected Work</p>
              </div>
              <h2 className="font-display text-5xl" style={{ color: 'var(--portfolio-title)' }}>{workCount === 1 ? 'Work' : 'Works'}</h2>
            </div>
            <span className="font-sans text-sm hidden md:block" style={{ color: 'var(--portfolio-label)' }}>{workCount} {workCount === 1 ? 'work' : 'works'}</span>
          </div>

          {/* 2-column card grid */}
          <div className="p-4 lg:p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* FireSafe card */}
            <div
              className="rounded-[24px] overflow-hidden flex flex-col cursor-pointer group"
              style={{ background: 'linear-gradient(145deg, #16082a 0%, #0a0418 100%)' }}
              onClick={() => setModalOpen(true)}
            >
              <div className="px-6 md:px-8 pt-6 pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-px h-3" style={{ background: 'rgba(251,146,60,0.40)' }} />
                  <span className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(251,146,60,0.45)' }}>01 · Thesis · 2025</span>
                </div>
                <h3 className="font-display text-4xl leading-tight" style={{ color: 'var(--fg)' }}>FireSafe</h3>
                <p className="font-sans text-sm leading-relaxed mt-2 mb-4" style={{ color: 'rgba(242,242,242,0.50)' }}>
                  Thermal imaging wildfire detection with real-time mobile alerting for rural barangays.
                </p>
                <span
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-medium"
                  style={{ color: 'rgba(251,146,60,0.85)' }}
                >
                  View Details →
                </span>
              </div>

              {/* Bottom: FireSafe logo centered on dark bg */}
              <div className="relative h-40 md:h-48 overflow-hidden mt-auto">
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, #0a0418 0%, #130826 100%)' }}
                />
                {/* glow behind logo */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: '#ef4444' }}
                />
                {/* logo */}
                <div className="absolute inset-0 flex items-center justify-center pb-10">
                  <img
                    src="/firesafe-logo.webp"
                    alt="FireSafe"
                    className="w-36 h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-5 left-6 right-6 flex flex-wrap gap-1.5">
                  {firesafeTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-xs px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{
                        color: 'rgba(251,146,60,0.85)',
                        backgroundColor: 'rgba(251,146,60,0.08)',
                        border: '1px solid rgba(251,146,60,0.20)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Gracey Logistics Services card */}
            <div
              className="rounded-[24px] overflow-hidden flex flex-col group"
              style={{ background: 'linear-gradient(145deg, #0d1520 0%, #080e18 100%)' }}
            >
              <div className="px-6 md:px-8 pt-6 pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-px h-3" style={{ background: 'rgba(251,146,60,0.40)' }} />
                  <span className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(251,146,60,0.45)' }}>02 · UI/UX Design · 2024</span>
                </div>
                <h3 className="font-display text-4xl leading-tight" style={{ color: 'var(--fg)' }}>Gracey Logistics</h3>
                <p className="font-sans text-sm leading-relaxed mt-2 mb-4" style={{ color: 'rgba(242,242,242,0.50)' }}>
                  Brand identity and UI design for a local logistics and trucking services company.
                </p>
                <a
                  href="/gracey-logistics.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-medium"
                  style={{ color: 'rgba(251,146,60,0.85)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Case Study →
                </a>
              </div>

              {/* Bottom: Gracey logo centered */}
              <div className="relative h-40 md:h-48 overflow-hidden mt-auto">
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, #080e18 0%, #0f1c2e 100%)' }}
                />
                {/* warm amber glow behind logo */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: '#f59e0b' }}
                />
                {/* logo */}
                <div className="absolute inset-0 flex items-center justify-center pb-10">
                  <img
                    src="/gracey-logo.webp"
                    alt="Gracey Logistics Services"
                    className="w-40 h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-5 left-6 right-6 flex flex-wrap gap-1.5">
                  {graceyTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-xs px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{
                        color: 'rgba(251,146,60,0.85)',
                        backgroundColor: 'rgba(251,146,60,0.08)',
                        border: '1px solid rgba(251,146,60,0.20)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
          </div>{/* end relative content */}
        </div>
      </div>

      {modalOpen && <ProjectModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}
