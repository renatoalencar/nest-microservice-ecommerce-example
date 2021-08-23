import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CreateStockDto, Order } from "./stock.dto";
import { Stock } from "./stock.entity";
import { StockService } from "./stock.service";

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @MessagePattern('stock.create')
  createStock(stock: CreateStockDto): Promise<Stock> {
    return this.stockService.createStock(stock)
  }

  @MessagePattern('stock.update')
  updateStock(data: Order): Promise<Stock[]> {
    return this.stockService.updateQuantityAvailable(data)
  }
}
