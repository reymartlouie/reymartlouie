'use client'

import { useState, useEffect, useRef } from 'react'

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }

const DOT_COLORS = [
  'rgba(255,255,255,0.04)',  // 0 — none, nearly invisible against the card bg
  '#14532d',                 // 1 — low
  '#166534',                 // 2 — mid
  '#16a34a',                 // 3 — high
  '#22c55e',                 // 4 — max
]

const DOT_GLOW: Partial<Record<number, string>> = {
  3: '0 0 4px rgba(22,163,74,0.55)',
  4: '0 0 6px rgba(34,197,94,0.70)',
}

// Each week column: 11px dot + 3px gap between columns — GitHub's own proportions
const DOT_W   = 11
const COL_GAP = 3
const WEEK_W  = DOT_W + COL_GAP   // 14px per week
const MAX_WEEKS = 52

export default function GitHubCard() {
  const [allWeeks, setAllWeeks] = useState<Contribution[][]>([])
  const [total,    setTotal]    = useState(0)
  const [streak,   setStreak]   = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [gridW,    setGridW]    = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  // Track the grid row's own width so we know exactly how many week-columns fit
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setGridW(entry.contentRect.width))
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

  // How many week-columns fit in the measured grid row (most recent weeks shown)
  const weeksToShow = gridW > 0
    ? Math.min(allWeeks.length, Math.max(2, Math.floor(gridW / WEEK_W)))
    : 20
  const weeks = allWeeks.slice(-weeksToShow)

  return (
    <a
      href="https://github.com/reymartlouie"
      target="_blank"
      rel="noopener noreferrer"
      className="group @container flex-1 rounded-[32px] p-6 relative overflow-hidden min-h-[180px] flex flex-col justify-between"
      style={{
        background: 'linear-gradient(145deg, #0d3318 0%, #071a0c 100%)',
      }}
    >
      {/* ambient glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(34,197,94,0.24)' }} />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(22,163,74,0.20)' }} />

      {/* header — same two-line block as TechStackCard: label row, then a
          font-display headline underneath */}
      <div className="relative flex flex-col gap-3 @md:gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-px h-3.5" style={{ background: 'rgba(74,222,128,0.45)' }} />
            <p className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(74,222,128,0.45)' }}>
              GitHub
            </p>
          </div>
          <svg
            width="14" height="14" viewBox="0 0 16 16" fill="rgba(74,222,128,0.45)"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07
              -1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
              a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
              0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01
              8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </div>
        <p className="font-display text-2xl @md:text-[28px] leading-[1.05]" style={{ color: '#4ade80' }}>
          Consistency, committed.
        </p>
      </div>

      {/* contribution grid — breaks out of the card's p-6 (24px) to run
          edge-to-edge with its own 15px gutter, right-aligned so the most
          recent week sits flush against that gutter. Vertically it sits at
          the golden-ratio point (~62% down) rather than dead-center, via two
          spacers grown 1.618:1 */}
      <div
        ref={gridRef}
        className="flex-1 flex flex-col relative overflow-hidden mx-[-24px] px-[15px]"
      >
        <div aria-hidden="true" style={{ flexGrow: 1.618 }} />
        <div className="flex justify-end">
          {loading ? (
            <div className="flex items-center h-[95px]">
              <span className="font-sans text-xs" style={{ color: 'rgba(74,222,128,0.25)' }}>Loading…</span>
            </div>
          ) : (
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
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
        <div aria-hidden="true" style={{ flexGrow: 1 }} />
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
    </a>
  )
}
