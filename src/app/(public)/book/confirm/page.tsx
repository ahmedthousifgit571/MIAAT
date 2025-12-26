'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

function ConfirmContent() {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress indicator - all complete */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {['Service', 'Date & Time', 'Details', 'Confirm'].map(
              (step, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    ✓
                  </div>
                  <span
                    className={cn(
                      'hidden sm:block text-sm',
                      index === 3
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step}
                  </span>
                  {index < 3 && (
                    <div className="w-8 h-0.5 bg-primary hidden sm:block" />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Success message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4 animate-fade-in-up">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground animate-fade-in-up delay-100">
            Thank you for booking with Healing Touch Acupuncture.
            <br />
            We&apos;ll confirm your appointment shortly.
          </p>
          {appointmentId && (
            <p className="text-sm text-muted-foreground mt-4 animate-fade-in-up delay-200">
              Reference ID: <code className="bg-muted px-2 py-1 rounded">{appointmentId}</code>
            </p>
          )}
        </div>

        {/* What happens next */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8 animate-fade-in-up delay-200">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
            What Happens Next?
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">
                1
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  Confirmation Call
                </h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll call you within 24 hours to confirm your appointment
                  and answer any questions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">
                2
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  Prepare for Your Visit
                </h3>
                <p className="text-sm text-muted-foreground">
                  Eat a light meal 1-2 hours before. Wear comfortable, loose
                  clothing. Bring a list of current medications.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">
                3
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  Arrive on Time
                </h3>
                <p className="text-sm text-muted-foreground">
                  Please arrive 10-15 minutes early for your first visit to
                  complete intake forms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic info */}
        <div className="bg-secondary/30 rounded-2xl p-8 mb-8 animate-fade-in-up delay-300">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
            Clinic Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Address</div>
                <div className="text-sm text-muted-foreground">
                  123 Wellness Street, Suite 100
                  <br />
                  Healing City, HC 12345
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Hours</div>
                <div className="text-sm text-muted-foreground">
                  Mon-Fri: 9:00 AM - 5:00 PM
                  <br />
                  Saturday: 10:00 AM - 2:00 PM
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Phone</div>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-primary hover:underline"
                >
                  (+91) 9841756639
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Email</div>
                <a
                  href="mailto:info@healingtouch.com"
                  className="text-sm text-primary hover:underline"
                >
                  info@healingtouch.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/">
              Return to Home
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8"
          >
            <Link href="/faq">Prepare for Your Visit</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-20 text-center">Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  )
}

