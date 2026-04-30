'use client'

import { useState, useEffect } from 'react'
import Reveal from '../ui/Reveal'
import CertModal from '../ui/CertModal'

const certs = [
  {
    title: 'Internship Certificate',
    issuer: 'Ubiquity Global Services',
    date: 'June 17, 2024 - July 20, 2024',
    url: '/ubiquity-internship.pdf',
    badge: '/ubiquity-photo.webp',
    photo: '',
    color: 'from-blue-700 to-blue-900',
  },
  {
    title: 'Graduation Diploma',
    issuer: 'University of St. La Salle',
    date: 'BS Computer Engineering · April 25, 2026',
    url: '',
    badge: '/graduation.webp',
    photo: '/diploma.webp',
    color: 'from-emerald-800 to-emerald-950',
  },
  // Add more certs here
]

export default function Certifications() {
  const [activeCert, setActiveCert] = useState<typeof certs[0] | null>(null)
  const [activePhoto, setActivePhoto] = useState<{ src: string; title: string; issuer: string } | null>(null)

  useEffect(() => {
    if (!activePhoto) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setActivePhoto(null) }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [activePhoto])

  return (
    <section id="certifications" className="flex flex-col gap-4">
      <Reveal>
        <div className="rounded-[32px] overflow-hidden" style={{ background: '#f5f5f7' }}>
          {/* Header */}
          <div className="px-6 md:px-8 lg:px-10 py-6 md:py-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-px h-3.5 bg-amber-700/50" />
                <p className="font-sans text-xs uppercase tracking-widest text-amber-700/70">Credentials</p>
              </div>
              <h2 className="font-display text-5xl text-stone-800">Achievements</h2>
            </div>
            <span className="font-sans text-sm hidden md:block text-stone-500">
              {certs.length} credential{certs.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Cards row */}
          <div className="overflow-x-auto pt-6 pb-10 px-8">
            <div className="flex gap-6 min-w-max">
              {certs.map(({ title, issuer, date, url, badge, photo, color }) => (
                <div
                  key={title}
                  className="flex flex-col items-center w-64 md:w-72"
                >
                  {/* Card image area */}
                  <div
                    className={`w-full rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center`}
                    style={{ aspectRatio: '4/3' }}
                  >
                    {badge ? (
                      <img
                        src={badge}
                        alt={title}
                        className="w-full h-full object-cover rounded-2xl cursor-zoom-in"
                        onClick={() => setActivePhoto({ src: badge, title, issuer })}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 opacity-30">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        <span className="text-white text-xs font-sans tracking-wide">Badge</span>
                      </div>
                    )}
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col items-center text-center mt-4 gap-1 w-full">
                    <h3 className="font-display text-xl text-stone-900 leading-snug">{title}</h3>
                    <p className="font-sans text-sm text-stone-500 leading-relaxed">{issuer}</p>
                    <p className="font-sans text-sm font-semibold text-stone-700 mt-1">{date}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4">
                    {url ? (
                      <button
                        onClick={() => setActiveCert({ title, issuer, date, url, badge, photo, color })}
                        className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-sans font-medium hover:bg-blue-700 transition-colors duration-150"
                      >
                        Learn more
                      </button>
                    ) : photo ? (
                      <button
                        onClick={() => setActivePhoto({ src: photo, title, issuer })}
                        className="px-5 py-2 rounded-full bg-emerald-700 text-white text-sm font-sans font-medium hover:bg-emerald-800 transition-colors duration-150"
                      >
                        View Diploma
                      </button>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-stone-200 text-stone-400 text-sm font-sans font-medium cursor-default select-none">
                        In progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {activePhoto && (
        <div
          className="fixed inset-0 z-[9000] flex items-end md:items-center justify-center p-4 md:p-8"
          style={{
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            animation: 'modalBackdropIn 200ms ease both',
          }}
          onClick={() => setActivePhoto(null)}
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
                <p className="font-sans text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--fg-30)' }}>{activePhoto.issuer}</p>
                <h2 className="font-display text-xl" style={{ color: 'var(--fg)' }}>{activePhoto.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={activePhoto.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs px-4 py-2 rounded-full transition-colors duration-150"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--fg-40)' }}
                >
                  Open ↗
                </a>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l10 10M11 1L1 11" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Photo */}
            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              className="w-full object-contain"
              style={{ maxHeight: '75vh' }}
            />
          </div>
        </div>
      )}

      {activeCert && (
        <CertModal
          title={activeCert.title}
          issuer={activeCert.issuer}
          url={activeCert.url}
          onClose={() => setActiveCert(null)}
        />
      )}
    </section>
  )
}
