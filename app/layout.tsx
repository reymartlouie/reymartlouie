import type { Metadata } from 'next'
import { Inter, Archivo_Black } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Reymart Louie — Portfolio',
  description: 'Design engineer crafting thoughtful digital experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable}`}>
      <body>
        {/* Fixed wallpaper — blurred, toned down */}
        <div
          aria-hidden="true"
          style={{
            position:           'fixed',
            inset:              0,
            zIndex:             0,
            backgroundImage:    'url(/wallpaper.jpg)',
            backgroundSize:     'cover',
            backgroundPosition: 'center',
            filter:             'blur(32px) saturate(110%) brightness(0.22)',
            transform:          'scale(1.06)',
          }}
        />
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'rgba(0,0,0,0.55)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </body>
    </html>
  )
}
