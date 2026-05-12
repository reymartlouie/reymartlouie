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

const testing = [
  { env: 'Controlled Environment', detail: '7 sessions · indoor' },
  { env: 'Open Space Outdoor', detail: '7 sessions · rooftop' },
  { env: 'Actual Fire Scenario', detail: '7 burn sessions · Bacolod' },
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
        className="relative w-full md:max-w-lg rounded-t-[32px] md:rounded-[32px] flex flex-col"
        style={{
          background: '#f2f2f7',
          animation: 'modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both',
          maxHeight: '92vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
          <div className="w-9 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-4 flex-shrink-0">
          <div>
            <p className="font-sans text-xs text-gray-400 mb-0.5">Thesis · BS Computer Engineering</p>
            <h2 className="font-display text-2xl text-gray-900">FireSafe</h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://reymartlouie.framer.website/work/firesafe"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-medium px-3.5 py-1.5 rounded-full"
              style={{ background: 'rgba(249,115,22,0.10)', color: '#ea580c' }}
            >
              Case Study ↗
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.08)' }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#6c6c70" strokeWidth="2.5" strokeLinecap="round">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 min-h-0 px-4 pb-10 flex flex-col gap-5">

          {/* Intro */}
          <p className="font-sans text-sm leading-relaxed text-gray-500 px-1">
            A community-level fire detection system using edge computing and thermal imaging,
            built for rural barangays with limited infrastructure. Alerts residents via push
            notifications and mass SMS — no constant cloud dependency required.
          </p>

          {/* The Problem */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="flex gap-3 p-4">
              <div className="w-1 rounded-full flex-shrink-0" style={{ background: '#f97316', minHeight: '100%' }} />
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-orange-400 mb-1.5">The Problem</p>
                <p className="font-sans text-sm leading-relaxed text-gray-600">
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
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400 px-4 mb-2">Hardware</p>
            <div className="bg-white rounded-2xl overflow-hidden divide-y divide-gray-100">
              {hardware.map(({ label, category }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3">
                  <span className="font-sans text-sm text-gray-900">{label}</span>
                  <span className="font-sans text-sm text-gray-400">{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Software */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400 px-4 mb-2">Software</p>
            <div className="bg-white rounded-2xl overflow-hidden divide-y divide-gray-100">
              {software.map(({ label, category }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3">
                  <span className="font-sans text-sm text-gray-900">{label}</span>
                  <span className="font-sans text-sm text-gray-400">{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testing */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400 px-4 mb-2">Testing</p>
            <div className="bg-white rounded-2xl overflow-hidden divide-y divide-gray-100">
              {testing.map(({ env, detail }) => (
                <div key={env} className="flex items-center justify-between px-4 py-3">
                  <span className="font-sans text-sm text-gray-900">{env}</span>
                  <span className="font-sans text-sm text-gray-400">{detail}</span>
                </div>
              ))}
              <div className="px-4 py-3">
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  HIGH ≥35°C / ≤40% RH / 100–200 PPM · CRITICAL ≥38°C / ≤30% RH / &gt;200 PPM
                </p>
              </div>
            </div>
          </div>

          {/* My Roles */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400 px-4 mb-2">My Roles</p>
            <div className="bg-white rounded-2xl overflow-hidden divide-y divide-gray-100">
              {roles.map(({ role, desc }) => (
                <div key={role} className="px-4 py-3">
                  <p className="font-sans text-sm font-medium text-gray-900 mb-1">{role}</p>
                  <p className="font-sans text-sm leading-relaxed text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team + CTA */}
          <div className="bg-white rounded-2xl overflow-hidden divide-y divide-gray-100">
            <div className="px-4 py-3">
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                With Odsey Bandojo &amp; Vhieron Bareza<br />
                University of St. La Salle · Bacolod City
              </p>
            </div>
            <a
              href="/thesis-for-final.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="font-sans text-sm text-gray-900">Download Thesis</span>
              <span className="font-sans text-sm text-orange-500">PDF ↓</span>
            </a>
            <a
              href="https://github.com/reymartlouie/Firesafe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="font-sans text-sm text-gray-900">View on GitHub</span>
              <span className="font-sans text-sm text-orange-500">↗</span>
            </a>
          </div>

        </div>
      </div>
    </div>,
    document.body
  )
}
