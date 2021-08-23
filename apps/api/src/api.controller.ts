import { Body, Controller, Inject, Post, Get, Delete, Param, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, Observable } from "rxjs";
import { OrderPlacementItem, CreateProductDto, Product, Order } from "./api.dto";
import { CurrentUser } from "./user.decorators";
import { UserService, User } from "./user.service";

@Controller('user')
export class UserController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('user_service') private client: ClientGrpc) { }

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService')
  }

  @Post('sign_up')
  signUp(@Body('username') username: string): Observable<User> {
    return this.userService.signUp({ username })
  }

  @Get('me')
  getUser(@CurrentUser() user: User): User {
    return user
  }
}

@Controller('products')
export class ProductController {
  constructor(@Inject('product_service') private productService: ClientProxy) { }

  @Post()
  create(@Body() product: CreateProductDto): Observable<Product> {
    return this.productService.send('products.create', product)
  }

  @Get('all')
  list(): Observable<Product[]> {
    return this.productService.send('products.list', '')
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await firstValueFrom(this.productService.send('products.delete', id))
  }
}

@Controller('order')
export class OrderController {
  constructor(@Inject('order_service') private orderService: ClientProxy) { }

  @Post('place')
  placeOrder(
    @CurrentUser() user: User,
    @Body('items') items: OrderPlacementItem
  ): Observable<Order> {
    return this.orderService.send('order.place', { user, items })
  }
}
