'use client'

import {
  createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode,
} from 'react'

export type Rect = { x: number; y: number; w: number; h: number }

type CtxType = {
  floating: boolean
  editMode: boolean
  containerRef: React.RefObject<HTMLDivElement>
  positionsRef: React.MutableRefObject<Record<string, Rect>>
  positions: Record<string, Rect>
  savedPositions: Record<string, Rect>
  registerCard: (id: string, rect: Rect) => void
  dropCard: (id: string, rect: Rect) => void
  addCard: (id: string, rect?: Rect) => void
  removeCard: (id: string) => void
}

const BentoCtx = createContext<CtxType | null>(null)

export function useBentoCanvas() {
  const c = useContext(BentoCtx)
  if (!c) throw new Error('useBentoCanvas must be used within BentoCanvas')
  return c
}

export const GAP = 16
const POSITIONS_KEY = 'bento-positions-v3'

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
export function resolveAll(
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

/** Single-card solver — moves only `id`, all other cards are fixed obstacles.
 *  Used during live drag to prevent overlap without displacing other cards. */
export function resolveOne(
  id: string,
  rects: Record<string, Rect>,
  cw: number,
  gap: number,
): Rect {
  let r = { ...rects[id] }
  const obstacles = Object.entries(rects)
    .filter(([k]) => k !== id)
    .map(([, v]) => v)

  for (let pass = 0; pass < 15; pass++) {
    let changed = false
    for (const o of obstacles) {
      if (
        r.x     >= o.x + o.w + gap ||
        r.x + r.w <= o.x - gap     ||
        r.y     >= o.y + o.h + gap ||
        r.y + r.h <= o.y - gap
      ) continue

      const pushR = o.x + o.w + gap - r.x
      const pushL = r.x + r.w + gap - o.x
      const pushD = o.y + o.h + gap - r.y
      const pushU = r.y + r.h + gap - o.y
      const min = Math.min(pushR, pushL, pushD, pushU)

      let { x, y } = r
      if      (min === pushR) x += pushR
      else if (min === pushL) x -= pushL
      else if (min === pushD) y += pushD
      else                    y -= pushU

      if (cw > 0) x = Math.max(0, Math.min(x, cw - r.w))
      y = Math.max(0, y)
      r = { x, y, w: r.w, h: r.h }
      changed = true
    }
    if (!changed) break
  }
  return r
}

function savePositions(positions: Record<string, Rect>) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(POSITIONS_KEY, JSON.stringify(positions))
    }
  } catch {}
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BentoCanvas({
  children,
  savedPositions = {},
  editMode = false,
}: {
  children: ReactNode
  savedPositions?: Record<string, Rect>
  editMode?: boolean
}) {
  const containerRef      = useRef<HTMLDivElement>(null)
  const cwRef             = useRef(0)
  const pendingRef        = useRef<Record<string, Rect>>({})
  const activateTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedPositionsRef = useRef(savedPositions)
  savedPositionsRef.current = savedPositions

  const [floating,   setFloating]   = useState(false)
  const [containerH, setContainerH] = useState(0)
  const [positions,  setPositions]  = useState<Record<string, Rect>>({})

  // Kept in sync with `positions` state so pointer-event callbacks can read
  // current positions synchronously without stale closures.
  const positionsRef = useRef<Record<string, Rect>>({})
  positionsRef.current = positions

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

  /** Each card calls this once at mount with its natural grid position.
   *  Debounce: fires floating mode 80ms after the last registration call. */
  const registerCard = useCallback((id: string, rect: Rect) => {

    // Use saved position if available, but always enforce the natural content
    // height as a floor — saved heights may be stale (e.g. from a previous
    // resize that was too aggressive) and would clip content on reload.
    const saved = savedPositionsRef.current[id]
    const effectiveRect: Rect = saved
      ? { ...saved, h: Math.max(saved.h, rect.h) }
      : rect
    pendingRef.current = { ...pendingRef.current, [id]: effectiveRect }

    if (activateTimerRef.current) clearTimeout(activateTimerRef.current)
    activateTimerRef.current = setTimeout(() => {
      const cw = cwRef.current
      const resolved = resolveAll(pendingRef.current, cw, GAP)
      setPositions(resolved)
      setContainerH(computeHeight(resolved))
      setFloating(true)
    }, 80)
  }, [])

  /** Called on drag-drop. Resolves ALL collisions globally and persists. */
  const dropCard = useCallback((id: string, rect: Rect) => {
    setPositions(prev => {
      const cw = cwRef.current
      const next = { ...prev, [id]: clampToContainer(rect, cw) }
      const resolved = resolveAll(next, cw, GAP)
      setContainerH(computeHeight(resolved))
      savePositions(resolved)
      return resolved
    })
  }, [])

  /** Add a card after floating mode is already active.
   *  If rect provided → restore saved position. Otherwise → auto-place below all cards. */
  const addCard = useCallback((id: string, rect?: Rect) => {
    setPositions(prev => {
      const cw = cwRef.current
      let target = rect
      if (!target) {
        let bottomY = 0
        Object.values(prev).forEach(r => { bottomY = Math.max(bottomY, r.y + r.h) })
        target = { x: 0, y: bottomY + GAP, w: 280, h: 200 }
      }
      const next = { ...prev, [id]: clampToContainer(target, cw) }
      const resolved = resolveAll(next, cw, GAP)
      setContainerH(computeHeight(resolved))
      return resolved
    })
  }, [])

  /** Remove a card from the floating layout. */
  const removeCard = useCallback((id: string) => {
    setPositions(prev => {
      const next = { ...prev }
      delete next[id]
      setContainerH(computeHeight(next))
      savePositions(next)
      return next
    })
  }, [])

  return (
    <BentoCtx.Provider value={{
      floating, editMode, containerRef, positionsRef, positions, savedPositions,
      registerCard, dropCard, addCard, removeCard,
    }}>
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
