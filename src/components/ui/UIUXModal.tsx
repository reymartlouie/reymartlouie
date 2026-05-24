'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  onClose: () => void
}

export default function UIUXModal({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'modalBackdropIn 200ms ease both',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-[32px] overflow-hidden flex flex-col"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.8) inset',
          animation: 'modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-0.5 text-stone-400">Coming Soon</p>
            <h2 className="font-display text-xl text-stone-800">UI/UX Projects</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 bg-stone-100 hover:bg-stone-200 text-stone-500"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l10 10M11 1L1 11" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8 flex flex-col items-center text-center gap-6">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%)', border: '1px solid rgba(99,102,241,0.14)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" />
              <circle cx="12" cy="12" r="1.5" fill="rgba(99,102,241,0.8)" stroke="none" />
            </svg>
          </div>

          <div className="flex flex-col gap-2 max-w-xs">
            <h3 className="font-display text-2xl text-stone-900">Design work<br />on the way.</h3>
            <p className="font-sans text-sm leading-relaxed text-stone-500">
              Case studies, wireframes, and high-fidelity prototypes will live here soon. In the meantime, explore the existing portfolio.
            </p>
          </div>

          <a
            href="https://reymartlouie.framer.website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-sm transition-colors duration-150"
            style={{ background: 'rgba(99,102,241,0.10)', color: 'rgba(79,70,229,1)', border: '1px solid rgba(99,102,241,0.18)' }}
          >
            View Framer Portfolio ↗
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}
