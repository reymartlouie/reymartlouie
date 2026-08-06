'use client'

import Modal from './Modal'

interface Props {
  onClose: () => void
}

const stack = [
  { label: 'React 19', category: 'Frontend' },
  { label: 'TypeScript', category: 'Language' },
  { label: 'Tailwind CSS', category: 'Styling' },
  { label: 'Vite', category: 'Build Tool' },
  { label: 'Vercel', category: 'Deployment' },
]

const features = [
  { label: 'Responsive Landing Page', category: 'Web' },
  { label: 'Interactive Menu', category: 'Feature' },
  { label: 'Order Flow', category: 'Feature' },
  { label: 'Promo Modal', category: 'Feature' },
  { label: 'Congrats Modal', category: 'Feature' },
  { label: 'About Page', category: 'Web' },
]

const roles = [
  {
    role: 'Frontend Development',
    desc: 'Built a full coffee house landing page from scratch using React, TypeScript, and Tailwind CSS — covering the homepage, about page, interactive menu, and streamlined order flow. Deployed live on Vercel.',
  },
  {
    role: 'UI/UX Design',
    desc: 'Designed the interface around a warm coffee aesthetic — intuitive order flow, promotional modals, and a clean menu layout that showcases handcrafted beverages and pastries.',
  },
]

export default function BrewedModal({ onClose }: Props) {
  return (
    <Modal
      onClose={onClose}
      eyebrow="Web Development · May 29, 2026 – Crafting"
      title="Brewed — Coffee House"
      actions={
        <a
          href="https://brewed-puce.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150"
          style={{ background: 'rgba(180,120,40,0.08)', color: 'rgba(120,70,20,0.85)', border: '1px solid rgba(180,120,40,0.18)' }}
        >
          Live Site ↗
        </a>
      }
    >
      {/* Preview */}
      <div className="mb-8 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(180,120,40,0.12)', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        <img
          src="/brewed-preview.webp"
          alt="Brewed landing page"
          className="w-full h-64 md:h-80 object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Intro */}
      <div className="mb-8">
        <p className="font-sans text-xs leading-relaxed mb-3 text-[#1e1e1e]">
          brewed-puce.vercel.app
        </p>
        <p className="font-sans text-base leading-relaxed text-[#1e1e1e]">
          A coffee house landing page with an interactive menu, promotional modals, and a streamlined order flow — built with React, TypeScript, and Tailwind CSS, deployed on Vercel.
        </p>
      </div>

      {/* Context */}
      <div
        className="mb-8 p-6 md:p-8 rounded-[20px]"
        style={{ background: 'rgba(180,120,40,0.05)', border: '1px solid rgba(180,120,40,0.10)' }}
      >
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(120,70,20,0.60)' }}>The Brief</p>
        <p className="font-sans text-base leading-relaxed text-[#1e1e1e]">
          Brewed needed a modern web presence for a coffee house brand — not a template, but a handcrafted React app with a real ordering experience. The site covers the full customer journey from browsing the menu to placing an order, plus promotional content and an about section.
        </p>
      </div>

      {/* Features */}
      <div className="mb-6">
        <p className="font-sans text-xs uppercase tracking-widest mb-4 text-[#1e1e1e]">Features</p>
        <div className="grid grid-cols-2 gap-2">
          {features.map(({ label, category }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(180,120,40,0.04)', border: '1px solid rgba(180,120,40,0.10)' }}
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
              style={{ background: 'rgba(180,120,40,0.04)', border: '1px solid rgba(180,120,40,0.10)' }}
            >
              <span className="font-sans text-sm text-[#1e1e1e]">{label}</span>
              <span className="font-sans text-xs text-right text-[#1e1e1e]">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Roles */}
      <div className="mb-8">
        <p className="font-sans text-xs uppercase tracking-widest mb-4 text-[#1e1e1e]">My Role</p>
        <div className="flex flex-col gap-3">
          {roles.map(({ role, desc }) => (
            <div
              key={role}
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(180,120,40,0.04)', border: '1px solid rgba(180,120,40,0.10)' }}
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
          href="https://github.com/reymartlouie/brewed"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150 bg-stone-200 hover:bg-stone-300 text-[#1e1e1e]"
        >
          GitHub Repo ↗
        </a>
        <a
          href="https://brewed-puce.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150"
          style={{
            background: 'rgba(180,120,40,0.08)',
            color: 'rgba(120,70,20,0.85)',
            border: '1px solid rgba(180,120,40,0.20)',
          }}
        >
          Visit Live Site ↗
        </a>
      </div>
    </Modal>
  )
}
