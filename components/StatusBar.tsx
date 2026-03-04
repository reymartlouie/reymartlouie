'use client'

import { useState, useEffect, useCallback } from 'react'

function IconWifi() {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
      <path d="M7.5 10.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4.5 7.8A4.2 4.2 0 0 1 7.5 6.8a4.2 4.2 0 0 1 3 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M1.5 5A7.5 7.5 0 0 1 7.5 3a7.5 7.5 0 0 1 6 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M.1 2.4A10.2 10.2 0 0 1 7.5 0a10.2 10.2 0 0 1 7.4 2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconBattery() {
  return (
    <svg width="20" height="11" viewBox="0 0 20 11" fill="none">
      <rect x="0.75" y="0.75" width="16.5" height="9.5" rx="2.25"
        stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="2.5" y="2.5" width="10" height="6" rx="1" fill="currentColor" fillOpacity="0.35" />
      <path d="M18 3.8v3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  )
}

const SECTIONS = [
  { id: 'about',   label: 'Canvas'  },
  { id: 'work',    label: 'Work'    },
  { id: 'contact', label: 'Contact' },
]

export default function StatusBar() {
  const [ready,   setReady]   = useState(false)
  const [time,    setTime]    = useState('')
  const [section, setSection] = useState('Canvas')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }))
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
        paddingLeft:          16,
        paddingRight:         16,
        background:           'rgba(24,24,26,0.60)',
        backdropFilter:       'blur(56px) saturate(180%)',
        WebkitBackdropFilter: 'blur(56px) saturate(180%)',
        borderBottom:         '1px solid rgba(255,255,255,0.09)',
        boxShadow:            '0 1px 0 rgba(255,255,255,0.07) inset, 0 8px 32px rgba(0,0,0,0.35)',
        opacity:    ready ? 1 : 0,
        transform:  ready ? 'translateY(0)' : 'translateY(-100%)',
        transition: ready ? 'opacity 400ms ease 200ms, transform 500ms cubic-bezier(0.34,1.2,0.64,1) 200ms' : 'none',
      }}
    >
      {/* Left — monogram + active section */}
      <div className="flex items-center gap-2.5">
        <span
          className="font-display text-white/90"
          style={{ fontSize: 12, letterSpacing: '-0.02em' }}
        >
          RL
        </span>
        <div className="w-px h-3 bg-white/10 rounded-full" />
        <span
          className="font-sans transition-all duration-300"
          style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}
        >
          {section}
        </span>
      </div>

      {/* Right — status + time */}
      <div className="flex items-center gap-3">

        {/* Available */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse" />
          <span className="font-sans" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>Available</span>
        </div>

        <div className="hidden sm:block w-px h-3 bg-white/10 rounded-full flex-shrink-0" />

        {/* Wifi */}
        <span style={{ color: 'rgba(255,255,255,0.38)' }}>
          <IconWifi />
        </span>

        {/* Battery */}
        <span style={{ color: 'rgba(255,255,255,0.38)' }} className="hidden sm:block">
          <IconBattery />
        </span>

        {/* Time */}
        <span
          className="font-sans tabular-nums"
          style={{ fontSize: 12, color: 'rgba(255,255,255,0.92)' }}
        >
          {time}
        </span>
      </div>
    </div>
  )
}
