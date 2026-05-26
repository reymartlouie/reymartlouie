'use client'

import { useState, useRef, useCallback } from 'react'
import Reveal from '../ui/Reveal'
import BadgesModal from '../ui/BadgesModal'
import InternshipModal from '../ui/InternshipModal'
import GraduationModal from '../ui/GraduationModal'

const badges = [
  { id: 'aa88a6dc-5970-484d-9191-665e5657d3da' },
  { id: 'b60e4e5a-af99-4c92-a9de-8c6fc16ace20' },
]

type CertId = 'graduation' | 'internship'

type Cert = {
  id: CertId
  year: number
  title: string
  issuer: string
  dateLabel: string
  image: string
  imageAlt: string
  bgGradient: string
  buttonClass: string
  buttonText: string
  photoView: string
  documentView: string
}

// Add new achievements here — sorted newest-first automatically
const certs: Cert[] = [
  {
    id: 'graduation',
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
    id: 'internship',
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

export default function Certifications() {
  const [badgeModalOpen, setBadgeModalOpen] = useState(false)
  const [certModal, setCertModal] = useState<{ id: CertId; view: string } | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const onScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setActiveIndex(Math.round(el.scrollLeft / el.offsetWidth))
  }, [])

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: index * el.offsetWidth, behavior: 'smooth' })
  }, [])

  return (
    <section id="certifications" className="flex flex-col gap-4">
      <Reveal>
        <div className="rounded-[32px] overflow-hidden" style={{ background: '#f5f5f7' }}>

          {/* Header */}
          <div className="px-6 md:px-8 pt-8 md:pt-10 pb-6 md:pb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-[44px] md:text-[56px] leading-[1.05] text-stone-900 font-black">
              Achievements.
            </h2>
            <div className="hidden md:block pb-1">
              <button
                onClick={() => setBadgeModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors duration-150"
              >
                <span className="font-sans text-sm text-stone-600">{badges.length} credentials</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
                  <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cards — mobile: snap carousel / desktop: horizontal scroll */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory px-4 gap-4 md:snap-none md:px-8 md:pb-8 md:gap-6"
          >
            {certs.map((cert) => (
              <div key={cert.id} className="snap-center flex-shrink-0 w-[calc(100%-2rem)] md:w-72 flex flex-col items-center pb-2 md:pb-0">
                <div
                  className={`rounded-2xl bg-gradient-to-br ${cert.bgGradient} w-full overflow-hidden flex-shrink-0`}
                  style={{ height: '216px' }}
                >
                  <img
                    src={cert.image}
                    alt={cert.imageAlt}
                    className="w-full h-full object-cover rounded-2xl cursor-zoom-in"
                    onClick={() => setCertModal({ id: cert.id, view: cert.photoView })}
                  />
                </div>
                <div className="flex flex-col items-center text-center mt-4 gap-1.5 w-full">
                  <h3 className="font-display text-xl text-stone-900 leading-snug">{cert.title}</h3>
                  <p className="font-sans text-sm text-stone-500 leading-relaxed">{cert.issuer}</p>
                  <p className="font-sans text-sm font-semibold text-stone-700">{cert.dateLabel}</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => setCertModal({ id: cert.id, view: cert.documentView })}
                    className={`px-5 py-2 rounded-full text-white text-sm font-sans font-medium transition-colors duration-150 ${cert.buttonClass}`}
                  >
                    {cert.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: dot indicators */}
          <div className="flex justify-center items-center gap-2 pt-4 pb-2 md:hidden">
            {certs.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: activeIndex === i ? '20px' : '6px',
                  height: '6px',
                  background: activeIndex === i ? '#292524' : 'rgba(41,37,36,0.25)',
                }}
              />
            ))}
          </div>

          {/* Mobile: badge button */}
          <div className="flex justify-end px-6 pb-6 md:hidden">
            <button
              onClick={() => setBadgeModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors duration-150"
            >
              <span className="font-sans text-sm text-stone-600">{badges.length} credentials</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
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
