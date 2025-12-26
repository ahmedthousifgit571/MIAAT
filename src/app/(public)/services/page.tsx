import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, DollarSign } from 'lucide-react'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Acupuncture Services & Treatments',
  description:
    'Explore our comprehensive range of acupuncture services including Acupuncture, Facial/Cosmetic Acupuncture and Cupping, Dry Cupping, Fire Cupping, Herbal Cupping, Wet Cupping (Hijama), and Reflexology.',
  keywords: [
    'acupuncture services',
    'acupuncture',
    'facial acupuncture',
    'cosmetic acupuncture',
    'dry cupping therapy',
    'fire cupping',
    'herbal cupping',
    'wet cupping',
    'hijama',
    'reflexology',
  ],
  openGraph: {
    title: 'Acupuncture Services & Treatments | MIAT',
    description:
      'Explore our comprehensive range of acupuncture and cupping services tailored to your unique health needs.',
  },
}

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
            Our Services
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Healing Treatments for Every Need
          </h1>
          <p className="text-lg text-muted-foreground">
            From traditional acupuncture to specialized therapies, we offer a
            comprehensive range of services designed to address your unique health
            concerns and promote lasting wellness.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block"
              >
                <article
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full flex flex-col animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Service image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {service.shortDesc}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        {service.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-primary" />
                        ${service.price}
                      </span>
                    </div>

                    {/* CTA */}
                    <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-secondary/50 rounded-2xl p-8 lg:p-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Not Sure Which Treatment is Right for You?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Schedule a free 15-minute consultation to discuss your health concerns
            and learn which of our treatments would be most beneficial for you.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Book Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

