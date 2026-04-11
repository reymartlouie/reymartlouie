'use client'

import Reveal from '../ui/Reveal'
import CenturionCard from '../cards/CenturionCard'
import CallingCard from '../cards/CallingCard'

export default function Footer() {
  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-6">

      {/* ── Centurion card ───────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-8">
        <CenturionCard />
      </Reveal>

      {/* ── Calling card ─────────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-4" delay={80}>
        <CallingCard />
      </Reveal>

    </section>
  )
}
