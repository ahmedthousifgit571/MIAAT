'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { ArrowRight, ArrowLeft, Clock, Loader2 } from 'lucide-react'
import { getServiceBySlug } from '@/data/services'
import { cn } from '@/lib/utils'
import { format, addDays, startOfDay } from 'date-fns'

function ScheduleContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const serviceSlug = searchParams.get('service')

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<
    { time: string; available: boolean }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const service = serviceSlug ? getServiceBySlug(serviceSlug) : null

  useEffect(() => {
    if (!serviceSlug) {
      router.push('/book')
    }
  }, [serviceSlug, router])

  useEffect(() => {
    async function fetchAvailability() {
      if (!selectedDate || !service) return

      setIsLoading(true)
      setError(null)
      setSelectedTime(null)

      try {
        const response = await fetch(
          `/api/availability?date=${format(selectedDate, 'yyyy-MM-dd')}&serviceId=${service.id}`
        )
        const data = await response.json()

        if (!data.available) {
          setError(data.reason)
          setAvailableSlots([])
        } else {
          setAvailableSlots(data.slots)
        }
      } catch {
        setError('Failed to load available times')
        setAvailableSlots([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailability()
  }, [selectedDate, service])

  const handleContinue = () => {
    if (selectedDate && selectedTime && serviceSlug) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd')
      router.push(
        `/book/details?service=${serviceSlug}&date=${dateStr}&time=${selectedTime}`
      )
    }
  }

  if (!service) {
    return null
  }

  // Disable past dates and dates more than 60 days in the future
  const disabledDays = [
    { before: startOfDay(new Date()) },
    { after: addDays(new Date(), 60) },
  ]

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
                      index <= 1
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {index < 1 ? '✓' : index + 1}
                  </div>
                  <span
                    className={cn(
                      'hidden sm:block text-sm',
                      index === 1
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
                        index < 1 ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Selected service summary */}
        <div className="bg-secondary/30 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">
              Selected treatment:
            </span>
            <h3 className="font-semibold text-foreground">{service.name}</h3>
          </div>
          <Link
            href="/book"
            className="text-sm text-primary hover:underline"
          >
            Change
          </Link>
        </div>

        {/* Page content */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Select Date & Time
          </h1>
          <p className="text-muted-foreground">
            Choose your preferred appointment date and time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Calendar */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">Select Date</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              className="rounded-md"
            />
          </div>

          {/* Time slots */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">
              Available Times
            </h2>

            {!selectedDate ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Please select a date first</p>
              </div>
            ) : isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">
                  Loading available times...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>{error}</p>
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No available times for this date</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() =>
                      slot.available && setSelectedTime(slot.time)
                    }
                    disabled={!slot.available}
                    className={cn(
                      'py-2 px-3 rounded-lg text-sm font-medium transition-all',
                      selectedTime === slot.time
                        ? 'bg-primary text-primary-foreground'
                        : slot.available
                        ? 'bg-secondary hover:bg-secondary/80 text-foreground'
                        : 'bg-muted text-muted-foreground cursor-not-allowed line-through'
                    )}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/book"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
          <Button
            size="lg"
            className="rounded-full px-8"
            disabled={!selectedDate || !selectedTime}
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

export default function SchedulePage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-20 text-center">Loading...</div>}>
      <ScheduleContent />
    </Suspense>
  )
}

