'use client'

import { useState, useEffect } from 'react'

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

const WEEKS_TO_SHOW = 24

export default function GitHubCard() {
  const [weeks,   setWeeks]   = useState<Contribution[][]>([])
  const [total,   setTotal]   = useState(0)
  const [streak,  setStreak]  = useState(0)
  const [loading, setLoading] = useState(true)

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

        // Slice last N weeks, chunked by 7
        const slice = all.slice(-(WEEKS_TO_SHOW * 7))
        const w: Contribution[][] = []
        for (let j = 0; j < slice.length; j += 7) w.push(slice.slice(j, j + 7))
        setWeeks(w)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div
      className="flex-1 rounded-[32px] p-6 relative overflow-hidden min-h-[180px] flex flex-col justify-between"
      style={{ backgroundColor: '#0a1a0b' }}
    >
      {/* ambient glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(34,197,94,0.12)' }} />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(22,163,74,0.10)' }} />

      {/* header */}
      <p className="font-sans text-xs uppercase tracking-widest mb-4 relative"
        style={{ color: 'rgba(74,222,128,0.45)' }}>
        GitHub
      </p>

      {/* grid */}
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
                      width:           14,
                      height:          14,
                      borderRadius:    3,
                      backgroundColor: DOT_COLORS[day.level],
                      boxShadow:       DOT_GLOW[day.level],
                    }}
                  />
                ))}
              </div>
            ))}
            {Array.from({ length: 10 }).map((_, wi) => (
              <div key={`filler-${wi}`} className="flex flex-col gap-[4px]">
                {Array.from({ length: 7 }).map((_, di) => (
                  <div
                    key={di}
                    style={{
                      width:           14,
                      height:          14,
                      borderRadius:    3,
                      backgroundColor: DOT_COLORS[0],
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* footer stats */}
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
