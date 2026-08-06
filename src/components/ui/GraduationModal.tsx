'use client'

import Modal from './Modal'

interface Props {
  view: 'photo' | 'diploma'
  onClose: () => void
}

export default function GraduationModal({ view, onClose }: Props) {
  const isPhoto = view === 'photo'

  return (
    <Modal
      onClose={onClose}
      eyebrow="University of St. La Salle"
      title={isPhoto ? 'Graduation Photo' : 'Graduation Diploma'}
      actions={
        <a
          href={isPhoto ? '/graduation.webp' : '/diploma.webp'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150 bg-stone-100 hover:bg-stone-200 text-stone-600"
        >
          Open ↗
        </a>
      }
    >
      <div className="rounded-2xl overflow-hidden flex justify-center bg-black" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
        <img
          src={isPhoto ? '/graduation.webp' : '/diploma.webp'}
          alt={isPhoto ? 'Graduation Photo' : 'Graduation Diploma'}
          className="max-w-full h-auto"
          style={{ maxHeight: '80vh' }}
        />
      </div>
    </Modal>
  )
}
