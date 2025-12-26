import type { Metadata } from 'next'
import { Source_Sans_3, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Healing Touch Acupuncture | Traditional Chinese Medicine',
    template: '%s | Healing Touch Acupuncture',
  },
  description:
    'Experience the healing power of traditional acupuncture. Our licensed practitioners provide personalized treatments for pain relief, stress reduction, fertility support, and overall wellness.',
  keywords: [
    'acupuncture',
    'traditional chinese medicine',
    'TCM',
    'pain relief',
    'stress relief',
    'fertility acupuncture',
    'holistic healing',
    'natural medicine',
    'cupping therapy',
    'wellness clinic',
  ],
  authors: [{ name: 'Healing Touch Acupuncture' }],
  creator: 'Healing Touch Acupuncture',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Healing Touch Acupuncture',
    title: 'Healing Touch Acupuncture | Traditional Chinese Medicine',
    description:
      'Experience the healing power of traditional acupuncture. Personalized treatments for pain relief, stress reduction, and overall wellness.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Healing Touch Acupuncture Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healing Touch Acupuncture | Traditional Chinese Medicine',
    description:
      'Experience the healing power of traditional acupuncture. Personalized treatments for pain relief, stress reduction, and overall wellness.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sourceSans.variable} ${cormorantGaramond.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
