'use client'

import { useCallback, type ReactNode, type RefObject } from 'react'
import ScrollSlider from './ScrollSlider'

/**
 * Shared prev/next control for every horizontal carousel (Hero, Works,
 * Achievements). Frosted-glass round buttons flanking the ScrollSlider —
 * one design, one behaviour across all sections.
 */
export default function CarouselNav({
  scrollRef,
  progress,
  thumbPercent,
  className = '',
  sliderClassName = '',
}: {
  scrollRef: RefObject<HTMLDivElement>
  progress: number      // 0..1 — how far scrolled (from the parent)
  thumbPercent: number  // 0..100 — thumb width as a % of the track
  className?: string
  sliderClassName?: string
}) {
  const scrollByCards = useCallback(
    (dir: 1 | -1) => {
      const el = scrollRef.current
      if (!el) return
      const child = el.firstElementChild as HTMLElement | null
      const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0
      const step = child ? child.getBoundingClientRect().width + gap : el.clientWidth * 0.8
      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' })
    },
    [scrollRef]
  )

  // Nothing to scroll — don't render a dead control.
  if (thumbPercent >= 99.5) return null

  const atStart = progress <= 0.001
  const atEnd = progress >= 0.999

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <NavButton label="Previous" disabled={atStart} onClick={() => scrollByCards(-1)}>
        <path d="M15 18l-6-6 6-6" />
      </NavButton>

      <ScrollSlider
        scrollRef={scrollRef}
        progress={progress}
        thumbPercent={thumbPercent}
        className={sliderClassName}
      />

      <NavButton label="Next" disabled={atEnd} onClick={() => scrollByCards(1)}>
        <path d="M9 18l6-6-6-6" />
      </NavButton>
    </div>
  )
}

function NavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="btn-spring glass-strong flex h-11 w-11 flex-shrink-0 items-center justify-center
                 rounded-full text-[color:var(--ink-70)] transition-opacity duration-200
                 hover:text-[color:var(--ink)] disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  )
}
