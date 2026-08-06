'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import CustomCard from '../bento/CustomCard'
import CardEditorModal from '../bento/CardEditorModal'
import GitHubCard from '../cards/GitHubCard'
import HeroIntroCard from '../cards/HeroIntroCard'
import PhotoCard from '../cards/PhotoCard'
import TechStackCard from '../cards/TechStackCard'
import AboutCard from '../cards/Quote'
import { supabase, type Testimonial } from '@/lib/supabase'

const NOTE_LIMIT  = 3
const NOTE_WINDOW = 24 * 60 * 60 * 1000 // 24 h

// Every bento card renders at this exact size — uniform "pills" in the carousel.
const CARD_W = 320
const CARD_H = 380

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

  const scrollRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startX: number; startScroll: number; dragging: boolean } | null>(null)

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

  // ── Click-and-drag horizontal scroll ────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const el = scrollRef.current
    if (!el) return
    dragRef.current = { startX: e.clientX, startScroll: el.scrollLeft, dragging: false }

    const onMove = (ev: PointerEvent) => {
      const st = dragRef.current
      if (!st || !el) return
      const dx = ev.clientX - st.startX
      if (!st.dragging && Math.abs(dx) > 6) {
        st.dragging = true
        el.style.cursor = 'grabbing'
      }
      if (st.dragging) {
        ev.preventDefault()
        el.scrollLeft = st.startScroll - dx
      }
    }
    const onUp = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      if (el) el.style.cursor = 'grab'
      dragRef.current = null
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }, [])

  return (
    <section id="about" className="flex flex-col gap-4">

      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onDragStart={(e) => e.preventDefault()}
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 cursor-grab select-none"
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

      {/* Action row */}
      <div className="flex items-center justify-end lg:justify-start gap-3 flex-wrap">
        <button
          onClick={openCreate}
          disabled={rateLimited || submitted}
          className="btn-spring glass inline-flex items-center gap-3 text-stone-600
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
