'use client'

// Pulled from the blue-glow image
const BLUE       = 'rgba(160,210,255,0.80)'
const BLUE_DIM   = 'rgba(160,210,255,0.45)'
const BLUE_GLOW  = 'rgba(160,210,255,0.18)'

export default function AboutCard() {
  return (
    <div
      className="@container flex-1 rounded-[32px] relative overflow-hidden min-h-[180px] flex flex-col justify-between"
      style={{
        backgroundImage: `
          linear-gradient(160deg, rgba(4,10,22,0.72) 0%, rgba(4,10,22,0.52) 60%, rgba(4,10,22,0.70) 100%),
          url('/about-bg.webp')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* subtle corner glow — complements the blue orb */}
      <div
        className="absolute -top-8 -right-8 w-36 h-36 rounded-full blur-3xl pointer-events-none"
        style={{ background: BLUE_GLOW }}
      />

      <div className="relative p-6 @md:p-8 flex flex-col gap-5">
        {/* Label */}
        <div className="flex items-center gap-2">
          <div className="w-px h-3.5" style={{ background: BLUE_DIM }} />
          <p className="font-sans text-xs uppercase tracking-widest" style={{ color: BLUE_DIM }}>
            About
          </p>
        </div>

        {/* Body */}
        <p className="font-sans text-sm @md:text-base leading-relaxed" style={{ color: BLUE }}>
          Computer Engineer focused on UI/UX and Full-Stack Development — building polished, production-ready interfaces
          with a foundation in hardware and networking.
        </p>
      </div>
    </div>
  )
}
