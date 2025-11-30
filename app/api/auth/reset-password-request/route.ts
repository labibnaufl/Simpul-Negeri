import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface ResetPasswordRequest {
  email: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ResetPasswordRequest
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email harus diisi' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Link reset password telah dikirim ke email Anda. Silakan cek inbox.',
    })

  } catch (error) {
    console.error('Reset password request error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}