import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppErrors";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";


@injectable()
class CreateUserUseCase{

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {
  }

  async execute( { 
    name, 
    email, 
    password, 
    driver_license,
    avatar
  }: ICreateUserDTO): Promise<void>{

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists){
      throw new AppError("User already exists");
    }

    const hashedPassword = await hash(password,8);
    await this.usersRepository.create({ 
      name, 
      email, 
      password: hashedPassword, 
      driver_license,
      avatar
    });
  }
}

export { CreateUserUseCase }