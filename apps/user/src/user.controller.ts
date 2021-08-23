import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { User } from './user.entity'
import { UserService } from './user.service'

interface CreateUser {
  username: string
}

interface Auth {
  id: string
}

@Controller()
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @GrpcMethod('UserService', 'SignUp')
  signUp(data: CreateUser): Promise<User> {
    return this.userService.createUser(data.username)
  }

  @GrpcMethod('UserService', 'Authenticate')
  authenticate(data: Auth): Promise<User> {
    return this.userService.findById(data.id)
  }
}
