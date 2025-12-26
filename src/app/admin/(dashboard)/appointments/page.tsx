'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Calendar,
  MoreHorizontal,
  Check,
  X,
  Clock,
  RefreshCw,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Appointment {
  id: string
  date: string
  startTime: string
  endTime: string
  status: string
  notes: string | null
  patient: {
    id: string
    name: string
    email: string
    phone: string
  }
  service: {
    id: string
    name: string
    duration: number
  }
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  RESCHEDULED: 'bg-purple-100 text-purple-800',
  NO_SHOW: 'bg-gray-100 text-gray-800',
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'NO_SHOW', label: 'No Show' },
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<string | null>(null)

  useEffect(() => {
    fetchAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  async function fetchAppointments() {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') {
        params.set('status', statusFilter)
      }
      const response = await fetch(`/api/appointments?${params}`)
      const data = await response.json()
      setAppointments(data)
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchAppointments()
      }
    } catch (error) {
      console.error('Failed to update appointment:', error)
    } finally {
      setIsUpdating(false)
      setDialogOpen(false)
      setPendingStatus(null)
    }
  }

  function handleStatusChange(appointment: Appointment, status: string) {
    setSelectedAppointment(appointment)
    setPendingStatus(status)
    setDialogOpen(true)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
            Appointments
          </h1>
          <p className="text-muted-foreground">
            Manage and track patient appointments
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={fetchAppointments}
            disabled={isLoading}
          >
            <RefreshCw
              className={cn('h-4 w-4', isLoading && 'animate-spin')}
            />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No appointments found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {appointment.patient.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.patient.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.service.name}</TableCell>
                  <TableCell>
                    {format(new Date(appointment.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(appointment.startTime), 'h:mm a')}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[appointment.status]}>
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {appointment.status === 'PENDING' && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(appointment, 'CONFIRMED')
                            }
                          >
                            <Check className="mr-2 h-4 w-4 text-green-600" />
                            Confirm
                          </DropdownMenuItem>
                        )}
                        {(appointment.status === 'PENDING' ||
                          appointment.status === 'CONFIRMED') && (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(appointment, 'COMPLETED')
                              }
                            >
                              <Check className="mr-2 h-4 w-4 text-blue-600" />
                              Mark Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(appointment, 'NO_SHOW')
                              }
                            >
                              <Clock className="mr-2 h-4 w-4 text-gray-600" />
                              Mark No-Show
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(appointment, 'CANCELLED')
                              }
                              className="text-destructive"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
                          </>
                        )}
                        {appointment.status === 'CANCELLED' && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(appointment, 'PENDING')
                            }
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reopen
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Confirmation dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status of{' '}
              {selectedAppointment?.patient.name}&apos;s appointment to{' '}
              <strong>{pendingStatus}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                selectedAppointment &&
                pendingStatus &&
                updateStatus(selectedAppointment.id, pendingStatus)
              }
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Confirm'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

