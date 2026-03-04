'use client'

import { useEffect, useRef } from 'react'

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Project Alpha',
    description: 'A design system built for scale — consistent components, clear patterns, and a developer-friendly API.',
    tags: ['Design System', 'Figma', 'React'],
    year: '2024',
    accent: '#93c5fd',
    bg: '#1a1a1a',
  },
  {
    id: 2,
    number: '02',
    title: 'Project Beta',
    description: 'End-to-end product design for a SaaS analytics dashboard. From discovery to final handoff.',
    tags: ['Product Design', 'UX Research', 'Prototyping'],
    year: '2024',
    accent: '#c4b5fd',
    bg: '#1f1f1f',
  },
  {
    id: 3,
    number: '03',
    title: 'Project Gamma',
    description: 'A mobile-first e-commerce experience redesigned for performance and conversion.',
    tags: ['Mobile', 'E-commerce', 'Next.js'],
    year: '2023',
    accent: '#6ee7b7',
    bg: '#1a1a1a',
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" className="flex flex-col gap-4">
      <div ref={ref} className="reveal-item flex flex-col gap-4">

        {/* UI/UX Portfolio link */}
        <a
          href="https://reymartlouie.framer.website"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-lift block bg-[#3a1f2c] rounded-[32px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group"
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="font-sans text-[#f9a8d4]/50 text-xs uppercase tracking-widest mb-2">Portfolio</p>
            <h3 className="font-display text-[#fbcfe8] text-4xl lg:text-5xl">UI/UX Portfolio</h3>
            <p className="font-sans text-[#f9a8d4]/60 text-sm mt-2 max-w-md">
              Explore my design work — case studies, wireframes, and high-fidelity prototypes.
            </p>
          </div>
          <span className="btn-spring inline-flex items-center gap-2 bg-[#fbcfe8]/12 text-[#fbcfe8] border border-[#fbcfe8]/20 font-sans font-semibold text-sm px-6 py-3 rounded-full group-hover:bg-[#fbcfe8]/20 transition-colors whitespace-nowrap">
            View Portfolio ↗
          </span>
        </a>

        {/* Selected work */}
        <div className="bg-[#1a1a1a] rounded-[32px] overflow-hidden">

          <div className="px-8 lg:px-10 py-8 flex items-center justify-between">
            <div>
              <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-2">Selected Work</p>
              <h2 className="font-display text-white text-5xl">Projects</h2>
            </div>
            <span className="font-sans text-white/20 text-sm hidden md:block">{projects.length} projects</span>
          </div>

          <div className="h-px bg-white/[0.05] mx-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 lg:p-5">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="rounded-[24px] p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden group cursor-pointer"
                style={{
                  backgroundColor: project.bg,
                  animation: `cardSlideUp 300ms cubic-bezier(0.2, 0, 0, 1) ${i * 50}ms both`,
                }}
              >
                <div
                  className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
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
                    <a href="#" className="font-sans text-sm font-medium" style={{ color: project.accent }}>
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
