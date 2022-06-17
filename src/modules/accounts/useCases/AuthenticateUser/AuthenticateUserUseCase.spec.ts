import path from 'path';
import dotenv from 'dotenv';

import { AppError } from "@shared/errors/AppErrors";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

dotenv.config({ path: path.resolve("./",".env")});

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    usersTokensRepository = new UsersTokensInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,usersTokensRepository, dateProvider
    );
  });

  const user: ICreateUserDTO = {
    driver_license: "00000-0",
    email: "test@test.com",
    name: "Test",
    password: "12345test"
  };

  it('Should be able to authenticate a user', async ()=>{

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");

  });

  it("Shouldn't be possible authenticate a non existing user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234PASS'
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("Shouldn't be possible authenticate with wrong password", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '1234PASS'
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

});