'use client'

import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

const hardware = [
  { label: 'Raspberry Pi Zero 2 W', category: 'Main Processor' },
  { label: 'MLX90640', category: 'Thermal Camera' },
  { label: 'MQ-2', category: 'Gas / Smoke' },
  { label: 'ADS1115', category: 'ADC (I2C)' },
  { label: 'DHT22', category: 'Temp / Humidity' },
  { label: 'Digital Servo', category: 'Camera Pan' },
  { label: 'Arduino Mega 2560', category: 'SMS Gateway' },
  { label: 'SIM800L ×2', category: 'GSM Modules' },
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

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-end md:items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] p-8 md:p-10"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06) inset',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-sans text-[#fb923c]/60 text-xs uppercase tracking-widest">Thesis · BS Computer Engineering</span>
            <span className="font-sans text-xs" style={{ color: 'var(--fg-20)' }}>· March 2026</span>
          </div>
          <h2 className="font-display text-white text-5xl mb-3">FireSafe</h2>
          <p className="font-sans text-xs leading-relaxed mb-3" style={{ color: 'var(--fg-40)' }}>
            A Thermal Imaging-Based Approach for Fire Detection in a Controlled and Open Space Environment with Mobile Alerting System
          </p>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--fg-50)' }}>
            A community-level fire detection system using edge computing and thermal imaging,
            built for rural barangays with limited infrastructure. Alerts residents via push
            notifications and mass SMS — no constant cloud dependency required.
          </p>
        </div>

        {/* Context */}
        <div
          className="mb-8 p-6 rounded-[20px]"
          style={{ background: 'rgba(251,146,60,0.05)', border: '1px solid rgba(251,146,60,0.12)' }}
        >
          <p className="font-sans text-[#fb923c]/60 text-xs uppercase tracking-widest mb-3">The Problem</p>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--fg-55)' }}>
            The Philippines recorded 16,426 fire incidents in 2023 — a 24.5% increase year-over-year.
            Rural barangays are especially vulnerable: fires start unnoticed in unguarded spaces,
            and existing detection systems depend on cloud infrastructure impractical for
            resource-limited communities. FireSafe processes data locally on a Raspberry Pi,
            triggering alerts within seconds through both mobile push and mass SMS.
          </p>
        </div>

        {/* Hardware */}
        <div className="mb-6">
          <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--fg-30)' }}>Hardware</p>
          <div className="grid grid-cols-2 gap-2">
            {hardware.map(({ label, category }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3 rounded-2xl"
                style={{ background: 'var(--border)', border: '1px solid var(--border)' }}
              >
                <span className="font-sans text-sm" style={{ color: 'var(--fg-60)' }}>{label}</span>
                <span className="font-sans text-xs text-right" style={{ color: 'var(--fg-30)' }}>{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Software */}
        <div className="mb-8">
          <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--fg-30)' }}>Software</p>
          <div className="grid grid-cols-2 gap-2">
            {software.map(({ label, category }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3 rounded-2xl"
                style={{ background: 'var(--border)', border: '1px solid var(--border)' }}
              >
                <span className="font-sans text-sm" style={{ color: 'var(--fg-60)' }}>{label}</span>
                <span className="font-sans text-xs text-right" style={{ color: 'var(--fg-30)' }}>{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testing */}
        <div className="mb-8">
          <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--fg-30)' }}>Testing</p>
          <div className="flex flex-col gap-2">
            {[
              { env: 'Controlled Environment', detail: '7 sessions · Kabankalan City indoor' },
              { env: 'Open Space Outdoor', detail: '7 sessions · Rooftop & open field' },
              { env: 'Actual Fire Scenario', detail: '7 burn sessions · CentralE open area, Bacolod' },
            ].map(({ env, detail }) => (
              <div
                key={env}
                className="flex items-center justify-between px-4 py-3 rounded-2xl"
                style={{ background: 'var(--border)', border: '1px solid var(--border)' }}
              >
                <span className="font-sans text-sm" style={{ color: 'var(--fg-60)' }}>{env}</span>
                <span className="font-sans text-xs text-right" style={{ color: 'var(--fg-30)' }}>{detail}</span>
              </div>
            ))}
          </div>
          <p className="font-sans text-xs mt-3 leading-relaxed" style={{ color: 'var(--fg-30)' }}>
            Risk thresholds — HIGH: ≥35°C / ≤40% RH / 100–200 PPM · CRITICAL: ≥38°C / ≤30% RH / &gt;200 PPM
          </p>
        </div>

        {/* Roles */}
        <div className="mb-8">
          <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--fg-30)' }}>My Roles</p>
          <div className="flex flex-col gap-3">
            {roles.map(({ role, desc }) => (
              <div
                key={role}
                className="p-5 rounded-2xl"
                style={{ background: 'var(--border)', border: '1px solid var(--border)' }}
              >
                <p className="font-sans text-sm font-medium mb-1.5" style={{ color: 'var(--fg-60)' }}>{role}</p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--fg-40)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--fg-20)' }}>
            With Odsey Bandojo &amp; Vhieron Bareza<br />
            University of St. La Salle · Bacolod City
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/reymartlouie/Firesafe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150"
              style={{
                background: 'var(--contact-resume-bg)',
                color: 'var(--fg-55)',
                border: '1px solid var(--border-strong)',
              }}
            >
              GitHub ↗
            </a>
            <a
              href="/thesis-for-final.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150"
              style={{
                background: 'var(--contact-resume-bg)',
                color: 'var(--fg-55)',
                border: '1px solid var(--border-strong)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 1v8M4 6l3 3 3-3M2 10v1.5A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V10" />
              </svg>
              Paper
            </a>
            <a
              href="https://reymartlouie.framer.website/work/firesafe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150"
              style={{
                background: 'rgba(251,146,60,0.12)',
                color: '#fb923c',
                border: '1px solid rgba(251,146,60,0.22)',
              }}
            >
              Case Study ↗
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
