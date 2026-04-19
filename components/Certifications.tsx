'use client'

import Reveal from './Reveal'

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
        <div
          className="rounded-[32px] overflow-hidden relative"
          style={{
            backgroundImage: 'url(/certifications-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Warm overlay for readability */}
          <div className="absolute inset-0" style={{ background: 'rgba(255,250,240,0.72)', backdropFilter: 'blur(1px)' }} />

          <div className="relative z-10">
            <div className="px-6 md:px-8 lg:px-10 py-6 md:py-8 flex items-center justify-between">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest mb-2 text-amber-700/70">Credentials</p>
                <h2 className="font-display text-5xl text-stone-800">Certifications</h2>
              </div>
              <span className="font-sans text-sm hidden md:block text-stone-500">
                {certs.length} credential{certs.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="h-px mx-6 bg-stone-300/60" />

            <div className="p-4 lg:p-5 flex flex-col gap-2">
              {certs.map(({ title, issuer, date, url }) => {
                const inner = (
                  <div
                    className="flex items-center justify-between px-6 py-5 rounded-[20px] group transition-all duration-200 hover:shadow-md"
                    style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(180,150,100,0.25)', backdropFilter: 'blur(8px)' }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors duration-150">{title}</span>
                      <span className="font-sans text-xs text-stone-500 group-hover:text-stone-600 transition-colors duration-150">{issuer}</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-sans text-xs text-stone-400 group-hover:text-stone-500 transition-colors duration-150">{date}</span>
                      {url && (
                        <span className="font-sans text-xs font-medium text-amber-700/80 group-hover:text-amber-800 transition-colors duration-150">
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
        </div>
      </Reveal>
    </section>
  )
}
