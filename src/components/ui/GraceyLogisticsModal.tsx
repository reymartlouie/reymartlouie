'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  onClose: () => void
}

const deliverables = [
  { label: 'Logo Design', category: 'Brand Identity' },
  { label: 'Color System', category: 'Brand Identity' },
  { label: 'Typography', category: 'Brand Identity' },
  { label: 'Business Card', category: 'Print' },
  { label: 'Letterhead', category: 'Print' },
  { label: 'Mobile App UI', category: 'UI Design' },
  { label: 'Dashboard', category: 'UI Design' },
  { label: 'Icon Set', category: 'UI Design' },
]

const tools = [
  { label: 'Figma', category: 'Design' },
  { label: 'FigJam', category: 'Wireframing' },
  { label: 'Adobe Illustrator', category: 'Vector' },
  { label: 'Adobe Photoshop', category: 'Editing' },
]

const roles = [
  {
    role: 'Brand Identity',
    desc: 'Developed the full visual identity for Gracey Logistics — logo, color palette, typography, and brand guidelines tailored to a professional logistics and trucking company.',
  },
  {
    role: 'UI Design',
    desc: 'Designed high-fidelity screens for the logistics management dashboard and mobile app, focusing on clarity and operational efficiency for dispatchers and drivers.',
  },
]

export default function GraceyLogisticsModal({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'modalBackdropIn 200ms ease both',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[32px] overflow-hidden flex flex-col"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(59,130,246,0.12)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.9) inset',
          animation: 'modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(59,130,246,0.10)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-0.5" style={{ color: 'rgba(30,80,200,0.55)' }}>UI/UX Design · 2024</p>
            <h2 className="font-display text-xl text-stone-900">Gracey Logistics Services</h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/gracey-logistics.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex font-sans text-xs px-4 py-2 rounded-full transition-colors duration-150"
              style={{ background: 'rgba(59,130,246,0.08)', color: 'rgba(30,80,200,0.85)', border: '1px solid rgba(59,130,246,0.18)' }}
            >
              Case Study ↗
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 bg-stone-200 hover:bg-stone-300 text-stone-500"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto p-5 md:p-10">

        {/* Intro */}
        <div className="mb-8">
          <p className="font-sans text-sm leading-relaxed text-stone-500">
            Brand identity and UI design for a local logistics and trucking services company
            based in Bacolod City. The project covered the full visual identity system and
            digital product design from ground up.
          </p>
        </div>

        {/* Context */}
        <div
          className="mb-8 p-4 md:p-6 rounded-[20px]"
          style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.10)' }}
        >
          <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(30,80,200,0.60)' }}>The Brief</p>
          <p className="font-sans text-sm leading-relaxed text-stone-500">
            Gracey Logistics needed a cohesive brand presence and a digital platform to manage
            their fleet and trucking operations. The goal was a professional identity that
            communicates reliability and efficiency, paired with a clean UI for dispatchers
            and drivers.
          </p>
        </div>

        {/* Deliverables */}
        <div className="mb-6">
          <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">Deliverables</p>
          <div className="grid grid-cols-2 gap-2">
            {deliverables.map(({ label, category }) => (
              <div
                key={label}
                className="flex items-center justify-between px-3 py-2.5 md:px-4 md:py-3 rounded-2xl"
                style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.10)' }}
              >
                <span className="font-sans text-sm text-stone-700">{label}</span>
                <span className="font-sans text-xs text-right text-stone-400">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-8">
          <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">Tools</p>
          <div className="grid grid-cols-2 gap-2">
            {tools.map(({ label, category }) => (
              <div
                key={label}
                className="flex items-center justify-between px-3 py-2.5 md:px-4 md:py-3 rounded-2xl"
                style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.10)' }}
              >
                <span className="font-sans text-sm text-stone-700">{label}</span>
                <span className="font-sans text-xs text-right text-stone-400">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="mb-8">
          <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">My Roles</p>
          <div className="flex flex-col gap-3">
            {roles.map(({ role, desc }) => (
              <div
                key={role}
                className="p-4 md:p-5 rounded-2xl"
                style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.10)' }}
              >
                <p className="font-sans text-sm font-medium mb-1.5 text-stone-700">{role}</p>
                <p className="font-sans text-sm leading-relaxed text-stone-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row md:justify-end gap-3">
          <a
            href="/gracey-logistics.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-spring inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150"
            style={{
              background: 'rgba(59,130,246,0.08)',
              color: 'rgba(30,80,200,0.85)',
              border: '1px solid rgba(59,130,246,0.20)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 1v8M4 6l3 3 3-3M2 10v1.5A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V10" />
            </svg>
            Download Case Study
          </a>
        </div>

        </div>{/* end scrollable body */}
      </div>
    </div>,
    document.body
  )
}
