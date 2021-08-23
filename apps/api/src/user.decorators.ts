import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ClientGrpcProxy } from "@nestjs/microservices";
import { resolve } from "path";
import { lastValueFrom } from "rxjs";
import { UserService, User } from "./user.service";

const client = new ClientGrpcProxy({
  package: 'user',
  protoPath: resolve('./apps/user/user.proto')
})

export const CurrentUser = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext): Promise<User> => {
    const req = ctx.switchToHttp().getRequest()
    const id = req.headers['x-userid']

    if (!id) {
      throw new BadRequestException('Authenticating requires a x-userid header')
    }

    return lastValueFrom(
      client
        .getService<UserService>('UserService')
        .authenticate({ id })
    )
  }
)
