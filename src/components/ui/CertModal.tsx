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
      className="fixed inset-0 z-[9000] flex items-end md:items-center justify-center md:p-8"
      style={{
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'modalBackdropIn 200ms ease both',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-t-[32px] md:rounded-[32px] overflow-hidden flex flex-col"
        style={{
          background: '#ffffff',
          maxWidth: '560px',
          maxHeight: '90vh',
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          animation: 'modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0 md:hidden">
          <div className="w-9 h-1 rounded-full bg-black/10" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-0.5 text-stone-400">{issuer}</p>
            <h2 className="font-display text-xl text-stone-900">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs px-4 py-2 rounded-full transition-colors duration-150 text-stone-600"
              style={{ background: 'rgba(0,0,0,0.06)' }}
            >
              Open ↗
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
              style={{ background: 'rgba(0,0,0,0.06)', color: '#6c6c70' }}
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
          className="w-full flex-1 min-h-0"
          style={{ border: 'none', minHeight: '400px' }}
          title={title}
        />
      </div>
    </div>
  )
}
