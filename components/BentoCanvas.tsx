'use client'

import { createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode } from 'react'

export type Rect = { x: number; y: number; w: number; h: number }

type CtxType = {
  floating: boolean
  containerRef: React.RefObject<HTMLDivElement>
  containerWidth: number
  registerCard: (id: string, rect: Rect) => void
  updateRect: (id: string, rect: Rect) => void
  getOtherRects: (excludeId: string) => Rect[]
  resolveCollision: (id: string, proposed: Rect) => Rect
}

const BentoCtx = createContext<CtxType | null>(null)

export function useBentoCanvas() {
  const c = useContext(BentoCtx)
  if (!c) throw new Error('useBentoCanvas must be used within BentoCanvas')
  return c
}

// Match the grid's gap-4 so touching cards feel the same as the original layout
const COLLISION_GAP = 16

export default function BentoCanvas({
  children,
  cardCount,
}: {
  children: ReactNode
  cardCount: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rectsMap = useRef(new Map<string, Rect>())
  const registeredRef = useRef(0)
  const [floating, setFloating] = useState(false)
  const [containerH, setContainerH] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  // Track container width via ResizeObserver so cards can re-clamp responsively
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    setContainerWidth(el.offsetWidth)
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const registerCard = useCallback((id: string, rect: Rect) => {
    // Freeform layout is desktop-only
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return

    rectsMap.current.set(id, { ...rect })
    registeredRef.current += 1

    if (registeredRef.current >= cardCount) {
      let maxBottom = 0
      rectsMap.current.forEach(r => {
        maxBottom = Math.max(maxBottom, r.y + r.h)
      })
      setContainerH(maxBottom + 32)
      setFloating(true)
    }
  }, [cardCount])

  const updateRect = useCallback((id: string, rect: Rect) => {
    rectsMap.current.set(id, { ...rect })
    const bottom = rect.y + rect.h + 32
    setContainerH(prev => Math.max(prev, bottom))
  }, [])

  const getOtherRects = useCallback((excludeId: string): Rect[] =>
    Array.from(rectsMap.current.entries())
      .filter(([id]) => id !== excludeId)
      .map(([, r]) => ({ ...r }))
  , [])

  const resolveCollision = useCallback((id: string, proposed: Rect): Rect => {
    const others = getOtherRects(id)
    let { x, y, w, h } = proposed

    // Clamp to container bounds before resolving collisions
    const cw = containerRef.current?.offsetWidth ?? 0
    if (cw > 0) {
      x = Math.max(0, Math.min(x, cw - w))
    }
    y = Math.max(0, y)

    // Iteratively push out of any overlapping card
    for (let i = 0; i < 30; i++) {
      const hit = others.find(r =>
        x < r.x + r.w + COLLISION_GAP &&
        x + w > r.x - COLLISION_GAP &&
        y < r.y + r.h + COLLISION_GAP &&
        y + h > r.y - COLLISION_GAP
      )
      if (!hit) break

      const pushR = hit.x + hit.w + COLLISION_GAP - x
      const pushL = x + w + COLLISION_GAP - hit.x
      const pushD = hit.y + hit.h + COLLISION_GAP - y
      const pushU = y + h + COLLISION_GAP - hit.y

      const min = Math.min(pushR, pushL, pushD, pushU)
      if (min === pushR) x += pushR
      else if (min === pushL) x -= pushL
      else if (min === pushD) y += pushD
      else y -= pushU

      if (cw > 0) x = Math.max(0, Math.min(x, cw - w))
      y = Math.max(0, y)
    }

    return { x, y, w, h }
  }, [getOtherRects])

  return (
    <BentoCtx.Provider value={{
      floating, containerRef, containerWidth, registerCard, updateRect, getOtherRects, resolveCollision,
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
