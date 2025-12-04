'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { EventGallery } from '@/lib/types/gallery'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Loader2,
  X,
  Download,
  Camera
} from 'lucide-react'
import {
  Card,
} from '@/components/ui/card'
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert'

export default function GalleryEventDetailPage() {
  const params = useParams()
  const router = useRouter()
  
  const [galleries, setGalleries] = useState<EventGallery[]>([])
  const [eventTitle, setEventTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState<EventGallery | null>(null)

  // Fetch event galleries
  const fetchGalleries = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/gallery/event/${params.eventId}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Gagal memuat foto')
        return
      }

      setGalleries(data.galleries || [])
      
      // Set event title dari gallery pertama
      if (data.galleries && data.galleries.length > 0) {
        setEventTitle(data.galleries[0].events?.title || '')
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memuat foto')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleries()
  }, [params.eventId])

  // Close lightbox on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Download image
  const handleDownload = async (imageUrl: string, caption: string | null) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = caption || 'photo.jpg'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Download failed:', err)
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <Button
          onClick={() => router.push('/gallery')}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Galeri
        </Button>

        {/* Header */}
        {eventTitle && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {eventTitle}
            </h1>
            <p className="text-gray-600">
              {galleries.length} Foto
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!loading && galleries.length === 0 && (
          <div className="text-center py-16">
            <Camera className="h-20 w-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Belum Ada Foto
            </h3>
            <p className="text-gray-600">
              Foto untuk event ini belum tersedia
            </p>
          </div>
        )}

        {/* Photo Grid - Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleries.map((gallery) => (
            <Card 
              key={gallery.id}
              className="break-inside-avoid overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
              onClick={() => setSelectedPhoto(gallery)}
            >
              <div className="relative">
                <img
                  src={gallery.image_url}
                  alt={gallery.caption || 'Gallery photo'}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
                {gallery.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm line-clamp-2">
                      {gallery.caption}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-6xl w-full max-h-[90vh]">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Download Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-12 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload(selectedPhoto.image_url, selectedPhoto.caption)
                }}
              >
                <Download className="h-6 w-6" />
              </Button>

              {/* Image */}
              <img
                src={selectedPhoto.image_url}
                alt={selectedPhoto.caption || 'Gallery photo'}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Caption */}
              {selectedPhoto.caption && (
                <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white text-center">
                    {selectedPhoto.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}