import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppErrors";
import { inject, injectable } from "tsyringe";


interface IRequest{
  name: string,
  description: string,
  daily_rate: number,
  license_plate: string,
  fine_amount: number,
  brand: string,
  category_id: string
}

@injectable()
class CreateCarUseCase{

  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ){}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: IRequest): Promise<Car>{
    //Regra de Negócio: - Não deve ser possível cadastrar um carro com uma placa já existente.
    const plateAlreadyInUse = await this.carsRepository
      .findCarByLicensePlate(license_plate);
    
    if(plateAlreadyInUse){
      throw new AppError('Plate already in use');
    }

    const car = await this.carsRepository.create(
      {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
      }   
    );
    return car;
  }
}

export { CreateCarUseCase }