import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { UserToken } from "../entities/UserTokens";


class UsersTokensRepository implements IUsersTokensRepository{
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = dataSource.getRepository(UserToken);
  }
  
  async findByRefreshToken(token: string): Promise<UserToken> {
    return await this.repository.findOne({where: { refresh_token: token }});
  }
  
  
  


  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    });

    await this.repository.save(userToken);

    return userToken;
  }


  async findByUserId(user_id: string): Promise<UserToken[]> {
    return await this.repository.findBy({user_id})
  }

  async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserToken> {
    return await this.repository.findOne({where: {user_id, refresh_token: token}})
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository }