'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window { paypal?: any }
}

import { paypalTheme } from '@/lib/colors'

const PLAN_ID    = 'P-4GE25783A47486257NIBUGZQ'
const CLIENT_ID  = 'AcVZ6SWZR7p3g536HW08I_nNE37eShsGnuvDybsP4aRjtM8XWKHpi0wY3urTpzZ4LDgRlh0dP1MlRaa4'
const SDK_SRC    = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&vault=true&intent=subscription`

const BLUE        = paypalTheme.blue
const WHITE_DIM   = paypalTheme.whiteDim
const WHITE_FAINT = paypalTheme.whiteFaint

function GrooveRule({ mb = '1.25rem', mt = '0' }: { mb?: string; mt?: string }) {
  return (
    <div style={{ marginBottom: mb, marginTop: mt }}>
      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.12)' }} />
      <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.50)' }} />
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
        backgroundImage: 'url(/paypal-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: `
          inset 0  1px 0 rgba(255,255,255,0.08),
          inset 0 -1px 0 rgba(0,0,0,0.60),
          0 20px 50px rgba(0,0,0,0.22),
          0  4px 14px rgba(0,0,0,0.14)
        `,
      }}
    >
      {/* dark wash so content stays readable over the tap-to-pay photo, deepening toward the footer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(185deg, rgba(6,8,14,0.42) 0%, rgba(4,6,10,0.62) 45%, rgba(2,3,6,0.86) 100%)' }}
      />

      <div
        className="absolute -top-14 left-1/2 -translate-x-1/2 w-52 h-28 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(0,156,222,0.10)' }}
      />

      <div
        className="relative flex flex-col h-full text-center md:text-left"
        style={{ padding: '1.85rem 1.85rem' }}
      >

        {/* ── Heart ───────────────────────────────────────────────────── */}
        <div>
          <style>{`
            @keyframes heartFlip {
              0%   { transform: rotateY(0deg); }
              100% { transform: rotateY(360deg); }
            }
            @keyframes twinkle {
              0%, 100% { opacity: 0; transform: scale(0.5); }
              50%       { opacity: 1; transform: scale(1); }
            }
          `}</style>

          <div style={{ perspective: '140px', display: 'inline-block', marginBottom: '1.35rem' }}>
            <div style={{ animation: 'heartFlip 3.6s linear infinite', transformStyle: 'preserve-3d', display: 'inline-block', position: 'relative' }}>
              {/* Sparkles */}
              {[
                { top: '-6px',  left: '42px',  size: 5,   delay: '0s',   dur: '2.1s' },
                { top: '4px',   left: '58px',  size: 3.5, delay: '0.6s', dur: '1.8s' },
                { top: '-10px', left: '22px',  size: 4,   delay: '1.1s', dur: '2.4s' },
                { top: '18px',  left: '62px',  size: 3,   delay: '0.3s', dur: '1.6s' },
                { top: '-4px',  left: '6px',   size: 3.5, delay: '1.5s', dur: '2.0s' },
                { top: '30px',  left: '-4px',  size: 2.5, delay: '0.9s', dur: '2.3s' },
              ].map((s, i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    top: s.top,
                    left: s.left,
                    width: s.size,
                    height: s.size,
                    borderRadius: '50%',
                    background: BLUE,
                    boxShadow: '0 0 4px 1px rgba(0,156,222,0.6)',
                    animation: `twinkle ${s.dur} ${s.delay} ease-in-out infinite`,
                    opacity: 0,
                  }}
                />
              ))}

              <p
                className="font-display font-black"
                style={{
                  fontSize: 56,
                  lineHeight: 1.05,
                  color: BLUE,
                  textShadow: '0 0 24px rgba(0,156,222,0.35), 0 -1px 0 rgba(0,0,0,0.60)',
                }}
              >
                ♥
              </p>
            </div>
          </div>

          <GrooveRule mb="1rem" />

          <p
            className="font-sans uppercase"
            style={{
              fontSize: 8.5,
              letterSpacing: '0.28em',
              color: WHITE_DIM,
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
            color: WHITE_DIM,
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
              style={{ fontSize: 8.5, letterSpacing: '0.20em', color: WHITE_FAINT }}
            >
              Payment unavailable
            </p>
          ) : (
            <div
              style={{
                border: `1px solid ${WHITE_FAINT}`,
                borderRadius: '6px',
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
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
              color: 'rgba(255,255,255,0.22)',
            }}
          >
            Capapas · Bacolod City · {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  )
}
