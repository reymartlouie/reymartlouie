'use client'

export default function AboutCard() {
  return (
    <div
      className="@container flex-1 rounded-[32px] p-6 @md:p-8 flex flex-col gap-4 relative overflow-hidden min-h-[180px]"
      style={{ background: 'var(--bg-card-3)' }}
    >
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/18 rounded-full blur-3xl pointer-events-none" />
      <p className="font-sans text-xs uppercase tracking-widest relative" style={{ color: 'var(--fg-30)' }}>About</p>
      <p className="font-sans text-sm @md:text-base leading-relaxed relative" style={{ color: 'var(--fg-55)' }}>
        Computer Engineer focused on UI/UX and Full-Stack Development — building polished, production-ready interfaces
        with a foundation in hardware and networking.
      </p>
    </div>
  )
}
