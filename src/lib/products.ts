import { Product } from '@/types/product'
import fs from 'fs/promises'
import path from 'path'

export async function getProducts(): Promise<Product[]> {
  const productsDirectory = path.join(process.cwd(), 'content', 'products')
  const productFolders = await fs.readdir(productsDirectory)

  const products = await Promise.all(
    productFolders.map(async (folder) => {
      const productPath = path.join(productsDirectory, folder, 'product.json')
      const productContent = await fs.readFile(productPath, 'utf8')
      return JSON.parse(productContent) as Product
    })
  )

  return products
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const productPath = path.join(process.cwd(), 'content', 'products', id, 'product.json')
  try {
    const productContent = await fs.readFile(productPath, 'utf8')
    const product = JSON.parse(productContent) as Product
    
    const descriptionPath = path.join(process.cwd(), 'content', 'products', id, 'description.md')
    const description = await fs.readFile(descriptionPath, 'utf8')
    
    return { ...product, description }
  } catch (error) {
    console.error(`Error reading product ${id}:`, error)
    return undefined
  }
}