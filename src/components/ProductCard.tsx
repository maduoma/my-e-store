// src/components/ProductCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleBuyNow = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      })
      
      const data = await response.json()
      if (data.url) {
        router.push(data.url)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleBuyNow}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Processing...' : 'Buy Now'}
        </Button>
      </CardFooter>
    </Card>
  )
}