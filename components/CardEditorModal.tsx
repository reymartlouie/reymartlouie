'use client'

import { useState, useEffect, useRef } from 'react'

const COLORS = [
  { value: '#1e1e1e', label: 'Charcoal' },
  { value: '#1e3050', label: 'Navy'     },
  { value: '#1a2e26', label: 'Forest'   },
  { value: '#2a1f42', label: 'Violet'   },
  { value: '#3a1f2c', label: 'Rose'     },
  { value: '#1c2535', label: 'Slate'    },
  { value: '#2d1f18', label: 'Amber'    },
]

interface CardEditorModalProps {
  initial: { title: string; body: string; color: string } | null
  onConfirm: (data: { title: string; body: string; color: string }) => void
  onClose: () => void
}

export default function CardEditorModal({ initial, onConfirm, onClose }: CardEditorModalProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [body,  setBody]  = useState(initial?.body  ?? '')
  const [color, setColor] = useState(initial?.color ?? COLORS[0].value)
  const inputRef = useRef<HTMLInputElement>(null)
  const isEdit = false

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const canSubmit = title.trim() || body.trim()

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-[200] p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1c] border border-white/[0.08] rounded-[28px] p-6 w-full sm:w-[440px] flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-white/90 text-2xl">
            {isEdit ? 'Edit Note' : 'Leave a Note'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/8 text-white/40 hover:bg-white/12 hover:text-white/70 transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        <div className="h-px bg-white/[0.06]" />

        {/* Live preview */}
        <div
          className="rounded-2xl p-5 min-h-[88px] flex flex-col justify-between transition-colors duration-200"
          style={{ backgroundColor: color }}
        >
          <span className="font-sans text-white/30 text-[10px] uppercase tracking-widest">Note preview</span>
          <div className="mt-2">
            <p className="font-display text-xl leading-tight">
              {title
                ? <span className="text-white">{title}</span>
                : <span className="text-white/25">Your name</span>
              }
            </p>
            {body && (
              <p className="font-sans text-white/55 text-xs mt-1 leading-relaxed line-clamp-2">{body}</p>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-white/40 text-[10px] uppercase tracking-widest">Name</label>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your name"
            className="font-display bg-[#111111] text-white/90 border border-white/10 rounded-2xl px-4 py-3 text-lg placeholder:text-white/20 outline-none focus:border-white/25 transition-colors"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-white/40 text-[10px] uppercase tracking-widest">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Card content"
            rows={3}
            className="font-sans bg-[#111111] text-white/90 border border-white/10 rounded-2xl px-4 py-3 text-sm placeholder:text-white/20 outline-none focus:border-white/25 transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Color swatches */}
        <div className="flex flex-col gap-2">
          <label className="font-sans text-white/40 text-[10px] uppercase tracking-widest">Background</label>
          <div className="flex gap-2.5">
            {COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                aria-label={c.label}
                style={{
                  background:     c.value,
                  border:         `2px solid ${color === c.value ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.10)'}`,
                  width:          34,
                  height:         34,
                  borderRadius:   '50%',
                  cursor:         'pointer',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                  transform:      color === c.value ? 'scale(1.18)' : 'scale(1)',
                  transition:     'border-color 150ms ease, transform 150ms ease',
                }}
              >
                {color === c.value && (
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, lineHeight: 1 }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/[0.06]" />

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="btn-spring flex-1 font-sans text-white/50 bg-[#111111] border border-white/10 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => canSubmit && onConfirm({ title, body, color })}
            disabled={!canSubmit}
            className="btn-spring flex-1 font-sans text-[#111] bg-[#f0f0f0] font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isEdit ? 'Save Changes' : 'Leave Note'}
          </button>
        </div>

      </div>
    </div>
  )
}
