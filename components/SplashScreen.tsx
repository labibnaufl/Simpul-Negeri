'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Fade in animation
    setTimeout(() => {
      setFadeIn(true)
    }, 100)

    // Progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Start fade out after completing
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => {
              onComplete()
            }, 600)
          }, 500)
          return 100
        }
        const nextProgress = prev + 5
        return nextProgress > 100 ? 100 : nextProgress
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 transition-all duration-600 ease-out ${
        !fadeIn ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } ${
        fadeOut ? 'opacity-0 scale-105' : ''
      }`}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 opacity-5 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : ''}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgb(29 78 216) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgb(250 204 21) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : ''}`}>
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-700/20 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-yellow-400/30 rounded-full blur-lg animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center max-w-md w-full transition-all duration-800 ${
        !fadeIn ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      } ${
        fadeOut ? 'opacity-0 -translate-y-8' : ''
      }`}>
        
        {/* Logo Container */}
        <div className="relative mb-8 animate-bounce-slow">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-blue-700 rounded-full blur-2xl opacity-30 animate-pulse" />
          <div className="relative bg-white rounded-3xl p-6 shadow-2xl">
            <Image
              src="/images/SIMPUL NEGERI FIX vector-01.png"
              alt="Simpul Negeri Logo"
              width={180}
              height={180}
              className="w-auto h-auto"
              priority
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-700 to-yellow-400 bg-clip-text text-transparent animate-fade-in">
            Simpul Negeri
          </h1>
          <p className="text-gray-600 text-lg animate-fade-in-delay">
            Platform Relawan Indonesia
          </p>
        </div>

        {/* Loading Animation */}
        <div className="w-full space-y-3">
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-700 via-yellow-400 to-blue-700 rounded-full transition-all duration-300 ease-out animate-shimmer"
              style={{ 
                width: `${progress}%`,
                backgroundSize: '200% 100%'
              }}
            />
          </div>
          
          {/* Progress Text */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Memuat...</span>
            <span className="text-blue-700 font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`absolute bottom-8 text-center transition-all duration-500 ${
        !fadeIn ? 'opacity-0' : 'opacity-100'
      } ${
        fadeOut ? 'opacity-0' : ''
      }`}>
        <p className="text-sm text-gray-500">
          Powered by <span className="font-semibold text-blue-700">Simpul Negeri</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          © 2024 All Rights Reserved
        </p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-delay {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1.2s ease-out forwards;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  )
}