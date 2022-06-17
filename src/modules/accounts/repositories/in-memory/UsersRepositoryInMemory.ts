import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository{
  repository: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign( user, data);

    this.repository.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user =this.repository.find( usr => usr.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user =this.repository.find( usr => usr.id === id);
    return user;
  }

}

export { UsersRepositoryInMemory }