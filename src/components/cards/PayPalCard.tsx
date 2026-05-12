'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window { paypal?: any }
}

const PLAN_ID   = 'P-4GE25783A47486257NIBUGZQ'
const CLIENT_ID = 'AcVZ6SWZR7p3g536HW08I_nNE37eShsGnuvDybsP4aRjtM8XWKHpi0wY3urTpzZ4LDgRlh0dP1MlRaa4'
const SDK_SRC   = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&vault=true&intent=subscription`

// Champagne gold palette
const GOLD      = '#c9a96e'
const GOLD_DIM  = 'rgba(201,169,110,0.52)'
const GOLD_FAINT= 'rgba(201,169,110,0.28)'

// Double-line groove rule — same technique as CallingCard but in gold
function GrooveRule({ mb = '1.25rem', mt = '0' }: { mb?: string; mt?: string }) {
  return (
    <div style={{ marginBottom: mb, marginTop: mt }}>
      <div style={{ height: '0.5px', background: 'rgba(201,169,110,0.38)' }} />
      <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.60)' }} />
    </div>
  )
}

export default function PayPalCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    function renderButton() {
      if (cancelled || !containerRef.current || !window.paypal) return
      if (containerRef.current.childElementCount > 0) return
      window.paypal.Buttons({
        style: { shape: 'rect', color: 'black', layout: 'vertical', label: 'subscribe' },
        createSubscription(_data: any, actions: any) {
          return actions.subscription.create({ plan_id: PLAN_ID })
        },
        onApprove(data: any) {
          console.log('[PayPal] Subscription approved:', data.subscriptionID)
        },
      }).render(containerRef.current)
    }

    if (window.paypal) { renderButton(); return () => { cancelled = true } }

    const existing = document.querySelector(`script[src^="https://www.paypal.com/sdk/js"]`)
    if (existing) {
      existing.addEventListener('load', renderButton)
      return () => { cancelled = true; existing.removeEventListener('load', renderButton) }
    }

    const script = document.createElement('script')
    script.src = SDK_SRC
    script.setAttribute('data-sdk-integration-source', 'button-factory')
    script.onload  = renderButton
    script.onerror = () => { if (!cancelled) setError(true) }
    document.head.appendChild(script)

    return () => { cancelled = true }
  }, [])

  return (
    <div
      className="h-full rounded-[32px] flex flex-col relative overflow-hidden"
      style={{
        background: `
          repeating-linear-gradient(
            45deg,
            transparent 0px, transparent 22px,
            rgba(201,169,110,0.028) 22px, rgba(201,169,110,0.028) 23px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent 0px, transparent 22px,
            rgba(201,169,110,0.028) 22px, rgba(201,169,110,0.028) 23px
          ),
          linear-gradient(160deg, #110f08 0%, #0a0907 55%, #0d0b07 100%)
        `,
        border: '1px solid rgba(201,169,110,0.30)',
        boxShadow: `
          inset 0  1px 0 rgba(201,169,110,0.22),
          inset 0 -1px 0 rgba(0,0,0,0.60),
          inset  1px 0 0 rgba(201,169,110,0.12),
          inset -1px 0 0 rgba(0,0,0,0.35),
          0 32px 80px rgba(0,0,0,0.70),
          0  8px 24px rgba(0,0,0,0.50)
        `,
      }}
    >

      {/* Subtle warm glow at top-centre */}
      <div
        className="absolute -top-14 left-1/2 -translate-x-1/2 w-52 h-28 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(201,169,110,0.07)' }}
      />

      <div
        className="relative flex flex-col h-full"
        style={{ padding: '1.85rem 1.85rem' }}
      >

        {/* ── Monogram ────────────────────────────────────────────────── */}
        <div>
          <p
            className="font-display"
            style={{
              fontSize: 52,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              marginBottom: '1.35rem',
              color: GOLD,
              textShadow: `
                0  1px 0 rgba(255,245,220,0.22),
                0 -1px 0 rgba(0,0,0,0.60),
                0  0  12px rgba(201,169,110,0.18)
              `,
            }}
          >
            RL
</p>

          <GrooveRule mb="1rem" />

          <p
            className="font-sans uppercase"
            style={{
              fontSize: 8.5,
              letterSpacing: '0.28em',
              color: GOLD_DIM,
              textShadow: '0 0.5px 0 rgba(255,245,220,0.10), 0 -0.5px 0 rgba(0,0,0,0.40)',
            }}
          >
            Patron Support
          </p>
        </div>

        {/* ── Body copy ───────────────────────────────────────────────── */}
        <p
          className="font-sans"
          style={{
            fontSize: 11,
            lineHeight: 1.75,
            letterSpacing: '0.04em',
            color: GOLD_DIM,
            marginTop: '1.10rem',
          }}
        >
          If my work has brought you value, your patronage sustains it.
        </p>

        {/* ── PayPal button ───────────────────────────────────────────── */}
        <div style={{ marginTop: 'auto' }}>
          <GrooveRule mt="1.25rem" mb="1rem" />

          {error ? (
            <p
              className="font-sans uppercase"
              style={{ fontSize: 8.5, letterSpacing: '0.20em', color: GOLD_FAINT }}
            >
              Payment unavailable
            </p>
          ) : (
            /* Gold-framed container for the PayPal iframe */
            <div
              style={{
                border: `1px solid ${GOLD_FAINT}`,
                borderRadius: '6px',
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 0 rgba(201,169,110,0.10)',
              }}
            >
              <div ref={containerRef} />
            </div>
          )}

          <GrooveRule mt="1rem" mb="0.70rem" />

          {/* Footer */}
          <p
            className="font-sans uppercase"
            style={{
              fontSize: 7.5,
              letterSpacing: '0.22em',
              color: 'rgba(201,169,110,0.28)',
            }}
          >
            Capapas · Bacolod City · {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  )
}
