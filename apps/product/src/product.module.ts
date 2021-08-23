import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "ecommerce",
      entities: ["dist/apps/product/*.entity{.ts,.js}"],
      synchronize: true,
      keepConnectionAlive: true
    }),
    ClientsModule.register([
      {
        name: 'stock_service',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'stock_queue',
        },
      },
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
