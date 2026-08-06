'use client'

import Modal from './Modal'

interface Props {
  onClose: () => void
}

export default function UIUXModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose} eyebrow="Coming Soon" title="UI/UX Projects.">
      <div className="flex flex-col items-center text-center gap-6 py-4">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%)', border: '1px solid rgba(99,102,241,0.14)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" />
            <circle cx="12" cy="12" r="1.5" fill="rgba(99,102,241,0.8)" stroke="none" />
          </svg>
        </div>

        <div className="flex flex-col gap-2 max-w-sm">
          <h3 className="font-display text-2xl text-[#1e1e1e]">Design work on the way.</h3>
          <p className="font-sans text-base leading-relaxed text-[#1e1e1e]">
            Case studies, wireframes, and high-fidelity prototypes will live here soon. In the meantime, explore the existing portfolio.
          </p>
        </div>

        <a
          href="https://reymartlouie.framer.website"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-sm transition-colors duration-150"
          style={{ background: 'rgba(99,102,241,0.10)', color: 'rgba(79,70,229,1)', border: '1px solid rgba(99,102,241,0.18)' }}
        >
          View Framer Portfolio ↗
        </a>
      </div>
    </Modal>
  )
}
