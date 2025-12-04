// Event status type
export type EventStatus = 'open' | 'closed' | 'completed'

// Event interface sesuai database schema
export interface Event {
  id: string
  title: string
  description: string | null
  event_date: string | null 
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

// Volunteer Registration interface (malas, nanti aja)
export interface VolunteerRegistration {
  id: string
  event_id: string
  user_id: string
  status: string
  created_at: string
}