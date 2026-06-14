'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import FireSafeModal from '../ui/FireSafeModal'
import GraceyLogisticsModal from '../ui/GraceyLogisticsModal'
import BrewedModal from '../ui/BrewedModal'
import FitnessMadnessModal from '../ui/FitnessMadnessModal'
import UIUXModal from '../ui/UIUXModal'

type WorkId = 'fitnessmadness' | 'firesafe' | 'gracey' | 'brewed'

type Work = {
  id: WorkId
  year: number
  category: string
  title: string
  description: string
  cardBg: string
  cardBorder: string
  cardShadow: string
  dividerColor: string
  labelColor: string
  viewDetailsColor: string
  image: string
  imageAlt: string
  imageClass: string
  tags: string[]
  tagColor: string
  tagBg: string
  tagBorder: string
}

// Add new works here — newest first
const works: Work[] = [
  {
    id: 'fitnessmadness',
    year: 2026,
    category: 'Full-Stack',
    title: 'FitnessMadness',
    description: 'Gym attendance management system with a member kiosk, admin dashboard, payment tracking, and multi-layer offline backup.',
    cardBg: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)',
    cardBorder: '1px solid rgba(34,197,94,0.15)',
    cardShadow: '0 2px 24px rgba(34,197,94,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
    dividerColor: 'rgba(34,197,94,0.40)',
    labelColor: 'rgba(15,100,45,0.55)',
    viewDetailsColor: 'rgba(15,100,45,0.85)',
    image: '/fitnessmadness-logo.svg',
    imageAlt: 'FitnessMadness',
    imageClass: 'w-28 h-28 drop-shadow-xl group-hover:scale-105 transition-transform duration-500',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'Waitress'],
    tagColor: 'rgba(15,100,45,0.85)',
    tagBg: 'rgba(34,197,94,0.08)',
    tagBorder: '1px solid rgba(34,197,94,0.18)',
  },
  {
    id: 'brewed',
    year: 2026,
    category: 'Web Development',
    title: 'Brewed',
    description: 'Coffee house landing page with an interactive menu, promotional modals, and a streamlined order flow.',
    cardBg: 'linear-gradient(145deg, #fdf8f0 0%, #fdefd8 100%)',
    cardBorder: '1px solid rgba(180,120,40,0.12)',
    cardShadow: '0 2px 24px rgba(180,120,40,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
    dividerColor: 'rgba(180,120,40,0.35)',
    labelColor: 'rgba(120,70,20,0.55)',
    viewDetailsColor: 'rgba(140,80,20,0.85)',
    image: '/brewed-logo.svg',
    imageAlt: 'Brewed',
    imageClass: 'w-20 h-20 drop-shadow-xl group-hover:scale-105 transition-transform duration-500',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel'],
    tagColor: 'rgba(120,70,20,0.85)',
    tagBg: 'rgba(180,120,40,0.08)',
    tagBorder: '1px solid rgba(180,120,40,0.18)',
  },
  {
    id: 'gracey',
    year: 2026,
    category: 'Web Development',
    title: 'Gracey Logistics',
    description: 'Freight transport website designed and built from scratch with React, TypeScript, and Vite — deployed live on Vercel.',
    cardBg: 'linear-gradient(145deg, #f5f8ff 0%, #edf4ff 100%)',
    cardBorder: '1px solid rgba(59,130,246,0.12)',
    cardShadow: '0 2px 24px rgba(59,130,246,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
    dividerColor: 'rgba(59,130,246,0.35)',
    labelColor: 'rgba(30,80,200,0.55)',
    viewDetailsColor: 'rgba(30,80,220,0.85)',
    image: '/gracey-logo.webp',
    imageAlt: 'Gracey Logistics Services',
    imageClass: 'w-40 h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500',
    tags: ['React', 'TypeScript', 'Vite', 'Figma', 'Vercel'],
    tagColor: 'rgba(30,80,220,0.85)',
    tagBg: 'rgba(59,130,246,0.08)',
    tagBorder: '1px solid rgba(59,130,246,0.18)',
  },
  {
    id: 'firesafe',
    year: 2025,
    category: 'Thesis',
    title: 'FireSafe',
    description: 'Thermal imaging wildfire detection with real-time mobile alerting for rural barangays.',
    cardBg: 'linear-gradient(145deg, #fff8f5 0%, #ffede0 100%)',
    cardBorder: '1px solid rgba(239,68,68,0.12)',
    cardShadow: '0 2px 24px rgba(239,68,68,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
    dividerColor: 'rgba(239,68,68,0.35)',
    labelColor: 'rgba(180,40,20,0.55)',
    viewDetailsColor: 'rgba(200,50,20,0.85)',
    image: '/firesafe-logo.webp',
    imageAlt: 'FireSafe',
    imageClass: 'w-36 h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500',
    tags: ['React Native', 'Raspberry Pi Zero 2 W', 'Supabase', 'TinyML', 'Python', 'Arduino'],
    tagColor: 'rgba(180,40,20,0.85)',
    tagBg: 'rgba(239,68,68,0.08)',
    tagBorder: '1px solid rgba(239,68,68,0.18)',
  },
]

export default function Works() {
  const [openWorkId, setOpenWorkId] = useState<WorkId | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [uiuxOpen, setUiuxOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const onCarouselScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setActiveIndex(Math.round(el.scrollLeft / (el.clientWidth - 16)))
  }, [])

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: index * (el.clientWidth - 16), behavior: 'smooth' })
  }, [])

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
    const handler = () => setOpenWorkId('firesafe')
    window.addEventListener('open-firesafe', handler)
    return () => window.removeEventListener('open-firesafe', handler)
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <div ref={ref} className="reveal-item flex flex-col gap-4">

        <div className="rounded-[32px] overflow-hidden" style={{ background: '#f5f5f7' }}>
          <div className="px-6 md:px-8 pt-8 md:pt-10 pb-4 flex items-end justify-between gap-4">
            <h2 className="font-display text-[44px] md:text-[56px] leading-[1.05] text-stone-900 font-black">
              Selected<br />Work.
            </h2>
            <div className="hidden md:block pb-1">
              <button
                onClick={() => setUiuxOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors duration-150"
              >
                <span className="font-sans text-sm text-stone-600">UI/UX</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
                  <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={onCarouselScroll}
            className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory px-4 gap-4 pb-4"
            style={{ scrollPaddingLeft: '1rem' }}
          >
            {works.map((work, index) => (
              <div
                key={work.id}
                className="snap-start flex-shrink-0 w-full h-[400px] rounded-[24px] overflow-hidden group flex flex-col justify-between px-6 py-6"
                style={{ background: work.cardBg, border: work.cardBorder, boxShadow: work.cardShadow }}
              >
                {/* Label */}
                <div className="flex items-center gap-2">
                  <div className="w-px h-3.5" style={{ background: work.dividerColor }} />
                  <p className="font-sans text-xs uppercase tracking-widest" style={{ color: work.labelColor }}>
                    {String(works.length - index).padStart(2, '0')} · {work.category} · {work.year}
                  </p>
                </div>

                {/* Logo */}
                <div className="flex justify-center items-center">
                  <img src={work.image} alt={work.imageAlt} className={work.imageClass} />
                </div>

                {/* Bottom info */}
                <div>
                  <h3 className="font-display text-4xl leading-tight mb-2 text-stone-900">{work.title}</h3>
                  <p className="font-sans text-sm leading-relaxed mb-3 line-clamp-2 text-stone-500">
                    {work.description}
                  </p>
                  <span
                    onClick={() => setOpenWorkId(work.id)}
                    className="font-sans text-sm font-medium cursor-pointer"
                    style={{ color: work.viewDetailsColor }}
                  >
                    View Details →
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {work.tags.slice(0, 4).map(tag => (
                      <span
                        key={tag}
                        className="font-sans text-xs px-3 py-1 rounded-full"
                        style={{ color: work.tagColor, backgroundColor: work.tagBg, border: work.tagBorder }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2 pb-5">
            {works.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: activeIndex === i ? '20px' : '6px',
                  height: '6px',
                  background: activeIndex === i ? '#292524' : 'rgba(41,37,36,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {openWorkId === 'fitnessmadness' && <FitnessMadnessModal onClose={() => setOpenWorkId(null)} />}
      {openWorkId === 'firesafe' && <FireSafeModal onClose={() => setOpenWorkId(null)} />}
      {openWorkId === 'gracey' && <GraceyLogisticsModal onClose={() => setOpenWorkId(null)} />}
      {openWorkId === 'brewed' && <BrewedModal onClose={() => setOpenWorkId(null)} />}
      {uiuxOpen && <UIUXModal onClose={() => setUiuxOpen(false)} />}
    </section>
  )
}
