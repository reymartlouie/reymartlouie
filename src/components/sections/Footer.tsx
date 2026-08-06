'use client'

import Reveal from '../ui/Reveal'
import CenturionCard from '../cards/CenturionCard'
import CallingCard from '../cards/CallingCard'
import PayPalCard from '../cards/PayPalCard'
import PricingCard from '../cards/PricingCard'

export default function Footer() {
  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 pb-6">

      {/* ── Pricing card ─────────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-8">
        <PricingCard />
      </Reveal>

      {/* ── PayPal card ──────────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-4" delay={80}>
        <PayPalCard />
      </Reveal>

      {/* ── Calling card ─────────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-4" delay={160}>
        <CallingCard />
      </Reveal>

      {/* ── Centurion card ───────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-8" delay={220}>
        <CenturionCard />
      </Reveal>

    </section>
  )
}
