// Event status type
export type EventStatus = 'open' | 'closed' | 'completed'

// Event interface sesuai database schema
export interface Event {
  id: string
  title: string
  description: string | null
  event_date: string | null // ISO string dari timestamp
  location: string | null
  max_participants: number
  current_participants: number
  cover_image_url: string | null
  status: EventStatus
  created_at: string
  updated_at: string
}

// Response dari API /events
export interface EventsResponse {
  events: Event[]
}

// Response dari API /events/[id]
export interface EventDetailResponse {
  event: Event
  isRegistered: boolean
  userRegistration: VolunteerRegistration | null
}

// Volunteer Registration interface (untuk later)
export interface VolunteerRegistration {
  id: string
  event_id: string
  user_id: string
  status: string
  created_at: string
  // tambahkan field lain sesuai table volunteer_registrations
}