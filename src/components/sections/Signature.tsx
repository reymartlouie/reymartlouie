'use client'

import { useState } from 'react'
import ResumeModal from '../ui/ResumeModal'

const socialLinks = [
  { label: 'GitHub',    href: 'https://github.com/reymartlouie' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/reymart-louie-capapas-b0063718b' },
  { label: 'Instagram', href: 'https://www.instagram.com/reymartlouie/' },
  { label: 'Email',     href: 'mailto:reymartlouie.capapas@gmail.com' },
  { label: '+63 962 603 2929', href: 'tel:+639626032929' },
]

export default function Signature() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-7 md:gap-9 pt-12 md:pt-20">
      {/* Name + title */}
      <div className="text-center">
        <p className="font-display text-3xl md:text-4xl text-[#1e1e1e]">Reymart Louie L. Capapas</p>
        <p className="font-sans text-sm text-[#1e1e1e]/50 mt-3">Computer Engineer &amp; Developer</p>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-4">
        <a
          href="mailto:reymartlouie.capapas@gmail.com"
          className="btn-spring inline-flex items-center gap-2 bg-fuchsia-500 text-white font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-fuchsia-600 transition-colors"
        >
          Get in Touch →
        </a>
        <button
          onClick={() => setResumeOpen(true)}
          className="btn-spring inline-flex items-center gap-2 bg-stone-900/5 text-[#1e1e1e] border border-[#1e1e1e]/15 font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-stone-900/10 transition-colors"
        >
          Resume ↓
        </button>
      </div>

      {/* Social links — plain text, crawlable, not buried in a styled card */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {socialLinks.map((link, i) => (
          <span key={link.label} className="flex items-center gap-3">
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-sans text-sm text-[#1e1e1e]/50 hover:text-[#1e1e1e] transition-colors"
            >
              {link.label}
            </a>
            {i < socialLinks.length - 1 && <span className="text-[#1e1e1e]/20">·</span>}
          </span>
        ))}
      </div>

      {/* Meta — education, location, tenure */}
      <p className="font-sans text-xs uppercase tracking-widest text-[#1e1e1e]/35 pb-4 md:pb-8">
        University of St. La Salle · Bacolod City · Building since 2022
      </p>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  )
}
