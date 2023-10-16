import { User } from './user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const userContext = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

// import { User } from './user.entity';
// import { createParamDecorator, ExecutionContext} from '@nestjs/common';
// import { Request } from 'express'
// export function userContext (req: Request): User | undefined {
//     const ctx: ExecutionContext;
//     req = ctx.switchToHttp().getRequest();
//     return req.user;
// });
