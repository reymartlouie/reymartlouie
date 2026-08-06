'use client'

import Modal from './Modal'

const RESUME_URL = '/Reymart_Louie_Capapas_resume.pdf'

interface Props {
  onClose: () => void
}

export default function ResumeModal({ onClose }: Props) {
  return (
    <Modal
      onClose={onClose}
      eyebrow="Reymart Louie L. Capapas"
      title="Resume"
      actions={
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-spring inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150 bg-stone-100 hover:bg-stone-200 text-[#1e1e1e]"
        >
          Open ↗
        </a>
      }
    >
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
        <iframe
          src={`${RESUME_URL}#toolbar=0`}
          className="w-full block"
          style={{ height: '80vh', border: 'none' }}
          title="Resume"
        />
      </div>
    </Modal>
  )
}
