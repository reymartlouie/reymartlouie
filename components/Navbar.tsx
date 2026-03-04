'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconWork() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2"  y="2"  width="7" height="7" rx="2" />
      <rect x="11" y="2"  width="7" height="7" rx="2" />
      <rect x="2"  y="11" width="7" height="7" rx="2" />
      <rect x="11" y="11" width="7" height="7" rx="2" />
    </svg>
  )
}

function IconAbout() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="6" r="3.5" />
      <path d="M2 18c0-4.42 3.58-8 8-8s8 3.58 8 8" />
    </svg>
  )
}

function IconContact() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="13" rx="2" />
      <path d="m2 7 8 5.5L18 7" />
    </svg>
  )
}

// ── Nav items ──────────────────────────────────────────────────────────────────

const NAV = [
  { id: 'work',    label: 'Work',    href: '#work',    Icon: IconWork    },
  { id: 'about',   label: 'About',   href: '#about',   Icon: IconAbout   },
  { id: 'contact', label: 'Contact', href: '#contact', Icon: IconContact },
] as const

// ── Component ──────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [ready,  setReady]  = useState(false)
  const [active, setActive] = useState<string>('none')

  useEffect(() => setReady(true), [])

  // Highlight whichever section is most visible in the viewport
  const updateActive = useCallback(() => {
    if (window.scrollY < 80) { setActive('none'); return }
    const ids = ['work', 'about', 'contact']
    let best = 'none', bestRatio = 0
    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      const { top, bottom, height } = el.getBoundingClientRect()
      const visible = Math.min(bottom, window.innerHeight) - Math.max(top, 0)
      const ratio = Math.max(0, visible) / height
      if (ratio > bestRatio) { bestRatio = ratio; best = id }
    }
    setActive(best)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener('scroll', updateActive)
  }, [updateActive])

  return (
    <div
      className="fixed bottom-7 inset-x-0 flex justify-center z-50 pointer-events-none"
      style={{
        opacity:   ready ? 1 : 0,
        transform: ready ? 'translateY(0)' : 'translateY(20px)',
        transition: ready
          ? 'opacity 400ms cubic-bezier(0.2,0,0,1) 180ms, transform 500ms cubic-bezier(0.34,1.2,0.64,1) 180ms'
          : 'none',
      }}
    >
      <nav
        className="pointer-events-auto flex items-center gap-1 px-3 py-2.5"
        style={{
          background:           'rgba(24, 24, 26, 0.60)',
          backdropFilter:        'blur(56px) saturate(180%)',
          WebkitBackdropFilter:  'blur(56px) saturate(180%)',
          border:                '1px solid rgba(255,255,255,0.09)',
          borderRadius:          40,
          boxShadow: [
            '0 12px 56px rgba(0,0,0,0.55)',
            '0 1px 0 rgba(255,255,255,0.07) inset',
            '0 -1px 0 rgba(0,0,0,0.35) inset',
          ].join(', '),
        }}
      >
        {/* Brand mark */}
        <a
          href="/"
          className="font-display text-white/90 text-sm px-3.5 py-2 rounded-full
                     hover:bg-white/10 transition-colors"
          style={{ letterSpacing: '-0.02em' }}
        >
          RL
        </a>

        {/* Divider */}
        <div className="w-px h-5 mx-0.5 bg-white/10 rounded-full flex-shrink-0" />

        {/* Nav tabs */}
        {NAV.map(({ id, label, href, Icon }) => {
          const isActive = active === id
          return (
            <a
              key={id}
              href={href}
              onClick={() => setActive(id)}
              className="flex flex-col items-center gap-1 px-3.5 py-2 rounded-[26px] transition-all"
              style={{
                background: isActive ? 'rgba(255,255,255,0.11)' : 'transparent',
                color:      isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.38)',
                transition: 'background 200ms ease, color 200ms ease',
              }}
            >
              <Icon />
              <span
                className="font-sans leading-none"
                style={{ fontSize: 10, letterSpacing: '0.01em' }}
              >
                {label}
              </span>
            </a>
          )
        })}

        {/* Divider */}
        <div className="w-px h-5 mx-0.5 bg-white/10 rounded-full flex-shrink-0" />

        {/* CTA */}
        <a
          href="#contact"
          className="btn-spring font-sans text-xs font-semibold bg-[#f0f0f0] text-[#111]
                     px-4 py-2.5 rounded-full hover:bg-white transition-colors"
        >
          Hire Me
        </a>
      </nav>
    </div>
  )
}
