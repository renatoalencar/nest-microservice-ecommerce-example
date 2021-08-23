import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { lastValueFrom } from "rxjs";
import { Connection, Repository } from "typeorm";
import { CreateProductDto } from "./product.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly connection: Connection,
    @Inject('stock_service')
    private readonly stockService: ClientProxy,

  ) { }

  async createProduct(data: CreateProductDto): Promise<Product | undefined> {
    const product = this.productRepository.create(data)

    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save(product)
      await lastValueFrom(this.stockService
        .send(
          'stock.create',
          {
            sku: product.sku,
            name: product.name,
            description: product.description,

            /* assumes we begin with 100 products on stock */
            quantity: 100,

            /* assumes we have 30% margin */
            price: product.price * 0.7,
          }
        ))

      await queryRunner.commitTransaction()

      return product
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  listProducts(): Promise<Product[]> {
    return this.productRepository.find()
  }

  async removeProduct(id: string): Promise<void> {
    await this.productRepository.delete(id)
  }
}
