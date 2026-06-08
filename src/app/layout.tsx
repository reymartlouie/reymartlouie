import type { Metadata, Viewport } from 'next'
import { Inter, Archivo_Black } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import StartupScreen from '@/components/ui/StartupScreen'
import BgOverlay from '@/components/ui/BgOverlay'
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

const SITE_URL = 'https://reymartlouie.vercel.app'

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: 'transparent',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Reymart Louie — Computer Engineer & Developer',
    template: '%s | Reymart Louie',
  },
  description:
    'BS Computer Engineering graduate (USLS · Bacolod, PH). I design, build, and ship production-ready mobile and web apps — React Native, TypeScript, Supabase, Next.js. Open to full-time opportunities.',
  keywords: [
    'Reymart Louie Capapas',
    'Computer Engineer Philippines',
    'React Native Developer',
    'TypeScript Developer',
    'Next.js Developer',
    'Mobile App Developer',
    'Frontend Developer',
    'Supabase',
    'USLS',
    'Bacolod City',
    'Philippines',
    'FireSafe',
    'Gracey Logistics',
    'TinyML',
    'Expo',
    'Portfolio',
  ],
  authors: [{ name: 'Reymart Louie L. Capapas', url: SITE_URL }],
  creator: 'Reymart Louie L. Capapas',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Reymart Louie — Computer Engineer & Developer',
    description:
      'BS Computer Engineering graduate (USLS · Bacolod, PH). Building production-ready mobile and web apps — React Native, TypeScript, Supabase, Next.js. Open to full-time opportunities.',
    siteName: 'Reymart Louie',
    locale: 'en_PH',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Reymart Louie — Computer Engineer & Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reymart Louie — Computer Engineer & Developer',
    description:
      'BS Computer Engineering graduate (USLS · Bacolod). React Native · TypeScript · Supabase · Next.js. Open to opportunities.',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  other: {
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Reymart Louie',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Reymart Louie L. Capapas',
  url: SITE_URL,
  jobTitle: 'Computer Engineer',
  description: 'BS Computer Engineering graduate from USLS Bacolod. Specializes in React Native, TypeScript, Supabase, and Next.js.',
  email: 'reymartlouie.capapas@gmail.com',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of St. La Salle',
    address: { '@type': 'PostalAddress', addressLocality: 'Bacolod City', addressCountry: 'PH' },
  },
  knowsAbout: ['React Native', 'TypeScript', 'Supabase', 'Next.js', 'Python', 'TinyML', 'Figma', 'Arduino'],
  sameAs: [
    'https://github.com/reymartlouie',
    'https://www.linkedin.com/in/reymart-louie-capapas-b0063718b',
    'https://reymartlouie.framer.website',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <StartupScreen />
        <BgOverlay />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
