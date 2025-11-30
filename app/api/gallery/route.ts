import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Ambil semua events yang punya galleries, group by event
    const { data: events, error } = await supabase
      .from('events')
      .select(`
        id,
        title,
        cover_image_url,
        event_date,
        event_galleries (
          id,
          image_url,
          caption
        )
      `)
      .not('event_galleries', 'is', null)
      .order('event_date', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Filter hanya events yang benar-benar punya galleries
    const eventsWithGalleries = (events || []).filter(
      (event: any) => event.event_galleries && event.event_galleries.length > 0
    )

    return NextResponse.json({
      events: eventsWithGalleries,
    })

  } catch (error) {
    console.error('Get all galleries error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}