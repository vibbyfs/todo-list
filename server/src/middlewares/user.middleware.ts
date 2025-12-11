import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headerId = req.header('x-user-id');
    console.log(headerId);
    if (!headerId) {
      throw new UnauthorizedException('x-user-id header is required');
    }

    (req as any).headerId = headerId;
    next();
  }
}
