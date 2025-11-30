import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Ambil semua pendaftaran user dengan join ke events
    const { data: registrations, error } = await supabase
      .from('volunteer_registrations')
      .select(`
        *,
        events (
          id,
          title,
          event_date,
          location,
          cover_image_url,
          status
        )
      `)
      .eq('user_id', user.id)
      .order('registered_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      registrations: registrations || [],
    })

  } catch (error) {
    console.error('Get my registrations error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}