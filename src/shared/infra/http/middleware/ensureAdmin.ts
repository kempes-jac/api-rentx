import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppErrors";
import { NextFunction, Request, Response } from "express";


export const ensureAdmin = async (
  request: Request, 
  response: Response, 
  next: NextFunction 
) => {
  const { id } = request.user;
  const usersRepository = new UserRepository();

  const user = await usersRepository.findById(id);

  if(!user.isAdmin){
    throw new AppError("User is not admin")
  }

  return next();
  
}