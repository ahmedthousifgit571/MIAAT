import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  ArrowRight,
} from 'lucide-react'
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns'

async function getDashboardData() {
  const today = new Date()
  const startOfToday = startOfDay(today)
  const endOfToday = endOfDay(today)
  const startOfThisMonth = startOfMonth(today)
  const endOfThisMonth = endOfMonth(today)

  const [
    totalAppointments,
    todayAppointments,
    pendingAppointments,
    completedThisMonth,
    recentAppointments,
    topServices,
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({
      where: {
        date: {
          gte: startOfToday,
          lte: endOfToday,
        },
        status: { notIn: ['CANCELLED'] },
      },
    }),
    prisma.appointment.count({
      where: { status: 'PENDING' },
    }),
    prisma.appointment.count({
      where: {
        status: 'COMPLETED',
        date: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    prisma.appointment.findMany({
      where: {
        date: { gte: startOfToday },
        status: { notIn: ['CANCELLED'] },
      },
      include: {
        patient: true,
        service: true,
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
      take: 5,
    }),
    prisma.appointment.groupBy({
      by: ['serviceId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 3,
    }),
  ])

  // Get service names for top services
  const serviceIds = topServices.map((s) => s.serviceId)
  const services = await prisma.service.findMany({
    where: { id: { in: serviceIds } },
  })

  const topServicesWithNames = topServices.map((s) => ({
    name: services.find((svc) => svc.id === s.serviceId)?.name || 'Unknown',
    count: s._count.id,
  }))

  return {
    totalAppointments,
    todayAppointments,
    pendingAppointments,
    completedThisMonth,
    recentAppointments,
    topServices: topServicesWithNames,
  }
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/admin/login')
  }

  const data = await getDashboardData()

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    RESCHEDULED: 'bg-purple-100 text-purple-800',
    NO_SHOW: 'bg-gray-100 text-gray-800',
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
          Welcome back, {session.user.name}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening at your clinic today.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today&apos;s Appointments
            </CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {data.todayAppointments}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(new Date(), 'EEEE, MMMM d')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {data.pendingAppointments}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed This Month
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {data.completedThisMonth}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(new Date(), 'MMMM yyyy')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Appointments
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {data.totalAppointments}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming appointments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Link
                href="/admin/appointments"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent>
              {data.recentAppointments.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No upcoming appointments
                </p>
              ) : (
                <div className="space-y-4">
                  {data.recentAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {appointment.patient.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.service.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">
                          {format(new Date(appointment.date), 'MMM d, yyyy')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(appointment.startTime), 'h:mm a')}
                        </div>
                      </div>
                      <Badge className={statusColors[appointment.status]}>
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top services */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Services</CardTitle>
          </CardHeader>
          <CardContent>
            {data.topServices.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No data yet
              </p>
            ) : (
              <div className="space-y-4">
                {data.topServices.map((service, index) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <span className="font-medium text-foreground">
                        {service.name}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {service.count} bookings
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

