'use client'

import {
  createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode,
} from 'react'

export type Rect = { x: number; y: number; w: number; h: number }

type CtxType = {
  floating: boolean
  jiggling: boolean
  containerRef: React.RefObject<HTMLDivElement>
  positions: Record<string, Rect>
  registerCard: (id: string, rect: Rect) => void
  dropCard: (id: string, rect: Rect) => void
}

const BentoCtx = createContext<CtxType | null>(null)

export function useBentoCanvas() {
  const c = useContext(BentoCtx)
  if (!c) throw new Error('useBentoCanvas must be used within BentoCanvas')
  return c
}

const GAP = 16

// ── Pure helpers ─────────────────────────────────────────────────────────────

function computeHeight(rects: Record<string, Rect>): number {
  let max = 0
  Object.values(rects).forEach(r => { max = Math.max(max, r.y + r.h) })
  return max + 32
}

function clampToContainer(rect: Rect, cw: number): Rect {
  if (cw <= 0) return rect
  const w = Math.min(rect.w, cw)
  const x = Math.max(0, Math.min(rect.x, cw - w))
  return { ...rect, x, w }
}

/** Multi-pass global solver — pushes overlapping cards apart on every pass
 *  until none remain (or 30 passes hit). O(n² × passes), fine for ≤ 20 cards. */
function resolveAll(
  rects: Record<string, Rect>,
  cw: number,
  gap: number,
): Record<string, Rect> {
  const out: Record<string, Rect> = {}
  for (const k in rects) out[k] = { ...rects[k] }
  const ids = Object.keys(out)

  for (let pass = 0; pass < 30; pass++) {
    let changed = false
    for (const id of ids) {
      const r = out[id]
      const others = ids.filter(o => o !== id).map(o => out[o])
      const hit = others.find(o =>
        r.x     < o.x + o.w + gap &&
        r.x + r.w > o.x - gap     &&
        r.y     < o.y + o.h + gap &&
        r.y + r.h > o.y - gap
      )
      if (!hit) continue

      const pushR = hit.x + hit.w + gap - r.x
      const pushL = r.x + r.w + gap - hit.x
      const pushD = hit.y + hit.h + gap - r.y
      const pushU = r.y + r.h + gap - hit.y
      const min = Math.min(pushR, pushL, pushD, pushU)

      let { x, y, w, h } = r
      if      (min === pushR) x += pushR
      else if (min === pushL) x -= pushL
      else if (min === pushD) y += pushD
      else                    y -= pushU

      if (cw > 0) x = Math.max(0, Math.min(x, cw - w))
      y = Math.max(0, y)
      out[id] = { x, y, w, h }
      changed = true
    }
    if (!changed) break
  }
  return out
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BentoCanvas({
  children,
  cardCount,
}: {
  children: ReactNode
  cardCount: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cwRef         = useRef(0)
  const registeredRef = useRef(0)
  // Accumulate grid positions during registration phase (never triggers re-renders)
  const pendingRef    = useRef<Record<string, Rect>>({})

  const [floating,    setFloating]    = useState(false)
  const [jiggling,    setJiggling]    = useState(false)
  const [containerH,  setContainerH]  = useState(0)
  const [positions,   setPositions]   = useState<Record<string, Rect>>({})

  // Track container width; re-clamp + re-resolve on every change
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    cwRef.current = el.offsetWidth

    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width
      cwRef.current = cw
      setPositions(prev => {
        if (!Object.keys(prev).length) return prev
        const clamped: Record<string, Rect> = {}
        for (const id in prev) clamped[id] = clampToContainer(prev[id], cw)
        const resolved = resolveAll(clamped, cw, GAP)
        setContainerH(computeHeight(resolved))
        return resolved
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ── Auto-jiggle once after all cards have revealed ───────────────────────
  useEffect(() => {
    if (!floating) return
    // Last card delay is 340ms + 420ms settle = ~760ms; add buffer → 1400ms
    const startT = setTimeout(() => {
      setJiggling(true)
      // Wiggle animation is 1.6 s; clear state after it finishes
      const endT = setTimeout(() => setJiggling(false), 1800)
      return () => clearTimeout(endT)
    }, 1400)
    return () => clearTimeout(startT)
  }, [floating])

  /** Each card calls this once at mount with its natural grid position. */
  const registerCard = useCallback((id: string, rect: Rect) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return

    pendingRef.current = { ...pendingRef.current, [id]: rect }
    registeredRef.current += 1

    if (registeredRef.current >= cardCount) {
      const cw = cwRef.current
      const resolved = resolveAll(pendingRef.current, cw, GAP)
      setPositions(resolved)
      setContainerH(computeHeight(resolved))
      setFloating(true)
    }
  }, [cardCount])

  /** Called on drag-drop or resize-end. Resolves ALL collisions globally. */
  const dropCard = useCallback((id: string, rect: Rect) => {
    setPositions(prev => {
      const cw = cwRef.current
      const next = { ...prev, [id]: clampToContainer(rect, cw) }
      const resolved = resolveAll(next, cw, GAP)
      setContainerH(computeHeight(resolved))
      return resolved
    })
  }, [])

  return (
    <BentoCtx.Provider value={{ floating, jiggling, containerRef, positions, registerCard, dropCard }}>
      <div
        ref={containerRef}
        className={floating ? undefined : 'grid grid-cols-1 lg:grid-cols-12 gap-4'}
        style={floating ? { position: 'relative', height: containerH } : undefined}
      >
        {children}
      </div>
    </BentoCtx.Provider>
  )
}
