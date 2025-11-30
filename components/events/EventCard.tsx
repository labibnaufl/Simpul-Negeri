'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users } from 'lucide-react'
import {Event} from "@/lib/types/index"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Calculate availability
  const spotsLeft = event.max_participants - event.current_participants
  const percentageFull = (event.current_participants / event.max_participants) * 100

  return (
    <Link 
      href={`/events/${event.id}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <Image
          src={event.cover_image_url || '/placeholder-event.jpg'}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {spotsLeft === 0 ? (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              Penuh
            </span>
          ) : spotsLeft <= 5 ? (
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
              Hampir Penuh
            </span>
          ) : (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
              Tersedia
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-primary-600 flex-shrink-0" />
            <span className="line-clamp-1">{formatDate(event.event_date)}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-primary-600 flex-shrink-0" />
            <span>
              {event.current_participants} / {event.max_participants} peserta
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${
                percentageFull >= 100 
                  ? 'bg-red-500' 
                  : percentageFull >= 80 
                  ? 'bg-orange-500' 
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentageFull, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {spotsLeft > 0 ? `${spotsLeft} slot tersisa` : 'Kuota penuh'}
          </p>
        </div>

        {/* CTA Button */}
        <button className="w-full py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors group-hover:shadow-md">
          Lihat Detail
        </button>
      </div>
    </Link>
  )
}