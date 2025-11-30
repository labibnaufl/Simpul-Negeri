'use client'

import { useEffect, useState } from 'react'
import { Calendar, Search, Filter, Loader2 } from 'lucide-react'
import EventCard from '@/components/events/EventCard'
import EventSkeleton from '@/components/events/EventSkeleton'
import {Event} from "@/lib/types/index"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'almost-full'>('all')

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEventsList()
  }, [events, searchQuery, filterStatus])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events?status=open')
      const data = await response.json()
      
      if (response.ok) {
        setEvents(data.events)
        setFilteredEvents(data.events)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterEventsList = () => {
    let filtered = [...events]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (filterStatus === 'available') {
      filtered = filtered.filter(event => {
        const spotsLeft = event.max_participants - event.current_participants
        return spotsLeft > 5
      })
    } else if (filterStatus === 'almost-full') {
      filtered = filtered.filter(event => {
        const spotsLeft = event.max_participants - event.current_participants
        return spotsLeft > 0 && spotsLeft <= 5
      })
    }

    setFilteredEvents(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Kegiatan Volunteer</h1>
          </div>
          <p className="text-primary-100">
            Temukan kegiatan volunteer yang sesuai dengan minat dan waktu Anda
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari kegiatan, lokasi, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Status */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="all">Semua Kegiatan</option>
                <option value="available">Banyak Slot</option>
                <option value="almost-full">Hampir Penuh</option>
              </select>
            </div>
          </div>

          {/* Filter Info */}
          {(searchQuery || filterStatus !== 'all') && (
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Menampilkan {filteredEvents.length} dari {events.length} kegiatan
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilterStatus('all')
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {loading ? (
          // Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchQuery || filterStatus !== 'all' 
                ? 'Tidak Ada Hasil' 
                : 'Belum Ada Kegiatan'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || filterStatus !== 'all'
                ? 'Coba ubah kata kunci atau filter pencarian Anda'
                : 'Kegiatan volunteer akan muncul di sini'}
            </p>
            {(searchQuery || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilterStatus('all')
                }}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Lihat Semua Kegiatan
              </button>
            )}
          </div>
        ) : (
          // Events Grid
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filterStatus === 'all' && !searchQuery && 'Semua Kegiatan'}
                {filterStatus === 'available' && 'Kegiatan dengan Banyak Slot'}
                {filterStatus === 'almost-full' && 'Kegiatan Hampir Penuh'}
                {searchQuery && `Hasil Pencarian "${searchQuery}"`}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredEvents.length} kegiatan tersedia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}