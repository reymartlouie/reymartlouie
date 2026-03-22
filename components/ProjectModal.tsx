'use client'

import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

const techStack = [
  { label: 'Raspberry Pi Zero 2 W', category: 'Hardware' },
  { label: 'MLX90640', category: 'Thermal Sensor' },
  { label: 'MQ2 + DHT11', category: 'Gas / Humidity' },
  { label: 'TinyML', category: 'Edge ML' },
  { label: 'Python', category: 'Firmware' },
  { label: 'Supabase', category: 'Backend' },
  { label: 'React Native', category: 'Mobile' },
  { label: 'Expo', category: 'Framework' },
]

const roles = [
  {
    role: 'System Architecture',
    desc: 'Connected sensors, Raspberry Pi, Supabase, and mobile app into one cohesive edge-computing system. TinyML reduces cloud dependency while keeping detection reliable.',
  },
  {
    role: 'UI/UX Design',
    desc: 'Designed for residents and barangay officials — clarity and urgency as core principles. Explored Liquid Glass aesthetics: depth, soft transparency, clean futuristic feel.',
  },
  {
    role: 'Mobile Development',
    desc: 'Built a cross-platform app with Expo, integrating Supabase auth and real-time data. Handled push and SMS notifications with smooth animations across screen sizes.',
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
          background: '#111',
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
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-[#fb923c]/60 text-xs uppercase tracking-widest">Case Study</span>
            <span className="font-sans text-white/20 text-xs">· 2025</span>
          </div>
          <h2 className="font-display text-white text-5xl mb-4">FireSafe</h2>
          <p className="font-sans text-white/50 text-sm leading-relaxed">
            A thermal imaging-based wildfire detection system built for resource-limited rural barangays,
            with real-time mobile alerting via push notifications and SMS.
          </p>
        </div>

        {/* Problem */}
        <div
          className="mb-8 p-6 rounded-[20px]"
          style={{ background: 'rgba(251,146,60,0.05)', border: '1px solid rgba(251,146,60,0.12)' }}
        >
          <p className="font-sans text-[#fb923c]/60 text-xs uppercase tracking-widest mb-3">The Problem</p>
          <p className="font-sans text-white/55 text-sm leading-relaxed">
            Most wildfire detection systems depend on cloud processing and advanced hardware,
            making them impractical for rural barangays with limited resources. FireSafe fills that gap —
            a lightweight, community-level solution powered by edge computing.
          </p>
        </div>

        {/* Tech stack */}
        <div className="mb-8">
          <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-4">Tech Stack</p>
          <div className="grid grid-cols-2 gap-2">
            {techStack.map(({ label, category }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="font-sans text-white/70 text-sm">{label}</span>
                <span className="font-sans text-white/25 text-xs">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="mb-8">
          <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-4">My Roles</p>
          <div className="flex flex-col gap-3">
            {roles.map(({ role, desc }) => (
              <div
                key={role}
                className="p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p className="font-sans text-white/80 text-sm font-medium mb-1.5">{role}</p>
                <p className="font-sans text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="https://reymartlouie.framer.website/work/firesafe"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-150"
          style={{
            background: 'rgba(251,146,60,0.12)',
            color: '#fb923c',
            border: '1px solid rgba(251,146,60,0.22)',
          }}
        >
          View Full Case Study ↗
        </a>
      </div>
    </div>
  )
}
