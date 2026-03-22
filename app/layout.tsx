import type { Metadata } from 'next'
import { Inter, Archivo_Black } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${archivoBlack.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}` }} />
      </head>
      <body>
        <div
          aria-hidden="true"
          className="layout-wallpaper"
          style={{
            position: 'fixed', inset: 0, zIndex: 0,
            backgroundImage: 'url(/wallpaper.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.06)',
          }}
        />
        <div aria-hidden="true" className="layout-overlay" style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  )
}
