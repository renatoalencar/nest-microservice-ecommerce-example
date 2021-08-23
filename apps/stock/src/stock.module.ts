import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockController } from "./stock.controller";
import { Stock } from "./stock.entity";
import { StockService } from "./stock.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "ecommerce",
      entities: ["dist/apps/stock/*.entity{.ts,.js}"],
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule { }
