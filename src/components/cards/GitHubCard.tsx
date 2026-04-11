'use client'

import { useState, useEffect, useRef } from 'react'

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }

const DOT_COLORS = [
  'rgba(74,222,128,0.07)',  // 0 — none
  '#14532d',                 // 1 — low
  '#166534',                 // 2 — mid
  '#16a34a',                 // 3 — high
  '#22c55e',                 // 4 — max
]

const DOT_GLOW: Partial<Record<number, string>> = {
  3: '0 0 5px rgba(22,163,74,0.55)',
  4: '0 0 8px rgba(34,197,94,0.70)',
}

// Each week column: 14px dot + 4px gap between columns
const DOT_W   = 14
const COL_GAP = 4
const WEEK_W  = DOT_W + COL_GAP   // 18px per week
const PADDING = 48                  // p-6 (24px) × 2 sides
const MAX_WEEKS = 52

export default function GitHubCard() {
  const [allWeeks, setAllWeeks] = useState<Contribution[][]>([])
  const [total,    setTotal]    = useState(0)
  const [streak,   setStreak]   = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [cardW,    setCardW]    = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  // Track card width so we can show exactly as many weeks as fit
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setCardW(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/reymartlouie?y=last')
      .then(r => r.json())
      .then(data => {
        const all: Contribution[] = data.contributions ?? []

        // Total for current year
        const yr = String(new Date().getFullYear())
        setTotal(data.total?.[yr] ?? all.reduce((s, c) => s + c.count, 0))

        // Current streak — walk backward, skip today if still 0
        let s = 0, i = all.length - 1
        const today = new Date().toISOString().slice(0, 10)
        if (all[i]?.date === today && all[i]?.count === 0) i--
        while (i >= 0 && all[i].count > 0) { s++; i-- }
        setStreak(s)

        // Load up to MAX_WEEKS worth of data
        const slice = all.slice(-(MAX_WEEKS * 7))
        const w: Contribution[][] = []
        for (let j = 0; j < slice.length; j += 7) w.push(slice.slice(j, j + 7))
        setAllWeeks(w)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // How many week-columns fit in the current card width (most recent weeks shown)
  const weeksToShow = cardW > 0
    ? Math.min(allWeeks.length, Math.max(2, Math.floor((cardW - PADDING) / WEEK_W)))
    : 24
  const weeks = allWeeks.slice(-weeksToShow)

  return (
    <div
      ref={cardRef}
      className="@container flex-1 rounded-[32px] p-6 relative overflow-hidden min-h-[180px] flex flex-col justify-between"
      style={{ background: 'linear-gradient(145deg, #0d3318 0%, #071a0c 100%)' }}
    >
      {/* ambient glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(34,197,94,0.24)' }} />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(22,163,74,0.20)' }} />

      {/* header */}
      <p className="font-sans text-xs uppercase tracking-widest mb-4 relative"
        style={{ color: 'rgba(74,222,128,0.45)' }}>
        GitHub
      </p>

      {/* contribution grid — always shows the most recent weeks that fit */}
      <div className="flex-1 flex items-start relative overflow-hidden">
        {loading ? (
          <div className="flex items-center h-[94px]">
            <span className="font-sans text-xs" style={{ color: 'rgba(74,222,128,0.25)' }}>Loading…</span>
          </div>
        ) : (
          <div className="flex gap-[4px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[4px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.date} · ${day.count}`}
                    style={{
                      width:           DOT_W,
                      height:          DOT_W,
                      borderRadius:    3,
                      backgroundColor: DOT_COLORS[day.level],
                      boxShadow:       DOT_GLOW[day.level],
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* footer stats — always visible at the bottom */}
      <div className="flex items-baseline gap-2 mt-4 relative">
        <span className="font-display text-2xl leading-none" style={{ color: '#4ade80' }}>
          {total.toLocaleString()}
        </span>
        <span className="font-sans text-xs" style={{ color: 'rgba(74,222,128,0.40)' }}>
          contributions this year
        </span>
        {streak > 0 && (
          <span className="font-sans text-xs ml-auto tabular-nums" style={{ color: 'rgba(74,222,128,0.55)' }}>
            {streak}d streak
          </span>
        )}
      </div>
    </div>
  )
}
