import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { bookingSchema } from '@/lib/validators'

// GET - List all appointments (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const serviceId = searchParams.get('serviceId')

    const where: {
      status?: string
      date?: { gte?: Date; lte?: Date }
      serviceId?: string
    } = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (dateFrom || dateTo) {
      where.date = {}
      if (dateFrom) {
        where.date.gte = new Date(dateFrom)
      }
      if (dateTo) {
        where.date.lte = new Date(dateTo)
      }
    }

    if (serviceId) {
      where.serviceId = serviceId
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        service: true,
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

// POST - Create a new appointment (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = bookingSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const {
      serviceId,
      date,
      time,
      patientName,
      patientEmail,
      patientPhone,
      notes,
    } = validationResult.data

    // Verify service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    })

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    // Parse date and time
    const appointmentDate = new Date(date)
    const [hours, minutes] = time.split(':').map(Number)
    
    const startTime = new Date(appointmentDate)
    startTime.setHours(hours, minutes, 0, 0)
    
    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + service.duration)

    // Check for conflicts
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: appointmentDate,
        status: { notIn: ['CANCELLED'] },
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
          {
            AND: [
              { startTime: { gte: startTime } },
              { endTime: { lte: endTime } },
            ],
          },
        ],
      },
    })

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 409 }
      )
    }

    // Create or find patient
    let patient = await prisma.patient.findFirst({
      where: { email: patientEmail },
    })

    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          name: patientName,
          email: patientEmail,
          phone: patientPhone,
        },
      })
    } else {
      // Update patient info if changed
      patient = await prisma.patient.update({
        where: { id: patient.id },
        data: {
          name: patientName,
          phone: patientPhone,
        },
      })
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        serviceId,
        date: appointmentDate,
        startTime,
        endTime,
        notes,
        status: 'PENDING',
      },
      include: {
        patient: true,
        service: true,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}

