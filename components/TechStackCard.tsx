'use client'

const SKILLS = ['TypeScript', 'React Native', 'Supabase', 'Next.js', 'React', 'Figma', 'Framer', 'Expo']

// Pulled from the teal-grid facade image
const MINT       = 'rgba(167,220,195,0.80)'
const MINT_DIM   = 'rgba(167,220,195,0.45)'
const MINT_GLOW  = 'rgba(167,220,195,0.18)'
const TAG_BG     = 'rgba(10,30,22,0.55)'
const TAG_BORDER = 'rgba(167,220,195,0.22)'

export default function TechStackCard() {
  return (
    <div
      className="@container flex-1 rounded-[32px] relative overflow-hidden min-h-[180px] flex flex-col justify-between"
      style={{
        backgroundImage: `
          linear-gradient(160deg, rgba(8,20,16,0.72) 0%, rgba(8,20,16,0.52) 60%, rgba(8,20,16,0.70) 100%),
          url('/tech-bg.webp')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* subtle corner glow — complements the teal tiles */}
      <div
        className="absolute -top-8 -right-8 w-36 h-36 rounded-full blur-3xl pointer-events-none"
        style={{ background: MINT_GLOW }}
      />

      <div className="relative p-6 @md:p-8 flex flex-col gap-5">
        {/* Label */}
        <div className="flex items-center gap-2">
          <div className="w-px h-3.5" style={{ background: MINT_DIM }} />
          <p className="font-sans text-xs uppercase tracking-widest" style={{ color: MINT_DIM }}>
            Tech Stack
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
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
    </div>
  )
}
