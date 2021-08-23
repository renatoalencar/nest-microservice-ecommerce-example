import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "ecommerce",
      entities: ["dist/apps/user/*.entity.js"],
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule { }
