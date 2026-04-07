'use client'

import { useState, useEffect } from 'react'
import DraggableBento from './DraggableBento'
import BentoCanvas, { type Rect } from './BentoCanvas'
import CustomCard from './CustomCard'
import CardEditorModal from './CardEditorModal'
import GitHubCard from './GitHubCard'
import HeroIntroCard from './HeroIntroCard'
import PhotoCard from './PhotoCard'
import TechStackCard from './TechStackCard'
import AboutCard from './AboutCard'
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
      const all: Record<string, Rect> = JSON.parse(localStorage.getItem('bento-positions-v3') ?? '{}')
      setSavedPositions(all)
    } catch {}
    try {
      if (localStorage.getItem('bento-edit-mode') === 'true') setEditMode(true)
    } catch {}
    syncRateLimit()

    fetchTestimonials()

    // Poll every 10s so approvals show up without any realtime config
    const interval = setInterval(fetchTestimonials, 10_000)

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
        <DraggableBento className="lg:col-span-8" delay={100} minW={320} minH={240}
          sizes={[
            { label: 'I',   w: 420, h: 240 },
            { label: 'II',  w: 580, h: 380 },
            { label: 'III', w: 780, h: 460 },
          ]}
        >
          <HeroIntroCard />
        </DraggableBento>

        <DraggableBento className="lg:col-span-4" delay={180} minW={200} minH={280}
          sizes={[
            { label: 'I',   w: 220, h: 320 },
            { label: 'II',  w: 300, h: 420 },
            { label: 'III', w: 400, h: 520 },
          ]}
        >
          <PhotoCard />
        </DraggableBento>

        <DraggableBento className="lg:col-span-3" delay={240} minW={260} minH={260}
          sizes={[
            { label: 'I',   w: 260, h: 260 },
            { label: 'II',  w: 360, h: 300 },
            { label: 'III', w: 460, h: 360 },
          ]}
        >
          <TechStackCard />
        </DraggableBento>

        <DraggableBento className="lg:col-span-3" delay={290} minW={240} minH={240}
          sizes={[
            { label: 'I',   w: 240, h: 240 },
            { label: 'II',  w: 340, h: 280 },
            { label: 'III', w: 440, h: 340 },
          ]}
        >
          <AboutCard />
        </DraggableBento>

        <DraggableBento className="lg:col-span-6" delay={380} minW={300} minH={220}
          sizes={[
            { label: 'I',   w: 300, h: 220 },
            { label: 'II',  w: 460, h: 260 },
            { label: 'III', w: 620, h: 320 },
          ]}
        >
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
          className={`btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold
                      px-5 py-3 rounded-full border transition-colors
                      ${editMode
                        ? 'bg-white/[0.14] text-white/90 border-white/25 hover:bg-white/20'
                        : 'bg-white/10 text-white/70 border-white/15 hover:bg-white/[0.14]'
                      }`}
        >
          {editMode ? '✓ Done' : '⊹ Edit layout'}
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
