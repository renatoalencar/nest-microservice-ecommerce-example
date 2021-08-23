import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller()
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('user.sign_up')
  signUp(username: string): Promise<User> {
    return this.userService.createUser(username)
  }

  @MessagePattern('user.authenticate')
  authenticate(id: string): Promise<User> {
    return this.userService.findById(id)
  }
}
