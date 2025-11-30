import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    // Ambil detail event
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Event tidak ditemukan' },
        { status: 404 }
      )
    }

    // Check apakah user sudah daftar ke event ini
    let isRegistered = false
    let userRegistration = null

    if (user) {
      const { data: registration } = await supabase
        .from('volunteer_registrations')
        .select('*')
        .eq('event_id', id)
        .eq('user_id', user.id)
        .single()

      if (registration) {
        isRegistered = true
        userRegistration = registration
      }
    }

    return NextResponse.json({
      event,
      isRegistered,
      userRegistration,
    })

  } catch (error) {
    console.error('Get event detail error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}