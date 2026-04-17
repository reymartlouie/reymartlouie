'use client'

import Reveal from '../ui/Reveal'

const certs = [
  {
    title: 'Your Certification Title',
    issuer: 'Issuing Organization',
    date: 'Month Year',
    url: null as string | null,
  },
  // Add more certs here
]

export default function Certifications() {
  return (
    <section id="certifications" className="flex flex-col gap-4">
      <Reveal>
        <div className="rounded-[32px] overflow-hidden relative" style={{ background: 'var(--bg-card)' }}>
          <div className="px-6 md:px-8 lg:px-10 py-6 md:py-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-px h-3.5" style={{ background: 'var(--fg-30)' }} />
                <p className="font-sans text-xs uppercase tracking-widest" style={{ color: 'var(--fg-30)' }}>Credentials</p>
              </div>
              <h2 className="font-display text-5xl" style={{ color: 'var(--fg)' }}>Certifications</h2>
            </div>
            <span className="font-sans text-sm hidden md:block" style={{ color: 'var(--fg-20)' }}>
              {certs.length} credential{certs.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="h-px mx-6" style={{ background: 'var(--border)' }} />

          <div className="p-4 lg:p-5 flex flex-col gap-2">
            {certs.map(({ title, issuer, date, url }) => {
              const inner = (
                <div
                  className="flex items-center justify-between px-6 py-5 rounded-[20px] group"
                  style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-sm font-medium transition-colors duration-150 group-hover:text-white/90" style={{ color: 'var(--fg-60)' }}>{title}</span>
                    <span className="font-sans text-xs transition-colors duration-150 group-hover:text-white/50" style={{ color: 'var(--fg-30)' }}>{issuer}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-sans text-xs transition-colors duration-150 group-hover:text-white/40" style={{ color: 'var(--fg-20)' }}>{date}</span>
                    {url && (
                      <span className="font-sans text-xs font-medium transition-colors duration-150 group-hover:text-white/70" style={{ color: 'var(--fg-40)' }}>
                        View ↗
                      </span>
                    )}
                  </div>
                </div>
              )

              return url ? (
                <a key={title} href={url} target="_blank" rel="noopener noreferrer" className="block">
                  {inner}
                </a>
              ) : (
                <div key={title}>{inner}</div>
              )
            })}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
