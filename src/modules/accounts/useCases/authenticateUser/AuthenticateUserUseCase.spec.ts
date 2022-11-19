import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });
  it("should be able to authenticate a new user", async () => {
    const user: ICreateUserDTO = {
      drive_license: "00123",
      email: "user@test.com",
      password: "1234",
      name: "userTest",
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an non existent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "12121231",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        drive_license: "990",
        email: "user@user.com",
        password: "1234",
        name: "user test error",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "12",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
