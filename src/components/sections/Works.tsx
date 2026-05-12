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
        <div className="rounded-[32px] overflow-hidden" style={{ background: '#f5f5f7' }}>
          <div className="px-6 md:px-8 pt-6 md:pt-8 pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-px h-3.5 bg-amber-700/50" />
                <p className="font-sans text-xs uppercase tracking-widest text-amber-700/70">Selected Work</p>
              </div>
              <h2 className="font-display text-5xl text-stone-800">{workCount === 1 ? 'Work' : 'Works'}</h2>
            </div>
            <span className="font-sans text-sm hidden md:block text-stone-500">{workCount} {workCount === 1 ? 'work' : 'works'}</span>
          </div>

          {/* 2-column card grid */}
          <div className="p-4 lg:p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* FireSafe card */}
            <div
              className="rounded-[24px] overflow-hidden flex flex-col cursor-pointer group"
              style={{
                background: 'linear-gradient(145deg, #fff8f5 0%, #ffede0 100%)',
                border: '1px solid rgba(239,68,68,0.12)',
                boxShadow: '0 2px 24px rgba(239,68,68,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
              onClick={() => setModalOpen(true)}
            >
              <div className="px-6 md:px-8 pt-6 pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-px h-3" style={{ background: 'rgba(239,68,68,0.35)' }} />
                  <span className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(180,40,20,0.55)' }}>01 · Thesis · 2025</span>
                </div>
                <h3 className="font-display text-4xl leading-tight text-stone-900">FireSafe</h3>
                <p className="font-sans text-sm leading-relaxed mt-2 mb-4 text-stone-500">
                  Thermal imaging wildfire detection with real-time mobile alerting for rural barangays.
                </p>
                <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium" style={{ color: 'rgba(200,50,20,0.85)' }}>
                  View Details →
                </span>
              </div>

              {/* Bottom: FireSafe logo on warm tinted bg */}
              <div className="relative overflow-hidden mt-auto" style={{ height: '192px' }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #ffede0 0%, #ffe4cc 100%)' }} />
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
                      className="font-sans text-xs px-2.5 py-1 rounded-full"
                      style={{
                        color: 'rgba(180,40,20,0.85)',
                        backgroundColor: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.18)',
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
              style={{
                background: 'linear-gradient(145deg, #f5f8ff 0%, #edf4ff 100%)',
                border: '1px solid rgba(59,130,246,0.12)',
                boxShadow: '0 2px 24px rgba(59,130,246,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <div className="px-6 md:px-8 pt-6 pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-px h-3" style={{ background: 'rgba(59,130,246,0.35)' }} />
                  <span className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(30,80,200,0.55)' }}>02 · UI/UX Design · 2024</span>
                </div>
                <h3 className="font-display text-4xl leading-tight text-stone-900">Gracey Logistics</h3>
                <p className="font-sans text-sm leading-relaxed mt-2 mb-4 text-stone-500">
                  Brand identity and UI design for a local logistics and trucking services company.
                </p>
                <a
                  href="/gracey-logistics.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-medium"
                  style={{ color: 'rgba(30,80,220,0.85)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Case Study →
                </a>
              </div>

              {/* Bottom: Gracey logo on cool tinted bg */}
              <div className="relative overflow-hidden mt-auto" style={{ height: '192px' }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #edf4ff 0%, #e0ecff 100%)' }} />
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
                      className="font-sans text-xs px-2.5 py-1 rounded-full"
                      style={{
                        color: 'rgba(30,80,220,0.85)',
                        backgroundColor: 'rgba(59,130,246,0.08)',
                        border: '1px solid rgba(59,130,246,0.18)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
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
