import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string,
  user_id: string
}

@injectable()
class DevolutionRentalUseCase{

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider

  ){}

  async execute({ id, user_id }: IRequest ): Promise<Rental>{
    const minimumRentalDays = 1;
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findCarById(rental.car_id);

    if(!rental){
      throw new AppError('Rental does not exist');
    }

    const rentalPeriod = await this.dateProvider.compareInDays(
      rental.start_date,
      await this.dateProvider.date()
    );

    const expectedPeriod = await this.dateProvider.compareInDays(
      rental.start_date,
      rental.expected_return_date
    );

    const exceededPeriod = await this.dateProvider.compareInDays(
      rental.expected_return_date,
      new Date()
    );

    const total = (rentalPeriod <= minimumRentalDays) 
      ? car.daily_rate
      : ( rentalPeriod <= expectedPeriod ) 
        ? rentalPeriod * car.daily_rate
        : exceededPeriod * car.fine_amount + rentalPeriod * car.daily_rate;
      

    rental.end_date = new Date();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(rental.car_id,true);

    return rental;
  }
}

export { DevolutionRentalUseCase };