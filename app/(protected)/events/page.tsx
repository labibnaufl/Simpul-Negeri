'use client'

import { useEffect, useState } from 'react'
import EventCard from '@/components/events/EventCard'
import { Event, EventStatus } from '@/lib/types/events'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState<EventStatus>('open')

  // Fetch events from API
  const fetchEvents = async (status: EventStatus) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/events?status=${status}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Gagal memuat event')
        return
      }

      setEvents(data.events)
    } catch (err) {
      setError('Terjadi kesalahan saat memuat event')
    } finally {
      setLoading(false)
    }
  }

  // Fetch events saat component mount atau filter berubah
  useEffect(() => {
    fetchEvents(statusFilter)
  }, [statusFilter])

  // Filter buttons
  const filterButtons: { label: string; value: EventStatus }[] = [
    { label: 'Terbuka', value: 'open' },
    { label: 'Ditutup', value: 'closed' },
    { label: 'Selesai', value: 'completed' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">
            Event <span className="text-blue-700">Volunteer</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dengan kami dalam berbagai kegiatan sosial dan pengembangan masyarakat
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {filterButtons.map((filter) => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? 'default' : 'outline'}
              onClick={() => setStatusFilter(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-800">{error}</p>
              <Button
                onClick={() => fetchEvents(statusFilter)}
                variant="outline"
                className="mt-4"
              >
                Coba Lagi
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Belum Ada Event
            </h3>
            <p className="text-gray-600">
              Tidak ada event dengan status {statusFilter} saat ini
            </p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Event Count */}
        {!loading && events.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            Menampilkan {events.length} event
          </div>
        )}
      </div>
    </div>
  )
}