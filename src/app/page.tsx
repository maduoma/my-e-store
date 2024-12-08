// src/app/page.tsx
import { prisma } from '@/lib/prisma'
import ProductGrid from '@/components/ProductGrid'

export default async function Home() {
  const products = await prisma.product.findMany()
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Collection</h1>
      <ProductGrid products={products} />
    </main>
  )
}
