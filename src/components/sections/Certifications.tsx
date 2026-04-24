'use client'

import Reveal from '../ui/Reveal'

const certs = [
  {
    title: 'Internship Certificate',
    issuer: 'Ubiquity Global Services',
    date: 'October 2025',
    url: '/ubiquity-internship.pdf',
    badge: '/ubiquity-photo.webp',
    color: 'from-blue-700 to-blue-900',
    dots: ['#1d4ed8', '#93c5fd', '#bfdbfe'],
  },
  // Add more certs here
]

export default function Certifications() {
  return (
    <section id="certifications" className="flex flex-col gap-4">
      <Reveal>
        <div className="rounded-[32px] overflow-hidden" style={{ background: '#f5f5f7' }}>
          {/* Header */}
          <div className="px-6 md:px-8 lg:px-10 py-6 md:py-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-px h-3.5 bg-amber-700/50" />
                <p className="font-sans text-xs uppercase tracking-widest text-amber-700/70">Credentials</p>
              </div>
              <h2 className="font-display text-5xl text-stone-800">Certifications</h2>
            </div>
            <span className="font-sans text-sm hidden md:block text-stone-500">
              {certs.length} credential{certs.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="h-px mx-6 bg-stone-300/60" />

          {/* Cards row */}
          <div className="overflow-x-auto pt-6 pb-10 px-8">
            <div className="flex gap-6 min-w-max">
              {certs.map(({ title, issuer, date, url, badge, color, dots }) => (
                <div
                  key={title}
                  className="flex flex-col items-center w-64 md:w-72"
                >
                  {/* Card image area */}
                  <div
                    className={`w-full rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center`}
                    style={{ aspectRatio: '4/3' }}
                  >
                    {badge ? (
                      <img src={badge} alt={title} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 opacity-30">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        <span className="text-white text-xs font-sans tracking-wide">Badge</span>
                      </div>
                    )}
                  </div>

                  {/* Dot indicators */}
                  <div className="flex gap-1.5 mt-4">
                    {dots.map((c, i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
                    ))}
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col items-center text-center mt-3 gap-1 w-full">
                    <h3 className="font-display text-xl text-stone-900 leading-snug">{title}</h3>
                    <p className="font-sans text-sm text-stone-500 leading-relaxed">{issuer}</p>
                    <p className="font-sans text-sm font-semibold text-stone-700 mt-1">{date}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4">
                    {url ? (
                      <>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-sans font-medium hover:bg-blue-700 transition-colors duration-150"
                        >
                          View cert
                        </a>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-sans text-blue-600 hover:underline"
                        >
                          Details &rsaquo;
                        </a>
                      </>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-stone-200 text-stone-400 text-sm font-sans font-medium cursor-default select-none">
                        In progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
