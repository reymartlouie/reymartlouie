'use client'

import { useRef, useState, useEffect, useCallback, useId, type ReactNode } from 'react'
import { useBentoCanvas, resolveOne, GAP, type Rect } from './BentoCanvas'

const DEFAULT_MIN_W = 180
const DEFAULT_MIN_H = 100
const CARD_RADIUS   = 32

export default function DraggableBento({
  children,
  className = '',
  delay = 0,
  cardId,
  minW = DEFAULT_MIN_W,
  minH = DEFAULT_MIN_H,
  sizes,
}: {
  children: ReactNode
  className?: string
  delay?: number
  cardId?: string
  minW?: number
  minH?: number
  sizes?: Array<{ w: number; h: number; label: string }>
}) {
  const generatedId = useId()
  const id = cardId ?? generatedId
  const { floating, editMode, containerRef, positionsRef, positions, savedPositions, registerCard, dropCard, addCard } = useBentoCanvas()

  const wrapRef      = useRef<HTMLDivElement>(null)
  const cleanupRef   = useRef<(() => void) | null>(null)
  // True when card mounts into an already-floating canvas (e.g. new Supabase row).
  // These cards should not use the page-load stagger delay.
  const isDynamicRef = useRef(false)

  // ── Content-measured minimums ────────────────────────────────────────────
  // measuredMinH is captured from the natural grid height before floating
  // activates — this is the true content-driven floor and is always ≥ the
  // prop minH. Both are fused into a ref so resize handlers read fresh values.
  const [measuredMinH, setMeasuredMinH] = useState(0)
  const minWRef = useRef(minW)
  const minHRef = useRef(minH)
  minWRef.current = minW
  minHRef.current = Math.max(minH, measuredMinH)

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
    if (floating) {
      // Canvas already in floating mode (new card added after initial render).
      // Reveal immediately — IntersectionObserver won't fire for off-screen cards.
      isDynamicRef.current = true
      setRevealed(true)
      addCard(id, savedPositions[id])
      return
    }

    const el        = wrapRef.current
    const container = containerRef.current
    if (!el || !container) return
    const elR = el.getBoundingClientRect()
    const cR  = container.getBoundingClientRect()

    // Natural height from the CSS grid is the true content-driven minimum.
    // A card must never be resized shorter than it naturally needs to be.
    setMeasuredMinH(elR.height)

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

  const effectiveDelay = isDynamicRef.current ? 0 : delay

  useEffect(() => {
    if (!revealed) return
    const t = setTimeout(() => setRevealDone(true), effectiveDelay + 420)
    return () => clearTimeout(t)
  }, [revealed, effectiveDelay])

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
        const raw: Rect = {
          x: Math.max(0, Math.min(startRect.x + dx, maxX)),
          y: Math.max(0, startRect.y + dy),
          w: startRect.w,
          h: startRect.h,
        }
        // Resolve the dragged card against all other fixed cards so it
        // can never visually overlap a neighbour during drag.
        const resolved = resolveOne(id, { ...positionsRef.current, [id]: raw }, cw, GAP)
        localRectRef.current = resolved
        setLocalRect(resolved)
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
        w: Math.max(minWRef.current, Math.min(maxW, sw + ev.clientX - startX)),
        h: Math.max(minHRef.current, sh + ev.clientY - startY),
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

  // Spring-settle transitions give every card the iOS "bounce into place" feel.
  // When BentoCanvas resolves collisions globally, pushed cards animate to their
  // new slots. During drag/resize, transitions are off so the card is instant.
  const SPRING = 'cubic-bezier(0.34,1.2,0.64,1)'
  const SMOOTH = 'cubic-bezier(0.2,0,0,1)'
  // Outer div transition: only position, size, opacity (transform lives on inner div)
  const transition = (() => {
    if (!revealed) return 'none'
    if (dragging || resizing) return 'none'
    const rd = revealDone ? '' : ` ${effectiveDelay}ms`
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
        className={className}
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'none' : 'translateY(20px)',
          transition: revealed
            ? `opacity 380ms ${SMOOTH} ${effectiveDelay}ms, transform 380ms ${SMOOTH} ${effectiveDelay}ms`
            : 'none',
        }}
      >
        {children}
      </div>
    )
  }

  // Not yet positioned by the canvas
  if (!renderedRect) return null

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
        opacity:      revealed ? 1 : 0,
        pointerEvents: revealed ? 'auto' : 'none',
        transition,
        zIndex: dragging || pressing ? 100 : 1,
        userSelect:  'none',
        touchAction: editMode ? 'none' : 'auto',
        willChange: dragging ? 'left, top' : 'auto',
      }}
    >
      <div
        onPointerDown={onPointerDown}
        onContextMenu={(e) => e.preventDefault()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={editMode && !dragging && !pressing && revealDone ? 'bento-wiggle' : undefined}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: CARD_RADIUS,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform,
          boxShadow: dragging
            ? '0 28px 72px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35)'
            : pressing
            ? '0 12px 32px rgba(0,0,0,0.3)'
            : hovered && !editMode
            ? '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)'
            : 'none',
          cursor: dragging ? 'grabbing' : 'grab',
          transition: dragging || resizing
            ? 'transform 80ms ease, box-shadow 300ms ease'
            : `transform 380ms ${SPRING}, box-shadow 300ms ease`,
        }}
      >
        {/* Drag hint: 6-dot grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 14, right: 14,
            opacity: (editMode || hovered || pressing) && revealDone && !dragging && !resizing ? 0.4 : 0,
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

        {/* Resize: S/M/L preset buttons (when sizes provided) */}
        {sizes ? (
          <div
            style={{
              position: 'absolute',
              bottom: 10, right: 10,
              display: 'flex',
              gap: 4,
              zIndex: 30,
              opacity: editMode && revealDone && !dragging && !pressing ? 1 : 0,
              transition: 'opacity 200ms ease',
              pointerEvents: editMode && revealDone && !dragging && !pressing ? 'auto' : 'none',
            }}
          >
            {sizes.map((sz) => {
              const cr = ctxRect
              const isActive = !!cr && Math.abs(cr.w - sz.w) <= 40 && Math.abs(cr.h - sz.h) <= 40
              return (
                <button
                  key={sz.label}
                  onPointerDown={e => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation()
                    const cur = ctxRectRef.current
                    if (!cur) return
                    dropCard(id, { x: cur.x, y: cur.y, w: sz.w, h: Math.max(sz.h, minHRef.current) })
                  }}
                  style={{
                    width: 26, height: 22,
                    borderRadius: 6,
                    border: `1px solid ${isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.4)',
                    color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: 'system-ui, sans-serif',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                    transition: 'background 150ms ease, border-color 150ms ease, color 150ms ease',
                  }}
                >
                  {sz.label}
                </button>
              )
            })}
          </div>
        ) : null}

        {children}
      </div>
    </div>
  )
}
