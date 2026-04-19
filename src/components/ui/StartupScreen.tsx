'use client'

import { useState, useEffect } from 'react'

export default function StartupScreen() {
  const [fading, setFading] = useState(false)
  const [gone,   setGone]   = useState(false)

  useEffect(() => {
    // Hold long enough for the 80ms bento debounce + first reveal transitions to run
    const t1 = setTimeout(() => setFading(true),  700)
    const t2 = setTimeout(() => setGone(true),   1100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         99999,
        background:     '#000000',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        opacity:        fading ? 0 : 1,
        transition:     fading ? 'opacity 400ms cubic-bezier(0.2,0,0,1)' : 'none',
        pointerEvents:  fading ? 'none' : 'auto',
      }}
    >
      <span
        className="startup-logo"
        style={{
          fontFamily:    'var(--font-archivo-black), sans-serif',
          fontSize:      '1.5rem',
          color:         'rgba(242,242,242,0.45)',
          letterSpacing: '-0.01em',
          animation:     'startupIn 500ms cubic-bezier(0.2,0,0,1) both',
        }}
      >
        Reymart Louie L. Capapas.
      </span>
    </div>
  )
}
