import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const eventId = formData.get('eventId') as string
    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string
    const institution = formData.get('institution') as string
    const age = parseInt(formData.get('age') as string)
    const gender = formData.get('gender') as string
    const motivation = formData.get('motivation') as string
    const idCardFile = formData.get('idCard') as File

    // Validasi input
    if (!eventId || !fullName || !phone || !address || !institution || !age || !gender || !motivation || !idCardFile) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    if (age < 17) {
      return NextResponse.json(
        { error: 'Umur minimal 17 tahun' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check apakah sudah pernah daftar
    const { data: existingRegistration } = await supabase
      .from('volunteer_registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .single()

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Anda sudah terdaftar di event ini' },
        { status: 400 }
      )
    }

    // Check kuota event
    const { data: event } = await supabase
      .from('events')
      .select('max_participants, current_participants')
      .eq('id', eventId)
      .single()

    if (event && event.current_participants >= event.max_participants) {
      return NextResponse.json(
        { error: 'Kuota peserta sudah penuh' },
        { status: 400 }
      )
    }

    // Upload ID Card ke Supabase Storage
    const fileExt = idCardFile.name.split('.').pop()
    const fileName = `${user.id}/${eventId}_${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('id-cards')
      .upload(fileName, idCardFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      return NextResponse.json(
        { error: 'Gagal upload foto KTP/KTM' },
        { status: 400 }
      )
    }

    // Get public URL untuk file yang diupload
    const { data: { publicUrl } } = supabase.storage
      .from('id-cards')
      .getPublicUrl(fileName)

    // Insert registration
    const { data: registration, error: insertError } = await supabase
      .from('volunteer_registrations')
      .insert({
        event_id: eventId,
        user_id: user.id,
        full_name: fullName,
        phone,
        address,
        institution,
        age,
        gender,
        email: user.email!,
        motivation,
        id_card_url: publicUrl,
        status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      // Rollback: hapus file yang sudah diupload
      await supabase.storage.from('id-cards').remove([fileName])
      
      return NextResponse.json(
        { error: insertError.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Pendaftaran berhasil! Tunggu konfirmasi dari admin.',
      registration,
    })

  } catch (error) {
    console.error('Volunteer registration error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}