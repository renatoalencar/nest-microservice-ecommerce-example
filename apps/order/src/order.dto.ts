import { User } from "../user/user.entity"

export class PlaceOrderItem {
  productId: string

  quantity: number
}

export class PlaceOrder {
  user: User

  items: PlaceOrderItem[]
}
