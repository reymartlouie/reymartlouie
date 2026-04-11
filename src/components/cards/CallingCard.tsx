'use client'

const socialLinks = [
  { label: 'GitHub',    href: 'https://github.com/reymartlouie' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/reymart-louie-capapas-b0063718b' },
  { label: 'Instagram', href: 'https://www.instagram.com/reymartlouie/' },
  { label: '+63 962 603 2929', href: 'tel:+639626032929' },
]

export default function CallingCard() {
  return (
    <div
      className="h-full rounded-[32px] flex flex-col justify-between relative overflow-hidden"
      style={{
        background: `
          linear-gradient(118deg,
            rgba(255,255,255,0.75) 0%,
            rgba(255,255,255,0.28) 20%,
            rgba(255,255,255,0.00) 40%,
            rgba(0,0,0,0.06)       65%,
            rgba(0,0,0,0.22)       100%
          ),
          repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.000) 0px,
            rgba(255,255,255,0.000) 1px,
            rgba(255,255,255,0.10)  1px,
            rgba(255,255,255,0.10)  2px
          ),
          #c8bdb0
        `,
        boxShadow: `
          inset 0  1px 0 rgba(255,255,255,0.95),
          inset 0 -1px 0 rgba(0,0,0,0.28),
          inset  1px 0 0 rgba(255,255,255,0.55),
          inset -1px 0 0 rgba(0,0,0,0.18),
          0 32px 80px rgba(0,0,0,0.55),
          0  8px 24px rgba(0,0,0,0.30)
        `,
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
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            color: '#1a1714',
            textShadow: '0 1px 0 rgba(255,255,255,0.70), 0 -1px 0 rgba(0,0,0,0.22)',
          }}
        >
          RL
        </p>

        {/* Polished groove rule */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.22)' }} />
          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.55)' }} />
        </div>

        {/* Name + title */}
        <p
          className="font-sans uppercase"
          style={{
            fontSize: 10, letterSpacing: '0.20em', marginBottom: '0.3rem',
            color: '#1a1714',
            textShadow: '0 0.5px 0 rgba(255,255,255,0.55), 0 -0.5px 0 rgba(0,0,0,0.15)',
          }}
        >
          Reymart Louie L. Capapas
        </p>
        <p
          className="font-sans"
          style={{ fontSize: 10, letterSpacing: '0.06em', color: '#5c5248' }}
        >
          Computer Engineer &amp; Developer
        </p>
      </div>

      {/* Links */}
      <div>
        {/* Polished groove rule */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.20)' }} />
          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.52)' }} />
        </div>

        <div className="flex flex-col" style={{ gap: '0.65rem' }}>
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
                color: '#4a4038',
                transition: 'color 200ms ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#1a1714'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a4038'}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Polished groove rule */}
        <div style={{ margin: '1.25rem 0 0.75rem' }}>
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.18)' }} />
          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.50)' }} />
        </div>

        <p
          className="font-sans"
          style={{ fontSize: 9, letterSpacing: '0.16em', color: '#7a6e62', textTransform: 'uppercase' }}
        >
          USLS · Bacolod City · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
