import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProductCartProps {
  id: string
  title: string
  image: string
  price: number
  originalPrice?: number
  shortDescription: string  // Adicione esta linha
}

export default function ProductCard({ 
  id, 
  title, 
  image, 
  price, 
  originalPrice, 
  shortDescription  // Adicione este parâmetro
}: ProductCartProps) {
  return (
    <Link href={`/product/${id}`} className="block">
      <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="relative h-48 w-full mb-4">
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">{shortDescription}</p>
          <div className="mt-2">
            {originalPrice && (
              <span className="text-sm line-through text-gray-500 mr-2">
                ${originalPrice.toFixed(2)} SGD
              </span>
            )}
            <span className="text-lg font-bold">${price.toFixed(2)} SGD</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  )
}