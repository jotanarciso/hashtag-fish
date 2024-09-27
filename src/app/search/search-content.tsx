'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product-card'
import { Product } from '@/types/product'

async function getProducts(): Promise<Product[]> {
  const response = await fetch('/api/products')
  return response.json()
}

export default function SearchContent() {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('q') || ''
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      const allProducts = await getProducts()
      const filtered = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProducts(filtered)
      setIsLoading(false)
    }

    fetchProducts()
  }, [searchTerm])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for &quot;{searchTerm}&quot;
      </h1>
      {isLoading ? (
        <p>Carregando...</p>
      ) : filteredProducts.length === 0 ? (
        <p>Nenhum produto encontrado para sua busca.</p>
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