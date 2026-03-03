'use client'

import { useRef, useState, useEffect, useCallback, useId, type ReactNode } from 'react'
import { useBentoCanvas, type Rect } from './BentoCanvas'

const MIN_W       = 180
const MIN_H       = 100
const CARD_RADIUS = 32

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
  const { floating, jiggling, containerRef, positions, registerCard, dropCard } = useBentoCanvas()

  const wrapRef     = useRef<HTMLDivElement>(null)
  const cleanupRef  = useRef<(() => void) | null>(null)

  // ── Always-current position ─────────────────────────────────────────────
  // Updated directly in the render body so pointer-event callbacks always
  // read the latest value without needing it in their dependency arrays.
  const ctxRect    = positions[id]
  const ctxRectRef = useRef(ctxRect)
  ctxRectRef.current = ctxRect

  // ── Interaction states ───────────────────────────────────────────────────
  const [revealed,   setRevealed]   = useState(false)
  const [revealDone, setRevealDone] = useState(false)
  const [hovered,    setHovered]    = useState(false)
  const [pressing,   setPressing]   = useState(false)   // pointer down, not yet dragging
  const [dragging,   setDragging]   = useState(false)
  const [resizing,   setResizing]   = useState(false)

  // Local copy used only during drag / resize for smooth per-frame updates
  const [localRect,  setLocalRect]  = useState<Rect | null>(null)
  const localRectRef = useRef<Rect | null>(null)
  const dragDxRef    = useRef(0)   // horizontal offset from drag start (for tilt)

  // The position we actually render
  const renderedRect = (dragging || resizing) && localRect ? localRect : ctxRect

  // ── Register with canvas once at mount ───────────────────────────────────
  useEffect(() => {
    const el        = wrapRef.current
    const container = containerRef.current
    if (!el || !container) return
    const elR = el.getBoundingClientRect()
    const cR  = container.getBoundingClientRect()
    registerCard(id, {
      x: elR.left - cR.left,
      y: elR.top  - cR.top,
      w: elR.width,
      h: elR.height,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Scroll reveal ─────────────────────────────────────────────────────────
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

  useEffect(() => () => { cleanupRef.current?.() }, [])

  // ── Drag — press + move (8 px threshold) ─────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const startRect = ctxRectRef.current   // always fresh — no stale closure
    if (!startRect) return

    const startX = e.clientX
    const startY = e.clientY
    let dragStarted = false

    setPressing(true)

    const onMove = (ev: PointerEvent) => {
      const dx   = ev.clientX - startX
      const dy   = ev.clientY - startY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (!dragStarted && dist > 8) {
        dragStarted = true
        setPressing(false)
        setDragging(true)
      }

      if (dragStarted) {
        const cw   = containerRef.current?.offsetWidth ?? 0
        const maxX = cw > 0 ? cw - startRect.w : Infinity
        dragDxRef.current = dx
        const r: Rect = {
          x: Math.max(0, Math.min(startRect.x + dx, maxX)),
          y: Math.max(0, startRect.y + dy),
          w: startRect.w,
          h: startRect.h,
        }
        localRectRef.current = r
        setLocalRect(r)
      }
    }

    const onUp = () => {
      cleanup()
      setPressing(false)
      if (dragStarted) {
        setDragging(false)
        dragDxRef.current = 0
        dropCard(id, localRectRef.current ?? startRect)
        setLocalRect(null)
        localRectRef.current = null
      }
    }

    const cleanup = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup',   onUp)
      cleanupRef.current = null
    }
    cleanupRef.current = cleanup
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup',   onUp)
  }, [id, dropCard, containerRef])

  // ── Resize — immediate drag on the corner handle ──────────────────────────
  const onResizeDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (e.button !== 0) return
    const startRect = ctxRectRef.current
    if (!startRect) return

    const startX = e.clientX
    const startY = e.clientY
    const { x, y, w: sw, h: sh } = startRect
    setResizing(true)

    const onMove = (ev: PointerEvent) => {
      const cw   = containerRef.current?.offsetWidth ?? 0
      const maxW = cw > 0 ? cw - x : Infinity
      const r: Rect = {
        x, y,
        w: Math.max(MIN_W, Math.min(maxW, sw + ev.clientX - startX)),
        h: Math.max(MIN_H, sh + ev.clientY - startY),
      }
      localRectRef.current = r
      setLocalRect(r)
    }

    const onUp = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup',   onUp)
      setResizing(false)
      // dropCard triggers global collision resolution, same as drag
      dropCard(id, localRectRef.current ?? startRect)
      setLocalRect(null)
      localRectRef.current = null
    }

    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup',   onUp)
  }, [id, dropCard, containerRef])

  // ── Visual state ──────────────────────────────────────────────────────────
  const tilt = dragging
    ? Math.max(-6, Math.min(6, dragDxRef.current * 0.015))
    : 0

  const transform = (() => {
    if (!revealed) return 'translateY(20px)'
    if (dragging)  return `scale(1.06) rotate(${tilt}deg)`
    if (pressing)  return 'scale(1.02)'
    return 'scale(1)'
  })()

  const boxShadow = (() => {
    if (dragging)
      return '0 28px 72px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35)'
    if (pressing)
      return '0 12px 32px rgba(0,0,0,0.3)'
    return 'none'
  })()

  // Spring-settle transitions give every card the iOS "bounce into place" feel.
  // When BentoCanvas resolves collisions globally, pushed cards animate to their
  // new slots. During drag/resize, transitions are off so the card is instant.
  const SPRING = 'cubic-bezier(0.34,1.2,0.64,1)'
  const SMOOTH = 'cubic-bezier(0.2,0,0,1)'
  // Outer div transition: only position, size, opacity (transform lives on inner div)
  const transition = (() => {
    if (!revealed) return 'none'
    if (dragging || resizing) return 'none'
    const rd = revealDone ? '' : ` ${delay}ms`
    return [
      `left 500ms ${SPRING}`,
      `top 500ms ${SPRING}`,
      `width 350ms ${SMOOTH}`,
      `height 350ms ${SMOOTH}`,
      `opacity 380ms ${SMOOTH}${rd}`,
    ].join(', ')
  })()

  // ── Non-floating render (mobile / SSR) ────────────────────────────────────
  if (!floating) {
    return (
      <div
        ref={wrapRef}
        className={`flex flex-col ${className}`}
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'none' : 'translateY(20px)',
          transition: revealed
            ? `opacity 380ms ${SMOOTH} ${delay}ms, transform 380ms ${SMOOTH} ${delay}ms`
            : 'none',
        }}
      >
        {children}
      </div>
    )
  }

  // Not yet positioned by the canvas
  if (!renderedRect) return null

  // Wiggle: active when canvas jiggling, card revealed, and not being interacted with
  const isWiggling = jiggling && revealDone && !dragging && !pressing && !resizing
  // Stagger each card's wiggle phase using its delay prop so they're out-of-sync (iOS feel)
  const wiggleDelay = `${(delay % 160)}ms`

  // ── Floating render ───────────────────────────────────────────────────────
  // Outer div: owns position (left/top/width/height) + opacity + z-index.
  // Inner div: owns visual transforms (scale/tilt), border-radius, shadow, wiggle.
  // Splitting them means the position spring and the wiggle keyframe never fight.
  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        left:      renderedRect.x,
        top:       renderedRect.y,
        width:     renderedRect.w,
        height:    renderedRect.h,
        opacity:   revealed ? 1 : 0,
        transition,
        zIndex: dragging || pressing ? 100 : 1,
        userSelect:  'none',
        touchAction: 'none',
        willChange: dragging ? 'left, top' : 'auto',
      }}
    >
      <div
        onPointerDown={onPointerDown}
        onContextMenu={(e) => e.preventDefault()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={isWiggling ? 'bento-wiggle' : undefined}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: CARD_RADIUS,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform,
          boxShadow,
          cursor: dragging ? 'grabbing' : 'grab',
          transition: dragging || resizing
            ? 'transform 80ms ease, box-shadow 300ms ease'
            : `transform 380ms ${SPRING}, box-shadow 300ms ease`,
          animationDelay: isWiggling ? wiggleDelay : undefined,
        }}
      >
        {/* Drag hint: 6-dot grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 14, right: 14,
            opacity: (hovered || pressing) && revealDone && !dragging && !resizing ? 0.4 : 0,
            transition: 'opacity 200ms ease',
            pointerEvents: 'none',
            zIndex: 20,
            color: 'white',
          }}
        >
          <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
            <circle cx="3" cy="3"  r="1.5" /><circle cx="9" cy="3"  r="1.5" />
            <circle cx="3" cy="8"  r="1.5" /><circle cx="9" cy="8"  r="1.5" />
            <circle cx="3" cy="13" r="1.5" /><circle cx="9" cy="13" r="1.5" />
          </svg>
        </div>

        {/* Resize handle: 3-dot L — bottom-right, clear of the rounded corner */}
        <div
          aria-hidden
          onPointerDown={onResizeDown}
          style={{
            position: 'absolute',
            bottom: 14, right: 14,
            width: 20, height: 20,
            cursor: 'se-resize',
            zIndex: 30,
            opacity: hovered && revealDone && !dragging && !pressing ? 0.5 : 0,
            transition: 'opacity 200ms ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="6"  cy="10" r="1.5" />
            <circle cx="10" cy="6"  r="1.5" />
          </svg>
        </div>

        {children}
      </div>
    </div>
  )
}
