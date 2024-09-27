import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProductCartProps {
  id: string
  title: string
  image: string
  price: number
  originalPrice?: number
  shortDescription: string
}

export default function ProductCard({ 
  id, 
  title, 
  image, 
  price, 
  originalPrice, 
  shortDescription
}: ProductCartProps) {

  return (
    <Link href={`/product/${id}`} className="block">
      <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="relative h-48 w-full mb-4 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">{shortDescription}</p>
          <div className="mt-2">
            {originalPrice && (
              <span className="text-sm line-through text-gray-500 mr-2">
                R$ {originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold">R$ {price.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Ver Detalhes</Button>
        </CardFooter>
      </Card>
    </Link>
  )
}