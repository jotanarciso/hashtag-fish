import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/products'
import ProductPageClient from '@/components/product-page-client'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <ProductPageClient product={product} />
}