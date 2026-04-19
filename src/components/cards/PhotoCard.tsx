'use client'

export default function PhotoCard() {
  return (
    <div
      className="@container flex-1 rounded-[32px] relative overflow-hidden min-h-[340px] @md:min-h-[380px]"
      style={{ background: 'linear-gradient(160deg, #0d2952 0%, #081a36 50%, #040e1c 100%)' }}
    >
      <img
        src="/photo.webp"
        alt="Reymart Louie"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
        <p className="font-sans text-white/50 text-[10px] uppercase tracking-widest mb-1.5">Class of 2026 · USLS</p>
        <p className="font-display text-white text-[28px] @sm:text-[32px] @md:text-[36px] leading-[0.95] drop-shadow-lg">
          Reymart Louie<br />L. Capapas
        </p>
        <p className="font-sans text-white/35 text-xs mt-2">USLS · Bacolod</p>
      </div>
    </div>
  )
}
