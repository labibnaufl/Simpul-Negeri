// User types
export interface User {
  id: string
  email: string
  fullName: string
  emailVerified?: boolean
}

export interface Session {
  user: User
  isAuthenticated: boolean
}

// Event types
export interface Event {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  max_participants: number
  current_participants: number
  cover_image_url: string
  status: 'open' | 'closed' | 'completed'
  created_at: string
  updated_at: string
}

// Volunteer Registration types
export interface VolunteerRegistration {
  id: string
  event_id: string
  user_id: string
  full_name: string
  phone: string
  address: string
  institution: string
  age: number
  gender: 'Laki-laki' | 'Perempuan'
  email: string
  motivation: string
  id_card_url: string
  status: 'pending' | 'approved' | 'rejected'
  registered_at: string
  updated_at: string
  events?: Event
}

// Gallery types
export interface EventGallery {
  id: string
  event_id: string
  image_url: string
  caption: string
  uploaded_at: string
  events?: {
    id: string
    title: string
  }
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface EventsResponse {
  events: Event[]
}

export interface EventDetailResponse {
  event: Event
  isRegistered: boolean
  userRegistration: VolunteerRegistration | null
}

export interface RegistrationsResponse {
  registrations: VolunteerRegistration[]
}

export interface GalleriesResponse {
  galleries: EventGallery[]
}

export interface EventsWithGalleriesResponse {
  events: (Event & { event_galleries: EventGallery[] })[]
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export interface VolunteerRegistrationFormData {
  eventId: string
  fullName: string
  phone: string
  address: string
  institution: string
  age: number
  gender: 'Laki-laki' | 'Perempuan'
  motivation: string
  idCard: File
}