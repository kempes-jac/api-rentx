import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppErrors";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload{
  email: string,
  sub:string;
}

@injectable()
class RefreshTokenUseCase{

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute(token: string): Promise<string>{
    const { secretRefreshToken } = auth;
    const decode = verify( token, secretRefreshToken ) as IPayload;
    const { sub: user_id, email  } = decode;

    const userToken = await this.usersTokensRepository
      .findByUserIdAndRefreshToken(user_id,token);

    if(!userToken){
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign(
      { email },
      secretRefreshToken,
      {
        subject: user_id,
        expiresIn: auth.expiresInRefreshToken
      }
    );


    const refreshTokenExpiresDate = 
      await this.dateProvider.addDays(auth.expiresInDaysRefreshToken);

    await this.usersTokensRepository.create({
      user_id,
      expires_date: refreshTokenExpiresDate,
      refresh_token: refreshToken
    });

    return refreshToken;
  }

}

export { RefreshTokenUseCase }