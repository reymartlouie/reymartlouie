'use client'

import Modal from './Modal'

interface Props {
  onClose: () => void
}

const deliverables = [
  { label: 'Logo & Visual Identity', category: 'Brand Identity' },
  { label: 'Color System', category: 'Brand Identity' },
  { label: 'Typography', category: 'Brand Identity' },
  { label: 'Business Card', category: 'Print' },
  { label: 'Letterhead', category: 'Print' },
  { label: 'React Web App', category: 'Development' },
  { label: 'Shipment Tracker', category: 'Development' },
  { label: 'Mobile App UI', category: 'UI/UX' },
  { label: 'Dashboard UI', category: 'UI/UX' },
]

const stack = [
  { label: 'React 19', category: 'Frontend' },
  { label: 'TypeScript', category: 'Language' },
  { label: 'Vite', category: 'Build Tool' },
  { label: 'Vercel', category: 'Deployment' },
  { label: 'Figma', category: 'Design' },
  { label: 'Adobe Illustrator', category: 'Vector' },
]

const roles = [
  {
    role: 'Brand Identity',
    desc: 'Built the full visual identity from scratch — logo, color palette, typography, and brand guidelines that communicate reliability and professionalism for a nationwide freight company.',
  },
  {
    role: 'Frontend Development',
    desc: 'Coded and deployed graceylogisticsservices.com using React 19, TypeScript, and Vite — covering the homepage, services, shipment tracking UI, and contact sections. Deployed live on Vercel.',
  },
  {
    role: 'UI/UX Design',
    desc: 'Designed high-fidelity mockups in Figma for the logistics management dashboard and mobile app UI, prioritizing operational clarity for dispatchers and drivers across Luzon and Visayas.',
  },
]

export default function GraceyLogisticsModal({ onClose }: Props) {
  return (
    <Modal
      onClose={onClose}
      eyebrow="Web Development & Design · Dec 1, 2025 – May 29, 2026"
      title="Gracey Logistics Services"
      actions={
        <a
          href="https://www.graceylogisticsservices.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150"
          style={{ background: 'rgba(234,88,12,0.08)', color: 'rgba(194,65,12,0.85)', border: '1px solid rgba(234,88,12,0.18)' }}
        >
          Live Site ↗
        </a>
      }
    >
      {/* Preview */}
      <div className="mb-8 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(107,114,128,0.12)', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        <img
          src="/gracey-preview.webp"
          alt="Gracey Logistics landing page"
          className="w-full h-64 md:h-80 object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Intro */}
      <div className="mb-8">
        <p className="font-sans text-xs leading-relaxed mb-3 text-[#1e1e1e]">
          graceylogisticsservices.com · Sta. Maria, Bulacan
        </p>
        <p className="font-sans text-base leading-relaxed text-[#1e1e1e]">
          Full brand identity, website design, and frontend development for a freight transport company
          serving Metro Manila, North &amp; South Luzon, and inter-island routes across the Philippines —
          offering FTL/LTL shipping, last-mile delivery, and 24/7 GPS-tracked logistics support.
        </p>
      </div>

      {/* Context */}
      <div
        className="mb-8 p-6 md:p-8 rounded-[20px]"
        style={{ background: 'rgba(107,114,128,0.05)', border: '1px solid rgba(107,114,128,0.10)' }}
      >
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(55,65,81,0.60)' }}>The Brief</p>
        <p className="font-sans text-base leading-relaxed text-[#1e1e1e]">
          Gracey Logistics needed a brand presence and a live website — not a template or builder, but a
          real React application built from scratch. The site covers services, shipment tracking UI,
          and contact flows for both business clients and individual shippers across the Philippines.
        </p>
      </div>

      {/* Deliverables */}
      <div className="mb-6">
        <p className="font-sans text-xs uppercase tracking-widest mb-4 text-[#1e1e1e]">Deliverables</p>
        <div className="grid grid-cols-2 gap-2">
          {deliverables.map(({ label, category }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(107,114,128,0.04)', border: '1px solid rgba(107,114,128,0.10)' }}
            >
              <span className="font-sans text-sm text-[#1e1e1e]">{label}</span>
              <span className="font-sans text-xs text-right text-[#1e1e1e]">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="mb-8">
        <p className="font-sans text-xs uppercase tracking-widest mb-4 text-[#1e1e1e]">Stack</p>
        <div className="grid grid-cols-2 gap-2">
          {stack.map(({ label, category }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(107,114,128,0.04)', border: '1px solid rgba(107,114,128,0.10)' }}
            >
              <span className="font-sans text-sm text-[#1e1e1e]">{label}</span>
              <span className="font-sans text-xs text-right text-[#1e1e1e]">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Roles */}
      <div className="mb-8">
        <p className="font-sans text-xs uppercase tracking-widest mb-4 text-[#1e1e1e]">My Roles</p>
        <div className="flex flex-col gap-3">
          {roles.map(({ role, desc }) => (
            <div
              key={role}
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(107,114,128,0.04)', border: '1px solid rgba(107,114,128,0.10)' }}
            >
              <p className="font-sans text-sm font-medium mb-1.5 text-[#1e1e1e]">{role}</p>
              <p className="font-sans text-sm leading-relaxed text-[#1e1e1e]">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col md:flex-row md:justify-end gap-3">
        <a
          href="https://www.graceylogisticsservices.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150 bg-stone-200 hover:bg-stone-300 text-[#1e1e1e]"
        >
          Visit Live Site ↗
        </a>
        <a
          href="/gracey-logistics.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150"
          style={{
            background: 'rgba(234,88,12,0.08)',
            color: 'rgba(194,65,12,0.85)',
            border: '1px solid rgba(234,88,12,0.20)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 1v8M4 6l3 3 3-3M2 10v1.5A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V10" />
          </svg>
          Download Case Study
        </a>
      </div>
    </Modal>
  )
}
