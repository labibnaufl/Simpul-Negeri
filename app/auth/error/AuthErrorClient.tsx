'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function AuthErrorClient() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = () => {
    switch (error) {
      case 'verification_failed':
        return 'Verifikasi email gagal. Link mungkin sudah kedaluwarsa atau tidak valid.'
      case 'access_denied':
        return 'Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.'
      default:
        return 'Terjadi kesalahan pada proses autentikasi. Silakan coba lagi.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg 
            className="w-8 h-8 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Ada Masalah
        </h1>

        <p className="text-gray-600 mb-6">
          {getErrorMessage()}
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/auth/login">Kembali ke Login</Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Ke Beranda</Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Jika masalah terus berlanjut, silakan hubungi tim support.
        </p>
      </div>
    </div>
  )
}
