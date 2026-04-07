'use client'

const SKILLS = ['TypeScript', 'React-native', 'Supabase', 'Next.js', 'React', 'Figma', 'Framer', 'Expo']

export default function TechStackCard() {
  return (
    <div
      className="@container flex-1 rounded-[32px] p-6 @md:p-8 relative overflow-hidden min-h-[180px]"
      style={{ background: 'var(--bg-tech)' }}
    >
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-blue-500/28 rounded-full blur-3xl pointer-events-none" />
      <p className="font-sans text-xs uppercase tracking-widest mb-5 relative" style={{ color: 'var(--tech-label)' }}>
        Tech Stack
      </p>
      <div className="flex flex-wrap gap-2 relative">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="font-sans text-xs px-3 py-1.5 rounded-full transition-colors duration-150 cursor-default"
            style={{
              color: 'var(--tech-tag-fg)',
              backgroundColor: 'var(--tech-tag-bg)',
              border: '1px solid var(--tech-tag-border)',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.90)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tech-tag-fg)'}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
