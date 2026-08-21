'use client'

const services = [
  {
    category: 'Web Development',
    starting: '₱3,000',
    accent: 'rgba(59,130,246,0.85)',
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.18)',
    divider: 'rgba(59,130,246,0.35)',
    items: ['Landing Pages', 'Portfolio & Company Sites', 'Web Apps & Dashboards'],
  },
  {
    category: 'Systems',
    starting: '₱8,000',
    accent: 'rgba(16,120,80,0.85)',
    accentBg: 'rgba(16,120,80,0.07)',
    accentBorder: 'rgba(16,120,80,0.18)',
    divider: 'rgba(16,120,80,0.35)',
    items: ['CRUD & Records Systems', 'POS / Billing', 'Full Business Systems'],
  },
]

export default function PricingCard() {
  return (
    <div className="glass h-full rounded-[32px] overflow-hidden">

      {/* Header */}
      <div className="px-6 md:px-8 pt-7 md:pt-9 pb-5 flex items-center justify-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-px h-3.5 bg-stone-400/50" />
          <span className="font-sans text-xs uppercase tracking-widest text-[#1e1e1e]">Pricing</span>
        </div>
        <p className="font-sans text-sm text-[#1e1e1e] hidden md:block">
          Rates vary by scope
        </p>
      </div>

      {/* Service cards */}
      <div className="px-4 md:px-8 pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {services.map((svc) => (
          <div
            key={svc.category}
            className="rounded-[24px] overflow-hidden flex flex-col"
            style={{
              background: '#fff',
              border: `1px solid ${svc.accentBorder}`,
              boxShadow: `0 2px 24px ${svc.accentBg}, inset 0 1px 0 rgba(255,255,255,0.9)`,
            }}
          >
            <div className="px-6 pt-6 pb-5 flex flex-col items-center md:items-start gap-3">
              {/* Label row */}
              <div className="flex items-center gap-2">
                <div className="w-px h-3" style={{ background: svc.divider }} />
                <span
                  className="font-sans text-xs uppercase tracking-widest"
                  style={{ color: svc.accent }}
                >
                  {svc.category}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-black text-[#1e1e1e] leading-none">
                  {svc.starting}
                </span>
                <span className="font-sans text-sm text-[#1e1e1e]">starting</span>
              </div>

              {/* Items */}
              <ul className="flex flex-col items-center md:items-start gap-2 pt-1">
                {svc.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: svc.accentBorder }}
                    />
                    <span className="font-sans text-sm text-[#1e1e1e]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-6 md:px-8 pb-6 md:pb-8">
        <p className="font-sans text-xs text-[#1e1e1e] text-center md:text-left">
          Rush jobs +30% · Maintenance plans available · Contact for custom quotes
        </p>
      </div>

    </div>
  )
}
