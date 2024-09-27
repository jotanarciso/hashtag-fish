'use client'

import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Product } from '@/types/product'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { useState } from 'react'

interface ProductPageClientProps {
  product: Product
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleBuyNow = () => {
    addItem({ ...product, quantity: 1 })
    router.push('/checkout')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-12">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={600}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="text-2xl font-semibold mb-4">
              <span className="text-green-600">${product.price.toFixed(2)} SGD</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through ml-2">
                  ${product.originalPrice.toFixed(2)} SGD
                </span>
              )}
            </div>
            <p className="text-lg text-gray-600 mb-6">{product.tagline}</p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="mr-2">Quantity</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="mx-2">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1" onClick={() => addItem({ ...product, quantity })}>
                  Add to Cart
                </Button>
                <Button onClick={handleBuyNow} className="flex-1">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card className="mt-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Descrição</h2>
          <div className="prose max-w-none product-description">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{product.description || ''}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}