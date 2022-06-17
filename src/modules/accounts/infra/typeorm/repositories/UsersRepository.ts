import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm/";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

class UserRepository implements IUsersRepository{

  private repository: Repository<User>;

  constructor(){
    this.repository = dataSource.getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({where: {id}});

    return user;
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create();
    
    Object.assign( user, data);

    await this.repository.save(user);
    
  }
  

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({where: { email }});

    return user;
  }
}

export { UserRepository };