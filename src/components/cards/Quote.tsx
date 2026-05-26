'use client'

import { cardBlue } from '@/lib/colors'

const BLUE      = cardBlue.base
const BLUE_DIM  = cardBlue.dim
const BLUE_GLOW = cardBlue.glow

export default function Quote() {
  return (
    <div
      className="flex-1 rounded-[32px] relative overflow-hidden min-h-[180px] flex flex-col justify-between"
      style={{
        backgroundImage: `
          linear-gradient(160deg, rgba(4,10,22,0.72) 0%, rgba(4,10,22,0.52) 60%, rgba(4,10,22,0.70) 100%),
          url('/about-bg.webp')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-36 h-36 rounded-full blur-3xl pointer-events-none"
        style={{ background: BLUE_GLOW }}
      />

      <div className="relative p-6 flex flex-col justify-between h-full gap-4">
        <p className="font-display text-3xl leading-none" style={{ color: BLUE_DIM }}>"</p>

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
