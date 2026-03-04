'use client'

import { useState, useEffect } from 'react'

function IconWifi() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 10.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 7.8A4.2 4.2 0 0 1 8 6.9a4.2 4.2 0 0 1 3 .9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 5A8 8 0 0 1 8 3a8 8 0 0 1 6 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M.1 2.4A11 11 0 0 1 8 0a11 11 0 0 1 7.9 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconBattery() {
  return (
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
      <rect x="0.75" y="0.75" width="18" height="9.5" rx="2.25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
      <rect x="2.5" y="2.5" width="11" height="6" rx="1" fill="currentColor" fillOpacity="0.4" />
      <path d="M19.75 3.8v3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.45" />
    </svg>
  )
}

export default function StatusBar() {
  const [ready, setReady] = useState(false)
  const [time,  setTime]  = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => { setReady(true) }, [])

  return (
    <div
      className="fixed top-7 right-4 z-50 pointer-events-none select-none"
      style={{
        opacity:    ready ? 1 : 0,
        transform:  ready ? 'translateY(0)' : 'translateY(-16px)',
        transition: ready
          ? 'opacity 400ms cubic-bezier(0.2,0,0,1) 200ms, transform 500ms cubic-bezier(0.34,1.2,0.64,1) 200ms'
          : 'none',
      }}
    >
      <div
        className="flex items-center gap-1 px-3 py-2.5"
        style={{
          background:           'rgba(24,24,26,0.60)',
          backdropFilter:       'blur(56px) saturate(180%)',
          WebkitBackdropFilter: 'blur(56px) saturate(180%)',
          border:               '1px solid rgba(255,255,255,0.09)',
          borderRadius:         40,
          boxShadow: [
            '0 12px 56px rgba(0,0,0,0.55)',
            '0 1px 0 rgba(255,255,255,0.07) inset',
            '0 -1px 0 rgba(0,0,0,0.35) inset',
          ].join(', '),
        }}
      >
        {/* Available */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-[20px]"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse flex-shrink-0" />
          <span className="font-sans" style={{ fontSize: 11 }}>Available</span>
        </div>

        <div className="hidden sm:block w-px h-5 mx-0.5 bg-white/10 rounded-full flex-shrink-0" />

        {/* Wifi */}
        <div
          className="flex items-center justify-center px-2.5 py-1 rounded-[20px]"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          <IconWifi />
        </div>

        {/* Battery */}
        <div
          className="hidden sm:flex items-center justify-center px-2 py-1 rounded-[20px]"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          <IconBattery />
        </div>

        <div className="w-px h-5 mx-0.5 bg-white/10 rounded-full flex-shrink-0" />

        {/* Time */}
        <div
          className="flex items-center px-2.5 py-1 rounded-[20px]"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          <span className="font-sans tabular-nums" style={{ fontSize: 12 }}>{time}</span>
        </div>
      </div>
    </div>
  )
}
