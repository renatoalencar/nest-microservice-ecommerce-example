import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { Product } from "../product/product.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Order]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "ecommerce",
      entities: ["dist/**/*.entity{.ts,.js}"],
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
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule { }
