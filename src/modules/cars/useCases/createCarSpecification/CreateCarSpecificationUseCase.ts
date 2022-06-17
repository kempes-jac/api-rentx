import { inject, injectable } from "tsyringe";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase{

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ){}

  async execute({car_id, specifications_id}: IRequest): Promise<Car>{

    const carExists = await this.carsRepository.findCarById(car_id);
    if(!carExists){
      throw new AppError("Car does not exist");
    }

    const specifications = await this.specificationsRepository
      .findByIds(specifications_id);

    carExists.specifications = specifications;

    return await this.carsRepository.create(carExists);
  }
}

export { CreateCarSpecificationUseCase }