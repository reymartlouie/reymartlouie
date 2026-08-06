'use client'

import { useEffect } from 'react'
import Modal from './Modal'

interface Props {
  badges: { id: string }[]
  onClose: () => void
}

export default function BadgesModal({ badges, onClose }: Props) {
  // Re-inject Credly embed script so it processes the freshly-mounted badge divs
  useEffect(() => {
    const existing = document.querySelector('script[src*="credly.com"]')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.src = '//cdn.credly.com/assets/utilities/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => { if (document.body.contains(script)) document.body.removeChild(script) }
  }, [])

  return (
    <Modal onClose={onClose} eyebrow="Supplemental" title="Badges">
      <div className="flex flex-wrap gap-8">
        {badges.map(({ id }) => (
          <div key={id} className="flex flex-col items-center gap-4">
            <div
              data-iframe-width="150"
              data-iframe-height="270"
              data-share-badge-id={id}
              data-share-badge-host="https://www.credly.com"
            />
            <a
              href={`https://www.credly.com/badges/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-[#1e1e1e] text-sm font-sans font-medium transition-colors duration-150 bg-stone-100 hover:bg-stone-200"
            >
              Verify on Credly ↗
            </a>
          </div>
        ))}
      </div>
    </Modal>
  )
}
