'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function OAuth2Redirect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleOAuth2Callback = () => {
      const token = searchParams.get('token')
      const error = searchParams.get('error')

      if (token) {
        // Store JWT token
        localStorage.setItem('token', token)
        
        console.log('OAuth2 login successful')
        
        // Redirect to dashboard
        router.push('/dashboard')
        
      } else if (error) {
        console.error('OAuth2 login failed:', searchParams.get('message'))
        
        // Redirect back to login with error
        router.push('/login?error=oauth2_failed')
      } else {
        // No token or error found, redirect to login
        router.push('/login?error=no_token')
      }
    }

    handleOAuth2Callback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing login...</p>
      </div>
    </div>
  )
}