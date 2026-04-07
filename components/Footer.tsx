'use client'

import Reveal from './Reveal'

const GOLD      = '#c9a84c'
const GOLD_DIM  = 'rgba(201,168,76,0.50)'
const GOLD_HINT = 'rgba(201,168,76,0.12)'

const socialLinks = [
  { label: 'GitHub',    href: 'https://github.com/reymartlouie' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/reymart-louie-capapas-b0063718b' },
  { label: 'Instagram', href: 'https://www.instagram.com/reymartlouie/' },
  { label: '+63 962 603 2929', href: 'tel:+639626032929' },
]

// ── Chip SVG ──────────────────────────────────────────────────────────────────
function Chip() {
  return (
    <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
      <rect x="0.5" y="0.5" width="43" height="33" rx="5.5" fill={GOLD} fillOpacity="0.9" stroke={GOLD} strokeOpacity="0.4" />
      {/* chip grid lines */}
      <line x1="14" y1="0.5" x2="14" y2="33.5" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <line x1="30" y1="0.5" x2="30" y2="33.5" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <line x1="0.5" y1="11" x2="43.5" y2="11" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <line x1="0.5" y1="23" x2="43.5" y2="23" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      {/* center contact pad */}
      <rect x="14" y="11" width="16" height="12" rx="1" fill={GOLD} fillOpacity="0.5" />
    </svg>
  )
}

// ── NFC symbol ────────────────────────────────────────────────────────────────
function NFC() {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
      <path d="M2 14c0-5 3.6-9.2 8.5-10.3" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
      <path d="M5.5 14c0-3 2-5.5 5-6.5"    stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
      <path d="M9 14c0-1.1.8-2 1.8-2.3"    stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
    </svg>
  )
}

// ── Centurion helmet silhouette ───────────────────────────────────────────────
function CenturionFigure() {
  return (
    <svg width="90" height="110" viewBox="0 0 90 110" fill="none" opacity="0.13">
      {/* crest / plume */}
      <path d="M20 40 C22 10, 45 5, 68 8 C60 15, 50 18, 45 22 C40 18, 30 15, 20 40Z"
        fill={GOLD} />
      {/* helmet dome */}
      <path d="M18 60 C18 38, 30 30, 45 28 C60 30, 72 38, 72 60Z"
        fill={GOLD} />
      {/* cheek guards */}
      <path d="M18 60 L14 78 C14 78, 20 80, 25 76 L28 62Z" fill={GOLD} />
      <path d="M72 60 L76 78 C76 78, 70 80, 65 76 L62 62Z" fill={GOLD} />
      {/* face opening */}
      <path d="M28 52 C28 44, 35 40, 45 40 C55 40, 62 44, 62 52 L60 65 C60 70, 54 74, 45 74 C36 74, 30 70, 30 65Z"
        fill="#080808" />
      {/* neck guard */}
      <rect x="22" y="74" width="46" height="12" rx="4" fill={GOLD} />
      {/* shoulder */}
      <path d="M10 86 C10 82, 14 80, 22 80 L22 86 C22 92, 18 96, 10 96Z" fill={GOLD} />
      <path d="M80 86 C80 82, 76 80, 68 80 L68 86 C68 92, 72 96, 80 96Z" fill={GOLD} />
      <rect x="22" y="86" width="46" height="10" rx="2" fill={GOLD} />
    </svg>
  )
}

export default function Footer() {
  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-6">

      {/* ── Centurion card ───────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-8">
        <div
          className="h-full bento-lift rounded-[32px] relative overflow-hidden flex flex-col justify-between"
          style={{
            background: `
              radial-gradient(ellipse 65% 55% at 85% 15%, ${GOLD_HINT} 0%, transparent 65%),
              radial-gradient(ellipse 40% 35% at 10% 85%, rgba(201,168,76,0.05) 0%, transparent 60%),
              #080808
            `,
            padding: '2rem 2.5rem',
            minHeight: 280,
          }}
        >
          {/* Diagonal texture overlay */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                rgba(255,255,255,0.016) 0,
                rgba(255,255,255,0.016) 1px,
                transparent 0,
                transparent 50%
              )`,
              backgroundSize: '6px 6px',
            }}
          />

          {/* Centurion silhouette — far right */}
          <div className="absolute bottom-0 right-8 pointer-events-none select-none">
            <CenturionFigure />
          </div>

          {/* ── Top row ─────────────────────────────────────────────────── */}
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Chip />
              <NFC />
            </div>

            <div className="flex flex-col items-end gap-1">
              <span
                className="font-display tracking-[0.22em] uppercase"
                style={{ fontSize: 13, color: GOLD, letterSpacing: '0.28em' }}
              >
                Centurion
              </span>
              <span
                className="font-display"
                style={{ fontSize: 11, color: GOLD_DIM, letterSpacing: '0.1em' }}
              >
                RL · Portfolio
              </span>
            </div>
          </div>

          {/* ── Card number row ──────────────────────────────────────────── */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-1">
              {['••••', '••••', '••••'].map((g, i) => (
                <span key={i} className="font-display tracking-widest" style={{ fontSize: 18, color: GOLD_DIM, letterSpacing: '0.2em' }}>
                  {g}
                </span>
              ))}
              <span className="font-display tracking-widest" style={{ fontSize: 18, color: GOLD, letterSpacing: '0.2em' }}>
                2026
              </span>
            </div>
            <p className="font-sans" style={{ fontSize: 11, color: GOLD_DIM, letterSpacing: '0.05em' }}>
              reymartlouie.capapas@gmail.com
            </p>
          </div>

          {/* ── Bottom row ───────────────────────────────────────────────── */}
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex gap-8">
              <div>
                <p className="font-sans mb-1" style={{ fontSize: 9, color: GOLD_DIM, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Card Holder
                </p>
                <p className="font-display uppercase tracking-wide" style={{ fontSize: 14, color: 'rgba(255,255,255,0.90)', letterSpacing: '0.06em' }}>
                  Reymart Louie<br />L. Capapas
                </p>
              </div>
              <div>
                <p className="font-sans mb-1" style={{ fontSize: 9, color: GOLD_DIM, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Member Since
                </p>
                <p className="font-display" style={{ fontSize: 14, color: 'rgba(255,255,255,0.90)', letterSpacing: '0.06em' }}>
                  2022
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="mailto:reymartlouie.capapas@gmail.com"
                className="btn-spring inline-flex items-center gap-2 font-sans font-semibold rounded-full"
                style={{
                  fontSize: 12,
                  padding: '8px 18px',
                  background: GOLD,
                  color: '#080808',
                }}
              >
                Get in Touch →
              </a>
              <a
                href="https://drive.google.com/drive/folders/1GbhrbziR6UWoHedmOB52l_DMdWwvyPLT?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-spring inline-flex items-center gap-1.5 font-sans font-semibold rounded-full"
                style={{
                  fontSize: 12,
                  padding: '8px 18px',
                  background: 'rgba(201,168,76,0.12)',
                  color: GOLD,
                  border: `1px solid rgba(201,168,76,0.25)`,
                }}
              >
                Resume ↓
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Calling card ─────────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-4" delay={80}>
        <div
          className="h-full bento-lift rounded-[32px] flex flex-col justify-between"
          style={{
            background: '#f4ede0',
            padding: '2rem 2rem',
          }}
        >
          {/* Monogram */}
          <div>
            <p
              className="font-display"
              style={{
                fontSize: 64,
                lineHeight: 1,
                color: '#1a1714',
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              RL
            </p>

            {/* Rule */}
            <div style={{ height: '0.5px', background: 'rgba(26,23,20,0.15)', marginBottom: '1.25rem' }} />

            {/* Name + title */}
            <p
              className="font-sans uppercase"
              style={{ fontSize: 10, letterSpacing: '0.20em', color: '#1a1714', marginBottom: '0.3rem' }}
            >
              Reymart Louie L. Capapas
            </p>
            <p
              className="font-sans"
              style={{ fontSize: 10, letterSpacing: '0.06em', color: '#7a6f64' }}
            >
              Computer Engineer &amp; Developer
            </p>
          </div>

          {/* Links */}
          <div>
            {/* Rule */}
            <div style={{ height: '0.5px', background: 'rgba(26,23,20,0.12)', marginBottom: '1.25rem' }} />

            <div className="flex flex-col" style={{ gap: '0.6rem' }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.04em',
                    color: '#5a5049',
                    transition: 'color 200ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#1a1714'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5a5049'}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Rule */}
            <div style={{ height: '0.5px', background: 'rgba(26,23,20,0.12)', margin: '1.25rem 0 0.75rem' }} />

            <p
              className="font-sans"
              style={{ fontSize: 9, letterSpacing: '0.16em', color: '#9d9088', textTransform: 'uppercase' }}
            >
              USLS · Bacolod City · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </Reveal>

    </section>
  )
}
