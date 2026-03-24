import type { Metadata } from 'next'
import { Inter, Archivo_Black } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
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

const SITE_URL = 'https://reymartlouie.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Reymart Louie — Computer Engineer & Developer',
  description:
    'Computer Engineering student at USLS – Bacolod. I design, build, and ship production-ready apps — React Native, TypeScript, Supabase, and Next.js.',
  keywords: ['Computer Engineer', 'React Native', 'TypeScript', 'Supabase', 'Next.js', 'USLS', 'Bacolod', 'Portfolio'],
  authors: [{ name: 'Reymart Louie L. Capapas' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Reymart Louie — Computer Engineer & Developer',
    description:
      'Computer Engineering student at USLS – Bacolod. I design, build, and ship production-ready apps — React Native, TypeScript, Supabase, and Next.js.',
    siteName: 'Reymart Louie Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reymart Louie — Computer Engineer & Developer',
    description:
      'Computer Engineering student at USLS – Bacolod. React Native · TypeScript · Supabase · Next.js',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${archivoBlack.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}` }} />
      </head>
      <body>
        <div aria-hidden="true" className="layout-overlay" style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ThemeProvider>{children}</ThemeProvider>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
