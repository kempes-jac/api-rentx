import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserTokens"


interface IUsersTokensRepository {
  create({ 
    user_id, 
    expires_date, 
    refresh_token 
  }: ICreateUserTokenDTO): Promise<UserToken>; 

  findByUserId( user_id: string ): Promise<UserToken[]>;

  findByUserIdAndRefreshToken( user_id: string, token: string ): Promise<UserToken>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(token: string): Promise<UserToken>;
}

export { IUsersTokensRepository }