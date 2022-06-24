import { createClient } from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppErrors';



export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
  ): Promise<void>{
  const redisClient = createClient({
    legacyMode: true,
    socket:{
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  });
  
  await redisClient.connect();
  
  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 10,
    duration: 5
  });
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    // await redisClient.disconnect();
    throw new AppError('Too many requests', 429);
  }
};