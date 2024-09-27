import ProductCard from '@/components/product-card'
import { getProducts } from '@/lib/products'

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Hashtag Fish - Shrimp Farming Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            originalPrice={product.originalPrice}
            shortDescription={product.shortDescription}
          />
        ))}
      </div>
    </div>
  )
}