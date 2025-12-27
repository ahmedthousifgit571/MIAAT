import { Metadata } from 'next'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ArrowRight, HelpCircle } from 'lucide-react'
import { faqs } from '@/data/faqs'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Acupuncture',
  description:
    'Get answers to common questions about acupuncture, including what to expect during treatment, safety, conditions treated, and more. Learn everything you need to know before your first visit.',
  keywords: [
    'acupuncture FAQ',
    'acupuncture questions',
    'is acupuncture safe',
    'does acupuncture hurt',
    'what does acupuncture treat',
    'acupuncture benefits',
    'first acupuncture visit',
  ],
  openGraph: {
    title: 'Acupuncture FAQ | Healing Touch Acupuncture',
    description:
      'Find answers to all your acupuncture questions. Learn about safety, benefits, and what to expect.',
  },
}

// Generate FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about acupuncture and our treatments.
              Can&apos;t find what you&apos;re looking for?{' '}
              <Link href="/contact" className="text-primary hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>

          {/* FAQ accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-6 [&[data-state=open]]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Still have questions CTA */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-secondary/50 rounded-2xl p-8 lg:p-12 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Our team is here to help. Schedule a free 15-minute consultation
                to discuss your specific concerns and learn how acupuncture can
                help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/book">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Additional resources */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">
              Learn More About Acupuncture
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link
                href="/videos"
                className="group flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Watch Educational Videos
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Visual guides about acupuncture
                  </div>
                </div>
              </Link>

              <Link
                href="/services"
                className="group flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                  <svg
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Explore Our Services
                  </div>
                  <div className="text-sm text-muted-foreground">
                    See our treatment options
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}




