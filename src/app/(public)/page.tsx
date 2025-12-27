import { Metadata } from 'next'
import Hero from '@/components/public/Hero'
import Benefits from '@/components/public/Benefits'
import ServicesPreview from '@/components/public/ServicesPreview'
import Testimonials from '@/components/public/Testimonials'
import AboutPreview from '@/components/public/AboutPreview'
import CTASection from '@/components/public/CTASection'

export const metadata: Metadata = {
  title: 'Healing Touch Acupuncture | Traditional Chinese Medicine & Wellness',
  description:
    'Experience the healing power of traditional acupuncture. Our licensed practitioners provide personalized treatments for pain relief, stress reduction, fertility support, and overall wellness in Healing City.',
  keywords: [
    'acupuncture clinic',
    'traditional chinese medicine',
    'pain relief acupuncture',
    'stress relief treatment',
    'fertility acupuncture',
    'holistic healing',
    'natural wellness',
    'licensed acupuncturist',
  ],
  openGraph: {
    title: 'Healing Touch Acupuncture | Traditional Chinese Medicine',
    description:
      'Experience the healing power of traditional acupuncture. Personalized treatments for pain relief, stress reduction, and overall wellness.',
    type: 'website',
  },
}

// JSON-LD Schema for Local Business
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': 'https://healingtouch.com',
  name: 'Healing Touch Acupuncture',
  description:
    'Traditional Chinese medicine and acupuncture clinic providing personalized treatments for pain relief, stress reduction, and overall wellness.',
  url: 'https://healingtouch.com',
  telephone: '+1-123-456-7890',
  email: 'info@healingtouch.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Wellness Street, Suite 100',
    addressLocality: 'Healing City',
    addressRegion: 'HC',
    postalCode: '12345',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.7128',
    longitude: '-74.0060',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '14:00',
    },
  ],
  priceRange: '$$',
  image: 'https://healingtouch.com/images/clinic.jpg',
  sameAs: [
    'https://facebook.com/healingtouchacupuncture',
    'https://instagram.com/healingtouchacupuncture',
  ],
  medicalSpecialty: [
    'Acupuncture',
    'Traditional Chinese Medicine',
    'Pain Management',
    'Stress Relief',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '200',
  },
}

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Page sections */}
      <Hero />
      <Benefits />
      <ServicesPreview />
      <AboutPreview />
      <Testimonials />
      <CTASection />
    </>
  )
}




