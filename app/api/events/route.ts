import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'open'

    const supabase = await createClient()

    // Ambil list events
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', status)
      .order('event_date', { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      events: events || [],
    })

  } catch (error) {
    console.error('Get events error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}