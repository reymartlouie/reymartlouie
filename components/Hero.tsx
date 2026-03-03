import Reveal from './Reveal'

export default function Hero() {
  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      <Reveal className="lg:col-span-8" delay={100}>
        <div className="h-full bento-lift bg-[#262626] rounded-[32px] p-8 lg:p-10 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-[#1e3320] text-[#86efac] text-xs font-sans px-3 py-1.5 rounded-full mb-8 w-fit">
              <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse" />
              Available for work
            </span>
            <h1 className="font-display text-[56px] lg:text-[72px] leading-[0.9] text-[#f0f0f0] mb-6">
              Crafting<br />
              thoughtful<br />
              <span className="text-[#888888]">digital</span> experiences.
            </h1>
            <p className="font-sans text-white/40 text-base max-w-lg leading-relaxed">
              I design and build products that are clean, purposeful, and built to last.
              Currently open to full-time roles and freelance projects.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-8 relative">
            <a href="#work" className="btn-spring inline-flex items-center gap-2 bg-[#f0f0f0] text-[#111111] font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-white transition-colors">
              View Work
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 bg-white/8 text-white/70 font-sans text-sm px-6 py-3 rounded-full hover:bg-white/12 transition-colors border border-white/10">
              Get in Touch
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-4" delay={180}>
        <div className="h-full bento-lift bg-[#1e3050] rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden min-h-[280px]">
          <div className="absolute -bottom-14 -right-14 w-52 h-52 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-10 -left-10 w-36 h-36 bg-blue-300/8 rounded-full blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="font-sans text-[#93c5fd]/50 text-xs uppercase tracking-widest mb-2">I am a</p>
            <p className="font-display text-[#bfdbfe] text-[40px] lg:text-[44px] leading-[0.9]">
              Computer<br />Engineer
            </p>
          </div>
          <p className="font-sans text-[#93c5fd]/60 text-sm leading-relaxed relative">
            Bridging the gap between robust engineering and intuitive design.
          </p>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-4" delay={240}>
        <div className="h-full bento-lift bg-[#1a1a1a] rounded-[32px] p-8">
          <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-5">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {['C++', 'Python', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Figma'].map((skill) => (
              <span key={skill} className="font-sans text-xs text-white/60 bg-white/8 border border-white/10 px-3 py-1.5 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-5" delay={290}>
        <div className="h-full bento-lift bg-[#222222] rounded-[32px] p-8 flex flex-col justify-between">
          <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-4">About</p>
          <p className="font-sans text-white/55 text-base leading-relaxed">
            A computer engineer who bridges hardware understanding with modern software development.
            I build scalable systems, craft intuitive interfaces, and engineer solutions that matter.
          </p>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-3" delay={340}>
        <div className="h-full bento-lift bg-[#2a1f42] rounded-[32px] p-8 flex flex-col justify-between">
          <p className="font-sans text-[#c4b5fd]/50 text-xs uppercase tracking-widest">Experience</p>
          <div>
            <p className="font-display text-[#ddd6fe] text-7xl leading-none">4+</p>
            <p className="font-sans text-[#c4b5fd]/60 text-sm mt-2">Years crafting digital products</p>
          </div>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-12" delay={390}>
        <a
          href="https://reymartlouie.framer.website"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-lift block h-full bg-[#3a1f2c] rounded-[32px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group"
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="font-sans text-[#f9a8d4]/50 text-xs uppercase tracking-widest mb-2">Portfolio</p>
            <h3 className="font-display text-[#fbcfe8] text-4xl lg:text-5xl">UI/UX Portfolio</h3>
            <p className="font-sans text-[#f9a8d4]/60 text-sm mt-2 max-w-md">
              Explore my design work — case studies, wireframes, and high-fidelity prototypes.
            </p>
          </div>
          <span className="btn-spring inline-flex items-center gap-2 bg-[#fbcfe8]/12 text-[#fbcfe8] border border-[#fbcfe8]/20 font-sans font-semibold text-sm px-6 py-3 rounded-full group-hover:bg-[#fbcfe8]/20 transition-colors whitespace-nowrap">
            View Portfolio ↗
          </span>
        </a>
      </Reveal>

    </section>
  )
}
