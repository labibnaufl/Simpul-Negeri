import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    eventId: string
  }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { eventId } = await params
    const supabase = await createClient()

    // Ambil galleries untuk event tertentu
    const { data: galleries, error } = await supabase
      .from('event_galleries')
      .select(`
        *,
        events (
          id,
          title
        )
      `)
      .eq('event_id', eventId)
      .order('uploaded_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      galleries: galleries || [],
    })

  } catch (error) {
    console.error('Get event galleries error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}