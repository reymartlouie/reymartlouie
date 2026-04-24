'use client'

import { useEffect } from 'react'

interface Props {
  title: string
  issuer: string
  url: string
  onClose: () => void
}

export default function CertModal({ title, issuer, url, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-end md:items-center justify-center p-4 md:p-8"
      style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'modalBackdropIn 200ms ease both',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-[32px] overflow-hidden flex flex-col"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06) inset',
          animation: 'modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--fg-30)' }}>{issuer}</p>
            <h2 className="font-display text-xl" style={{ color: 'var(--fg)' }}>{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs px-4 py-2 rounded-full transition-colors duration-150"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--fg-40)' }}
            >
              Open ↗
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <iframe
          src={url}
          className="w-full"
          style={{ height: '75vh', border: 'none' }}
          title={title}
        />
      </div>
    </div>
  )
}
