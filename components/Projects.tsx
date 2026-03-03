'use client'

import { useState } from 'react'

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Project Alpha',
    description:
      'A design system built for scale — consistent components, clear patterns, and a developer-friendly API.',
    tags: ['Design System', 'Figma', 'React'],
    year: '2024',
    accent: '#93c5fd',
    bg: '#1a1a1a',
  },
  {
    id: 2,
    number: '02',
    title: 'Project Beta',
    description:
      'End-to-end product design for a SaaS analytics dashboard. From discovery to final handoff.',
    tags: ['Product Design', 'UX Research', 'Prototyping'],
    year: '2024',
    accent: '#c4b5fd',
    bg: '#1f1f1f',
  },
  {
    id: 3,
    number: '03',
    title: 'Project Gamma',
    description:
      'A mobile-first e-commerce experience redesigned for performance and conversion.',
    tags: ['Mobile', 'E-commerce', 'Next.js'],
    year: '2023',
    accent: '#6ee7b7',
    bg: '#1a1a1a',
  },
]

export default function Projects() {
  const [open, setOpen] = useState(false)
  const [openKey, setOpenKey] = useState(0)

  const toggle = () => {
    if (!open) setOpenKey((k) => k + 1)
    setOpen((o) => !o)
  }

  return (
    <section id="work">
      <div className="bg-[#1a1a1a] rounded-[32px] overflow-hidden">

        {/* Clickable header */}
        <button
          onClick={toggle}
          className="w-full px-8 lg:px-10 py-8 flex items-center justify-between group"
        >
          <div className="text-left">
            <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-2">Selected Work</p>
            <h2 className="font-display text-white text-5xl">Projects</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-sans text-white/20 text-sm hidden md:block">{projects.length} projects</span>
            {/* Chevron — rotates with spring easing */}
            <div
              className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 group-hover:bg-white/10 group-hover:text-white/60 transition-colors"
              style={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 550ms cubic-bezier(0.34, 1.2, 0.64, 1)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 5l5 5 5-5" />
              </svg>
            </div>
          </div>
        </button>

        {/* Expandable project grid */}
        <div
          style={{
            maxHeight: open ? '1600px' : '0px',
            opacity: open ? 1 : 0,
            overflow: 'hidden',
            transition: open
              ? 'max-height 800ms cubic-bezier(0.34, 1.05, 0.64, 1), opacity 200ms ease'
              : 'max-height 380ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms ease',
          }}
        >
          <div className="h-px bg-white/[0.05] mx-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 lg:p-5">
            {projects.map((project, i) => (
              <div
                key={`${openKey}-${project.id}`}
                className="rounded-[24px] p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden group cursor-pointer"
                style={{
                  backgroundColor: project.bg,
                  animation: `cardSlideUp 560ms cubic-bezier(0.34, 1.2, 0.64, 1) ${i * 85}ms both`,
                }}
              >
                {/* Decorative orb */}
                <div
                  className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: project.accent }}
                />

                <div className="relative">
                  <span className="font-sans text-white/20 text-xs mb-5 block">{project.number}</span>
                  <h3 className="font-display text-3xl text-white leading-tight mb-4">{project.title}</h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed">{project.description}</p>
                </div>

                <div className="relative flex flex-col gap-4 mt-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-xs px-3 py-1 rounded-full border"
                        style={{
                          color: project.accent,
                          borderColor: `${project.accent}30`,
                          backgroundColor: `${project.accent}12`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                    <span className="font-sans text-white/20 text-xs">{project.year}</span>
                    <a
                      href="#"
                      className="font-sans text-sm font-medium transition-all"
                      style={{ color: project.accent }}
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
