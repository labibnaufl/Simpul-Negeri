'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Event, VolunteerRegistration } from '@/lib/types/events'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowLeft, 
  Loader2,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  
  const [event, setEvent] = useState<Event | null>(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [userRegistration, setUserRegistration] = useState<VolunteerRegistration | null>(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [error, setError] = useState('')

  // Fetch event detail
  const fetchEventDetail = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/events/${params.id}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Event tidak ditemukan')
        return
      }

      setEvent(data.event)
      setIsRegistered(data.isRegistered)
      setUserRegistration(data.userRegistration)
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data event')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEventDetail()
  }, [params.id])

  // Handle volunteer registration
  const handleRegister = async () => {
    if (!user) {
      router.push(`/auth/login?redirect=/events/${params.id}`)
      return
    }

    setRegistering(true)
    setError('')

    try {
      const response = await fetch('/api/volunteer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: params.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Gagal mendaftar')
        setRegistering(false)
        return
      }

      // Refresh event detail untuk update status
      await fetchEventDetail()
      setRegistering(false)
    } catch (err) {
      setError('Terjadi kesalahan saat mendaftar')
      setRegistering(false)
    }
  }

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Tanggal belum ditentukan'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Format time
  const formatTime = (dateString: string | null) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-500">Terbuka</Badge>
      case 'closed':
        return <Badge className="bg-red-500">Ditutup</Badge>
      case 'completed':
        return <Badge className="bg-gray-500">Selesai</Badge>
      default:
        return null
    }
  }

  // Get registration status badge
  const getRegistrationStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            Menunggu Konfirmasi
          </Badge>
        )
      case 'approved':
        return (
          <Badge className="bg-green-500 gap-1">
            <CheckCircle className="h-3 w-3" />
            Diterima
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Ditolak
          </Badge>
        )
      default:
        return null
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

  // Error state
  if (error && !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.back()} variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!event) return null

  const isFull = event.current_participants >= event.max_participants
  const canRegister = event.status === 'open' && !isFull && !isRegistered

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          
          {/* Left Column - Event Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Cover Image */}
            <Card className="overflow-hidden">
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-blue-100 to-indigo-100">
                {event.cover_image_url ? (
                  <img
                    src={event.cover_image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="h-24 w-24 text-gray-400" />
                  </div>
                )}
              </div>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{event.title}</CardTitle>
                    <div className="flex gap-2">
                      {getStatusBadge(event.status)}
                      {isFull && (
                        <Badge variant="outline">Kuota Penuh</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Deskripsi</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {event.description || 'Tidak ada deskripsi'}
                  </p>
                </div>

                {/* Event Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Informasi Event</h3>
                  
                  {/* Date & Time */}
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">{formatDate(event.event_date)}</p>
                      {event.event_date && (
                        <p className="text-sm text-gray-600">{formatTime(event.event_date)} WIB</p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  {event.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <p>{event.location}</p>
                    </div>
                  )}

                  {/* Participants */}
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {event.current_participants} / {event.max_participants} Peserta
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${(event.current_participants / event.max_participants) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Registration */}
          <div className="space-y-6">
            
            {/* Registration Status */}
            {isRegistered && userRegistration && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Status Pendaftaran</AlertTitle>
                <AlertDescription className="mt-2">
                  {getRegistrationStatusBadge(userRegistration.status)}
                  <p className="text-sm text-gray-600 mt-2">
                    Anda sudah terdaftar untuk event ini
                  </p>
                </AlertDescription>
              </Alert>
            )}

            {/* Registration Card */}
            <Card>
              <CardHeader>
                <CardTitle>Daftar Sebagai Volunteer</CardTitle>
                <CardDescription>
                  Bergabunglah dengan kami dalam kegiatan ini
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Error Message */}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Register Button */}
                {!user ? (
                  <div className="text-center space-y-3">
                    <p className="text-sm text-gray-600">
                      Anda harus login untuk mendaftar
                    </p>
                    <Button asChild className="w-full">
                      <Link href={`/auth/login?redirect=/events/${params.id}`}>
                        Login untuk Mendaftar
                      </Link>
                    </Button>
                  </div>
                ) : canRegister ? (
                  <Button
                    onClick={handleRegister}
                    disabled={registering}
                    className="w-full"
                  >
                    {registering ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mendaftar...
                      </>
                    ) : (
                      'Daftar Sekarang'
                    )}
                  </Button>
                ) : isRegistered ? (
                  <Button disabled className="w-full">
                    Sudah Terdaftar
                  </Button>
                ) : isFull ? (
                  <Button disabled className="w-full">
                    Kuota Penuh
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    Pendaftaran Ditutup
                  </Button>
                )}

                {/* Additional Info */}
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Pendaftaran akan diverifikasi oleh admin</p>
                  <p>• Anda akan menerima notifikasi setelah pendaftaran disetujui</p>
                </div>
              </CardContent>
            </Card>

            {/* View Registrations (if registered) */}
            {isRegistered && (
              <Button asChild variant="outline" className="w-full">
                <Link href="/my-registrations">
                  Lihat Semua Pendaftaran Saya
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}