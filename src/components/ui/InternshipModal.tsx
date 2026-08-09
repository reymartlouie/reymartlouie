'use client'

import Image from 'next/image'
import Modal from './Modal'

interface Props {
  view: 'photo' | 'certificate'
  onClose: () => void
}

export default function InternshipModal({ view, onClose }: Props) {
  const isPhoto = view === 'photo'

  return (
    <Modal
      onClose={onClose}
      eyebrow="Ubiquity Global Services"
      title={isPhoto ? 'Internship Photo' : 'Internship Certificate'}
      actions={
        <a
          href={isPhoto ? '/ubiquity-photo.webp' : '/ubiquity-internship.pdf'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150 bg-stone-100 hover:bg-stone-200 text-[#1e1e1e]"
        >
          Open ↗
        </a>
      }
    >
      {isPhoto ? (
        <div className="rounded-2xl overflow-hidden flex justify-center bg-black" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
          <Image
            src="/ubiquity-photo.webp"
            alt="Internship Photo"
            width={2928}
            height={2912}
            sizes="(min-width: 768px) 672px, 100vw"
            className="max-w-full h-auto"
            style={{ maxHeight: '80vh' }}
          />
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
          <iframe
            src="/ubiquity-internship.pdf#toolbar=0"
            className="w-full block"
            style={{ height: '80vh', border: 'none' }}
            title="Internship Certificate"
          />
        </div>
      )}
    </Modal>
  )
}
