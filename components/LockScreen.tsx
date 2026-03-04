'use client'

import { useState, useEffect, useRef } from 'react'

// ── Change these ──────────────────────────────────────────────────────────────
const PASSWORD = 'reymart'
const HINT     = "hint: creator's first name"
// ─────────────────────────────────────────────────────────────────────────────

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [inputOpen, setInputOpen] = useState(false)
  const [value,     setValue]     = useState('')
  const [shake,     setShake]     = useState(false)
  const [wrong,     setWrong]     = useState(false)
  const [exiting,   setExiting]   = useState(false)
  const [visible,   setVisible]   = useState(false)
  const [timeStr,   setTimeStr]   = useState('')
  const [dateStr,   setDateStr]   = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const openInput = () => {
    setInputOpen(true)
    setWrong(false)
    setTimeout(() => inputRef.current?.focus(), 80)
  }

  useEffect(() => {
    const handler = () => { if (!inputOpen && !exiting) openInput() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [inputOpen, exiting])

  const submit = () => {
    if (!value.trim()) return
    if (value.trim().toLowerCase() === PASSWORD) {
      setExiting(true)
      setTimeout(onUnlock, 650)
    } else {
      setShake(true)
      setWrong(true)
      setValue('')
      setTimeout(() => {
        setShake(false)
        inputRef.current?.focus()
      }, 500)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        opacity:   exiting ? 0 : visible ? 1 : 0,
        transform: exiting ? 'scale(1.03)' : 'scale(1)',
        transition: exiting
          ? 'opacity 600ms cubic-bezier(0.4,0,0.2,1), transform 650ms cubic-bezier(0.4,0,0.2,1)'
          : 'opacity 400ms ease',
        pointerEvents: exiting ? 'none' : 'auto',
        cursor: inputOpen ? 'default' : 'pointer',
      }}
      onClick={() => { if (!inputOpen) openInput() }}
    >

      {/* ── Wallpaper ── */}
      <img
        src="/wallpaper.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />
      {/* Subtle dark vignette so text stays readable */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* ── Clock — centered ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
        <p
          className="font-display text-white leading-none tabular-nums"
          style={{ fontSize: 'clamp(72px, 13vw, 112px)', letterSpacing: '-0.03em', textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
        >
          {timeStr}
        </p>
        <p className="font-sans text-white/50 text-base mt-2">{dateStr}</p>
      </div>

      {/* ── Glass card — bottom ── */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center px-4">
        <div
          className="flex flex-col items-center gap-5 px-8 py-8 w-full max-w-[300px] rounded-[32px]"
          style={{
            background:          'rgba(255,255,255,0.07)',
            backdropFilter:       'blur(48px) saturate(180%)',
            WebkitBackdropFilter: 'blur(48px) saturate(180%)',
            border:               '1px solid rgba(255,255,255,0.14)',
            boxShadow:            '0 24px 80px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.2) inset',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Avatar */}
          <button
            onClick={openInput}
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
            style={{
              background:          'rgba(255,255,255,0.10)',
              backdropFilter:       'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:               '1.5px solid rgba(255,255,255,0.22)',
              boxShadow:            '0 8px 32px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.18) inset',
            }}
          >
            <span className="font-display text-white/90 text-xl">RL</span>
          </button>

          {/* Name */}
          <div className="flex flex-col items-center gap-0.5">
            <p className="font-display text-white text-2xl leading-none">Reymart Louie</p>
            <p className="font-sans text-white/35 text-xs uppercase tracking-widest">Portfolio</p>
          </div>

          {/* Input area */}
          <div className="flex flex-col items-center gap-2 w-full">
            {!inputOpen ? (
              <p className="font-sans text-white/35 text-sm">Click or press any key</p>
            ) : (
              <>
                <div className={shake ? 'lock-shake' : ''} style={{ width: '100%' }}>
                  <div className="relative flex items-center w-full">
                    <input
                      ref={inputRef}
                      type="password"
                      value={value}
                      autoFocus
                      onChange={(e) => { setValue(e.target.value); setWrong(false) }}
                      onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Password"
                      className="w-full font-sans text-sm text-white/90 text-center outline-none rounded-2xl pl-5 pr-11 py-3 placeholder:text-white/25 transition-all duration-200"
                      style={{
                        background:          'rgba(255,255,255,0.10)',
                        backdropFilter:       'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border:               `1.5px solid ${wrong ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.20)'}`,
                        boxShadow:            wrong ? '0 0 0 3px rgba(248,113,113,0.10)' : 'none',
                        letterSpacing:        value ? '0.2em' : undefined,
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); submit() }}
                      className="absolute right-1.5 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150"
                      style={{
                        background: value ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.12)',
                        boxShadow:  value ? '0 2px 12px rgba(255,255,255,0.2)' : 'none',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        stroke={value ? '#111111' : 'rgba(255,255,255,0.4)'}
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6h8M7 3l3 3-3 3" />
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="font-sans text-white/22 text-[11px]">{HINT}</p>
                {wrong && <p className="font-sans text-red-400/60 text-xs">Incorrect password</p>}
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
