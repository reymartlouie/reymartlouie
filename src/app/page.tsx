import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Works from '@/components/sections/Works'
import Achievements from '@/components/sections/Achievements'
import Footer from '@/components/sections/Footer'
import StatusBar from '@/components/ui/StatusBar'

function SectionBreak({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-end py-2">
      <span className="font-sans text-[13px] font-semibold text-white/[0.55] md:text-[10px] md:font-normal md:text-white/[0.22] uppercase tracking-[0.06em] md:tracking-[0.22em]">
        {label}
      </span>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <StatusBar />
      <Navbar />
      <div
        className="max-w-[1280px] mx-auto px-4 pt-4 lg:pt-14 md:px-6 flex flex-col gap-4 pb-8 lg:pb-[180px]"
      >
        <SectionBreak label="Canvas" />
        <Hero />
        <div id="work" className="flex flex-col gap-4">
          <SectionBreak label="Work" />
          <Works />
        </div>
        <SectionBreak label="Credentials" />
        <Achievements />
        <SectionBreak label="Contact" />
        <Footer />
      </div>
    </main>
  )
}