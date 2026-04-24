'use client'

import { useState, useEffect, useCallback, useRef, memo } from 'react'
import ResumeModal from './ResumeModal'

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



function Divider() {
  return <div className="w-px h-3.5 rounded-full mx-1 flex-shrink-0" style={{ background: 'var(--bar-border)' }} />
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

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1.5 w-56 rounded-[18px] overflow-hidden"
      style={{
        background:           'rgba(28,28,30,0.82)',
        backdropFilter:       'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border:               '1px solid rgba(255,255,255,0.10)',
        boxShadow:            '0 16px 48px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.07) inset',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <span className="font-display text-white/90 text-sm">RL</span>
        </div>
        <div>
          <p className="font-display text-white/90 text-sm leading-tight">Reymart Louie L. Capapas</p>
          <p className="font-sans text-white/35 text-xs mt-0.5">CpE Student · USLS Bacolod</p>
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

function StatusBar() {
  const [ready,        setReady]        = useState(false)
  const [time,         setTime]         = useState('')
  const [date,         setDate]         = useState('')
  const [section,      setSection]      = useState('Canvas')
  const [userMenuOpen,  setUserMenuOpen]  = useState(false)
  const [resumeOpen,    setResumeOpen]    = useState(false)
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    tick()
    // Align to the next minute boundary so we only tick 1×/min instead of 60×/min
    let id: ReturnType<typeof setTimeout>
    const schedule = () => {
      id = setTimeout(() => { tick(); schedule() }, (60 - new Date().getSeconds()) * 1000)
    }
    schedule()
    return () => clearTimeout(id)
  }, [])

  const rafRef = useRef<number | null>(null)

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
    const onScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => { rafRef.current = null; updateSection() })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateSection()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [updateSection])

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
    <div
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between select-none"
      style={{
        height:               36,
        paddingLeft:          20,
        paddingRight:         20,
        background:           'var(--bar-bg)',
        backdropFilter:       'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        borderBottom:         '1px solid var(--bar-border)',
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
          className="font-display px-2.5 py-1 transition-colors duration-150"
          style={{ fontSize: 13, letterSpacing: '-0.02em', color: 'var(--bar-text-active)' }}
        >
          RL
        </button>

        {userMenuOpen && <UserMenu onClose={() => setUserMenuOpen(false)} />}

        {[
          { label: section,          href: '#about'   },
          { label: 'Certifications', href: '#certifications' },
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
              className="font-sans px-2.5 py-1 transition-colors duration-150"
              style={{ fontSize: 12, color: 'var(--bar-text)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--bar-text-active)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--bar-text)'}
            >
              {label}
            </a>
          ) : (
            <span
              key={label}
              className="font-sans px-2.5 py-1 transition-colors duration-150 cursor-default"
              style={{ fontSize: 12, color: 'var(--bar-text)' }}
            >
              {label}
            </span>
          )
        )}

        <button
          onClick={() => setResumeOpen(true)}
          className="font-sans px-2.5 py-1 transition-colors duration-150"
          style={{ fontSize: 12, color: 'var(--bar-text)' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--bar-text-active)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--bar-text)'}
        >
          Resume
        </button>
      </div>

      {/* ── Right ── */}
      <div className="flex items-center gap-2.5">
        <span style={{ color: 'var(--bar-text)', display: 'flex', alignItems: 'center' }}>
          <IconWifi />
        </span>

        <div className="flex items-center gap-1.5">
          <span style={{ color: 'var(--bar-text)', display: 'flex', alignItems: 'center' }}>
            <IconBattery />
          </span>
          <span className="font-sans hidden sm:inline" style={{ fontSize: 11, color: 'var(--bar-text)' }}>80%</span>
        </div>

        <Divider />

        <span className="font-sans hidden sm:inline" style={{ fontSize: 11, color: 'var(--bar-text)' }}>{date}</span>
        <span className="font-sans tabular-nums" style={{ fontSize: 11, color: 'var(--bar-text-active)' }}>{time}</span>
      </div>

    </div>

    {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </>
  )
}

export default memo(StatusBar)
