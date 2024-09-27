export interface Product {
    id: string
    title: string
    price: number
    originalPrice: number
    image: string
    shortDescription: string
    tagline: string
    description?: string
    quantity?: number // Adicionando esta propriedade para compatibilidade com o carrinho
  }