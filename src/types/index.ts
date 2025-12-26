import { Prisma } from '@prisma/client'

// Service with all fields
export type ServiceType = Prisma.ServiceGetPayload<object>

// Appointment with relations
export type AppointmentWithRelations = Prisma.AppointmentGetPayload<{
  include: { patient: true; service: true }
}>

// Patient with appointments
export type PatientWithAppointments = Prisma.PatientGetPayload<{
  include: { appointments: true }
}>

// Booking form data
export interface BookingFormData {
  serviceId: string
  date: string
  time: string
  patientName: string
  patientEmail: string
  patientPhone: string
  notes?: string
}

// Time slot for booking
export interface TimeSlot {
  time: string
  available: boolean
}

// Analytics data
export interface DashboardStats {
  totalAppointments: number
  pendingAppointments: number
  completedAppointments: number
  todayAppointments: number
  mostBookedService: {
    name: string
    count: number
  } | null
  recentAppointments: AppointmentWithRelations[]
}

// Contact form data
export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

// FAQ item type
export interface FAQItem {
  question: string
  answer: string
}

// Video content type
export interface VideoContent {
  id: string
  title: string
  description: string
  youtubeId: string
  thumbnail?: string
  duration?: string
  category: 'educational' | 'treatment' | 'testimonial'
}

// Navigation link type
export interface NavLink {
  label: string
  href: string
}

