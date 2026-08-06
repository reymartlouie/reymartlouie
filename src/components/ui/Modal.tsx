'use client'

import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({
  onClose,
  eyebrow,
  title,
  actions,
  children,
  bare = false,
}: {
  onClose: () => void
  eyebrow?: ReactNode
  title?: ReactNode
  actions?: ReactNode
  children: ReactNode
  /** Skip the padded eyebrow/title header block entirely — full-bleed viewers (image/PDF) use this. */
  bare?: boolean
}) {
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
      className="fixed inset-0 z-[9000]"
      style={{
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'modalBackdropIn 200ms ease both',
      }}
    >
      {/* Whole overlay scrolls as one unit — no internal height cap, nothing gets cut off */}
      <div className="h-full overflow-y-auto no-scrollbar" onClick={onClose}>
        <div
          className="mx-auto w-full max-w-7xl px-4 md:px-6"
          style={{
            paddingTop: 'max(48px, calc(env(safe-area-inset-top, 0px) + 48px))',
            paddingBottom: 96,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative rounded-[32px] overflow-hidden"
            style={{
              background: '#ffffff',
              boxShadow: '0 40px 120px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.6) inset',
              animation: 'modalCardIn 380ms cubic-bezier(0.34,1.2,0.64,1) both',
            }}
          >
            {/* Close button — inside the frame, top-right corner */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="btn-spring absolute z-20 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors duration-150"
              style={{ top: 20, right: 20, width: 40, height: 40, color: '#1e1e1e' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>

            {!bare && (
              <div className="px-6 md:px-16 pt-12 md:pt-20 pb-8 md:pb-10">
                {eyebrow && (
                  <p className="font-sans text-base md:text-lg text-[#1e1e1e] mb-2 md:mb-3">{eyebrow}</p>
                )}
                {title && (
                  <h2 className="font-display text-[36px] md:text-[56px] leading-[1.05] font-black text-[#1e1e1e]">
                    {title}
                  </h2>
                )}
                {actions && (
                  <div className="flex flex-wrap items-center gap-3 mt-6 md:mt-8">{actions}</div>
                )}
              </div>
            )}

            <div className={bare ? '' : 'px-6 md:px-16 pb-16 md:pb-24'}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
