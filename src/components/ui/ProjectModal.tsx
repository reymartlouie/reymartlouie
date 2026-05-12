'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  onClose: () => void
}

const hardware = [
  { label: 'Raspberry Pi Zero 2 W', category: 'Main Processor' },
  { label: 'MLX90640', category: 'Thermal Camera' },
  { label: 'MQ-2', category: 'Gas / Smoke' },
  { label: 'ADS1115', category: 'ADC (I2C)' },
  { label: 'DHT22', category: 'Temp / Humidity' },
  { label: 'ES3 Servo', category: 'Camera Pan' },
  { label: 'Arduino Mega 2560 + R3 Wifi', category: 'SMS Gateway' },
  { label: 'SIM800Lv2 ×2', category: 'GSM Modules' },
]

const software = [
  { label: 'Python', category: 'Firmware' },
  { label: 'TinyML', category: 'Edge ML' },
  { label: 'Supabase', category: 'Backend / Auth' },
  { label: 'React Native', category: 'Mobile (Expo)' },
  { label: 'TypeScript', category: 'Primary Language' },
  { label: 'PLpgSQL', category: 'DB Migrations' },
]

const roles = [
  {
    role: 'System Architecture',
    desc: 'Designed the end-to-end architecture connecting thermal sensors, Raspberry Pi edge processing, Supabase cloud backend, SMS gateway, and mobile app into one cohesive system.',
  },
  {
    role: 'UI/UX Design',
    desc: 'Designed the mobile interface for residents and barangay officials — prioritizing clarity, urgency, and real-time awareness. Explored Liquid Glass aesthetics for a clean, modern feel.',
  },
  {
    role: 'Mobile Development',
    desc: 'Built the cross-platform app with Expo + React Native. Integrated Supabase auth and real-time data, handled push and SMS notifications, and optimized for smooth performance across devices.',
  },
]

export default function ProjectModal({ onClose }: Props) {
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
      className="fixed inset-0 z-[9000] flex items-end md:items-center justify-center md:p-8"
      style={{
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'modalBackdropIn 200ms ease both',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-t-[32px] md:rounded-[32px] flex flex-col"
        style={{
          background: '#ffffff',
          maxWidth: '560px',
          maxHeight: '90vh',
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          animation: 'modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0 md:hidden">
          <div className="w-9 h-1 rounded-full bg-black/10" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-0.5 text-stone-400">Thesis · BS Computer Engineering</p>
            <h2 className="font-display text-xl text-stone-900">FireSafe</h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://reymartlouie.framer.website/work/firesafe"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs px-4 py-2 rounded-full transition-colors duration-150 text-stone-600"
              style={{ background: 'rgba(0,0,0,0.06)' }}
            >
              Case Study ↗
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
              style={{ background: 'rgba(0,0,0,0.06)', color: '#6c6c70' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 min-h-0 px-4 pb-10 pt-5 flex flex-col gap-5">

          {/* Intro */}
          <p className="font-sans text-sm leading-relaxed text-stone-500 px-1">
            A community-level fire detection system using edge computing and thermal imaging,
            built for rural barangays with limited infrastructure. Alerts residents via push
            notifications and mass SMS — no constant cloud dependency required.
          </p>

          {/* The Problem */}
          <div className="rounded-2xl overflow-hidden bg-orange-50">
            <div className="flex gap-3 p-4">
              <div className="w-1 rounded-full flex-shrink-0 bg-orange-400" />
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-orange-400 mb-1.5">The Problem</p>
                <p className="font-sans text-sm leading-relaxed text-stone-600">
                  The Philippines recorded 16,426 fire incidents in 2023 — a 24.5% increase year-over-year.
                  Rural barangays are especially vulnerable: fires start unnoticed in unguarded spaces,
                  and existing detection systems depend on cloud infrastructure impractical for
                  resource-limited communities.
                </p>
              </div>
            </div>
          </div>

          {/* Hardware */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-stone-400 px-4 mb-2">Hardware</p>
            <div className="bg-stone-50 rounded-2xl overflow-hidden divide-y divide-stone-100">
              {hardware.map(({ label, category }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3">
                  <span className="font-sans text-sm text-stone-900">{label}</span>
                  <span className="font-sans text-sm text-stone-400">{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Software */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-stone-400 px-4 mb-2">Software</p>
            <div className="bg-stone-50 rounded-2xl overflow-hidden divide-y divide-stone-100">
              {software.map(({ label, category }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3">
                  <span className="font-sans text-sm text-stone-900">{label}</span>
                  <span className="font-sans text-sm text-stone-400">{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testing */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-stone-400 px-4 mb-2">Testing</p>
            <div className="bg-stone-50 rounded-2xl overflow-hidden divide-y divide-stone-100">
              {[
                { env: 'Controlled Environment', detail: '7 sessions · indoor' },
                { env: 'Open Space Outdoor', detail: '7 sessions · rooftop' },
                { env: 'Actual Fire Scenario', detail: '7 burn sessions · Bacolod' },
              ].map(({ env, detail }) => (
                <div key={env} className="flex items-center justify-between px-4 py-3">
                  <span className="font-sans text-sm text-stone-900">{env}</span>
                  <span className="font-sans text-sm text-stone-400">{detail}</span>
                </div>
              ))}
              <div className="px-4 py-3">
                <p className="font-sans text-xs text-stone-400 leading-relaxed">
                  HIGH ≥35°C / ≤40% RH / 100–200 PPM · CRITICAL ≥38°C / ≤30% RH / &gt;200 PPM
                </p>
              </div>
            </div>
          </div>

          {/* My Roles */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-stone-400 px-4 mb-2">My Roles</p>
            <div className="bg-stone-50 rounded-2xl overflow-hidden divide-y divide-stone-100">
              {roles.map(({ role, desc }) => (
                <div key={role} className="px-4 py-3">
                  <p className="font-sans text-sm font-medium text-stone-900 mb-1">{role}</p>
                  <p className="font-sans text-sm leading-relaxed text-stone-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team + links */}
          <div className="bg-stone-50 rounded-2xl overflow-hidden divide-y divide-stone-100">
            <div className="px-4 py-3">
              <p className="font-sans text-xs text-stone-400 leading-relaxed">
                With Odsey Bandojo &amp; Vhieron Bareza<br />
                University of St. La Salle · Bacolod City
              </p>
            </div>
            <a
              href="/thesis-for-final.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 hover:bg-stone-100 transition-colors duration-150"
            >
              <span className="font-sans text-sm text-stone-900">Download Thesis</span>
              <span className="font-sans text-sm text-orange-500">PDF ↓</span>
            </a>
            <a
              href="https://github.com/reymartlouie/Firesafe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 hover:bg-stone-100 transition-colors duration-150"
            >
              <span className="font-sans text-sm text-stone-900">View on GitHub</span>
              <span className="font-sans text-sm text-orange-500">↗</span>
            </a>
          </div>

        </div>
      </div>
    </div>,
    document.body
  )
}
