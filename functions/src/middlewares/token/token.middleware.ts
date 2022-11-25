import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    //Verify if token exists
    const token = req.headers['token-api'];
    if (!token) {
      return res.status(401).json({
        ok: false,
        message: 'Token is required'
      });
    }
    return next();
  }

}
