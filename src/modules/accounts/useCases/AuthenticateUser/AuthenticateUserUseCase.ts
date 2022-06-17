import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string,
  password: string
}

interface ITokenResponse {
  token: string,
  refreshToken: string
}

interface IPayload {
  sub: string;
}

@injectable()
class AuthenticateUserUseCase{

  constructor( 
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute({email, password}: IRequest): Promise<ITokenResponse>{
    const { 
      expiresIn, 
      secretToken, 
      secretRefreshToken, 
      expiresInRefreshToken,
      expiresInDaysRefreshToken
    } = auth;

    const user = await this.usersRepository.findByEmail(email);
    if(!user){
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch){
      throw new AppError("Email or password incorrect");
    }


    

    const refreshToken = sign(
      { email }, 
      secretRefreshToken, 
      { 
        subject: user.id,
        expiresIn: expiresInRefreshToken
      }
    );

    const refreshTokenExpiresDate = 
      await this.dateProvider.addDays(expiresInDaysRefreshToken);
      
    await this.usersTokensRepository.create({
      expires_date: refreshTokenExpiresDate,
      user_id: user.id,
      refresh_token: refreshToken
    })

   

    const newToken = sign(
      {},
      secretToken,
      {
        expiresIn: expiresIn,
        subject: user.id
      }
    );


    return { refreshToken, token: newToken};
  }
}

export { AuthenticateUserUseCase }