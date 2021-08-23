import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { CreateStockDto, Order } from "./stock.dto";
import { Stock } from "./stock.entity";


@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>
  ) { }

  createStock(stock: CreateStockDto): Promise<Stock> {
    return this.stockRepository.save(stock)
  }

  async updateQuantityAvailable(order: Order): Promise<Stock[]> {
    const stocks = await this.stockRepository.find({
      sku: In(order
        .items
        .map(item => item.product.sku)
      )
    })
    const stockMap: Record<string, Stock> = Object
      .fromEntries(stocks.map(stock => [stock.sku, stock]))

    order.items.forEach(item => {
      stockMap[item.product.sku].available -= item.quantity
    })

    return this.stockRepository.save(stocks)
  }
}
