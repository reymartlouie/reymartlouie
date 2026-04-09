'use client'

export default function HeroIntroCard() {
  return (
    <div
      className="@container flex-1 rounded-[32px] p-5 @md:p-7 @xl:p-9 relative overflow-hidden flex flex-col justify-between"
      style={{
        backgroundImage: 'url(/hero-chip-bg.webp)',
        backgroundSize: '130% auto',
        backgroundPosition: 'left',
      }}
    >
      {/* dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#0d0010]/60 pointer-events-none" />
      {/* magenta glow top-right */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-fuchsia-500/30 rounded-full blur-[90px] pointer-events-none" />
      {/* purple glow bottom-left */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet-700/25 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 text-xs font-sans px-3 py-1 rounded-full mb-4 @xl:mb-5 w-fit bg-fuchsia-500/20 border border-fuchsia-400/30 text-fuchsia-300">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
          Available for work
        </span>
        <h1 className="font-display text-[44px] @md:text-[58px] @xl:text-[72px] leading-[1.05] mb-3 @xl:mb-4 text-white">
          Computer<br />
          Engineer<br />
          <span className="text-fuchsia-300/80">&amp; Developer.</span>
        </h1>
        <p className="font-sans text-sm @md:text-base max-w-lg leading-relaxed text-white/60">
          Full-Stack and UI/UX engineer — designing and shipping production-ready apps across
          React Native and web, backed by real hardware and networking experience.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2 @md:mt-4 @xl:mt-6 relative">
        <a
          href="#work"
          className="btn-spring inline-flex items-center gap-2 bg-fuchsia-500 text-white font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-fuchsia-400 transition-colors"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="btn-spring group inline-flex items-center gap-3 bg-white/10 text-white/70 border border-fuchsia-400/30 font-sans text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/[0.14] transition-colors"
        >
          Get in Touch
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  )
}
