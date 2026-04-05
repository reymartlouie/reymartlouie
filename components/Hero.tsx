'use client'

import { useState, useEffect } from 'react'
import DraggableBento from './DraggableBento'
import BentoCanvas, { type Rect } from './BentoCanvas'
import CustomCard from './CustomCard'
import CardEditorModal from './CardEditorModal'
import GitHubCard from './GitHubCard'
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
          <div className="@container flex-1 rounded-[32px] p-5 @md:p-7 @xl:p-9 relative overflow-hidden flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card-2)' }}>
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-xs font-sans px-3 py-1 rounded-full mb-4 @xl:mb-5 w-fit" style={{ background: 'var(--badge-bg)', color: 'var(--badge-text)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--badge-dot)' }} />
                Available for work
              </span>
              <h1 className="font-display text-[44px] @md:text-[58px] @xl:text-[72px] leading-[1.05] mb-3 @xl:mb-4" style={{ color: 'var(--hero-heading)' }}>
                Computer<br />
                Engineer<br />
                <span style={{ color: 'var(--hero-muted)' }}>&amp; Developer.</span>
              </h1>
              <p className="font-sans text-sm @md:text-base max-w-lg leading-relaxed" style={{ color: 'var(--fg-40)' }}>
                Full-Stack and UI/UX engineer — designing and shipping production-ready apps across
                React Native and web, backed by real hardware and networking experience.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2 @md:mt-4 @xl:mt-6 relative">
              <a href="#work" className="btn-spring inline-flex items-center gap-2 bg-[#f0f0f0] text-[#111111] font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-white transition-colors">
                View Work
              </a>
              <a href="#contact" className="btn-spring group inline-flex items-center gap-3 bg-white/10 text-white/70 border border-white/15 font-sans text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/[0.14] transition-colors">
                Get in Touch
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </DraggableBento>

        <DraggableBento className="lg:col-span-4" delay={180} minW={200} minH={280}
          sizes={[
            { label: 'I',   w: 220, h: 320 },
            { label: 'II',  w: 300, h: 420 },
            { label: 'III', w: 400, h: 520 },
          ]}
        >
          <div className="@container flex-1 rounded-[32px] relative overflow-hidden min-h-[340px] @md:min-h-[380px] bg-[#1a2a3a]">
            <img
              src="/photo.jpg"
              alt="Reymart Louie"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
              <p className="font-sans text-white/50 text-[10px] uppercase tracking-widest mb-1.5">Class of 2026 · USLS</p>
              <p className="font-display text-white text-[28px] @sm:text-[32px] @md:text-[36px] leading-[0.95] drop-shadow-lg">
                Reymart Louie<br />L. Capapas
              </p>
              <p className="font-sans text-white/35 text-xs mt-2">USLS · Bacolod</p>
            </div>
          </div>
        </DraggableBento>

        <DraggableBento className="lg:col-span-3" delay={240} minW={260} minH={260}
          sizes={[
            { label: 'I',   w: 260, h: 260 },
            { label: 'II',  w: 360, h: 300 },
            { label: 'III', w: 460, h: 360 },
          ]}
        >
          <div className="@container flex-1 rounded-[32px] p-6 @md:p-8 relative overflow-hidden min-h-[180px]" style={{ backgroundColor: 'var(--bg-tech)' }}>
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <p className="font-sans text-xs uppercase tracking-widest mb-5 relative" style={{ color: 'var(--tech-label)' }}>Tech Stack</p>
            <div className="flex flex-wrap gap-2 relative">
              {['TypeScript', 'React-native', 'Supabase', 'Next.js', 'React', 'Figma', 'Framer', 'Expo'].map((skill) => (
                <span key={skill} className="font-sans text-xs px-3 py-1.5 rounded-full transition-colors duration-150 cursor-default" style={{ color: 'var(--tech-tag-fg)', backgroundColor: 'var(--tech-tag-bg)', border: '1px solid var(--tech-tag-border)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.90)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tech-tag-fg)'}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </DraggableBento>

        <DraggableBento className="lg:col-span-3" delay={290} minW={240} minH={240}
          sizes={[
            { label: 'I',   w: 240, h: 240 },
            { label: 'II',  w: 340, h: 280 },
            { label: 'III', w: 440, h: 340 },
          ]}
        >
          <div className="@container flex-1 rounded-[32px] p-6 @md:p-8 flex flex-col gap-4 relative overflow-hidden min-h-[180px]" style={{ backgroundColor: 'var(--bg-card-3)' }}>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
            <p className="font-sans text-xs uppercase tracking-widest relative" style={{ color: 'var(--fg-30)' }}>About</p>
            <p className="font-sans text-sm @md:text-base leading-relaxed relative" style={{ color: 'var(--fg-55)' }}>
              Computer Engineer focused on UI/UX and Full-Stack Development — building polished, production-ready interfaces
              with a foundation in hardware and networking.
            </p>
          </div>
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
