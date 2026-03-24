'use client'

import { useState } from 'react'
import Reveal from './Reveal'

const socialLinks = [
  { label: 'GitHub',    href: 'https://github.com/reymartlouie' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/reymart-louie-capapas-b0063718b' },
  { label: 'Instagram', href: 'https://www.instagram.com/reymartlouie/' },
  { label: '+63 962 603 2929', href: 'tel:+639626032929' },
]

const inputStyle = {
  background:          'var(--contact-input-bg)',
  border:              '1px solid var(--contact-input-border)',
  borderRadius:        16,
  color:               'var(--fg)',
  outline:             'none',
  width:               '100%',
  fontFamily:          'inherit',
  fontSize:            14,
  padding:             '12px 16px',
  transition:          'border-color 150ms ease',
}

export default function Footer() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [sent,    setSent]    = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body    = encodeURIComponent(`Hi Reymart,\n\n${message}\n\n— ${name}\n${email}`)
    window.open(`mailto:reymartlouie.capapas@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setName('')
      setEmail('')
      setMessage('')
    }, 4000)
  }

  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-6">

      <Reveal className="lg:col-span-8">
        <div className="h-full bento-lift rounded-[32px] p-6 md:p-8 lg:p-10 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-footer-contact)' }}>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 w-40 h-40 bg-green-400/8 rounded-full blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--contact-label)' }}>Get in Touch</p>
            <h2 className="font-display text-[36px] lg:text-[48px] leading-[0.9] mb-5" style={{ color: 'var(--contact-title)' }}>
              Let&apos;s work<br />together.
            </h2>

            {sent ? (
              <div className="flex items-center gap-2.5 py-2">
                <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full" />
                <p className="font-sans text-sm" style={{ color: 'var(--contact-btn-fg)' }}>Email client opened — hit send!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={inputStyle}
                    className="placeholder:text-white/20 focus:border-[#6ee7b7]/40"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                    className="placeholder:text-white/20 focus:border-[#6ee7b7]/40"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  rows={3}
                  style={{ ...inputStyle, resize: 'none' }}
                  className="placeholder:text-white/20 focus:border-[#6ee7b7]/40"
                />
                <div className="flex items-center gap-2 mt-0.5">
                  <button
                    type="submit"
                    className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                    style={{ background: 'var(--contact-btn-bg)', color: 'var(--contact-btn-fg)', border: '1px solid var(--contact-btn-border)' }}
                  >
                    Send →
                  </button>
                  <a
                    href="https://drive.google.com/drive/folders/1GbhrbziR6UWoHedmOB52l_DMdWwvyPLT?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-spring inline-flex items-center gap-1.5 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                    style={{ background: 'var(--contact-resume-bg)', color: 'var(--contact-resume-fg)', border: '1px solid var(--contact-resume-border)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 1v8M4 6l3 3 3-3M2 10v1.5A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V10" />
                    </svg>
                    Resume
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-4" delay={80}>
        <div className="h-full bento-lift rounded-[32px] p-6 md:p-8 flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--fg-30)' }}>Find me on</p>
            <div className="flex flex-col">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group py-3 last:border-0"
                  style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => { (e.currentTarget.children[0] as HTMLElement).style.color = 'rgba(255,255,255,0.90)'; (e.currentTarget.children[1] as HTMLElement).style.color = 'rgba(255,255,255,0.70)' }}
                  onMouseLeave={e => { (e.currentTarget.children[0] as HTMLElement).style.color = 'var(--fg-60)'; (e.currentTarget.children[1] as HTMLElement).style.color = 'var(--fg-20)' }}
                >
                  <span className="font-sans text-sm transition-colors duration-150" style={{ color: 'var(--fg-60)' }}>
                    {link.label}
                  </span>
                  <span className="transition-colors duration-150 text-sm" style={{ color: 'var(--fg-20)' }}>↗</span>
                </a>
              ))}
            </div>
          </div>
          <p className="font-sans text-xs mt-6" style={{ color: 'var(--fg-20)' }}>
            © {new Date().getFullYear()} Reymart Louie. All rights reserved.
          </p>
        </div>
      </Reveal>

    </section>
  )
}
