import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft, Clock, DollarSign, Check, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { services, getServiceBySlug } from '@/data/services'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.name} | Acupuncture Treatment`,
    description: service.description.slice(0, 160),
    keywords: [
      service.name.toLowerCase(),
      'acupuncture treatment',
      ...service.conditions.map((c) => c.toLowerCase()),
      'traditional chinese medicine',
    ],
    openGraph: {
      title: `${service.name} | Healing Touch Acupuncture`,
      description: service.shortDesc,
      type: 'article',
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const Icon = service.icon

  // Get related services (excluding current)
  const relatedServices = services
    .filter((s) => s.slug !== slug)
    .slice(0, 2)

  // Schema markup for service
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.description,
    procedureType: 'Therapeutic',
    bodyLocation: 'Full body',
    preparation: service.whatToExpect.join('. '),
    howPerformed: 'Acupuncture treatment using sterile, single-use needles',
    followup: 'Follow-up sessions recommended based on condition',
    status: 'Available',
  }

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li className="text-foreground font-medium">{service.name}</li>
            </ol>
          </nav>

          {/* Hero section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            {/* Service image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                {service.name}
              </h1>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">{service.duration} minutes</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-foreground">
                  <DollarSign className="h-5 w-5" />
                  <span className="font-medium">${service.price}</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Book button */}
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={`/book?service=${service.slug}`}>
                  Book This Treatment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Benefits */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                Key Benefits
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditions treated */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                Conditions Treated
              </h2>
              <ul className="space-y-4">
                {service.conditions.map((condition) => (
                  <li key={condition} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-muted-foreground">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to expect */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                What to Expect
              </h2>
              <ul className="space-y-4">
                {service.whatToExpect.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-medium text-foreground">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related services */}
          <div className="border-t border-border pt-16">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">
              Explore Other Treatments
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedServices.map((related) => {
                const RelatedIcon = related.icon
                return (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="group flex gap-6 p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-primary/30 transition-all"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {related.shortDesc}
                      </p>
                      <span className="inline-flex items-center text-primary text-sm font-medium">
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-12">
            <Link
              href="/services"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Services
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

