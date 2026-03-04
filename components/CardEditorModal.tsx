'use client'

import { useState, useEffect, useRef } from 'react'

const COLORS = [
  '#1e1e1e', // charcoal
  '#1e3050', // navy
  '#1a2e26', // forest
  '#2a1f42', // purple
  '#3a1f2c', // rose
  '#1c2535', // slate
  '#2d1f18', // amber dark
]

interface CardEditorModalProps {
  initial: { title: string; body: string; color: string } | null
  onConfirm: (data: { title: string; body: string; color: string }) => void
  onClose: () => void
}

export default function CardEditorModal({ initial, onConfirm, onClose }: CardEditorModalProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [body,  setBody]  = useState(initial?.body  ?? '')
  const [color, setColor] = useState(initial?.color ?? COLORS[0])
  const inputRef = useRef<HTMLInputElement>(null)
  const isEdit = initial !== null

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const canSubmit = title.trim() || body.trim()

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1c] rounded-[28px] p-8 w-[420px] max-w-[90vw] flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-white/90 text-2xl">
          {isEdit ? 'Edit Card' : 'New Card'}
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-white/40 text-xs uppercase tracking-widest">Title</label>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card title"
            className="font-display bg-white/6 text-white/90 border border-white/10 rounded-xl px-4 py-2.5 text-lg placeholder:text-white/25 outline-none focus:border-white/25 transition-colors"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-white/40 text-xs uppercase tracking-widest">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Card content"
            rows={4}
            className="font-sans bg-white/6 text-white/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm placeholder:text-white/25 outline-none focus:border-white/25 transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Color swatches */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-white/40 text-xs uppercase tracking-widest">Color</label>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Select color ${c}`}
                style={{
                  background: c,
                  borderColor: color === c ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.12)',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  width: 32, height: 32,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color 150ms ease',
                  flexShrink: 0,
                }}
              >
                {color === c && (
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, lineHeight: 1 }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-1">
          <button
            onClick={onClose}
            className="btn-spring flex-1 font-sans text-white/50 bg-white/6 border border-white/10 px-5 py-2.5 rounded-full text-sm hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => canSubmit && onConfirm({ title, body, color })}
            disabled={!canSubmit}
            className="btn-spring flex-1 font-sans text-[#111] bg-[#f0f0f0] font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isEdit ? 'Save' : 'Add Card'}
          </button>
        </div>
      </div>
    </div>
  )
}
