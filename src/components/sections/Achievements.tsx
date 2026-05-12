'use client'

import { useState, useEffect } from 'react'
import Reveal from '../ui/Reveal'
import BadgesModal from '../ui/BadgesModal'
import InternshipModal from '../ui/InternshipModal'
import GraduationModal from '../ui/GraduationModal'

const badges = [
  { id: 'aa88a6dc-5970-484d-9191-665e5657d3da' },
  { id: 'b60e4e5a-af99-4c92-a9de-8c6fc16ace20' },
]

const certs = [
  {
    title: 'Internship Certificate',
    issuer: 'Ubiquity Global Services',
    date: 'June 17, 2024 - July 20, 2024',
    color: 'from-blue-700 to-blue-900',
  },
  {
    title: 'Graduation Diploma',
    issuer: 'University of St. La Salle',
    date: 'BS Computer Engineering · April 25, 2026',
    color: 'from-emerald-800 to-emerald-950',
  },
]

export default function Certifications() {
  const [badgeModalOpen, setBadgeModalOpen] = useState(false)
  const [internshipView, setInternshipView] = useState<'photo' | 'certificate' | null>(null)
  const [graduationView, setGraduationView] = useState<'photo' | 'diploma' | null>(null)


  return (
    <section id="certifications" className="flex flex-col gap-4">
      <Reveal>
        <div className="rounded-[32px] overflow-hidden" style={{ background: '#f5f5f7' }}>
          {/* Header */}
          <div className="p-6 md:p-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-px h-3.5 bg-amber-700/50" />
                <p className="font-sans text-xs uppercase tracking-widest text-amber-700/70">Credentials</p>
              </div>
              <h2 className="font-display text-5xl text-stone-800">Achievements</h2>
            </div>
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

          {/* Cards row */}
          <div className="overflow-x-auto px-6 md:px-8 pb-6 md:pb-8">
            <div className="flex gap-6 min-w-max">

              {/* Internship card */}
              <div className="flex flex-col items-center" style={{ width: '288px' }}>
                <div
                  className="rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center flex-shrink-0"
                  style={{ width: '288px', height: '216px' }}
                >
                  <img
                    src="/ubiquity-photo.webp"
                    alt="Internship Certificate"
                    className="w-full h-full object-cover rounded-2xl cursor-zoom-in"
                    onClick={() => setInternshipView('photo')}
                  />
                </div>
                <div className="flex flex-col items-center text-center mt-4 gap-1 w-full">
                  <h3 className="font-display text-xl text-stone-900 leading-snug">{certs[0].title}</h3>
                  <p className="font-sans text-sm text-stone-500 leading-relaxed">{certs[0].issuer}</p>
                  <p className="font-sans text-sm font-semibold text-stone-700 mt-1">{certs[0].date}</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => setInternshipView('certificate')}
                    className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-sans font-medium hover:bg-blue-700 transition-colors duration-150"
                  >
                    View Certificate
                  </button>
                </div>
              </div>

              {/* Graduation card */}
              <div className="flex flex-col items-center" style={{ width: '288px' }}>
                <div
                  className="rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center flex-shrink-0"
                  style={{ width: '288px', height: '216px' }}
                >
                  <img
                    src="/graduation.webp"
                    alt="Graduation Diploma"
                    className="w-full h-full object-cover rounded-2xl cursor-zoom-in"
                    onClick={() => setGraduationView('photo')}
                  />
                </div>
                <div className="flex flex-col items-center text-center mt-4 gap-1 w-full">
                  <h3 className="font-display text-xl text-stone-900 leading-snug">{certs[1].title}</h3>
                  <p className="font-sans text-sm text-stone-500 leading-relaxed">{certs[1].issuer}</p>
                  <p className="font-sans text-sm font-semibold text-stone-700 mt-1">{certs[1].date}</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => setGraduationView('diploma')}
                    className="px-5 py-2 rounded-full bg-emerald-700 text-white text-sm font-sans font-medium hover:bg-emerald-800 transition-colors duration-150"
                  >
                    View Diploma
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Reveal>

      {badgeModalOpen && <BadgesModal badges={badges} onClose={() => setBadgeModalOpen(false)} />}

      {internshipView && <InternshipModal view={internshipView} onClose={() => setInternshipView(null)} />}
      {graduationView && <GraduationModal view={graduationView} onClose={() => setGraduationView(null)} />}
    </section>
  )
}
