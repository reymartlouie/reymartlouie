'use client'

import { useState, useEffect, useCallback } from 'react'

function IconWifi() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 10.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 7.6A4 4 0 0 1 8 6.7a4 4 0 0 1 3 .9"   stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 4.8A7.5 7.5 0 0 1 8 3a7.5 7.5 0 0 1 6 1.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M.1 2.3A10.8 10.8 0 0 1 8 0a10.8 10.8 0 0 1 7.9 2.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconBattery({ pct }: { pct: number }) {
  const fill = Math.max(0, Math.min(1, pct / 100))
  const color = pct <= 20 ? '#f87171' : pct <= 40 ? '#fbbf24' : '#4ade80'
  return (
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
      <rect x="0.75" y="0.75" width="18.5" height="9.5" rx="2.25"
        stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="2.5" y="2.5" width={Math.round(fill * 14)} height="6" rx="1"
        fill={color} fillOpacity="0.75" />
      <path d="M20.25 3.8v3.4" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  )
}

const SECTIONS = [
  { id: 'about',   label: 'Canvas'  },
  { id: 'work',    label: 'Work'    },
  { id: 'contact', label: 'Contact' },
]

function Item({ children, href, onClick }: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}) {
  const cls = "flex items-center gap-1.5 px-2.5 py-1 rounded-[20px] transition-colors duration-150 hover:bg-white/8 cursor-default"
  if (href) return <a href={href} className={cls}>{children}</a>
  if (onClick) return <button onClick={onClick} className={cls}>{children}</button>
  return <div className={cls}>{children}</div>
}

function Divider() {
  return <div className="w-px h-4 bg-white/10 rounded-full flex-shrink-0 mx-0.5" />
}

export default function StatusBar() {
  const [ready,   setReady]   = useState(false)
  const [time,    setTime]    = useState('')
  const [date,    setDate]    = useState('')
  const [section, setSection] = useState('Canvas')
  const [battery, setBattery] = useState<number | null>(null)

  // Live clock
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

  // Battery API
  useEffect(() => {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{ level: number; addEventListener: (e: string, cb: () => void) => void }>
    }
    nav.getBattery?.().then(b => {
      setBattery(Math.round(b.level * 100))
      b.addEventListener('levelchange', () => setBattery(Math.round(b.level * 100)))
    }).catch(() => {})
  }, [])

  // Section tracking
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

  const textPrimary   = { color: 'rgba(255,255,255,0.92)' } as const
  const textSecondary = { color: 'rgba(255,255,255,0.38)' } as const
  const textMuted     = { color: 'rgba(255,255,255,0.25)' } as const

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between select-none"
      style={{
        height:               32,
        paddingLeft:          20,
        paddingRight:         20,
        background:           'rgba(24,24,26,0.60)',
        backdropFilter:       'blur(56px) saturate(180%)',
        WebkitBackdropFilter: 'blur(56px) saturate(180%)',
        border:               '1px solid rgba(255,255,255,0.09)',
        boxShadow: [
          '0 1px 0 rgba(255,255,255,0.07) inset',
          '0 -1px 0 rgba(0,0,0,0.35) inset',
          '0 8px 32px rgba(0,0,0,0.45)',
        ].join(', '),
        opacity:    ready ? 1 : 0,
        transform:  ready ? 'translateY(0)' : 'translateY(-100%)',
        transition: ready
          ? 'opacity 400ms cubic-bezier(0.2,0,0,1) 200ms, transform 500ms cubic-bezier(0.34,1.2,0.64,1) 200ms'
          : 'none',
      }}
    >
      {/* ── Left ─────────────────────────────────────── */}
      <div className="flex items-center gap-0.5">

        {/* RL brand */}
        <Item>
          <span className="font-display" style={{ ...textPrimary, fontSize: 12, letterSpacing: '-0.02em' }}>RL</span>
        </Item>

        <Divider />

        {/* Available */}
        <Item>
          <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse flex-shrink-0" />
          <span className="font-sans hidden sm:inline" style={{ ...textSecondary, fontSize: 11 }}>Available</span>
        </Item>

        {/* Current page */}
        <Item>
          <span className="font-sans" style={{ ...textSecondary, fontSize: 11 }}>{section}</span>
        </Item>

        <Divider />

        {/* Hire Me */}
        <a
          href="#contact"
          className="flex items-center px-3 py-0.5 rounded-full font-sans font-semibold transition-colors hover:bg-white/90"
          style={{ background: '#f0f0f0', color: '#111111', fontSize: 11 }}
        >
          Hire Me
        </a>

        {/* Help */}
        <Item>
          <span className="font-sans" style={{ ...textMuted, fontSize: 11 }}>Help</span>
        </Item>

      </div>

      {/* ── Right ────────────────────────────────────── */}
      <div className="flex items-center gap-0.5">

        {/* Wifi */}
        <Item>
          <span style={textSecondary}><IconWifi /></span>
        </Item>

        {/* Battery */}
        <Item>
          <span style={textSecondary}>
            <IconBattery pct={battery ?? 100} />
          </span>
          {battery !== null && (
            <span className="font-sans tabular-nums hidden sm:inline" style={{ ...textSecondary, fontSize: 11 }}>
              {battery}%
            </span>
          )}
        </Item>

        <Divider />

        {/* Date + Time */}
        <Item>
          <span className="font-sans tabular-nums hidden sm:inline" style={{ ...textSecondary, fontSize: 11 }}>{date}</span>
          <span className="font-sans tabular-nums" style={{ ...textPrimary, fontSize: 11 }}>{time}</span>
        </Item>

      </div>
    </div>
  )
}
