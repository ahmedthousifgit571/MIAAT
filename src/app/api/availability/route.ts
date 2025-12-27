import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { addMinutes, format, isAfter, isBefore, startOfDay } from 'date-fns'

// GET - Get available time slots for a specific date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateStr = searchParams.get('date')
    const serviceId = searchParams.get('serviceId')

    if (!dateStr) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      )
    }

    const date = new Date(dateStr)
    const dayOfWeek = date.getDay()

    // Check if date is blocked
    const blockedDate = await prisma.blockedDate.findUnique({
      where: { date: startOfDay(date) },
    })

    if (blockedDate) {
      return NextResponse.json({
        available: false,
        reason: blockedDate.reason || 'Clinic is closed on this date',
        slots: [],
      })
    }

    // Get availability for this day of week
    const availability = await prisma.availability.findUnique({
      where: { dayOfWeek },
    })

    if (!availability || !availability.isActive) {
      return NextResponse.json({
        available: false,
        reason: 'Clinic is closed on this day',
        slots: [],
      })
    }

    // Get service duration (default 60 min if not specified)
    let slotDuration = 60
    if (serviceId) {
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      })
      if (service) {
        slotDuration = service.duration
      }
    }

    // Generate time slots
    const slots: { time: string; available: boolean }[] = []
    const [startHour, startMin] = availability.startTime.split(':').map(Number)
    const [endHour, endMin] = availability.endTime.split(':').map(Number)

    let currentSlot = new Date(date)
    currentSlot.setHours(startHour, startMin, 0, 0)

    const endTime = new Date(date)
    endTime.setHours(endHour, endMin, 0, 0)

    // Get existing appointments for the date
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: startOfDay(date),
        status: { notIn: ['CANCELLED'] },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    })

    // Check if today and filter past slots
    const now = new Date()
    const isToday = startOfDay(date).getTime() === startOfDay(now).getTime()

    while (isBefore(addMinutes(currentSlot, slotDuration), endTime) || 
           currentSlot.getTime() + slotDuration * 60000 <= endTime.getTime()) {
      const slotEnd = addMinutes(currentSlot, slotDuration)
      
      // Skip if slot end would be after closing
      if (isAfter(slotEnd, endTime)) {
        break
      }

      // Check if slot is in the past (for today)
      if (isToday && isBefore(currentSlot, now)) {
        currentSlot = addMinutes(currentSlot, 30) // 30 min intervals
        continue
      }

      // Check for conflicts with existing appointments
      const hasConflict = existingAppointments.some((appt) => {
        const apptStart = new Date(appt.startTime)
        const apptEnd = new Date(appt.endTime)
        
        return (
          (currentSlot >= apptStart && currentSlot < apptEnd) ||
          (slotEnd > apptStart && slotEnd <= apptEnd) ||
          (currentSlot <= apptStart && slotEnd >= apptEnd)
        )
      })

      slots.push({
        time: format(currentSlot, 'HH:mm'),
        available: !hasConflict,
      })

      currentSlot = addMinutes(currentSlot, 30) // 30 min intervals
    }

    return NextResponse.json({
      available: true,
      slots,
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}

// POST - Update availability (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { dayOfWeek, startTime, endTime, isActive } = body

    const availability = await prisma.availability.upsert({
      where: { dayOfWeek },
      update: { startTime, endTime, isActive },
      create: { dayOfWeek, startTime, endTime, isActive },
    })

    return NextResponse.json(availability)
  } catch (error) {
    console.error('Error updating availability:', error)
    return NextResponse.json(
      { error: 'Failed to update availability' },
      { status: 500 }
    )
  }
}

