'use client'

import { useState, useEffect, type ReactNode } from 'react'
import LockScreen from './LockScreen'

export default function LockGate({ children }: { children: ReactNode }) {
  const [locked,   setLocked]   = useState(true)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('portfolio-unlocked') === '1') {
      setLocked(false)
      setRevealed(true)
    }
  }, [])

  const unlock = () => {
    sessionStorage.setItem('portfolio-unlocked', '1')
    setLocked(false)
    // slight delay so it starts after lockscreen begins fading
    setTimeout(() => setRevealed(true), 100)
  }

  return (
    <>
      {locked && <LockScreen onUnlock={unlock} />}
      <div
        style={{
          opacity:    revealed ? 1 : 0,
          transition: revealed ? 'opacity 600ms cubic-bezier(0.2,0,0,1)' : 'none',
        }}
      >
        {children}
      </div>
    </>
  )
}
