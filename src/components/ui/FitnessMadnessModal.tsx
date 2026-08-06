'use client'

import Modal from './Modal'

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
  return (
    <Modal
      onClose={onClose}
      eyebrow="Full-Stack · May 31, 2026 – Crafting"
      title="FitnessMadness — Gym Management"
      actions={
        <a
          href="https://github.com/reymartlouie/fitnessmadness"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150"
          style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(185,28,28,0.85)', border: '1px solid rgba(239,68,68,0.18)' }}
        >
          GitHub ↗
        </a>
      }
    >
      {/* Preview */}
      <div className="mb-8 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.18)', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        <img
          src="/fitnessmadness-preview.webp"
          alt="FitnessMadness admin dashboard"
          className="w-full h-64 md:h-80 object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Intro */}
      <div className="mb-8">
        <p className="font-sans text-xs leading-relaxed mb-3 text-[#1e1e1e]">
          Local deployment · Windows PC · No internet required
        </p>
        <p className="font-sans text-base leading-relaxed text-[#1e1e1e]">
          A lightweight gym attendance management system built for small gyms that need an offline-first, internet-independent setup. Members check in and out on a kiosk screen; the gym owner manages everything through an admin dashboard — no subscription, no cloud dependency.
        </p>
      </div>

      {/* Context */}
      <div
        className="mb-8 p-6 md:p-8 rounded-[20px]"
        style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}
      >
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(185,28,28,0.60)' }}>The Brief</p>
        <p className="font-sans text-base leading-relaxed text-[#1e1e1e]">
          A local gym was still running on manual attendance logbooks and handwritten payment records. The goal was to replace that entirely with a self-contained system that auto-starts on Windows boot, works without internet, and backs up its own data automatically — to a local folder, a USB drive, or Google Drive.
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
              style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}
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
              style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}
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
              style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}
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
    </Modal>
  )
}
