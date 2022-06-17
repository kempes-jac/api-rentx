import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";
import { inject, injectable } from "tsyringe";


interface IRequest {
  user_id: string,
  car_id: string,
  expected_return_date: Date,
  id?: string,
  total?: number,
  end_date?: Date
}

@injectable()
class CreateRentalUseCase{

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ){}

  async execute({ 
    user_id, 
    car_id, 
    expected_return_date,
    id,
    end_date,
    total
  }: IRequest): Promise<Rental>{
    const minimumRentalDays = 1;


    const isCarUnavailable = 
      await this.rentalsRepository.findOpenRentalByCarId(car_id);

    if(isCarUnavailable){
      throw new AppError("Car is unavailable");
    }

    const userHaveOpenRental = 
      await this.rentalsRepository.findOpenRentalByUserId(user_id);
    
    if(userHaveOpenRental){
      throw new AppError("There is a rental in progress for user");
    }

    const compare = await this.dateProvider
      .compareInDays(expected_return_date ,await this.dateProvider.date());
    
    if(compare < minimumRentalDays){
      throw new AppError('Invalid return date');
    }

    const rental = await this.rentalsRepository.create({
      car_id, 
      user_id, 
      expected_return_date,
      id,
      end_date,
      total
    });
    
    
    await this.carsRepository.updateAvailable(rental.car_id,false);

    return rental;
  }
}

export { CreateRentalUseCase }