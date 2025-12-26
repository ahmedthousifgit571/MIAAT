import { z } from 'zod'

// Booking form validation
export const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  patientName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  patientEmail: z.string().email('Please enter a valid email address'),
  patientPhone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
})

export type BookingFormValues = z.infer<typeof bookingSchema>

// Contact form validation
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
})

export type ContactFormValues = z.infer<typeof contactSchema>

// Admin login validation
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// Appointment status update validation
export const appointmentStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'RESCHEDULED', 'NO_SHOW']),
  notes: z.string().max(500).optional(),
})

export type AppointmentStatusValues = z.infer<typeof appointmentStatusSchema>

// Availability update validation
export const availabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  isActive: z.boolean(),
})

export type AvailabilityFormValues = z.infer<typeof availabilitySchema>

// Blocked date validation
export const blockedDateSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  reason: z.string().max(200).optional(),
})

export type BlockedDateFormValues = z.infer<typeof blockedDateSchema>

