'use client'

import { useEffect, useState } from 'react'
import { useBentoCanvas } from './BentoCanvas'

export default function CustomCard({
  cardId,
  card,
  onEdit,
  onDelete,
}: {
  cardId: string
  card: { title: string; body: string; color: string }
  onEdit: () => void
  onDelete: () => void
}) {
  const { removeCard, jiggling } = useBentoCanvas()
  const [hovered, setHovered] = useState(false)
  const visible = hovered || jiggling

  // Sync canvas positions when this card unmounts (user deleted it)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => removeCard(cardId), [])

  return (
    <div
      className="flex-1 flex flex-col relative overflow-hidden"
      style={{ background: card.color, borderRadius: 32, padding: '2rem' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Delete (✕) — top-left */}
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); onDelete() }}
        aria-label="Delete card"
        style={{
          position: 'absolute',
          top: 14, left: 14,
          opacity: visible ? 0.7 : 0,
          transition: 'opacity 200ms ease',
          zIndex: 25,
          background: 'rgba(0,0,0,0.35)',
          border: 'none',
          borderRadius: '50%',
          width: 28, height: 28,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 13,
          backdropFilter: 'blur(4px)',
        }}
      >
        ✕
      </button>

      {/* Edit (pencil) — top-right, offset left of drag hint */}
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); onEdit() }}
        aria-label="Edit card"
        style={{
          position: 'absolute',
          top: 14, right: 44,
          opacity: visible ? 0.6 : 0,
          transition: 'opacity 200ms ease',
          zIndex: 25,
          background: 'rgba(0,0,0,0.35)',
          border: 'none',
          borderRadius: '50%',
          width: 28, height: 28,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 13,
          backdropFilter: 'blur(4px)',
        }}
      >
        ✏
      </button>

      {/* Content */}
      <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-4">Note</p>
      {card.title && (
        <h3 className="font-display text-white/90 text-2xl leading-tight mb-3">{card.title}</h3>
      )}
      {card.body && (
        <p className="font-sans text-white/60 text-sm leading-relaxed">{card.body}</p>
      )}
    </div>
  )
}
