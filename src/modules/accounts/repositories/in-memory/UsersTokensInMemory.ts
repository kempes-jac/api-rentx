import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


class UsersTokensInMemory implements IUsersTokensRepository {


  repository: UserToken[] = [];

  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token
    });

    this.repository.push(userToken);

    return userToken;
  }

  async findByUserId(user_id: string): Promise<UserToken[]> {
    return this.repository.filter(userToken => userToken.user_id === user_id);
  }


  async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserToken> {
    return this.repository.find(userToken => userToken.user_id === user_id && userToken.refresh_token === token);
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.repository.findIndex(userToken => userToken.id === id);
    this.repository.splice(userTokenIndex, 1);
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    return this.repository.find(userToken => userToken.refresh_token === token);
  }
}

export { UsersTokensInMemory }