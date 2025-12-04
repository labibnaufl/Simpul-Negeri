// lib/types/gallery.ts

export interface EventGallery {
  id: string
  event_id: string
  image_url: string
  caption: string | null
  uploaded_at: string
  events?: {
    id: string
    title: string
  }
}

export interface EventWithGalleries {
  id: string
  title: string
  cover_image_url: string | null
  event_date: string | null
  event_galleries: EventGallery[]
}