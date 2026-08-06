'use client'

import { useState, useEffect, useRef } from 'react'

const COLORS = [
  { value: '#f5f5f7', label: 'Silver' },
  { value: '#fff8f5', label: 'Cream'  },
  { value: '#edf4ff', label: 'Mist'   },
  { value: '#f0fdf4', label: 'Sage'   },
  { value: '#fef9ee', label: 'Amber'  },
  { value: '#fdf4ff', label: 'Violet' },
  { value: '#fff1f2', label: 'Rose'   },
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
      className="modal-backdrop fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
      style={{ animation: 'modalBackdropIn 200ms ease both' }}
      onClick={onClose}
    >
      <div
        className="glass-strong modal-card rounded-[28px] p-6 w-full sm:w-[440px] flex flex-col gap-5 max-h-[90dvh] overflow-y-auto"
        style={{ animation: 'modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-stone-800 text-2xl">
            {isEdit ? 'Edit Note' : 'Leave a Note'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/[0.05] text-stone-400 hover:bg-black/[0.08] hover:text-stone-600 transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        <div className="h-px bg-black/[0.06]" />

        {/* Live preview */}
        <div
          className="rounded-2xl p-5 min-h-[88px] flex flex-col justify-between transition-colors duration-200"
          style={{ backgroundColor: color }}
        >
          <span className="font-sans text-[10px] uppercase tracking-widest" style={{ color: 'rgba(0,0,0,0.35)' }}>Note preview</span>
          <div className="mt-2">
            <p className="font-display text-xl leading-tight">
              {title
                ? <span style={{ color: 'rgba(0,0,0,0.85)' }}>{title}</span>
                : <span style={{ color: 'rgba(0,0,0,0.25)' }}>Your name</span>
              }
            </p>
            {body && (
              <p className="font-sans text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: 'rgba(0,0,0,0.50)' }}>{body}</p>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-stone-400 text-[10px] uppercase tracking-widest">Name</label>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your name"
            className="font-display bg-black/[0.03] text-stone-800 border border-black/10 rounded-2xl px-4 py-3 text-lg placeholder:text-stone-300 outline-none focus:border-black/25 transition-colors"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-stone-400 text-[10px] uppercase tracking-widest">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Card content"
            rows={3}
            className="font-sans bg-black/[0.03] text-stone-800 border border-black/10 rounded-2xl px-4 py-3 text-sm placeholder:text-stone-300 outline-none focus:border-black/25 transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Color swatches */}
        <div className="flex flex-col gap-2">
          <label className="font-sans text-stone-400 text-[10px] uppercase tracking-widest">Background</label>
          <div className="flex gap-2.5">
            {COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                aria-label={c.label}
                style={{
                  background:     c.value,
                  border:         `2px solid ${color === c.value ? 'rgba(29,29,31,0.55)' : 'rgba(29,29,31,0.12)'}`,
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
                  <span style={{ color: 'rgba(29,29,31,0.75)', fontSize: 11, lineHeight: 1 }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-black/[0.06]" />

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="btn-spring flex-1 font-sans text-stone-500 bg-black/[0.04] border border-black/10 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black/[0.07] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => canSubmit && onConfirm({ title, body, color })}
            disabled={!canSubmit}
            className="btn-spring flex-1 font-sans text-white bg-stone-900 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isEdit ? 'Save Changes' : 'Leave Note'}
          </button>
        </div>

      </div>
    </div>
  )
}
