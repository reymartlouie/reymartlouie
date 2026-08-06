'use client'

import { useState } from 'react'

export default function CustomCard({
  card,
  onEdit,
  onDelete,
}: {
  cardId: string
  card: { title: string; body: string; color: string }
  onEdit: () => void
  onDelete: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const visible = hovered

  return (
    <div
      className="flex-1 flex flex-col relative overflow-hidden"
      style={{
        background: card.color,
        borderRadius: 32,
        padding: '2rem',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
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
          background: 'rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '50%',
          width: 28, height: 28,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(0,0,0,0.55)',
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
          background: 'rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '50%',
          width: 28, height: 28,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(0,0,0,0.55)',
          fontSize: 13,
          backdropFilter: 'blur(4px)',
        }}
      >
        ✏
      </button>

      {/* Content */}
      <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(0,0,0,0.35)' }}>Note</p>
      {card.title && (
        <h3 className="font-display text-2xl leading-tight mb-3" style={{ color: 'rgba(0,0,0,0.85)' }}>{card.title}</h3>
      )}
      {card.body && (
        <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)' }}>{card.body}</p>
      )}
    </div>
  )
}
