'use client'

import { useState, useEffect, useRef } from 'react'
import DraggableBento from './DraggableBento'
import BentoCanvas, { type Rect } from './BentoCanvas'
import CustomCard from './CustomCard'
import CardEditorModal from './CardEditorModal'
import GitHubCard from './GitHubCard'

interface CustomCardData {
  id: string
  title: string
  body: string
  color: string
  delay: number
}

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
  const [customCards, setCustomCards] = useState<CustomCardData[]>([])
  const [savedPositions, setSavedPositions] = useState<Record<string, Rect>>({})
  const didLoadCards = useRef(false)

  const [rateLimited, setRateLimited] = useState(false)
  const [modalOpen,   setModalOpen]   = useState(false)
  const [editingCard, setEditingCard] = useState<CustomCardData | null>(null)

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

  // Load from localStorage client-side only (avoids hydration mismatch)
  useEffect(() => {
    try {
      const all: Record<string, Rect> = JSON.parse(localStorage.getItem('bento-positions') ?? '{}')
      const custom: Record<string, Rect> = {}
      for (const id in all) { if (id.startsWith('custom-')) custom[id] = all[id] }
      setSavedPositions(custom)
    } catch {}
    try {
      const stored: CustomCardData[] = JSON.parse(localStorage.getItem('bento-custom-cards') ?? '[]')
      didLoadCards.current = true
      setCustomCards(stored)
    } catch { didLoadCards.current = true }
    syncRateLimit()
  }, [])

  useEffect(() => {
    if (!didLoadCards.current) return
    localStorage.setItem('bento-custom-cards', JSON.stringify(customCards))
  }, [customCards])

  const handleCreateCard = (data: { title: string; body: string; color: string }) => {
    const newCard: CustomCardData = {
      id:    `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: data.title,
      body:  data.body,
      color: data.color,
      delay: (5 + customCards.length) * 60,
    }
    setCustomCards(prev => [...prev, newCard])
    bumpRate()
    setModalOpen(false)
  }

  const handleEditCard = (data: { title: string; body: string; color: string }) => {
    if (!editingCard) return
    setCustomCards(prev =>
      prev.map(c => c.id === editingCard.id ? { ...c, ...data } : c)
    )
    setEditingCard(null)
    setModalOpen(false)
  }

  const handleDeleteCard = (id: string) => {
    setCustomCards(prev => prev.filter(c => c.id !== id))
  }

  const openCreate = () => { setEditingCard(null); setModalOpen(true) }
  const openEdit   = (card: CustomCardData) => { setEditingCard(card); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditingCard(null) }

  return (
    <section id="about" className="flex flex-col gap-4">

      <BentoCanvas savedPositions={savedPositions}>

        {/* ── Static cards ────────────────────────────────────────────────── */}
        <DraggableBento className="lg:col-span-8" delay={100}>
          <div className="flex-1 rounded-[32px] p-6 md:p-8 lg:p-10 relative overflow-hidden min-h-[320px] lg:min-h-[380px] flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card-2)' }}>
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-xs font-sans px-3 py-1.5 rounded-full mb-6 lg:mb-8 w-fit" style={{ background: 'var(--badge-bg)', color: 'var(--badge-text)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--badge-dot)' }} />
                Available for work
              </span>
              <h1 className="font-display text-[44px] md:text-[56px] lg:text-[72px] leading-[0.9] mb-4 lg:mb-6" style={{ color: 'var(--hero-heading)' }}>
                Computer<br />
                Engineer<br />
                <span style={{ color: 'var(--hero-muted)' }}>&amp; Developer.</span>
              </h1>
              <p className="font-sans text-sm md:text-base max-w-lg leading-relaxed" style={{ color: 'var(--fg-40)' }}>
                Frontend and UI/UX engineer — designing and shipping production-ready apps across
                React Native and web, backed by real hardware and networking experience.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-6 lg:mt-8 relative">
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

        <DraggableBento className="lg:col-span-4" delay={180}>
          <div className="flex-1 rounded-[32px] relative overflow-hidden min-h-[340px] lg:min-h-[380px] bg-[#1a2a3a]">
            <img
              src="/photo.jpg"
              alt="Reymart Louie"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="font-sans text-white/50 text-[10px] uppercase tracking-widest mb-1.5">Class of 2026 · USLS</p>
              <p className="font-display text-white text-[28px] md:text-[32px] lg:text-[36px] leading-[0.95] drop-shadow-lg">
                Reymart Louie<br />L. Capapas
              </p>
              <p className="font-sans text-white/35 text-xs mt-2">USLS · Bacolod</p>
            </div>
          </div>
        </DraggableBento>

        <DraggableBento className="lg:col-span-3" delay={240}>
          <div className="flex-1 rounded-[32px] p-6 md:p-8 relative overflow-hidden min-h-[180px]" style={{ backgroundColor: 'var(--bg-tech)' }}>
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <p className="font-sans text-xs uppercase tracking-widest mb-5 relative" style={{ color: 'var(--tech-label)' }}>Tech Stack</p>
            <div className="flex flex-wrap gap-2 relative">
              {['TypeScript', 'React-native', 'Supabase', 'Next.js', 'React', 'Figma', 'Framer', 'Expo', 'Basic Java'].map((skill) => (
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

        <DraggableBento className="lg:col-span-3" delay={290}>
          <div className="flex-1 rounded-[32px] p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden min-h-[180px]" style={{ backgroundColor: 'var(--bg-card-3)' }}>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
            <p className="font-sans text-xs uppercase tracking-widest relative" style={{ color: 'var(--fg-30)' }}>About</p>
            <p className="font-sans text-sm md:text-base leading-relaxed relative" style={{ color: 'var(--fg-55)' }}>
              Computer Engineer focused on frontend and UI/UX development — building polished,
              production-ready interfaces with a foundation in hardware and networking.
            </p>
          </div>
        </DraggableBento>

        <DraggableBento className="lg:col-span-6" delay={380}>
          <GitHubCard />
        </DraggableBento>

        {/* ── Custom cards ─────────────────────────────────────────────────── */}

        {customCards.map(card => (
          <DraggableBento key={card.id} cardId={card.id} delay={card.delay}>
            <CustomCard
              cardId={card.id}
              card={card}
              onEdit={() => openEdit(card)}
              onDelete={() => handleDeleteCard(card.id)}
            />
          </DraggableBento>
        ))}

      </BentoCanvas>

      {/* Add card button */}
      <button
        onClick={openCreate}
        disabled={rateLimited}
        className="btn-spring inline-flex items-center gap-3 bg-white/10 text-white/70
                   border border-white/15 font-sans text-sm font-semibold px-5 py-3 rounded-full
                   hover:bg-white/[0.14] transition-colors self-start
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {rateLimited ? 'Note limit reached · come back tomorrow' : '+ Leave a note'}
      </button>

      {/* Card editor modal */}
      {modalOpen && (
        <CardEditorModal
          initial={editingCard
            ? { title: editingCard.title, body: editingCard.body, color: editingCard.color }
            : null
          }
          onConfirm={editingCard ? handleEditCard : handleCreateCard}
          onClose={closeModal}
        />
      )}

    </section>
  )
}
