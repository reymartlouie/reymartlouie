'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import FireSafeModal from '../ui/FireSafeModal'
import GraceyLogisticsModal from '../ui/GraceyLogisticsModal'
import UIUXModal from '../ui/UIUXModal'

const firesafeTags = ['React Native', 'Raspberry Pi Zero 2 W', 'Supabase', 'TinyML', 'Python', 'Arduino']
const graceyTags = ['React', 'TypeScript', 'Vite', 'Figma', 'Vercel']

const workCount: number = 2

export default function Works() {
  const [firesafeOpen, setFiresafeOpen] = useState(false)
  const [graceyOpen, setGraceyOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [uiuxOpen, setUiuxOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const onCarouselScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setActiveIndex(Math.round(el.scrollLeft / el.offsetWidth))
  }, [])

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: index * el.offsetWidth, behavior: 'smooth' })
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
    const handler = () => setFiresafeOpen(true)
    window.addEventListener('open-firesafe', handler)
    return () => window.removeEventListener('open-firesafe', handler)
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <div ref={ref} className="reveal-item flex flex-col gap-4">

        {/* Selected work */}
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

          {/* Cards — mobile: snap carousel / desktop: original grid */}
          <div
            ref={scrollRef}
            onScroll={onCarouselScroll}
            className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory px-4 gap-4 pb-4 md:grid md:grid-cols-1 md:overflow-visible md:snap-none md:p-4 lg:p-5 lg:grid-cols-2"
          >

            {/* FireSafe card */}
            <div
              className="rounded-[24px] overflow-hidden flex flex-col group"
              style={{
                background: 'linear-gradient(145deg, #fff8f5 0%, #ffede0 100%)',
                border: '1px solid rgba(239,68,68,0.12)',
                boxShadow: '0 2px 24px rgba(239,68,68,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
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
                <span onClick={() => setFiresafeOpen(true)} className="inline-flex items-center gap-1.5 font-sans text-sm font-medium cursor-pointer" style={{ color: 'rgba(200,50,20,0.85)' }}>
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
                <div className="absolute bottom-5 left-6 right-6 hidden md:flex flex-wrap gap-1.5">
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
<<<<<<< HEAD
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
                  <span className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(30,80,200,0.55)' }}>02 · Web Development · 2024</span>
                </div>
                <h3 className="font-display text-4xl leading-tight text-stone-900">Gracey Logistics</h3>
                <p className="font-sans text-sm leading-relaxed mt-2 mb-4 text-stone-500">
                  Built and designed a full freight transport website with React, TypeScript, and Vite — deployed live on Vercel.
                </p>
                <span onClick={() => setGraceyOpen(true)} className="inline-flex items-center gap-1.5 font-sans text-sm font-medium cursor-pointer" style={{ color: 'rgba(30,80,220,0.85)' }}>
                  View Details →
                </span>
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
                <div className="absolute bottom-5 left-6 right-6 hidden md:flex flex-wrap gap-1.5">
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

          {/* Mobile: dot indicators */}
          <div className="flex justify-center items-center gap-2 pb-5 md:hidden">
            {Array.from({ length: workCount }).map((_, i) => (
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

          {/* Mobile: UI/UX button */}
          <div className="flex justify-end px-6 pb-6 md:hidden">
            <button
              onClick={() => setUiuxOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors duration-150"
            >
              <span className="font-sans text-sm text-stone-600">UI/UX</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {firesafeOpen && <FireSafeModal onClose={() => setFiresafeOpen(false)} />}
      {graceyOpen && <GraceyLogisticsModal onClose={() => setGraceyOpen(false)} />}
      {uiuxOpen && <UIUXModal onClose={() => setUiuxOpen(false)} />}
    </section>
  )
}
