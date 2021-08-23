export class OrderPlacementItem {
  productId: string
  quantity: number
}

export class OrderPlacement {
  items: OrderPlacementItem[]
}

export class User {
  id: string

  username: string

  orders: any[]
}

export class CreateProductDto {
  name: string

  description: string

  sku: string

  price: number
}

export class Product {
  id: string

  name: string

  description: string

  price: number
}

export class OrderItem {
  id: string

  product: Product

  quantity: number
}

export class Order {
  id: string

  user: User

  items: OrderItem[]

  total: number
}
