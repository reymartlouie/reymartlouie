import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Footer from '@/components/Footer'
import StatusBar from '@/components/StatusBar'

function SectionBreak({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-white/[0.06]" />
      <span className="font-sans text-[10px] text-white/[0.22] uppercase tracking-[0.22em]">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/[0.06]" />
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <StatusBar />
      <Navbar />
      <div
        className="max-w-[1280px] mx-auto px-4 pt-14 md:px-6 md:pt-14 flex flex-col gap-4"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 9rem)' }}
      >
        <SectionBreak label="Canvas" />
        <Hero />
        <div id="work" className="flex flex-col gap-4">
          <SectionBreak label="Selected Work" />
          <Projects />
        </div>
        <SectionBreak label="Certifications" />
        <Certifications />
        <SectionBreak label="Contact" />
        <Footer />
      </div>
    </main>
  )
}
