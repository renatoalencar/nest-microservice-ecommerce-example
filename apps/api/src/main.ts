import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ApiModule } from './api.module';


async function bootstrap() {
  const api = await NestFactory.create(ApiModule, { cors: true })
  await api.listen(3000)
}
bootstrap();
