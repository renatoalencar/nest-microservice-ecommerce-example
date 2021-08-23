import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController, ProductController, UserController } from "./api.controller";

@Module({
  imports: [
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
        name: 'user_service',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'users_queue',
        },
      },
      {
        name: 'product_service',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'products_queue',
        },
      },
      {
        name: 'order_service',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'orders_queue',
        },
      },

    ])
  ],
  controllers: [
    UserController,
    ProductController,
    OrderController
  ]
})
export class ApiModule { }
