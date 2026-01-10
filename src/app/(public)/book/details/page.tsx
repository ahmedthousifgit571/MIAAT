'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, ArrowLeft, Calendar, Clock, Loader2 } from 'lucide-react'
import { getServiceBySlug } from '@/data/services'
import { cn } from '@/lib/utils'
import { format, parse } from 'date-fns'

function DetailsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const serviceSlug = searchParams.get('service')
  const dateStr = searchParams.get('date')
  const time = searchParams.get('time')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const service = serviceSlug ? getServiceBySlug(serviceSlug) : null
  const date = dateStr ? parse(dateStr, 'yyyy-MM-dd', new Date()) : null

  useEffect(() => {
    if (!serviceSlug || !dateStr || !time) {
      router.push('/book')
    }
  }, [serviceSlug, dateStr, time, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !service) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: service.slug,
          date: dateStr,
          time,
          patientName: formData.name,
          patientEmail: formData.email,
          patientPhone: formData.phone,
          notes: formData.notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book appointment')
      }

      // Redirect to confirmation page with appointment ID
      router.push(`/book/confirm?id=${data.id}`)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to book appointment'
      setErrors({ submit: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!service || !date || !time) {
    return null
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
                      index <= 2
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {index < 2 ? '✓' : index + 1}
                  </div>
                  <span
                    className={cn(
                      'hidden sm:block text-sm',
                      index === 2
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step}
                  </span>
                  {index < 3 && (
                    <div
                      className={cn(
                        'w-8 h-0.5 hidden sm:block',
                        index < 2 ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Booking summary */}
        <div className="bg-secondary/30 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4">
            Booking Summary
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Treatment</span>
              <p className="font-medium text-foreground">{service.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Date
              </span>
              <p className="font-medium text-foreground">
                {format(date, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Time
              </span>
              <p className="font-medium text-foreground">{time}</p>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Your Details
          </h1>
          <p className="text-muted-foreground">
            Please provide your contact information to complete the booking.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={cn(
                  'rounded-lg',
                  errors.name && 'border-destructive'
                )}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={cn(
                  'rounded-lg',
                  errors.email && 'border-destructive'
                )}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(+91) 9841756639"
                className={cn(
                  'rounded-lg',
                  errors.phone && 'border-destructive'
                )}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">
                Additional Notes{' '}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any health concerns or questions you'd like us to know about..."
                rows={4}
                className="rounded-lg resize-none"
              />
            </div>

            {errors.submit && (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                {errors.submit}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Link
                href={`/book/schedule?service=${serviceSlug}`}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
              <Button
                type="submit"
                size="lg"
                className="rounded-full px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    Complete Booking
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-20 text-center">Loading...</div>}>
      <DetailsContent />
    </Suspense>
  )
}

