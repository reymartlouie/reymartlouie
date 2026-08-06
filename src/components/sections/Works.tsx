'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import FireSafeModal from '../ui/FireSafeModal'
import GraceyLogisticsModal from '../ui/GraceyLogisticsModal'
import BrewedModal from '../ui/BrewedModal'
import FitnessMadnessModal from '../ui/FitnessMadnessModal'
import UIUXModal from '../ui/UIUXModal'
import ScrollSlider from '../ui/ScrollSlider'

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
  dateRange: string
  isDark?: boolean
}

// Add new works here — newest first
const works: Work[] = [
  {
    id: 'fitnessmadness',
    year: 2026,
    category: 'Full-Stack',
    title: 'FitnessMadness',
    description: 'Gym attendance management system with a member kiosk, admin dashboard, payment tracking, and multi-layer offline backup.',
    cardBg: 'linear-gradient(145deg, #fff1f2 0%, #ffe4e6 100%)',
    cardBorder: '1px solid rgba(239,68,68,0.18)',
    cardShadow: '0 2px 24px rgba(239,68,68,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
    dividerColor: 'rgba(239,68,68,0.45)',
    labelColor: 'rgba(153,27,27,0.55)',
    viewDetailsColor: 'rgba(185,28,28,0.85)',
    image: '/fitnessmadness-logo.svg',
    imageAlt: 'FitnessMadness',
    imageClass: 'w-40 h-40 drop-shadow-xl group-hover:scale-105 transition-transform duration-500',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'Waitress'],
    tagColor: 'rgba(153,27,27,0.85)',
    tagBg: 'rgba(239,68,68,0.08)',
    tagBorder: '1px solid rgba(239,68,68,0.18)',
    dateRange: "May 2026 – Crafting",
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
    image: '/brewed-icon.svg',
    imageAlt: 'Brewed',
    imageClass: 'w-40 h-40 drop-shadow-xl group-hover:scale-105 transition-transform duration-500',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel'],
    tagColor: 'rgba(120,70,20,0.85)',
    tagBg: 'rgba(180,120,40,0.08)',
    tagBorder: '1px solid rgba(180,120,40,0.18)',
    dateRange: "May 2026 – Crafting",
  },
  {
    id: 'gracey',
    year: 2026,
    category: 'Web Development',
    title: 'Gracey Logistics',
    description: 'Freight transport website designed and built from scratch with React, TypeScript, and Vite — deployed live on Vercel.',
    cardBg: 'linear-gradient(145deg, #f9fafb 0%, #f3f4f6 100%)',
    cardBorder: '1px solid rgba(107,114,128,0.18)',
    cardShadow: '0 2px 24px rgba(107,114,128,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
    dividerColor: 'rgba(234,88,12,0.55)',
    labelColor: 'rgba(55,65,81,0.55)',
    viewDetailsColor: 'rgba(194,65,12,0.85)',
    image: '/gracey-icon.svg',
    imageAlt: 'Gracey Logistics Services',
    imageClass: 'w-40 h-40 drop-shadow-xl group-hover:scale-105 transition-transform duration-500',
    tags: ['React', 'TypeScript', 'Vite', 'Figma', 'Vercel'],
    tagColor: 'rgba(55,65,81,0.85)',
    tagBg: 'rgba(107,114,128,0.08)',
    tagBorder: '1px solid rgba(107,114,128,0.18)',
    dateRange: "Dec 2025 – May 2026",
  },
  {
    id: 'firesafe',
    year: 2025,
    category: 'Thesis',
    title: 'FireSafe',
    description: 'Thermal imaging wildfire detection with real-time mobile alerting for rural barangays.',
    cardBg: 'linear-gradient(145deg, #fff7f0 0%, #ffede0 100%)',
    cardBorder: '1px solid rgba(234,88,12,0.18)',
    cardShadow: '0 2px 24px rgba(234,88,12,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
    dividerColor: 'rgba(220,38,38,0.45)',
    labelColor: 'rgba(153,27,27,0.55)',
    viewDetailsColor: 'rgba(194,65,12,0.85)',
    image: '/firesafe-icon.svg',
    imageAlt: 'FireSafe',
    imageClass: 'w-40 h-40 drop-shadow-xl group-hover:scale-105 transition-transform duration-500',
    tags: ['React Native', 'Raspberry Pi Zero 2 W', 'Supabase', 'TinyML', 'Python', 'Arduino'],
    tagColor: 'rgba(153,27,27,0.85)',
    tagBg: 'rgba(234,88,12,0.08)',
    tagBorder: '1px solid rgba(234,88,12,0.18)',
    dateRange: "Sept 2025 – Mar 2026",
  },
]

// Tall portrait cards, apple.com/iphone "Get to know" style — fixed size, several visible at once.
const CARD_W = 320
const CARD_H = 600
const CARD_GAP = 20

export default function Works() {
  const [openWorkId, setOpenWorkId] = useState<WorkId | null>(null)
  const [uiuxOpen, setUiuxOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [thumbPercent, setThumbPercent] = useState(100)
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const updateSlider = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setThumbPercent(el.scrollWidth > 0 ? (el.clientWidth / el.scrollWidth) * 100 : 100)
  }, [])

  useEffect(() => {
    updateSlider()
    window.addEventListener('resize', updateSlider)
    return () => window.removeEventListener('resize', updateSlider)
  }, [updateSlider])

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

        <div className="hidden md:flex items-center justify-end gap-4">
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

        <div
          ref={scrollRef}
          onScroll={updateSlider}
          className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory px-4 md:px-0 pb-2"
          style={{ scrollPaddingLeft: '1rem', gap: CARD_GAP }}
        >
          {works.map((work, index) => (
            <div
              key={work.id}
              className="snap-start flex-shrink-0 rounded-[24px] overflow-hidden group flex flex-col justify-between px-6 py-6"
              style={{ width: CARD_W, height: CARD_H, background: work.cardBg, border: work.cardBorder, boxShadow: work.cardShadow }}
            >
              {/* Label */}
              <div className="flex items-center gap-2">
                <div className="w-px h-3.5" style={{ background: work.dividerColor }} />
                <p className="font-sans text-xs uppercase tracking-widest" style={{ color: work.labelColor }}>
                  {String(works.length - index).padStart(2, '0')} · {work.category} · {work.dateRange}
                </p>
              </div>

              {/* Logo */}
              <div className="flex justify-center items-center">
                <img src={work.image} alt={work.imageAlt} className={work.imageClass} />
              </div>

              {/* Bottom info */}
              <div>
                <h3
                  className="font-display text-4xl leading-tight mb-2"
                  style={{ color: work.isDark ? '#f5f5f4' : '#1c1917' }}
                >{work.title}</h3>
                <p
                  className="font-sans text-sm leading-relaxed mb-3 line-clamp-2"
                  style={{ color: work.isDark ? 'rgba(255,255,255,0.60)' : 'rgb(68,64,60)' }}
                >
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

        {/* Scroll position slider */}
        <ScrollSlider scrollRef={scrollRef} progress={progress} thumbPercent={thumbPercent} />
      </div>

      {openWorkId === 'fitnessmadness' && <FitnessMadnessModal onClose={() => setOpenWorkId(null)} />}
      {openWorkId === 'firesafe' && <FireSafeModal onClose={() => setOpenWorkId(null)} />}
      {openWorkId === 'gracey' && <GraceyLogisticsModal onClose={() => setOpenWorkId(null)} />}
      {openWorkId === 'brewed' && <BrewedModal onClose={() => setOpenWorkId(null)} />}
      {uiuxOpen && <UIUXModal onClose={() => setUiuxOpen(false)} />}
    </section>
  )
}
