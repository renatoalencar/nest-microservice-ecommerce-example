import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { PlaceOrder } from "./order.dto";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";

@Controller()
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) { }

  @MessagePattern('order.place')
  async placeOrder(data: PlaceOrder): Promise<Order> {
    return this.orderService.place(data.user, data.items)
  }
}
