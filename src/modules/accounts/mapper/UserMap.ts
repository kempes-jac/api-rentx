import { instanceToInstance } from "class-transformer";
import { User } from "@modules/accounts//infra/typeorm/entities/User";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";



class UserMap{

  static toDTO({
    email,
    name, 
    id,
    avatar,
    driver_license,
    avatarURL
  }: User): IUserResponseDTO{
    const user = instanceToInstance<IUserResponseDTO>({
      email,
      name, 
      id,
      avatar,
      driver_license,
      avatarURL
    });
    return user;
  }
}

export { UserMap }