import Reveal from './Reveal'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/reymartlouie' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/reymart-louie-capapas-b0063718b' },
  { label: 'Instagram', href: 'https://www.instagram.com/reymartlouie/' },
  { label: '+63 962 603 2929', href: 'tel:+639626032929' },
]

export default function Footer() {
  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-6">

      <Reveal className="lg:col-span-8">
        <div className="h-full bento-lift bg-[#1a2e26] rounded-[32px] p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 w-40 h-40 bg-green-400/8 rounded-full blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="font-sans text-[#6ee7b7]/50 text-xs uppercase tracking-widest mb-4">Get in Touch</p>
            <h2 className="font-display text-[#a7f3d0] text-[52px] lg:text-[64px] leading-[0.9] mb-8">
              Let&apos;s work<br />together.
            </h2>
            <a
              href="mailto:reymartlouie.capapas@gmail.com"
              className="btn-spring group inline-flex items-center gap-3 bg-[#6ee7b7]/12 text-[#6ee7b7] border border-[#6ee7b7]/20 font-sans text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#6ee7b7]/20 transition-colors"
            >
              reymartlouie.capapas@gmail.com
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-4" delay={80}>
        <div className="h-full bento-lift bg-[#1a1a1a] rounded-[32px] p-8 flex flex-col justify-between">
          <div>
            <p className="font-sans text-white/30 text-xs uppercase tracking-widest mb-6">Find me on</p>
            <div className="flex flex-col">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group py-3 border-b border-white/[0.06] last:border-0"
                >
                  <span className="font-sans text-white/60 text-sm group-hover:text-white transition-colors duration-150">
                    {link.label}
                  </span>
                  <span className="text-white/20 group-hover:text-white transition-colors duration-150 text-sm">↗</span>
                </a>
              ))}
            </div>
          </div>
          <p className="font-sans text-white/20 text-xs mt-6">
            © {new Date().getFullYear()} Reymart Louie. All rights reserved.
          </p>
        </div>
      </Reveal>

    </section>
  )
}
