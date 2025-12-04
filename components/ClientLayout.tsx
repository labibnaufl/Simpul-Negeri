'use client'

import { useState, useEffect } from 'react'
import SplashScreen from './SplashScreen'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  useEffect(() => {
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }


  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={showSplash ? 'hidden' : 'block'}>
        {children}
      </div>
    </>
  )
}