import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { StockModule } from "./stock.module";


async function bootstrap() {
  const stock = await NestFactory.createMicroservice<MicroserviceOptions>(
    StockModule,
    {

      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'stock_queue',
      },

    },
  )
  await stock.listen()
}
bootstrap()
