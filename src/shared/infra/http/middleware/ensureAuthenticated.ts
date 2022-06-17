import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppErrors";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";


interface IPayload {
  sub: string;
}

const ensureAuthenticated = async (
  request: Request, 
  response: Response, 
  next: NextFunction): Promise<void> => {
    const authHeader = request.headers.authorization;


    if(!authHeader){
      throw new AppError("Missing token",401);
    }

    const [ , token] = authHeader.split(" ");
    const secret = auth.secretToken;

    try {
      const { sub: user_id } = verify(token, secret) as IPayload;
      request.user = {
        id: user_id
      };
    } catch (error) {
      throw new AppError("Invalid token",401);      
    }

    next();
}

export { ensureAuthenticated }