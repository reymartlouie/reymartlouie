'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/sections/Hero'
import Works from '@/components/sections/Works'
import Achievements, { badgesCount } from '@/components/sections/Achievements'
import Footer from '@/components/sections/Footer'
import Signature from '@/components/sections/Signature'
import StatusBar from '@/components/ui/StatusBar'
import SectionActionButton from '@/components/ui/SectionActionButton'

function SectionBreak({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-start py-2">
      <span className="font-sans text-[11px] font-semibold text-[#1e1e1e] md:text-[10px] md:font-normal uppercase tracking-[0.06em] md:tracking-[0.22em]">
        {label}
      </span>
    </div>
  )
}

function SectionHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[44px] md:text-[56px] leading-[1.05] font-black text-[#1e1e1e] px-1">
      {children}
    </h2>
  )
}

function SectionHeader({
  label,
  action,
  children,
}: {
  label: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <SectionBreak label={label} />
      <div className="flex items-center justify-between gap-4">
        <SectionHeadline>{children}</SectionHeadline>
        {action}
      </div>
    </div>
  )
}

export default function Home() {
  const [uiuxOpen, setUiuxOpen] = useState(false)
  const [badgeModalOpen, setBadgeModalOpen] = useState(false)

  // The site is installable as a standalone web app (apple-mobile-web-app-capable),
  // and iOS restores the last scroll position on relaunch — without this, reopening
  // the app can land mid-page (e.g. on Work) instead of the Canvas section at top.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen">
      <StatusBar />
      <div
        className="max-w-[1280px] mx-auto px-4 pt-6 lg:pt-20 md:px-6 flex flex-col gap-14 md:gap-20 pb-14 lg:pb-[180px]"
      >
        <div className="flex flex-col gap-5 md:gap-6">
          <SectionBreak label="Canvas" />
          <SectionHeadline>
            Computer Engineer<br />
            <span className="text-fuchsia-600">&amp; Developer.</span>
          </SectionHeadline>
          <Hero />
        </div>
        <div id="work" className="flex flex-col gap-5 md:gap-6">
          <SectionHeader
            label="Work"
            action={<SectionActionButton label="UI/UX" onClick={() => setUiuxOpen(true)} />}
          >
            Selected Work.
          </SectionHeader>
          <Works uiuxOpen={uiuxOpen} setUiuxOpen={setUiuxOpen} />
        </div>
        <div id="certifications" className="flex flex-col gap-5 md:gap-6">
          <SectionHeader
            label="Credentials"
            action={<SectionActionButton label={`${badgesCount} credentials`} onClick={() => setBadgeModalOpen(true)} />}
          >
            Achievements.
          </SectionHeader>
          <Achievements badgeModalOpen={badgeModalOpen} setBadgeModalOpen={setBadgeModalOpen} />
        </div>
        <div id="contact" className="flex flex-col gap-5 md:gap-6">
          <SectionBreak label="Contact" />
          <SectionHeadline>Let&apos;s build<br />something.</SectionHeadline>
          <div
            className="rounded-[32px] p-4 md:p-8"
            style={{
              background: 'linear-gradient(160deg, #eaf7f0 0%, #e2f3ea 55%, #ecf8f1 100%)',
              border: '1px solid rgba(16,120,80,0.10)',
            }}
          >
            <Footer />
          </div>

          {/* Signature — name, CTAs, socials, meta — sits outside the tinted contact frame */}
          <Signature />
        </div>
      </div>

      {/* Trademark — very bottom of the page */}
      <div className="border-t" style={{ borderColor: 'rgba(30,30,30,0.08)' }}>
        <p className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-10 text-center font-sans text-xs text-[#1e1e1e]/40">
          © {new Date().getFullYear()} Reymart Louie L. Capapas. All rights reserved.
        </p>
      </div>
    </main>
  )
}