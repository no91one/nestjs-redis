import { Injectable, NestMiddleware } from '@nestjs/common';
import * as passport from 'passport';
import { Response, NextFunction } from 'express';
import { UserRequest } from './user.request';

@Injectable()
export class ExtractUserMiddleware implements NestMiddleware {
  use(req: UserRequest, _res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (user) {
        req.user = user;
      }
      next();
    })(req, _res, next);
  }
}
