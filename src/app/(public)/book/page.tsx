'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Check, Clock, DollarSign } from 'lucide-react'
import { services } from '@/data/services'
import { cn } from '@/lib/utils'

function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const preSelectedService = searchParams.get('service')
  
  const [selectedService, setSelectedService] = useState<string | null>(
    preSelectedService || null
  )

  const handleContinue = () => {
    if (selectedService) {
      router.push(`/book/schedule?service=${selectedService}`)
    }
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {['Service', 'Date & Time', 'Details', 'Confirm'].map(
              (step, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                      index === 0
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={cn(
                      'hidden sm:block text-sm',
                      index === 0
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step}
                  </span>
                  {index < 3 && (
                    <div className="w-8 h-0.5 bg-muted hidden sm:block" />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Page content */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Select a Treatment
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose the treatment that best addresses your health needs. Not sure
            which one is right for you?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>{' '}
            for guidance.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {services.map((service) => {
            const Icon = service.icon
            const isSelected = selectedService === service.slug
            return (
              <button
                key={service.slug}
                onClick={() => setSelectedService(service.slug)}
                className={cn(
                  'p-6 rounded-xl border-2 text-left transition-all',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                      isSelected ? 'bg-primary/20' : 'bg-primary/10'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-6 w-6',
                        isSelected ? 'text-primary' : 'text-primary/70'
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">
                        {service.name}
                      </h3>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${service.price}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/services"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
          <Button
            size="lg"
            className="rounded-full px-8"
            disabled={!selectedService}
            onClick={handleContinue}
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function BookingLoading() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingContent />
    </Suspense>
  )
}
