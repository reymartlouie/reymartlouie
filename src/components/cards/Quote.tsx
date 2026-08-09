'use client'

import { useEffect, useRef } from 'react'
import { cardBlue } from '@/lib/colors'

const BLUE      = cardBlue.base
const BLUE_DIM  = cardBlue.dim
const BLUE_GLOW = cardBlue.glow

export default function Quote() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Only play while the card is actually visible in the carousel, and never
  // autoplay for users who've asked for reduced motion — falls back to the
  // poster frame in both cases.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause() },
      { threshold: 0.3 }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className="flex-1 rounded-[32px] relative overflow-hidden min-h-[180px] flex flex-col justify-between"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/quote-bg.mp4"
        poster="/about-bg.webp"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* readability scrim over the video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, rgba(4,10,22,0.74) 0%, rgba(4,10,22,0.50) 55%, rgba(4,10,22,0.76) 100%)',
        }}
      />

      <div
        className="absolute -top-8 -right-8 w-36 h-36 rounded-full blur-3xl pointer-events-none"
        style={{ background: BLUE_GLOW }}
      />

      <div className="relative p-6 flex flex-col justify-between h-full gap-4">
        <p className="font-display text-3xl leading-none" style={{ color: BLUE_DIM }}>&quot;</p>

        <p className="font-sans text-sm leading-relaxed" style={{ color: BLUE }}>
          First, solve the problem. Then, write the code.
        </p>

        <p className="font-sans text-[11px]" style={{ color: BLUE_DIM }}>
          — John Johnson
        </p>
      </div>
    </div>
  )
}
