'use client'

import { useState, useEffect } from 'react'
import DraggableBento from '../bento/DraggableBento'
import BentoCanvas, { type Rect } from '../bento/BentoCanvas'
import CustomCard from '../bento/CustomCard'
import CardEditorModal from '../bento/CardEditorModal'
import GitHubCard from '../cards/GitHubCard'
import HeroIntroCard from '../cards/HeroIntroCard'
import PhotoCard from '../cards/PhotoCard'
import TechStackCard from '../cards/TechStackCard'
import AboutCard from '../cards/AboutCard'
import { supabase, type Testimonial } from '@/lib/supabase'

const NOTE_LIMIT  = 3
const NOTE_WINDOW = 24 * 60 * 60 * 1000 // 24 h

function readRate(): { count: number; resetAt: number } {
  try {
    const raw = localStorage.getItem('bento-note-rate')
    if (raw) return JSON.parse(raw)
  } catch {}
  return { count: 0, resetAt: Date.now() + NOTE_WINDOW }
}

export default function Hero() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [savedPositions, setSavedPositions] = useState<Record<string, Rect>>({})

  const [editMode,    setEditMode]    = useState(false)
  const [rateLimited, setRateLimited] = useState(false)
  const [modalOpen,   setModalOpen]   = useState(false)
  const [submitted,   setSubmitted]   = useState(false)

  const fetchTestimonials = () =>
    supabase
      .from('testimonials')
      .select('id, title, body, color, approved, created_at')
      .eq('approved', true)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error) { console.error('[testimonials] fetch error:', error); return }
        console.log('[testimonials] fetched:', data)
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
    try {
      const all: Record<string, Rect> = JSON.parse(localStorage.getItem('bento-positions-v4') ?? '{}')
      setSavedPositions(all)
    } catch {}
    try {
      if (localStorage.getItem('bento-edit-mode') === 'true') setEditMode(true)
    } catch {}
    syncRateLimit()

    fetchTestimonials()

    // Poll every 60s — testimonials change infrequently; 10s was unnecessary
    const interval = setInterval(fetchTestimonials, 60_000)

    return () => { clearInterval(interval) }
  }, [])

  useEffect(() => {
    try { localStorage.setItem('bento-edit-mode', String(editMode)) } catch {}
  }, [editMode])

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

      <BentoCanvas savedPositions={savedPositions} editMode={editMode}>

        {/* ── Static cards ────────────────────────────────────────────────── */}
        <DraggableBento locked className="lg:col-span-8" delay={100} minW={320} minH={240}>
          <HeroIntroCard />
        </DraggableBento>

        <DraggableBento locked className="lg:col-span-4" delay={180} minW={200} minH={280}>
          <PhotoCard />
        </DraggableBento>

        <DraggableBento locked className="lg:col-span-3" delay={240} minW={260} minH={260}>
          <TechStackCard />
        </DraggableBento>

        <DraggableBento locked className="lg:col-span-3" delay={290} minW={240} minH={240}>
          <AboutCard />
        </DraggableBento>

        <DraggableBento locked className="lg:col-span-6" delay={380} minW={300} minH={220}>
          <GitHubCard />
        </DraggableBento>

        {/* ── Testimonial cards ────────────────────────────────────────────── */}

        {testimonials.map((card, i) => (
          <DraggableBento key={card.id} cardId={card.id} delay={(5 + i) * 60}>
            <CustomCard
              cardId={card.id}
              card={card}
              onEdit={() => {}}
              onDelete={() => handleDeleteCard(card.id)}
            />
          </DraggableBento>
        ))}

      </BentoCanvas>

      {/* Action row */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={openCreate}
          disabled={rateLimited || submitted}
          className="btn-spring inline-flex items-center gap-3 bg-white/10 text-white/70
                     border border-white/15 font-sans text-sm font-semibold px-5 py-3 rounded-full
                     hover:bg-white/[0.14] transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitted ? 'Note submitted · pending approval' : rateLimited ? 'Note limit reached · come back tomorrow' : '+ Leave a note'}
        </button>

        <button
          onClick={() => setEditMode(prev => !prev)}
          className={`btn-spring hidden lg:inline-flex items-center gap-2 font-sans text-sm font-semibold
                      px-5 py-3 rounded-full border transition-colors
                      ${editMode
                        ? 'bg-white/[0.14] text-white/90 border-white/25 hover:bg-white/20'
                        : 'bg-white/10 text-white/70 border-white/15 hover:bg-white/[0.14]'
                      }`}
        >
          {editMode ? '✓ Done' : '⊹ Edit layout'}
        </button>

        {editMode && (
          <button
            onClick={() => {
              try { localStorage.removeItem('bento-positions-v4') } catch {}
              window.location.reload()
            }}
            className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold
                       px-5 py-3 rounded-full border border-red-500/25 bg-red-500/10
                       text-red-400/70 hover:bg-red-500/[0.18] transition-colors"
          >
            ↺ Reset layout
          </button>
        )}

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
