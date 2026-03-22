'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Nav icons ───────────────────────────────────────────────────────────────

function IconWork() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2"  y="2"  width="7" height="7" rx="2" />
      <rect x="11" y="2"  width="7" height="7" rx="2" />
      <rect x="2"  y="11" width="7" height="7" rx="2" />
      <rect x="11" y="11" width="7" height="7" rx="2" />
    </svg>
  )
}

function IconCanvas() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="12" height="12" rx="1.5" />
      <path d="M2 4h2M16 4h2M2 16h2M16 16h2M4 2v2M16 2v2M4 16v2M16 16v2" />
    </svg>
  )
}

function IconContact() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="13" rx="2" />
      <path d="m2 7 8 5.5L18 7" />
    </svg>
  )
}

function LogoFireSafe() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17c-2.8 0-5-2.2-5-5 0-2.8 1.8-5 3.5-7.5.2 2.2 1.2 3.2 1.5 3.2.3 0 1.3-1 1.5-3C13.2 6.2 15 8.2 15 12c0 2.8-2.2 5-5 5z" />
      <path d="M10 14.5c-1.1 0-2-1-2-2.2 0-.8.5-1.5 1.2-1.8.1 1 .5 1.5.8 1.5.3 0 .7-.5.8-1.5.7.3 1.2 1 1.2 1.8 0 1.2-.9 2.2-2 2.2z" />
    </svg>
  )
}

function LogoUIUX() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2.5l3 3-10 10H4.5v-3l10-10z" />
      <path d="M12 5l3 3" />
      <path d="M4.5 15.5L3 17" />
    </svg>
  )
}

// ── Liquid glass icon ────────────────────────────────────────────────────────

function GlassIcon({ Icon, tint, glow, active }: {
  Icon: React.ComponentType
  tint: string
  glow: string
  active?: boolean
}) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-110 group-active:scale-95"
      style={{
        width: 38, height: 38,
        borderRadius: 11,
        background: tint,
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: [
          `0 2px 10px ${glow}`,
          '0 1px 0 rgba(255,255,255,0.20) inset',
        ].join(', '),
        opacity: active === false ? 0.55 : 1,
        transition: 'opacity 200ms ease, box-shadow 200ms ease, transform 200ms ease',
      }}
    >
      {/* Subtle top sheen */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '45%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '11px 11px 0 0',
        }}
      />
      {/* Icon */}
      <div className="relative" style={{ color: '#fff' }}>
        <Icon />
      </div>
    </div>
  )
}

// ── Nav items ────────────────────────────────────────────────────────────────

const NAV = [
  { id: 'about',   label: 'Canvas',  href: '#about',   Icon: IconCanvas,  tint: '#2563eb', glow: 'rgba(37,99,235,0.55)'   },
  { id: 'work',    label: 'Work',    href: '#work',    Icon: IconWork,    tint: '#059669', glow: 'rgba(5,150,105,0.55)'   },
  { id: 'contact', label: 'Contact', href: '#contact', Icon: IconContact, tint: '#7c3aed', glow: 'rgba(124,58,237,0.55)'  },
] as const

const PROJECTS = [
  {
    label: 'FireSafe',
    Icon: LogoFireSafe,
    tint: '#c2410c',
    glow: 'rgba(194,65,12,0.55)',
    href: null as string | null,
  },
  {
    label: 'UI/UX',
    Icon: LogoUIUX,
    tint: '#be185d',
    glow: 'rgba(190,24,93,0.55)',
    href: 'https://reymartlouie.framer.website',
  },
]

// ── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [ready,  setReady]  = useState(false)
  const [active, setActive] = useState<string>('about')

  useEffect(() => setReady(true), [])

  const updateActive = useCallback(() => {
    if (window.scrollY < 80) { setActive('about'); return }
    const ids = ['about', 'work', 'contact']
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

  const openFireSafe = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => window.dispatchEvent(new CustomEvent('open-firesafe')), 350)
  }

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
        className="pointer-events-auto flex items-center gap-2 px-6 py-3"
        style={{
          background:          'rgba(18,18,20,0.55)',
          backdropFilter:       'blur(60px) saturate(200%)',
          WebkitBackdropFilter: 'blur(60px) saturate(200%)',
          border:               '1px solid rgba(255,255,255,0.11)',
          borderRadius:         44,
          boxShadow: [
            '0 16px 64px rgba(0,0,0,0.6)',
            '0 1px 0 rgba(255,255,255,0.08) inset',
            '0 -1px 0 rgba(0,0,0,0.4) inset',
          ].join(', '),
        }}
      >
        {/* Section nav */}
        {NAV.map(({ id, label, href, Icon, tint, glow }) => (
          <a
            key={id}
            href={href}
            onClick={() => setActive(id)}
            className="flex flex-col items-center gap-1.5 px-2 py-1 group"
            style={{ color: active === id ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)', transition: 'color 200ms ease' }}
          >
            <GlassIcon Icon={Icon} tint={tint} glow={glow} active={active === id} />
            <span className="font-sans leading-none" style={{ fontSize: 10, letterSpacing: '0.01em' }}>{label}</span>
          </a>
        ))}

        {/* Divider */}
        <div className="w-px h-8 mx-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }} />

        {/* Project icons */}
        {PROJECTS.map(({ label, Icon, tint, glow, href }) =>
          href ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 px-2 py-1 group"
              style={{ color: 'rgba(255,255,255,0.60)', transition: 'color 200ms ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.95)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)'}
            >
              <GlassIcon Icon={Icon} tint={tint} glow={glow} />
              <span className="font-sans leading-none" style={{ fontSize: 10, letterSpacing: '0.01em' }}>{label}</span>
            </a>
          ) : (
            <button
              key={label}
              onClick={openFireSafe}
              className="flex flex-col items-center gap-1.5 px-2 py-1 group"
              style={{ color: 'rgba(255,255,255,0.60)', transition: 'color 200ms ease', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.95)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)'}
            >
              <GlassIcon Icon={Icon} tint={tint} glow={glow} />
              <span className="font-sans leading-none" style={{ fontSize: 10, letterSpacing: '0.01em' }}>{label}</span>
            </button>
          )
        )}
      </nav>
    </div>
  )
}
