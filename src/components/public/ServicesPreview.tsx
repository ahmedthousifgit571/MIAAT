import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, DollarSign } from 'lucide-react'
import { services } from '@/data/services'

export default function ServicesPreview() {
  // Show only first 3 services on homepage
  const featuredServices = services.slice(0, 3)

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
            Our Treatments
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Personalized Healing Services
          </h2>
          <p className="text-lg text-muted-foreground">
            From traditional acupuncture to specialized treatments, we offer a
            comprehensive range of services tailored to your unique health needs.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block"
              >
                <article className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
                  {/* Service image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {service.shortDesc}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${service.price}
                      </span>
                    </div>

                    {/* CTA */}
                    <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8"
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

