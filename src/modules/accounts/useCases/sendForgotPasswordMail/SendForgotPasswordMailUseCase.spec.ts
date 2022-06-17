import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;


describe("Send Forgot Password Mail", () => {


  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dayjsDateProvider,
      mailProvider
    );
  });

  it("Should be possible send forgot password mail do user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    const userData = {
      driver_license: 'license',
      email: 'test@test.com',
      name: 'testUser',
      password: 'password'
    };
    const user = await usersRepository.create(userData);

    await sendForgotPasswordMailUseCase.execute(userData.email);

    expect(sendMail).toBeCalled();
  });

  it("Shouldn't be possible send email to a non existing user", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("test@test.com")
    ).rejects.toEqual(new AppError("Invalid email"));
  });

  it("Should by possible to create an users tokens", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepository, "create");
    const userData = {
      driver_license: 'license',
      email: 'test@test.com',
      name: 'testUser',
      password: 'password'
    };
    await usersRepository.create(userData);
    await sendForgotPasswordMailUseCase.execute(userData.email);

    expect(generateTokenMail).toBeCalled();
  });
});