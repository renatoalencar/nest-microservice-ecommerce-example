import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { PlaceOrderItem } from "./order.dto";
import { Order } from "./order.entity";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";
import { lastValueFrom } from "rxjs";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @Inject('stock_service')
    private stockService: ClientProxy,
    private connection: Connection,
  ) { }

  private async placeOrderAndUpdateStock(order: Order): Promise<Order | undefined> {
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save(order)
      await lastValueFrom(this.stockService.send('stock.update', order))

      await queryRunner.commitTransaction()

      return order
    } catch (err) {
      console.error(err)

      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  async place(user: User, items: PlaceOrderItem[]): Promise<Order | undefined> {
    const products = await Promise.all(
      items.map(
        item =>
          this.productRepository
            .findOne(item.productId)
      ))

    const order = new Order()

    order.user = user
    order.items = items.map((item, idx) => {
      const orderItem = new OrderItem()

      orderItem.product = products[idx]
      orderItem.quantity = item.quantity

      return orderItem
    })

    order.total = order
      .items
      .reduce(
        (prev, curr) =>
          prev + curr.quantity * curr.product.price,
        0,
      )

    return this.placeOrderAndUpdateStock(order)
  }
}
