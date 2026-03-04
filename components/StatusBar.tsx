'use client'

import { useState, useEffect, useCallback } from 'react'

function IconWifi() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 10.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 7.6A4 4 0 0 1 8 6.7a4 4 0 0 1 3 .9"        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 4.8A7.5 7.5 0 0 1 8 3a7.5 7.5 0 0 1 6 1.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M.1 2.3A10.8 10.8 0 0 1 8 0a10.8 10.8 0 0 1 7.9 2.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconBattery() {
  return (
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
      <rect x="0.75" y="0.75" width="18.5" height="9.5" rx="2.25"
        stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <rect x="2.5" y="2.5" width="12" height="6" rx="1" fill="#4ade80" fillOpacity="0.8" />
      <path d="M20.25 3.8v3.4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" />
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

export default function StatusBar() {
  const [ready,   setReady]   = useState(false)
  const [time,    setTime]    = useState('')
  const [date,    setDate]    = useState('')
  const [section, setSection] = useState('Canvas')

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
        height:               28,
        paddingLeft:          20,
        paddingRight:         20,
        background:           'rgba(24,24,26,0.60)',
        backdropFilter:       'blur(56px) saturate(180%)',
        WebkitBackdropFilter: 'blur(56px) saturate(180%)',
        borderBottom:         '1px solid rgba(255,255,255,0.09)',
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

      {/* ── Left ── */}
      <div className="relative z-10 flex items-center gap-2.5">
        <span className="font-display" style={{ fontSize: 12, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.90)' }}>RL</span>

        <Divider />

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse flex-shrink-0" />
          <span className="font-sans hidden sm:inline" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>Available</span>
        </div>

        <span className="font-sans" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{section}</span>

        <Divider />

        <a href="#contact"
          className="font-sans font-semibold btn-spring bg-[#f0f0f0] text-[#111111] hover:bg-white transition-colors rounded-full"
          style={{ fontSize: 10, padding: '2px 10px' }}
        >
          Hire Me
        </a>

        <span className="font-sans hidden md:inline" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Help</span>
      </div>

      {/* ── Right ── */}
      <div className="relative z-10 flex items-center gap-2.5">
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
