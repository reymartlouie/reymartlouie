'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

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
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'modalBackdropIn 200ms ease both',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[32px] overflow-hidden flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(180,120,40,0.12)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.16), 0 1px 0 rgba(255,255,255,0.9) inset',
          animation: 'modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(180,120,40,0.10)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-0.5" style={{ color: 'rgba(120,70,20,0.55)' }}>Web Development · May 29, 2026 – Crafting</p>
            <h2 className="font-display text-xl text-stone-900">Brewed — Coffee House</h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://brewed-puce.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex font-sans text-xs px-4 py-2 rounded-full transition-colors duration-150"
              style={{ background: 'rgba(180,120,40,0.08)', color: 'rgba(120,70,20,0.85)', border: '1px solid rgba(180,120,40,0.18)' }}
            >
              Live Site ↗
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

          {/* Preview */}
          <div className="mb-8 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(180,120,40,0.12)', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <img
              src="/brewed-preview.webp"
              alt="Brewed landing page"
              className="w-full h-52 object-cover object-top"
              draggable={false}
            />
          </div>

          {/* Intro */}
          <div className="mb-8">
            <p className="font-sans text-xs leading-relaxed mb-3 text-stone-400">
              brewed-puce.vercel.app
            </p>
            <p className="font-sans text-sm leading-relaxed text-stone-500">
              A coffee house landing page with an interactive menu, promotional modals, and a streamlined order flow — built with React, TypeScript, and Tailwind CSS, deployed on Vercel.
            </p>
          </div>

          {/* Context */}
          <div
            className="mb-8 p-4 md:p-6 rounded-[20px]"
            style={{ background: 'rgba(180,120,40,0.05)', border: '1px solid rgba(180,120,40,0.10)' }}
          >
            <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(120,70,20,0.60)' }}>The Brief</p>
            <p className="font-sans text-sm leading-relaxed text-stone-500">
              Brewed needed a modern web presence for a coffee house brand — not a template, but a handcrafted React app with a real ordering experience. The site covers the full customer journey from browsing the menu to placing an order, plus promotional content and an about section.
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">Features</p>
            <div className="grid grid-cols-2 gap-2">
              {features.map(({ label, category }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-3 py-2.5 md:px-4 md:py-3 rounded-2xl"
                  style={{ background: 'rgba(180,120,40,0.04)', border: '1px solid rgba(180,120,40,0.10)' }}
                >
                  <span className="font-sans text-sm text-stone-700">{label}</span>
                  <span className="font-sans text-xs text-right text-stone-400">{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="mb-8">
            <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">Stack</p>
            <div className="grid grid-cols-2 gap-2">
              {stack.map(({ label, category }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-3 py-2.5 md:px-4 md:py-3 rounded-2xl"
                  style={{ background: 'rgba(180,120,40,0.04)', border: '1px solid rgba(180,120,40,0.10)' }}
                >
                  <span className="font-sans text-sm text-stone-700">{label}</span>
                  <span className="font-sans text-xs text-right text-stone-400">{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Roles */}
          <div className="mb-8">
            <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">My Role</p>
            <div className="flex flex-col gap-3">
              {roles.map(({ role, desc }) => (
                <div
                  key={role}
                  className="p-4 md:p-5 rounded-2xl"
                  style={{ background: 'rgba(180,120,40,0.04)', border: '1px solid rgba(180,120,40,0.10)' }}
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
              href="https://github.com/reymartlouie/brewed"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spring inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150 bg-stone-200 hover:bg-stone-300 text-stone-700"
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

        </div>
      </div>
    </div>,
    document.body
  )
}
