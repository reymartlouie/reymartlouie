'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  onClose: () => void
}

const stack = [
  { label: 'Python', category: 'Language' },
  { label: 'Flask', category: 'Backend' },
  { label: 'SQLAlchemy', category: 'ORM' },
  { label: 'SQLite', category: 'Database' },
  { label: 'Flask-Login', category: 'Auth' },
  { label: 'Waitress', category: 'WSGI Server' },
  { label: 'HTML / CSS / JS', category: 'Frontend' },
  { label: 'Jinja2', category: 'Templating' },
]

const features = [
  { label: 'Member Kiosk', category: 'Check-in / Out' },
  { label: 'Admin Dashboard', category: 'Management' },
  { label: 'Attendance Tracking', category: 'Core' },
  { label: 'Payment Recording', category: 'Finance' },
  { label: 'CSV Export', category: 'Reporting' },
  { label: 'Local Backup', category: '7-day Rolling' },
  { label: 'USB Drive Backup', category: 'Auto-detect' },
  { label: 'Google Drive Backup', category: 'Optional' },
  { label: 'Auto-start on Boot', category: 'Windows' },
  { label: 'Offline-First', category: 'No Internet' },
]

const roles = [
  {
    role: 'Full-Stack Development',
    desc: 'Built the entire system from scratch — Flask backend, SQLite models for members, attendance, and payments, Jinja2 templates for the kiosk and admin views, and a WSGI server setup with Waitress for stable local deployment.',
  },
  {
    role: 'System Design',
    desc: 'Designed for offline-first operation on a local Windows PC: auto-start on boot via a .bat file, three-layer backup (local rolling, USB auto-detect, Google Drive sync), and a kiosk-optimized touchscreen UI that runs without any internet connection.',
  },
]

export default function FitnessMadnessModal({ onClose }: Props) {
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
          border: '1px solid rgba(239,68,68,0.18)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.9) inset',
          animation: 'modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(239,68,68,0.12)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-0.5" style={{ color: 'rgba(185,28,28,0.55)' }}>Full-Stack · May 31, 2026 – Crafting</p>
            <h2 className="font-display text-xl text-stone-900">FitnessMadness — Gym Management</h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/reymartlouie/fitnessmadness"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex font-sans text-xs px-4 py-2 rounded-full transition-colors duration-150"
              style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(185,28,28,0.85)', border: '1px solid rgba(239,68,68,0.18)' }}
            >
              GitHub ↗
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
          <div className="mb-8 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.18)', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <img
              src="/fitnessmadness-preview.webp"
              alt="FitnessMadness admin dashboard"
              className="w-full h-52 object-cover object-top"
              draggable={false}
            />
          </div>

          {/* Intro */}
          <div className="mb-8">
            <p className="font-sans text-xs leading-relaxed mb-3 text-stone-400">
              Local deployment · Windows PC · No internet required
            </p>
            <p className="font-sans text-sm leading-relaxed text-stone-500">
              A lightweight gym attendance management system built for small gyms that need an offline-first, internet-independent setup. Members check in and out on a kiosk screen; the gym owner manages everything through an admin dashboard — no subscription, no cloud dependency.
            </p>
          </div>

          {/* Context */}
          <div
            className="mb-8 p-4 md:p-6 rounded-[20px]"
            style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}
          >
            <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(185,28,28,0.60)' }}>The Brief</p>
            <p className="font-sans text-sm leading-relaxed text-stone-500">
              A local gym was still running on manual attendance logbooks and handwritten payment records. The goal was to replace that entirely with a self-contained system that auto-starts on Windows boot, works without internet, and backs up its own data automatically — to a local folder, a USB drive, or Google Drive.
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
                  style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}
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
                  style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}
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
                  style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}
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
              href="https://github.com/reymartlouie/fitnessmadness"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spring inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150"
              style={{
                background: 'rgba(239,68,68,0.08)',
                color: 'rgba(185,28,28,0.85)',
                border: '1px solid rgba(239,68,68,0.18)',
              }}
            >
              GitHub Repo ↗
            </a>
          </div>

        </div>
      </div>
    </div>,
    document.body
  )
}
