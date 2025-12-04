import Link from 'next/link'
import { Calendar, MapPin, Users } from 'lucide-react'
import { Event } from '@/lib/types/events'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  // Format tanggal
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

  // Format waktu
  const formatTime = (dateString: string | null) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Status badge color
  const getStatusBadge = () => {
    switch (event.status) {
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

  // Check apakah event sudah penuh
  const isFull = event.current_participants >= event.max_participants

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100">
        {event.cover_image_url ? (
          <img
            src={event.cover_image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="h-16 w-16 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {getStatusBadge()}
        </div>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {event.description || 'Tidak ada deskripsi'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Tanggal */}
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-blue-600" />
          <div>
            <p>{formatDate(event.event_date)}</p>
            {event.event_date && (
              <p className="text-xs">{formatTime(event.event_date)} WIB</p>
            )}
          </div>
        </div>

        {/* Lokasi */}
        {event.location && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-red-600" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}

        {/* Participants */}
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2 text-green-600" />
          <span>
            {event.current_participants} / {event.max_participants} peserta
          </span>
          {isFull && (
            <Badge variant="outline" className="ml-2 text-xs">
              Penuh
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/events/${event.id}`}>
            Lihat Detail
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}