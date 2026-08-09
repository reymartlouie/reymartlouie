'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import CustomCard from '../bento/CustomCard'
import CardEditorModal from '../bento/CardEditorModal'
import GitHubCard from '../cards/GitHubCard'
import HeroIntroCard from '../cards/HeroIntroCard'
import PhotoCard from '../cards/PhotoCard'
import TechStackCard from '../cards/TechStackCard'
import AboutCard from '../cards/Quote'
import ScrollSlider from '../ui/ScrollSlider'
import { supabase, type Testimonial } from '@/lib/supabase'

const NOTE_LIMIT  = 3
const NOTE_WINDOW = 24 * 60 * 60 * 1000 // 24 h

// Every bento card renders at this exact size — uniform "pills" in the carousel.
const CARD_W = 340
const CARD_H = 400
const CARD_GAP = 20

function readRate(): { count: number; resetAt: number } {
  try {
    const raw = localStorage.getItem('bento-note-rate')
    if (raw) return JSON.parse(raw)
  } catch {}
  return { count: 0, resetAt: Date.now() + NOTE_WINDOW }
}

const STATIC_CARDS = [HeroIntroCard, PhotoCard, TechStackCard, AboutCard, GitHubCard]

export default function Hero() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [rateLimited, setRateLimited] = useState(false)
  const [modalOpen,   setModalOpen]   = useState(false)
  const [submitted,   setSubmitted]   = useState(false)

  const [progress, setProgress] = useState(0)
  const [thumbPercent, setThumbPercent] = useState(100)
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

  const fetchTestimonials = () =>
    supabase
      .from('testimonials')
      .select('id, title, body, color, approved, created_at')
      .eq('approved', true)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error) { console.error('[testimonials] fetch error:', error); return }
        if (data) setTestimonials(data)
      })

  const syncRateLimit = () => {
    const { count, resetAt } = readRate()
    setRateLimited(Date.now() < resetAt && count >= NOTE_LIMIT)
  }

  const bumpRate = () => {
    const { count, resetAt } = readRate()
    const now = Date.now()
    const next = now > resetAt
      ? { count: 1, resetAt: now + NOTE_WINDOW }
      : { count: count + 1, resetAt }
    localStorage.setItem('bento-note-rate', JSON.stringify(next))
    setRateLimited(next.count >= NOTE_LIMIT)
  }

  useEffect(() => {
    syncRateLimit()
    fetchTestimonials()

    // Poll every 60s — testimonials change infrequently; 10s was unnecessary
    const interval = setInterval(fetchTestimonials, 60_000)
    return () => { clearInterval(interval) }
  }, [])

  const handleCreateCard = async (data: { title: string; body: string; color: string }) => {
    await supabase.from('testimonials').insert({
      title: data.title,
      body:  data.body,
      color: data.color,
    })
    bumpRate()
    setModalOpen(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const handleDeleteCard = (id: string) => {
    setTestimonials(prev => prev.filter(c => c.id !== id))
  }

  const openCreate = () => { setModalOpen(true) }
  const closeModal = () => { setModalOpen(false) }

  return (
    <section id="about" className="flex flex-col gap-4">

      <div
        ref={scrollRef}
        onScroll={updateSlider}
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory px-4 md:px-0 pb-12"
        style={{ scrollPaddingLeft: '1rem', gap: CARD_GAP }}
      >
        {STATIC_CARDS.map((Card, i) => (
          <div key={i} className="flex-shrink-0 snap-start flex" style={{ width: CARD_W, height: CARD_H }}>
            <Card />
          </div>
        ))}

        {testimonials.map((card) => (
          <div key={card.id} className="flex-shrink-0 snap-start flex" style={{ width: CARD_W, height: CARD_H }}>
            <CustomCard
              cardId={card.id}
              card={card}
              onEdit={() => {}}
              onDelete={() => handleDeleteCard(card.id)}
            />
          </div>
        ))}
      </div>

      {/* Scroll position slider */}
      <ScrollSlider scrollRef={scrollRef} progress={progress} thumbPercent={thumbPercent} />

      {/* Action row */}
      <div className="flex items-center justify-end lg:justify-start gap-3 flex-wrap">
        <button
          onClick={openCreate}
          disabled={rateLimited || submitted}
          className="btn-spring glass inline-flex items-center gap-3 text-[#1e1e1e]
                     font-sans text-sm font-semibold px-5 py-3 rounded-full
                     hover:bg-white/80 transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitted ? 'Note submitted · pending approval' : rateLimited ? 'Note limit reached · come back tomorrow' : 'Leave a note +'}
        </button>
      </div>

      {/* Card editor modal */}
      {modalOpen && (
        <CardEditorModal
          initial={null}
          onConfirm={handleCreateCard}
          onClose={closeModal}
        />
      )}

    </section>
  )
}
