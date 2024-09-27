import { notFound } from 'next/navigation'
import { getProductById, getProducts } from '@/lib/products'
import ProductPageClient from '@/components/product-page-client'

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <ProductPageClient product={product} />
}