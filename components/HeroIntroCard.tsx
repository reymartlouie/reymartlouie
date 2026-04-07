'use client'

export default function HeroIntroCard() {
  return (
    <div
      className="@container flex-1 rounded-[32px] p-5 @md:p-7 @xl:p-9 relative overflow-hidden flex flex-col justify-between"
      style={{ background: 'var(--bg-card-2)' }}
    >
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative">
        <span
          className="inline-flex items-center gap-2 text-xs font-sans px-3 py-1 rounded-full mb-4 @xl:mb-5 w-fit"
          style={{ background: 'var(--badge-bg)', color: 'var(--badge-text)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--badge-dot)' }} />
          Available for work
        </span>
        <h1 className="font-display text-[44px] @md:text-[58px] @xl:text-[72px] leading-[1.05] mb-3 @xl:mb-4" style={{ color: 'var(--hero-heading)' }}>
          Computer<br />
          Engineer<br />
          <span style={{ color: 'var(--hero-muted)' }}>&amp; Developer.</span>
        </h1>
        <p className="font-sans text-sm @md:text-base max-w-lg leading-relaxed" style={{ color: 'var(--fg-40)' }}>
          Full-Stack and UI/UX engineer — designing and shipping production-ready apps across
          React Native and web, backed by real hardware and networking experience.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2 @md:mt-4 @xl:mt-6 relative">
        <a
          href="#work"
          className="btn-spring inline-flex items-center gap-2 bg-[#f0f0f0] text-[#111111] font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-white transition-colors"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="btn-spring group inline-flex items-center gap-3 bg-white/10 text-white/70 border border-white/15 font-sans text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/[0.14] transition-colors"
        >
          Get in Touch
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  )
}
