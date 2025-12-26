'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  CheckCircle,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnalyticsData {
  overview: {
    totalAppointments: number
    currentMonthAppointments: number
    lastMonthAppointments: number
    growthPercentage: number
    completedAppointments: number
    cancelledAppointments: number
    completionRate: number
    totalPatients: number
  }
  byService: { name: string; count: number }[]
  byStatus: { status: string; count: number }[]
  weeklyTrend: { day: string; appointments: number; completed: number }[]
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-500',
  CONFIRMED: 'bg-blue-500',
  COMPLETED: 'bg-green-500',
  CANCELLED: 'bg-red-500',
  RESCHEDULED: 'bg-purple-500',
  NO_SHOW: 'bg-gray-500',
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  async function fetchAnalytics() {
    setIsLoading(true)
    try {
      const response = await fetch('/api/analytics')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Failed to load analytics data
      </div>
    )
  }

  const maxWeeklyAppointments = Math.max(
    ...data.weeklyTrend.map((d) => d.appointments),
    1
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
          Analytics
        </h1>
        <p className="text-muted-foreground">
          Track your clinic&apos;s performance and growth
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Appointments
            </CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {data.overview.totalAppointments}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
            {data.overview.growthPercentage >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {data.overview.currentMonthAppointments}
            </div>
            <p
              className={cn(
                'text-xs mt-1',
                data.overview.growthPercentage >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
              )}
            >
              {data.overview.growthPercentage >= 0 ? '+' : ''}
              {data.overview.growthPercentage}% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {data.overview.completionRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.overview.completedAppointments} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Patients
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {data.overview.totalPatients}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Unique patients</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly trend chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              This Week&apos;s Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.weeklyTrend.map((day) => (
                <div key={day.day} className="flex items-center gap-4">
                  <span className="w-10 text-sm text-muted-foreground">
                    {day.day}
                  </span>
                  <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-lg transition-all duration-500"
                      style={{
                        width: `${(day.appointments / maxWeeklyAppointments) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-sm font-medium text-foreground text-right">
                    {day.appointments}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.byStatus.map((status) => {
                const percentage =
                  data.overview.totalAppointments > 0
                    ? Math.round(
                        (status.count / data.overview.totalAppointments) * 100
                      )
                    : 0
                return (
                  <div key={status.status} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{status.status}</span>
                      <span className="text-muted-foreground">
                        {status.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          statusColors[status.status] || 'bg-gray-500'
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Most Popular Services</CardTitle>
        </CardHeader>
        <CardContent>
          {data.byService.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No appointment data yet
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.byService.map((service, index) => (
                <div
                  key={service.name}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {service.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {service.count} bookings
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

