'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { EventWithGalleries } from '@/lib/types/gallery'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Camera, 
  Loader2,
  Calendar,
  Images
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert'

export default function GalleryPage() {
  const router = useRouter()
  
  const [events, setEvents] = useState<EventWithGalleries[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch galleries
  const fetchGalleries = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/gallery')
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Gagal memuat galeri')
        return
      }

      setEvents(data.events || [])
    } catch (err) {
      setError('Terjadi kesalahan saat memuat galeri')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleries()
  }, [])

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Tanggal tidak tersedia'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-10 w-10 text-yellow-400" />
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">
               Galeri <span className="text-blue-700">Sobat Simpul</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Dokumentasi kegiatan Simpul Negeri
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div className="text-center py-16">
            <Images className="h-20 w-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Belum Ada Galeri
            </h3>
            <p className="text-gray-600">
              Galeri foto kegiatan akan muncul di sini
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const photoCount = event.event_galleries?.length || 0
            const coverPhoto = event.event_galleries?.[0]?.image_url || event.cover_image_url

            return (
              <Card 
                key={event.id}
                className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => router.push(`/gallery/event/${event.id}`)}
              >
                {/* Cover Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                  {coverPhoto ? (
                    <img
                      src={coverPhoto}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Photo Count Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/70 text-white backdrop-blur-sm">
                      <Images className="h-3 w-3 mr-1" />
                      {photoCount} Foto
                    </Badge>
                  </div>
                </div>

                {/* Event Info */}
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.event_date)}</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-blue-50 group-hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/gallery/event/${event.id}`)
                    }}
                  >
                    Lihat Foto
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}