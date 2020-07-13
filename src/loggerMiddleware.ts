import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

// TODO improve log system

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request to: ' + req.path);
    next();
  }
}
