import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface LoginRequest {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LoginRequest
    const { email, password } = body

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Login dengan Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Check error specific
      if (error.message.includes('Email not confirmed')) {
        return NextResponse.json(
          { error: 'Email belum diverifikasi. Silakan cek inbox email Anda.' },
          { status: 401 }
        )
      }

      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: 'Login berhasil!',
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.user_metadata.full_name,
      },
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}