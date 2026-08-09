'use client'

import { cardMint } from '@/lib/colors'

const SKILLS     = ['TypeScript', 'React Native', 'Supabase', 'Next.js', 'React', 'Figma', 'Framer', 'Expo']
const MINT       = cardMint.base
const MINT_DIM   = cardMint.dim
const MINT_GLOW  = cardMint.glow
const TAG_BG     = cardMint.tagBg
const TAG_BORDER = cardMint.tagBorder

export default function TechStackCard() {
  return (
    <div
      className="@container flex-1 rounded-[32px] p-6 @md:p-8 relative overflow-hidden min-h-[180px] flex flex-col justify-between"
      style={{
        backgroundImage: `
          linear-gradient(160deg, rgba(8,20,16,0.60) 0%, rgba(8,20,16,0.42) 55%, rgba(8,20,16,0.62) 100%),
          url('/tech-bg.webp')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* ambient glow — echoes GitHubCard's green so the two read as a pair */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: MINT_GLOW }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(34,197,94,0.12)' }}
      />

      <div className="relative flex flex-col gap-3 @md:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-px h-3.5" style={{ background: MINT_DIM }} />
          <p className="font-sans text-xs uppercase tracking-widest" style={{ color: MINT_DIM }}>
            Tech Stack
          </p>
        </div>
        <p className="font-display text-2xl @md:text-[28px] leading-[1.05]" style={{ color: MINT }}>
          Tools I build with.
        </p>
      </div>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-2 mt-6">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="tech-tag font-sans text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-200 cursor-default"
            style={{
              color: MINT,
              background: TAG_BG,
              border: `1px solid ${TAG_BORDER}`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
