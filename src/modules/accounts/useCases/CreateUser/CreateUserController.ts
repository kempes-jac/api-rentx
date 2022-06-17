import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController{

  async handle(request: Request, response: Response): Promise<Response> {
    const { name,  email, password, driver_license, avatar } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    // try {
    await createUserUseCase.execute({ 
      name, 
      email, 
      password, 
      driver_license,
      avatar
    });
    return response.status(201).send();
    // } catch (e) {
    //   const errorMessage = e.message;
    //   return response.status(401).json({error: errorMessage})      
    // }

  }



}

export { CreateUserController}