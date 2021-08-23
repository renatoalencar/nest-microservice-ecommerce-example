import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CreateProductDto } from "./product.dto";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @MessagePattern('products.create')
  create(product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product)
  }

  @MessagePattern('products.list')
  list(): Promise<Product[]> {
    return this.productService.listProducts()
  }

  @MessagePattern('products.delete')
  delete(id: string): Promise<void> {
    return this.productService.removeProduct(id)
  }
}
