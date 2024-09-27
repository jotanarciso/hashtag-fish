'use client'

import { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/product'

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({ ...product, quantity })
  }

  return (
    <div>
      <div className="flex items-center mb-4">
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
      <Button className="w-full" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  )
}