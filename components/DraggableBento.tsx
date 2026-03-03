'use client'

import { useRef, useState, useEffect, useCallback, useId, type ReactNode } from 'react'
import { useBentoCanvas, type Rect } from './BentoCanvas'

const MIN_W = 180
const MIN_H = 100

export default function DraggableBento({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const id = useId()
  const { floating, containerRef, registerCard, updateRect, resolveCollision } = useBentoCanvas()
  const wrapRef = useRef<HTMLDivElement>(null)
  const dragCleanupRef = useRef<(() => void) | null>(null)
  const rectRef = useRef<Rect>({ x: 0, y: 0, w: 0, h: 0 })

  const [revealed, setRevealed] = useState(false)
  const [revealDone, setRevealDone] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [rect, setRect] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 })

  // Keep rectRef in sync with state
  useEffect(() => { rectRef.current = rect }, [rect])

  // Measure grid position and register with canvas (runs once on mount)
  useEffect(() => {
    const el = wrapRef.current
    const container = containerRef.current
    if (!el || !container) return

    const elR = el.getBoundingClientRect()
    const cR = container.getBoundingClientRect()
    const r: Rect = {
      x: elR.left - cR.left,
      y: elR.top - cR.top,
      w: elR.width,
      h: elR.height,
    }
    setRect(r)
    rectRef.current = r
    registerCard(id, r)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Scroll reveal
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.unobserve(el) } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!revealed) return
    const t = setTimeout(() => setRevealDone(true), delay + 420)
    return () => clearTimeout(t)
  }, [revealed, delay])

  useEffect(() => () => { dragCleanupRef.current?.() }, [])

  // ── Drag ──────────────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const startX = e.clientX
    const startY = e.clientY
    const { x: ox, y: oy, w, h } = rectRef.current
    let active = false

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      if (!active && Math.sqrt(dx * dx + dy * dy) > 8) {
        active = true
        setDragging(true)
      }
      if (active) {
        const nr: Rect = { x: Math.max(0, ox + dx), y: Math.max(0, oy + dy), w, h }
        setRect(nr)
        rectRef.current = nr
      }
    }

    const onUp = () => {
      cleanup()
      if (active) {
        setDragging(false)
        const resolved = resolveCollision(id, rectRef.current)
        setRect(resolved)
        rectRef.current = resolved
        updateRect(id, resolved)
      }
    }

    const cleanup = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      dragCleanupRef.current = null
    }

    dragCleanupRef.current = cleanup
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }, [id, resolveCollision, updateRect])

  // ── Resize ────────────────────────────────────────────────────────────────
  const onResizeDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (e.button !== 0) return
    const startX = e.clientX
    const startY = e.clientY
    const { x, y, w: sw, h: sh } = rectRef.current
    setResizing(true)

    const onMove = (ev: PointerEvent) => {
      const nr: Rect = {
        x, y,
        w: Math.max(MIN_W, sw + ev.clientX - startX),
        h: Math.max(MIN_H, sh + ev.clientY - startY),
      }
      setRect(nr)
      rectRef.current = nr
    }

    const onUp = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      setResizing(false)
      updateRect(id, rectRef.current)
    }

    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }, [id, updateRect])

  // ── Compute transform / transition ────────────────────────────────────────
  const transform = (() => {
    if (!revealed) return 'translateY(20px)'
    if (dragging) return 'scale(1.04)'
    if (hovered && revealDone && !resizing) return 'translateY(-3px)'
    return 'none'
  })()

  const transition = (() => {
    if (!revealed) return 'none'
    if (dragging || resizing) return 'none'
    if (!revealDone) return `opacity 380ms cubic-bezier(0.2,0,0,1) ${delay}ms, transform 380ms cubic-bezier(0.2,0,0,1) ${delay}ms`
    return 'transform 200ms cubic-bezier(0.2,0,0,1)'
  })()

  // ── Non-floating (grid) render ─────────────────────────────────────────────
  if (!floating) {
    return (
      <div
        ref={wrapRef}
        className={`flex flex-col ${className}`}
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'none' : 'translateY(20px)',
          transition: revealed
            ? `opacity 380ms cubic-bezier(0.2,0,0,1) ${delay}ms, transform 380ms cubic-bezier(0.2,0,0,1) ${delay}ms`
            : 'none',
        }}
      >
        {children}
      </div>
    )
  }

  // ── Floating (absolute) render ─────────────────────────────────────────────
  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        opacity: revealed ? 1 : 0,
        transform,
        transition,
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        zIndex: dragging || resizing ? 100 : 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Drag-hint dots (top-right) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          opacity: hovered && revealDone && !dragging && !resizing ? 0.35 : 0,
          transition: 'opacity 200ms ease',
          pointerEvents: 'none',
          zIndex: 20,
          color: 'white',
        }}
      >
        <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
          <circle cx="3"  cy="3"  r="1.5" />
          <circle cx="9"  cy="3"  r="1.5" />
          <circle cx="3"  cy="8"  r="1.5" />
          <circle cx="9"  cy="8"  r="1.5" />
          <circle cx="3"  cy="13" r="1.5" />
          <circle cx="9"  cy="13" r="1.5" />
        </svg>
      </div>

      {/* Resize handle (bottom-right) */}
      <div
        aria-hidden
        onPointerDown={onResizeDown}
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          width: 24,
          height: 24,
          cursor: 'se-resize',
          zIndex: 30,
          opacity: hovered && revealDone && !dragging ? 0.5 : 0,
          transition: 'opacity 200ms ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {/* Three-dot resize icon */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="6"  cy="10" r="1.5" />
          <circle cx="10" cy="6"  r="1.5" />
        </svg>
      </div>

      {children}
    </div>
  )
}
