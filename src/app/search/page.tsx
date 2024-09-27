import { getProducts } from '@/lib/products'
import ProductCard from '@/components/product-card'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const searchTerm = searchParams.q
  console.log('Search term received:', searchTerm) // Debug log

  const allProducts = await getProducts()
  console.log('Total products:', allProducts.length) // Debug log

  const filteredProducts = allProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  )
  console.log('Filtered products:', filteredProducts.length) // Debug log

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for &quot;{searchTerm}&quot;
      </h1>
      {filteredProducts.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
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
      )}
    </div>
  )
}