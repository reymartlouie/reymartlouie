'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

function IconWifi() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 10.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 7.6A4 4 0 0 1 8 6.7a4 4 0 0 1 3 .9"               stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 4.8A7.5 7.5 0 0 1 8 3a7.5 7.5 0 0 1 6 1.8"        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M.1 2.3A10.8 10.8 0 0 1 8 0a10.8 10.8 0 0 1 7.9 2.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconBattery() {
  return (
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
      <rect x="0.75" y="0.75" width="18.5" height="9.5" rx="2.25" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <rect x="2.5"  y="2.5"  width="12"   height="6"   rx="1"    fill="#4ade80" fillOpacity="0.8" />
      <path d="M20.25 3.8v3.4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="10" height="7" rx="2" />
      <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" />
    </svg>
  )
}

function Divider() {
  return <div className="w-px h-3.5 bg-white/10 rounded-full mx-1 flex-shrink-0" />
}

const SECTIONS = [
  { id: 'about',   label: 'Canvas'  },
  { id: 'work',    label: 'Work'    },
  { id: 'contact', label: 'Contact' },
]

// ── RL user menu ───────────────────────────────────────────────────────────────

function UserMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [onClose])

  const handleLock = () => {
    sessionStorage.removeItem('portfolio-unlocked')
    window.location.reload()
  }

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1.5 w-56 rounded-[18px] overflow-hidden"
      style={{
        background:           'rgba(28,28,30,0.82)',
        backdropFilter:       'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        border:               '1px solid rgba(255,255,255,0.10)',
        boxShadow:            '0 16px 48px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.07) inset',
      }}
    >
      {/* Profile */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background:           'rgba(255,255,255,0.10)',
            border:               '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <span className="font-display text-white/90 text-sm">RL</span>
        </div>
        <div>
          <p className="font-display text-white/90 text-sm leading-tight">Reymart Louie L. Capapas</p>
          <p className="font-sans text-white/35 text-xs mt-0.5">CpE Student · USLS Bacolod</p>
        </div>
      </div>

      <div className="h-px bg-white/[0.07] mx-3" />

      {/* Lock screen */}
      <button
        onClick={handleLock}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-white/8"
      >
        <span style={{ color: 'rgba(255,255,255,0.45)' }}><IconLock /></span>
        <span className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>Lock Screen</span>
        <span className="font-sans text-xs ml-auto" style={{ color: 'rgba(255,255,255,0.22)' }}>⌘ L</span>
      </button>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function StatusBar() {
  const [ready,        setReady]        = useState(false)
  const [time,         setTime]         = useState('')
  const [date,         setDate]         = useState('')
  const [section,      setSection]      = useState('Canvas')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const updateSection = useCallback(() => {
    if (window.scrollY < 80) { setSection('Canvas'); return }
    let best = 'Canvas', bestRatio = 0
    for (const { id, label } of SECTIONS) {
      const el = document.getElementById(id)
      if (!el) continue
      const { top, bottom, height } = el.getBoundingClientRect()
      const visible = Math.min(bottom, window.innerHeight) - Math.max(top, 0)
      const ratio = Math.max(0, visible) / height
      if (ratio > bestRatio) { bestRatio = ratio; best = label }
    }
    setSection(best)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateSection, { passive: true })
    updateSection()
    return () => window.removeEventListener('scroll', updateSection)
  }, [updateSection])

  useEffect(() => { setReady(true) }, [])

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between select-none"
      style={{
        height:               36,
        paddingLeft:          20,
        paddingRight:         20,
        background:           'rgba(10,10,12,0.45)',
        backdropFilter:       'blur(40px) saturate(160%)',
        WebkitBackdropFilter: 'blur(40px) saturate(160%)',
        borderBottom:         '1px solid rgba(255,255,255,0.07)',
        boxShadow:            '0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 24px rgba(0,0,0,0.3)',
        opacity:    ready ? 1 : 0,
        transform:  ready ? 'translateY(0)' : 'translateY(-100%)',
        transition: ready
          ? 'opacity 400ms cubic-bezier(0.2,0,0,1) 200ms, transform 500ms cubic-bezier(0.34,1.2,0.64,1) 200ms'
          : 'none',
      }}
    >

      {/* ── Left ── */}
      <div className="flex items-center gap-0.5 relative">

        {/* RL — user menu trigger */}
        <button
          onClick={() => setUserMenuOpen(v => !v)}
          className="font-display px-2.5 py-1 text-white/60 hover:text-white transition-colors duration-150"
          style={{ fontSize: 13, letterSpacing: '-0.02em' }}
        >
          RL
        </button>

        {userMenuOpen && <UserMenu onClose={() => setUserMenuOpen(false)} />}

        {[
          { label: section,          href: '#about'   },
          { label: 'Certifications', href: '#work'    },
          { label: 'Resume',         href: '/Reymart_Louie_Capapas_resume.pdf' },
          { label: 'Achievements',   href: '#work'    },
          { label: 'Hire Me',        href: '#contact' },
          { label: 'Help',           href: undefined  },
        ].map(({ label, href }) =>
          href ? (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-sans px-2.5 py-1 text-white/60 hover:text-white transition-colors duration-150"
              style={{ fontSize: 12 }}
            >
              {label}
            </a>
          ) : (
            <span
              key={label}
              className="font-sans px-2.5 py-1 text-white/60 hover:text-white transition-colors duration-150 cursor-default"
              style={{ fontSize: 12 }}
            >
              {label}
            </span>
          )
        )}
      </div>

      {/* ── Right ── */}
      <div className="flex items-center gap-2.5">
        <span style={{ color: 'rgba(255,255,255,0.38)', display: 'flex', alignItems: 'center' }}>
          <IconWifi />
        </span>

        <div className="flex items-center gap-1.5">
          <span style={{ color: 'rgba(255,255,255,0.38)', display: 'flex', alignItems: 'center' }}>
            <IconBattery />
          </span>
          <span className="font-sans hidden sm:inline" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>80%</span>
        </div>

        <Divider />

        <span className="font-sans hidden sm:inline" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{date}</span>
        <span className="font-sans tabular-nums" style={{ fontSize: 11, color: 'rgba(255,255,255,0.90)' }}>{time}</span>
      </div>

    </div>
  )
}
