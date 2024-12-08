// src/app/auth/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState('')
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.error)
      }
    } catch {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}