import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { User } from "./api.dto";

const client = new ClientRMQ({
  urls: ['amqp://guest:guest@localhost:5672'],
  queue: 'users_queue',
})

export const CurrentUser = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext): Promise<User> => {
    const req = ctx.switchToHttp().getRequest()
    const id = req.headers['X-UserId']

    if (!id) {
      throw new BadRequestException('Authenticating requires a x-userid header')
    }

    await client.connect()

    return firstValueFrom(
      client
        .send('user.authenticate', id)
    )
  }
)
