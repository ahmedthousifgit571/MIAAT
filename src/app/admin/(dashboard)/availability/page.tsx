'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Save, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Availability {
  id?: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
}

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const defaultAvailability: Availability[] = [
  { dayOfWeek: 0, startTime: '09:00', endTime: '17:00', isActive: false },
  { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true },
  { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isActive: true },
  { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isActive: true },
  { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isActive: true },
  { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isActive: true },
  { dayOfWeek: 6, startTime: '10:00', endTime: '14:00', isActive: true },
]

export default function AvailabilityPage() {
  const [availability, setAvailability] =
    useState<Availability[]>(defaultAvailability)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [savedDay, setSavedDay] = useState<number | null>(null)

  useEffect(() => {
    fetchAvailability()
  }, [])

  async function fetchAvailability() {
    setIsLoading(true)
    try {
      // For now, just use defaults since we don't have a specific endpoint
      setAvailability(defaultAvailability)
    } catch (error) {
      console.error('Failed to fetch availability:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function saveDay(day: Availability) {
    setIsSaving(true)
    setSavedDay(day.dayOfWeek)
    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(day),
      })

      if (response.ok) {
        // Show success briefly
        setTimeout(() => setSavedDay(null), 2000)
      }
    } catch (error) {
      console.error('Failed to save availability:', error)
    } finally {
      setIsSaving(false)
    }
  }

  function updateDay(index: number, updates: Partial<Availability>) {
    setAvailability((prev) =>
      prev.map((day, i) => (i === index ? { ...day, ...updates } : day))
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
          Availability
        </h1>
        <p className="text-muted-foreground">
          Set your clinic&apos;s operating hours for each day of the week
        </p>
      </div>

      {/* Availability cards */}
      <div className="grid gap-4">
        {availability.map((day, index) => (
          <Card
            key={day.dayOfWeek}
            className={cn(!day.isActive && 'opacity-60')}
          >
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Day name and toggle */}
                <div className="flex items-center gap-4 sm:w-48">
                  <Switch
                    checked={day.isActive}
                    onCheckedChange={(checked) =>
                      updateDay(index, { isActive: checked })
                    }
                  />
                  <span
                    className={cn(
                      'font-medium',
                      day.isActive ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {dayNames[day.dayOfWeek]}
                  </span>
                </div>

                {/* Time inputs */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor={`start-${index}`}
                      className="text-sm text-muted-foreground"
                    >
                      Open
                    </Label>
                    <Input
                      id={`start-${index}`}
                      type="time"
                      value={day.startTime}
                      onChange={(e) =>
                        updateDay(index, { startTime: e.target.value })
                      }
                      disabled={!day.isActive}
                      className="w-32"
                    />
                  </div>
                  <span className="text-muted-foreground">to</span>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor={`end-${index}`}
                      className="text-sm text-muted-foreground"
                    >
                      Close
                    </Label>
                    <Input
                      id={`end-${index}`}
                      type="time"
                      value={day.endTime}
                      onChange={(e) =>
                        updateDay(index, { endTime: e.target.value })
                      }
                      disabled={!day.isActive}
                      className="w-32"
                    />
                  </div>
                </div>

                {/* Save button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => saveDay(day)}
                  disabled={isSaving && savedDay === day.dayOfWeek}
                >
                  {isSaving && savedDay === day.dayOfWeek ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : savedDay === day.dayOfWeek ? (
                    <>
                      <Save className="h-4 w-4 mr-2 text-green-600" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info box */}
      <div className="mt-8 bg-secondary/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">
              How Availability Works
            </h3>
            <p className="text-sm text-muted-foreground">
              These hours determine when patients can book appointments online.
              Time slots are generated in 30-minute intervals within your
              operating hours. Appointments that are already booked will not be
              affected by changes to availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

