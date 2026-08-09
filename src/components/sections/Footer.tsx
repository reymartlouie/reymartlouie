'use client'

import Reveal from '../ui/Reveal'
import PayPalCard from '../cards/PayPalCard'
import PricingCard from '../cards/PricingCard'

export default function Footer() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 pb-6">

      {/* ── Pricing card ─────────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-8">
        <PricingCard />
      </Reveal>

      {/* ── PayPal card ──────────────────────────────────────────────────── */}
      <Reveal className="lg:col-span-4" delay={80}>
        <PayPalCard />
      </Reveal>

    </section>
  )
}
