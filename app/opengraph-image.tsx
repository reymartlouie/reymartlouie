import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Reymart Louie — Computer Engineer & Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#111111',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top — badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#34c759' }} />
          <span style={{ color: '#86868b', fontSize: 16, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Available for work
          </span>
        </div>

        {/* Middle — name + title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: '#f2f2f2', lineHeight: 0.9 }}>
            Computer<br />
            Engineer<br />
            <span style={{ color: '#555' }}>& Developer.</span>
          </div>
          <p style={{ fontSize: 22, color: '#6e6e73', margin: 0, maxWidth: 560, lineHeight: 1.5 }}>
            React Native · TypeScript · Supabase · Next.js<br />
            University of St. La Salle – Bacolod
          </p>
        </div>

        {/* Bottom — url */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 18, color: '#444', fontWeight: 700, letterSpacing: '-0.02em' }}>
            reymartlouie.vercel.app
          </span>
          <div style={{
            fontSize: 28,
            fontWeight: 900,
            color: '#f2f2f2',
            letterSpacing: '-0.04em',
          }}>
            RL
          </div>
        </div>
      </div>
    ),
    size,
  )
}
