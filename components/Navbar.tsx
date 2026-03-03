export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 flex justify-center">
      <div className="nav-enter flex items-center gap-8 bg-[#1a1a1a]/90 backdrop-blur-2xl border border-white/[0.06] rounded-full px-5 py-3 shadow-lg shadow-black/30">
        <a href="/" className="font-display text-white text-sm tracking-tight">
          ReymartLouie
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#work" className="font-sans text-sm text-white/50 hover:text-white transition-colors">
            Work
          </a>
          <a href="#about" className="font-sans text-sm text-white/50 hover:text-white transition-colors">
            About
          </a>
          <a href="#contact" className="font-sans text-sm text-white/50 hover:text-white transition-colors">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="font-sans text-xs font-semibold bg-white text-[#111111] px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          Hire Me
        </a>
      </div>
    </header>
  )
}
