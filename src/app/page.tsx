import Hero from '@/components/sections/Hero'
import Works from '@/components/sections/Works'
import Achievements from '@/components/sections/Achievements'
import Footer from '@/components/sections/Footer'
import StatusBar from '@/components/ui/StatusBar'

function SectionBreak({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-start py-2">
      <span className="font-sans text-[11px] font-semibold text-stone-400 md:text-[10px] md:font-normal uppercase tracking-[0.06em] md:tracking-[0.22em]">
        {label}
      </span>
    </div>
  )
}

function SectionHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[44px] md:text-[56px] leading-[1.05] font-black text-stone-900 px-1">
      {children}
    </h2>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <StatusBar />
      <div
        className="max-w-[1280px] mx-auto px-4 pt-4 lg:pt-14 md:px-6 flex flex-col gap-4 pb-8 lg:pb-[180px]"
      >
        <div className="flex flex-col gap-4">
          <SectionBreak label="Canvas" />
          <SectionHeadline>
            Computer<br />Engineer<br />
            <span className="text-fuchsia-600">&amp; Developer.</span>
          </SectionHeadline>
          <Hero />
        </div>
        <div id="work" className="flex flex-col gap-4">
          <SectionBreak label="Work" />
          <SectionHeadline>Selected<br />Work.</SectionHeadline>
          <Works />
        </div>
        <div className="flex flex-col gap-4">
          <SectionBreak label="Credentials" />
          <SectionHeadline>Achievements.</SectionHeadline>
          <Achievements />
        </div>
        <div className="flex flex-col gap-4">
          <SectionBreak label="Contact" />
          <SectionHeadline>Let&apos;s build<br />something.</SectionHeadline>
          <Footer />
        </div>
      </div>
    </main>
  )
}