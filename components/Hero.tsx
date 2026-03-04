'use client'

import { useState, useEffect, useRef } from 'react'
import DraggableBento from './DraggableBento'
import BentoCanvas, { type Rect } from './BentoCanvas'
import CustomCard from './CustomCard'
import CardEditorModal from './CardEditorModal'

interface CustomCardData {
  id: string
  title: string
  body: string
  color: string
  delay: number
}

export default function Hero() {
  const [customCards, setCustomCards] = useState<CustomCardData[]>([])
  const [savedPositions, setSavedPositions] = useState<Record<string, Rect>>({})
  const didLoadCards = useRef(false)

  const [modalOpen,   setModalOpen]   = useState(false)
  const [editingCard, setEditingCard] = useState<CustomCardData | null>(null)

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
          <div className="flex-1 bg-[#262626] rounded-[32px] p-8 lg:p-10 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 bg-[#1e3320] text-[#86efac] text-xs font-sans px-3 py-1.5 rounded-full mb-8 w-fit">
                <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse" />
                Available for work
              </span>
              <h1 className="font-display text-[56px] lg:text-[72px] leading-[0.9] text-[#f0f0f0] mb-6">
                Crafting<br />
                thoughtful<br />
                <span className="text-[#888888]">digital</span> experiences.
              </h1>
              <p className="font-sans text-white/40 text-base max-w-lg leading-relaxed">
                I design and build products that are clean, purposeful, and built to last.
                Currently open to full-time roles and freelance projects.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-8 relative">
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
          <div className="flex-1 rounded-[32px] relative overflow-hidden min-h-[280px] bg-[#1a2a3a]">
            {/* Replace /photo.jpg with your actual photo path */}
            <img
              src="/photo.jpg"
              alt="Reymart Louie"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-sans text-white/50 text-xs uppercase tracking-widest mb-1">I am a</p>
              <p className="font-display text-white text-[40px] lg:text-[44px] leading-[0.9] drop-shadow-lg">
                Computer<br />Engineer
              </p>
            </div>
          </div>
        </DraggableBento>

        <DraggableBento className="lg:col-span-4" delay={240}>
          <div className="flex-1 bg-[#1a1a1a] rounded-[32px] p-8">
            <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-5">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {['C++', 'Python', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Figma'].map((skill) => (
                <span key={skill} className="font-sans text-xs text-white/60 bg-white/8 border border-white/10 px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </DraggableBento>

        <DraggableBento className="lg:col-span-6" delay={290}>
          <div className="flex-1 bg-[#222222] rounded-[32px] p-8 flex flex-col justify-between">
            <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-4">About</p>
            <p className="font-sans text-white/55 text-base leading-relaxed">
              A computer engineer who bridges hardware understanding with modern software development.
              I build scalable systems, craft intuitive interfaces, and engineer solutions that matter.
            </p>
          </div>
        </DraggableBento>

        <DraggableBento className="lg:col-span-2" delay={340}>
          <div className="w-full aspect-square bg-[#1a3d72] rounded-[32px] p-6 flex flex-col items-center justify-center text-center">
            <p className="font-sans text-[#93c5fd]/40 text-[10px] uppercase tracking-widest mb-3">Experience</p>
            <p className="font-display text-[#bfdbfe] text-6xl leading-none">4+</p>
            <p className="font-sans text-[#93c5fd]/60 text-xs mt-2 leading-snug">Years crafting<br />digital products</p>
          </div>
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
        className="btn-spring inline-flex items-center gap-3 bg-white/10 text-white/70
                   border border-white/15 font-sans text-sm font-semibold px-5 py-3 rounded-full
                   hover:bg-white/[0.14] transition-colors self-start"
      >
        + Add card
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
