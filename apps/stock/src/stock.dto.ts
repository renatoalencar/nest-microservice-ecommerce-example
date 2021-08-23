export class CreateStockDto {
  sku: string

  name: string

  description: string

  quantity: number

  price: number
}

export class Product {
  sku: string

  name: string

  descrition: string

  price: number
}

export class OrderItem {
  id: string

  product: Product

  quantity: number
}

export class Order {
  id: string

  items: OrderItem[]

  total: number
}
