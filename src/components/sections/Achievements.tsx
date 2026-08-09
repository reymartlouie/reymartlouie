'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import Reveal from '../ui/Reveal'
import BadgesModal from '../ui/BadgesModal'
import InternshipModal from '../ui/InternshipModal'
import GraduationModal from '../ui/GraduationModal'
import ScrollSlider from '../ui/ScrollSlider'

const badges = [
  { id: 'aa88a6dc-5970-484d-9191-665e5657d3da' },
  { id: 'b60e4e5a-af99-4c92-a9de-8c6fc16ace20' },
]

export const badgesCount = badges.length

type CertId = 'graduation' | 'internship' | 'itofficer'

type Cert = {
  id: CertId
  year: number
  title: string
  issuer: string
  dateLabel: string
  image?: string
  imageAlt?: string
  issuerHref?: string
  bgGradient: string
  buttonClass?: string
  buttonText?: string
  buttonHref?: string
  photoView?: string
  documentView?: string
}

// Add new achievements here — sorted newest-first automatically
const certs: Cert[] = [
  {
    id: 'itofficer' as const,
    year: 2026,
    title: 'IT Officer',
    issuer: 'Ubiquity Global Services',
    dateLabel: 'Since June 1, 2026 · Iloilo City',
    issuerHref: 'https://www.ubiquity.com/',
    bgGradient: 'from-fuchsia-800 to-fuchsia-950',
    buttonClass: 'bg-fuchsia-700 hover:bg-fuchsia-800',
    buttonText: 'Verify on LinkedIn',
    buttonHref: 'https://www.linkedin.com/in/reymart-louie-capapas-b0063718b',
  },
  {
    id: 'graduation' as const,
    year: 2026,
    title: 'Graduation Diploma',
    issuer: 'University of St. La Salle',
    dateLabel: 'BS Computer Engineering · April 25, 2026',
    image: '/graduation.webp',
    imageAlt: 'Graduation Diploma',
    bgGradient: 'from-emerald-800 to-emerald-950',
    buttonClass: 'bg-emerald-700 hover:bg-emerald-800',
    buttonText: 'View Diploma',
    photoView: 'photo',
    documentView: 'diploma',
  },
  {
    id: 'internship' as const,
    year: 2024,
    title: 'Internship Certificate',
    issuer: 'Ubiquity Global Services',
    dateLabel: 'June 17, 2024 - July 20, 2024',
    image: '/ubiquity-photo.webp',
    imageAlt: 'Internship Certificate',
    bgGradient: 'from-blue-700 to-blue-900',
    buttonClass: 'bg-blue-600 hover:bg-blue-700',
    buttonText: 'View Certificate',
    photoView: 'photo',
    documentView: 'certificate',
  },
].sort((a, b) => b.year - a.year)

export default function Certifications({
  badgeModalOpen,
  setBadgeModalOpen,
}: {
  badgeModalOpen: boolean
  setBadgeModalOpen: (open: boolean) => void
}) {
  const [certModal, setCertModal] = useState<{ id: CertId; view: string } | null>(null)
  const [progress, setProgress] = useState(0)
  const [thumbPercent, setThumbPercent] = useState(100)
  const scrollRef = useRef<HTMLDivElement>(null)

  const updateSlider = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setThumbPercent(el.scrollWidth > 0 ? (el.clientWidth / el.scrollWidth) * 100 : 100)
  }, [])

  useEffect(() => {
    updateSlider()
    window.addEventListener('resize', updateSlider)
    return () => window.removeEventListener('resize', updateSlider)
  }, [updateSlider])

  return (
    <section className="flex flex-col gap-4">
      <Reveal>
        <div className="flex flex-col gap-4">

          {/* Cards — mobile: snap carousel / desktop: horizontal scroll */}
          <div
            ref={scrollRef}
            onScroll={updateSlider}
            className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory px-4 md:px-0 gap-4 pb-2 md:snap-none md:gap-6"
          >
            {certs.map((cert) => (
              <div key={cert.id} className="snap-center flex-shrink-0 w-[calc(100%-2rem)] md:w-[340px] flex flex-col items-center pb-2 md:pb-0">
                <div
                  className={`relative rounded-2xl bg-gradient-to-br ${cert.bgGradient} w-full overflow-hidden flex-shrink-0`}
                  style={{ height: '260px' }}
                >
                  {cert.image && (
                    <Image
                      src={cert.image}
                      alt={cert.imageAlt ?? ''}
                      fill
                      sizes="(min-width: 768px) 340px, 100vw"
                      className="object-cover rounded-2xl cursor-zoom-in"
                      onClick={() => setCertModal({ id: cert.id, view: cert.photoView! })}
                    />
                  )}
                </div>
                <div className="flex flex-col items-center text-center mt-5 gap-2 w-full">
                  <h3 className="font-display text-2xl text-[#1e1e1e] leading-snug">{cert.title}</h3>
                  {cert.issuerHref ? (
                    <a
                      href={cert.issuerHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-base text-[#1e1e1e] leading-relaxed underline decoration-[#1e1e1e]/25 underline-offset-2 hover:decoration-[#1e1e1e]/60 transition-colors"
                    >
                      {cert.issuer}
                    </a>
                  ) : (
                    <p className="font-sans text-base text-[#1e1e1e] leading-relaxed">{cert.issuer}</p>
                  )}
                  <p className="font-sans text-base font-semibold text-[#1e1e1e]">{cert.dateLabel}</p>
                </div>
                {cert.buttonText && (
                  <div className="flex items-center gap-3 mt-5">
                    {cert.buttonHref ? (
                      <a
                        href={cert.buttonHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-2.5 rounded-full text-white text-sm font-sans font-medium transition-colors duration-150 ${cert.buttonClass}`}
                      >
                        {cert.buttonText}
                      </a>
                    ) : (
                      <button
                        onClick={() => setCertModal({ id: cert.id, view: cert.documentView! })}
                        className={`px-6 py-2.5 rounded-full text-white text-sm font-sans font-medium transition-colors duration-150 ${cert.buttonClass}`}
                      >
                        {cert.buttonText}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: scroll position slider */}
          <ScrollSlider scrollRef={scrollRef} progress={progress} thumbPercent={thumbPercent} className="md:hidden" />

          {/* Mobile: badge button */}
          <div className="flex justify-end md:hidden">
            <button
              onClick={() => setBadgeModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors duration-150"
            >
              <span className="font-sans text-sm text-[#1e1e1e]">{badges.length} credentials</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1e1e1e]">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
              </svg>
            </button>
          </div>

        </div>
      </Reveal>

      {badgeModalOpen && <BadgesModal badges={badges} onClose={() => setBadgeModalOpen(false)} />}
      {certModal?.id === 'internship' && (
        <InternshipModal view={certModal.view as 'photo' | 'certificate'} onClose={() => setCertModal(null)} />
      )}
      {certModal?.id === 'graduation' && (
        <GraduationModal view={certModal.view as 'photo' | 'diploma'} onClose={() => setCertModal(null)} />
      )}
    </section>
  )
}
