'use client'

import Modal from './Modal'

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

export default function FireSafeModal({ onClose }: Props) {
  return (
    <Modal
      onClose={onClose}
      eyebrow="Thesis · Sept 25, 2025 – Mar 26, 2026"
      title="FireSafe"
      actions={
        <a
          href="https://reymartlouie.framer.website/work/firesafe"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150"
          style={{ background: 'rgba(234,88,12,0.08)', color: 'rgba(185,28,28,0.85)', border: '1px solid rgba(234,88,12,0.18)' }}
        >
          Case Study ↗
        </a>
      }
    >
      {/* Intro */}
      <div className="mb-8">
        <p className="font-sans text-xs leading-relaxed mb-3 text-stone-400">
          A Thermal Imaging-Based Approach for Fire Detection in a Controlled and Open Space Environment with Mobile Alerting System
        </p>
        <p className="font-sans text-base leading-relaxed text-stone-600">
          A community-level fire detection system using edge computing and thermal imaging,
          built for rural barangays with limited infrastructure. Alerts residents via push
          notifications and mass SMS — no constant cloud dependency required.
        </p>
      </div>

      {/* Context */}
      <div
        className="mb-8 p-6 md:p-8 rounded-[20px]"
        style={{ background: 'rgba(234,88,12,0.05)', border: '1px solid rgba(234,88,12,0.12)' }}
      >
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(153,27,27,0.60)' }}>The Problem</p>
        <p className="font-sans text-base leading-relaxed text-stone-600">
          The Philippines recorded 16,426 fire incidents in 2023 — a 24.5% increase year-over-year.
          Rural barangays are especially vulnerable: fires start unnoticed in unguarded spaces,
          and existing detection systems depend on cloud infrastructure impractical for
          resource-limited communities. FireSafe processes data locally on a Raspberry Pi,
          triggering alerts within seconds through both mobile push and mass SMS.
        </p>
      </div>

      {/* Hardware */}
      <div className="mb-6">
        <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">Hardware</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {hardware.map(({ label, category }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(234,88,12,0.04)', border: '1px solid rgba(234,88,12,0.12)' }}
            >
              <span className="font-sans text-sm text-stone-700">{label}</span>
              <span className="font-sans text-xs text-right text-stone-400">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Software */}
      <div className="mb-8">
        <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">Software</p>
        <div className="grid grid-cols-2 gap-2">
          {software.map(({ label, category }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(234,88,12,0.04)', border: '1px solid rgba(234,88,12,0.12)' }}
            >
              <span className="font-sans text-sm text-stone-700">{label}</span>
              <span className="font-sans text-xs text-right text-stone-400">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testing */}
      <div className="mb-8">
        <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">Testing</p>
        <div className="flex flex-col gap-2">
          {[
            { env: 'Controlled Environment', detail: '7 sessions · Kabankalan City indoor' },
            { env: 'Open Space Outdoor', detail: '7 sessions · Rooftop & open field' },
            { env: 'Actual Fire Scenario', detail: '7 burn sessions · CentralE open area, Bacolod' },
          ].map(({ env, detail }) => (
            <div
              key={env}
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(234,88,12,0.04)', border: '1px solid rgba(234,88,12,0.12)' }}
            >
              <span className="font-sans text-sm text-stone-700">{env}</span>
              <span className="font-sans text-xs text-right text-stone-400">{detail}</span>
            </div>
          ))}
        </div>
        <p className="font-sans text-xs mt-3 leading-relaxed text-stone-400">
          Risk thresholds — HIGH: ≥35°C / ≤40% RH / 100–200 PPM · CRITICAL: ≥38°C / ≤30% RH / &gt;200 PPM
        </p>
      </div>

      {/* Roles */}
      <div className="mb-8">
        <p className="font-sans text-xs uppercase tracking-widest mb-4 text-stone-400">My Roles</p>
        <div className="flex flex-col gap-3">
          {roles.map(({ role, desc }) => (
            <div
              key={role}
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(234,88,12,0.04)', border: '1px solid rgba(234,88,12,0.12)' }}
            >
              <p className="font-sans text-sm font-medium mb-1.5 text-stone-700">{role}</p>
              <p className="font-sans text-sm leading-relaxed text-stone-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team + CTA */}
      <div className="flex flex-col gap-4">
        <p className="font-sans text-xs leading-relaxed text-stone-400">
          With Odsey Bandojo &amp; Vhieron Bareza<br />
          University of St. La Salle · Bacolod City
        </p>
        <div className="flex flex-col md:flex-row md:justify-end gap-3">
          <a
            href="/thesis-for-final.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-spring inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150 bg-stone-200 hover:bg-stone-300 text-stone-700"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 1v8M4 6l3 3 3-3M2 10v1.5A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V10" />
            </svg>
            Thesis
          </a>
          <a
            href="https://github.com/reymartlouie/Firesafe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-spring inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-150"
            style={{
              background: 'rgba(37,99,235,0.08)',
              color: 'rgba(30,80,200,0.85)',
              border: '1px solid rgba(59,130,246,0.20)',
            }}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </Modal>
  )
}
