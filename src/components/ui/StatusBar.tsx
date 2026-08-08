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

function HamburgerIcon() {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
      <path d="M1 3h18M1 9h18" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M1 1l12 12M13 1L1 13" />
    </svg>
  )
}

function IconHome() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M7 18v-6h6v6" />
    </svg>
  )
}

function IconAward() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="8" r="5" />
      <path d="M6.8 12.8L5 18l5-2 5 2-1.8-5.2" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="16" height="12" rx="2" />
      <path d="M6 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M2 11h16" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="13" rx="2" />
      <path d="m2 7 8 5.5L18 7" />
    </svg>
  )
}

function IconFile() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2h8l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" />
      <path d="M12 2v4h4M7 9h6M7 12h6M7 15h4" />
    </svg>
  )
}

// ── Center nav — moved here from the old floating Navbar ───────────────────────

const NAV = [
  { id: 'about',   label: 'Canvas',  href: '#about'   },
  { id: 'work',    label: 'Work',    href: '#work'    },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const

const SECTIONS = [
  { id: 'about',   label: 'Canvas'  },
  { id: 'work',    label: 'Work'    },
  { id: 'contact', label: 'Contact' },
]

const MOBILE_NAV = [
  { label: 'Canvas',       href: '#about',         toTop: true,  Icon: IconHome      },
  { label: 'Achievements', href: '#certifications', toTop: false, Icon: IconAward     },
  { label: 'Works',        href: '#work',           toTop: false, Icon: IconBriefcase },
  { label: 'Hire Me',      href: '#contact',        toTop: false, Icon: IconMail      },
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
          <p className="font-sans text-white/35 text-xs mt-0.5">IT Officer @ Ubiquity</p>
        </div>
      </div>
    </div>
  )
}

// ── Mobile drawer ──────────────────────────────────────────────────────────────

function MobileDrawer({ onClose, onResumeOpen, time, date }: { onClose: () => void; onResumeOpen: () => void; time: string; date: string }) {
  const [closing, setClosing] = useState(false)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 260)
  }, [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [handleClose])

  const scrollTo = (href: string, toTop?: boolean) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (toTop) window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    handleClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 ${closing ? 'backdrop-fade-out' : 'backdrop-fade-in'}`}
        style={{ background: 'rgba(0,0,0,0.55)' }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`${closing ? 'drawer-slide-out' : 'drawer-slide-in'} fixed inset-y-0 left-0 z-50 flex flex-col`}
        style={{
          width: '100%',
          background: '#000000',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-display text-white" style={{ fontSize: 22, letterSpacing: '-0.02em' }}>
            SECTIONS
          </span>
          <button
            onClick={handleClose}
            aria-label="Close menu"
            className="flex items-center justify-center btn-spring"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <IconClose />
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          {MOBILE_NAV.map(({ label, href, toTop, Icon }) => (
            <a
              key={label}
              href={href}
              onClick={scrollTo(href, toTop)}
              className="flex items-center gap-4 px-4 py-3.5 rounded-2xl active:bg-white/[0.06] transition-colors duration-100"
              style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.55)', flexShrink: 0 }}><Icon /></span>
              <span className="font-sans" style={{ fontSize: 16 }}>{label}</span>
            </a>
          ))}
          <button
            onClick={() => { onResumeOpen(); handleClose() }}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl active:bg-white/[0.06] transition-colors duration-100 bg-transparent text-left"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.55)', flexShrink: 0 }}><IconFile /></span>
            <span className="font-sans" style={{ fontSize: 16 }}>Resume</span>
          </button>
        </div>

        {/* Status footer */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-2.5" style={{ color: 'var(--bar-text)' }}>
            <IconWifi />
            <div className="flex items-center gap-1.5">
              <IconBattery />
              <span className="font-sans" style={{ fontSize: 11 }}>80%</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans" style={{ fontSize: 11, color: 'var(--bar-text)' }}>{date}</span>
            <span className="font-sans tabular-nums" style={{ fontSize: 11, color: 'var(--bar-text-active)' }}>{time}</span>
          </div>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)' }}
          >
            <span className="font-display text-white/90 text-sm">RL</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-white/90 text-sm leading-tight truncate">Reymart Louie L. Capapas</p>
            <p className="font-sans text-white/40 text-xs mt-0.5">IT Officer @ Ubiquity</p>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

function StatusBar() {
  const [ready,          setReady]          = useState(false)
  const [time,           setTime]           = useState('')
  const [date,           setDate]           = useState('')
  const [section,        setSection]        = useState('Canvas')
  const [userMenuOpen,   setUserMenuOpen]   = useState(false)
  const [resumeOpen,     setResumeOpen]     = useState(false)
  const [isMobile,       setIsMobile]       = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToCenter = useCallback((href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    const el = document.getElementById(href.slice(1))
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    tick()
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

  // ── Mobile: floating button + dropdown ────────────────────────────────────────

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileMenuOpen(v => !v)}
          aria-label="Open menu"
          className="fixed z-50 flex items-center justify-center"
          style={{
            top:                  'calc(env(safe-area-inset-top, 0px) + 12px)',
            left:                 16,
            width:                40,
            height:               40,
            borderRadius:         '50%',
            background:           'rgba(28,28,30,0.72)',
            backdropFilter:       'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border:               '1px solid rgba(255,255,255,0.12)',
            boxShadow:            '0 4px 16px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
            opacity:    ready ? 1 : 0,
            transform:  ready ? 'scale(1)' : 'scale(0.8)',
            transition: ready
              ? 'opacity 400ms ease 200ms, transform 400ms cubic-bezier(0.34,1.2,0.64,1) 200ms'
              : 'none',
          }}
        >
          <HamburgerIcon />
        </button>

        {mobileMenuOpen && (
          <MobileDrawer
            onClose={() => setMobileMenuOpen(false)}
            onResumeOpen={() => setResumeOpen(true)}
            time={time}
            date={date}
          />
        )}

        {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      </>
    )
  }

  // ── Desktop: full status bar ──────────────────────────────────────────────────

  return (
    <>
    <div
      className="fixed top-0 inset-x-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center select-none"
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

        {([
          { label: section,        href: '#about',          onClick: undefined },
          { label: 'Achievements', href: '#certifications', onClick: undefined },
          { label: 'Works',        href: '#work',           onClick: undefined },
          { label: 'Hire Me',      href: '#contact',        onClick: undefined },
          { label: 'Resume',       href: undefined,         onClick: () => setResumeOpen(true) },
          { label: 'Help',         href: undefined,         onClick: undefined },
        ] as { label: string; href?: string; onClick?: () => void }[]).map(({ label, href, onClick }) =>
          href ? (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={href.startsWith('#') ? scrollToCenter(href) : undefined}
              className="font-sans px-2.5 py-1 transition-colors duration-150"
              style={{ fontSize: 12, color: 'var(--bar-text)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--bar-text-active)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--bar-text)'}
            >
              {label}
            </a>
          ) : onClick ? (
            <button
              key={label}
              onClick={onClick}
              className="font-sans px-2.5 py-1 transition-colors duration-150"
              style={{ fontSize: 12, color: 'var(--bar-text)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--bar-text-active)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--bar-text)'}
            >
              {label}
            </button>
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
      </div>

      {/* ── Center — section nav, moved here from the old floating Navbar ── */}
      <div className="hidden md:flex items-center gap-5 justify-self-center">
        {NAV.map(({ id, label, href }) => {
          const isActive = section === label
          return (
            <a
              key={id}
              href={href}
              onClick={scrollToCenter(href)}
              className="font-sans"
              style={{ fontSize: 12, color: isActive ? 'var(--bar-text-active)' : 'var(--bar-text)', transition: 'color 200ms ease' }}
            >
              {label}
            </a>
          )
        })}
      </div>

      {/* ── Right ── */}
      <div className="flex items-center gap-2.5 justify-self-end">
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
