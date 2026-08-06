'use client'

import { useRef, type RefObject } from 'react'

export default function ScrollSlider({
  scrollRef,
  progress,
  thumbPercent,
  className = '',
}: {
  scrollRef: RefObject<HTMLDivElement>
  progress: number       // 0..1 — how far scrolled
  thumbPercent: number   // 0..100 — thumb width as a % of the track
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const seekTo = (clientX: number) => {
    const track = trackRef.current
    const el = scrollRef.current
    if (!track || !el) return
    const rect = track.getBoundingClientRect()
    const ratio = rect.width > 0 ? Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) : 0
    const max = el.scrollWidth - el.clientWidth
    el.scrollLeft = ratio * max
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.preventDefault()
    seekTo(e.clientX)

    const onMove = (ev: PointerEvent) => seekTo(ev.clientX)
    const onUp = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }

  const thumb = Math.min(100, Math.max(16, thumbPercent))

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        className="relative h-1 w-28 rounded-full bg-stone-900/10 cursor-pointer touch-none"
      >
        <div
          className="absolute top-0 h-full rounded-full bg-stone-900/60"
          style={{
            width: `${thumb}%`,
            left: `${progress * (100 - thumb)}%`,
          }}
        />
      </div>
    </div>
  )
}
