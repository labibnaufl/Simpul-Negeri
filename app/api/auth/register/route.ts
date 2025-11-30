import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface RegisterRequest {
  email: string
  password: string
  fullName: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RegisterRequest
    const { email, password, fullName } = body

    // Validasi input
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, dan nama lengkap harus diisi' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Register user dengan Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Check apakah ada user
    if (!data.user) {
      return NextResponse.json(
        { error: 'Registrasi gagal, silakan coba lagi' },
        { status: 500 }
      )
    }

    // Check apakah perlu email confirmation
    if (!data.user.confirmed_at) {
      return NextResponse.json({
        message: 'Registrasi berhasil! Silakan cek email untuk verifikasi akun.',
        needsEmailConfirmation: true,
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      })
    }

    return NextResponse.json({
      message: 'Registrasi berhasil!',
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.user_metadata.full_name,
      },
    })

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}