import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"


interface IRequestSpecification {
  name: string,
  description: string
}

@injectable()
class CreateSpecificationUseCase{

  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ){}

  async execute({name,description}: IRequestSpecification): Promise<void>{
    const specificationAlreadyExists = await this.specificationRepository.
      findByName(name);
    if(specificationAlreadyExists){
      throw new AppError('Specification already exists!');
    }
    await this.specificationRepository.create({name, description});
  }
}

export { CreateSpecificationUseCase, IRequestSpecification }