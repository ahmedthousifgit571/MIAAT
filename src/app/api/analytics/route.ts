import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const currentMonthStart = startOfMonth(now)
    const currentMonthEnd = endOfMonth(now)
    const lastMonthStart = startOfMonth(subMonths(now, 1))
    const lastMonthEnd = endOfMonth(subMonths(now, 1))
    const thisWeekStart = startOfWeek(now)
    const thisWeekEnd = endOfWeek(now)

    // Get various statistics
    const [
      totalAppointments,
      currentMonthAppointments,
      lastMonthAppointments,
      completedAppointments,
      cancelledAppointments,
      appointmentsByService,
      appointmentsByStatus,
      weeklyData,
      totalPatients,
    ] = await Promise.all([
      // Total appointments ever
      prisma.appointment.count(),

      // Current month appointments
      prisma.appointment.count({
        where: {
          createdAt: {
            gte: currentMonthStart,
            lte: currentMonthEnd,
          },
        },
      }),

      // Last month appointments
      prisma.appointment.count({
        where: {
          createdAt: {
            gte: lastMonthStart,
            lte: lastMonthEnd,
          },
        },
      }),

      // Completed appointments
      prisma.appointment.count({
        where: { status: 'COMPLETED' },
      }),

      // Cancelled appointments
      prisma.appointment.count({
        where: { status: 'CANCELLED' },
      }),

      // Appointments grouped by service
      prisma.appointment.groupBy({
        by: ['serviceId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      }),

      // Appointments grouped by status
      prisma.appointment.groupBy({
        by: ['status'],
        _count: { id: true },
      }),

      // This week's appointments by day
      prisma.appointment.findMany({
        where: {
          date: {
            gte: thisWeekStart,
            lte: thisWeekEnd,
          },
        },
        select: {
          date: true,
          status: true,
        },
      }),

      // Total unique patients
      prisma.patient.count(),
    ])

    // Get service names
    const serviceIds = appointmentsByService.map((a) => a.serviceId)
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true, name: true },
    })

    const serviceData = appointmentsByService.map((a) => ({
      name: services.find((s) => s.id === a.serviceId)?.name || 'Unknown',
      count: a._count.id,
    }))

    // Format status data
    const statusData = appointmentsByStatus.map((s) => ({
      status: s.status,
      count: s._count.id,
    }))

    // Format weekly data
    const daysOfWeek = eachDayOfInterval({
      start: thisWeekStart,
      end: thisWeekEnd,
    })

    const weeklyChartData = daysOfWeek.map((day) => {
      const dayStr = format(day, 'yyyy-MM-dd')
      const dayAppointments = weeklyData.filter(
        (a) => format(new Date(a.date), 'yyyy-MM-dd') === dayStr
      )
      return {
        day: format(day, 'EEE'),
        appointments: dayAppointments.length,
        completed: dayAppointments.filter((a) => a.status === 'COMPLETED')
          .length,
      }
    })

    // Calculate growth percentage
    const growthPercentage =
      lastMonthAppointments > 0
        ? Math.round(
            ((currentMonthAppointments - lastMonthAppointments) /
              lastMonthAppointments) *
              100
          )
        : 0

    // Calculate completion rate
    const completionRate =
      totalAppointments > 0
        ? Math.round((completedAppointments / totalAppointments) * 100)
        : 0

    return NextResponse.json({
      overview: {
        totalAppointments,
        currentMonthAppointments,
        lastMonthAppointments,
        growthPercentage,
        completedAppointments,
        cancelledAppointments,
        completionRate,
        totalPatients,
      },
      byService: serviceData,
      byStatus: statusData,
      weeklyTrend: weeklyChartData,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

