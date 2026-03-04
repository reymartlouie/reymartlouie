'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconAvailable() {
  return <span className="w-[7px] h-[7px] bg-[#4ade80] rounded-full animate-pulse flex-shrink-0" />
}

function IconWifi() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10 15.5h.01" strokeWidth="2" />
      <path d="M6.5 12.3a5 5 0 0 1 7 0" />
      <path d="M3.5 9.3a9 9 0 0 1 13 0" />
      <path d="M1 6.3a13 13 0 0 1 18 0" />
    </svg>
  )
}

function IconBattery({ pct }: { pct: number }) {
  const fill = Math.max(0, Math.min(1, pct / 100))
  const color = pct <= 20 ? '#f87171' : pct <= 40 ? '#fbbf24' : 'currentColor'
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="5.5" width="15" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.5" />
      <rect x="2.5" y="7" width={Math.round(fill * 12)} height="6" rx="1" fill={color} fillOpacity="0.7" />
      <path d="M17 8.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  )
}

function IconHelp() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <path d="M7.5 7.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
      <path d="M10 15h.01" strokeWidth="2" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 6v4l2.5 2.5" />
    </svg>
  )
}

// ── Shared pill style (exact copy from Navbar) ─────────────────────────────────

const PILL: React.CSSProperties = {
  background:           'rgba(24, 24, 26, 0.60)',
  backdropFilter:       'blur(56px) saturate(180%)',
  WebkitBackdropFilter: 'blur(56px) saturate(180%)',
  border:               '1px solid rgba(255,255,255,0.09)',
  borderRadius:         40,
  boxShadow: [
    '0 12px 56px rgba(0,0,0,0.55)',
    '0 1px 0 rgba(255,255,255,0.07) inset',
    '0 -1px 0 rgba(0,0,0,0.35) inset',
  ].join(', '),
}

// ── Tab item (same shape as navbar tabs) ───────────────────────────────────────

function Tab({ icon, label, active, href, onClick }: {
  icon: React.ReactNode
  label: string
  active?: boolean
  href?: string
  onClick?: () => void
}) {
  const style: React.CSSProperties = {
    background: active ? 'rgba(255,255,255,0.11)' : 'transparent',
    color:      active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.38)',
    transition: 'background 200ms ease, color 200ms ease',
  }
  const cls = "flex flex-col items-center gap-1 px-3.5 py-2 rounded-[26px]"
  const inner = (
    <>
      {icon}
      <span className="font-sans leading-none" style={{ fontSize: 10, letterSpacing: '0.01em' }}>
        {label}
      </span>
    </>
  )
  if (href) return <a href={href} className={cls} style={style}>{inner}</a>
  if (onClick) return <button className={cls} style={style} onClick={onClick}>{inner}</button>
  return <div className={cls} style={style}>{inner}</div>
}

function Divider() {
  return <div className="w-px h-5 mx-0.5 bg-white/10 rounded-full flex-shrink-0" />
}

// ── Sections ───────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'about',   label: 'Canvas'  },
  { id: 'work',    label: 'Work'    },
  { id: 'contact', label: 'Contact' },
]

// ── Component ──────────────────────────────────────────────────────────────────

export default function StatusBar() {
  const [ready,   setReady]   = useState(false)
  const [time,    setTime]    = useState('')
  const [date,    setDate]    = useState('')
  const [section, setSection] = useState('Canvas')
  const [battery, setBattery] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US',  { hour: '2-digit', minute: '2-digit', hour12: true }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{ level: number; addEventListener(e: string, cb: () => void): void }>
    }
    nav.getBattery?.().then(b => {
      const update = () => setBattery(Math.round(b.level * 100))
      update()
      b.addEventListener('levelchange', update)
    }).catch(() => {})
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

  const anim: React.CSSProperties = {
    opacity:    ready ? 1 : 0,
    transform:  ready ? 'translateY(0)' : 'translateY(-20px)',
    transition: ready
      ? 'opacity 400ms cubic-bezier(0.2,0,0,1) 180ms, transform 500ms cubic-bezier(0.34,1.2,0.64,1) 180ms'
      : 'none',
  }

  return (
    <>
      {/* ── Left pill ── */}
      <div
        className="fixed top-7 left-4 z-50 pointer-events-none select-none"
        style={anim}
      >
        <div className="pointer-events-auto flex items-center gap-1 px-3 py-2.5" style={PILL}>

          {/* RL */}
          <div
            className="font-display px-3.5 py-2 rounded-[26px]"
            style={{ fontSize: 14, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.92)' }}
          >
            RL
          </div>

          <Divider />

          {/* Available */}
          <Tab icon={<IconAvailable />} label="Available" />

          {/* Current page */}
          <Tab icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="12" height="12" rx="1.5" />
              <path d="M2 4h2M16 4h2M2 16h2M16 16h2M4 2v2M16 2v2M4 16v2M16 16v2" />
            </svg>
          } label={section} />

          <Divider />

          {/* Hire Me */}
          <a
            href="#contact"
            className="btn-spring font-sans font-semibold bg-[#f0f0f0] text-[#111] px-4 py-2.5 rounded-full hover:bg-white transition-colors"
            style={{ fontSize: 10 }}
          >
            Hire Me
          </a>

          {/* Help */}
          <Tab icon={<IconHelp />} label="Help" />

        </div>
      </div>

      {/* ── Right pill ── */}
      <div
        className="fixed top-7 right-4 z-50 pointer-events-none select-none"
        style={anim}
      >
        <div className="pointer-events-auto flex items-center gap-1 px-3 py-2.5" style={PILL}>

          {/* Wifi */}
          <Tab icon={<IconWifi />} label="Wi-Fi" />

          {/* Battery */}
          <Tab icon={<IconBattery pct={battery ?? 100} />} label={battery !== null ? `${battery}%` : '—'} />

          <Divider />

          {/* Date + Time */}
          <Tab icon={<IconClock />} label={`${date}  ${time}`} />

        </div>
      </div>
    </>
  )
}
