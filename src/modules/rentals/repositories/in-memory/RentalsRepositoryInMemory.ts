import { ICreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";


class RentalsRepositoryInMemory implements IRentalsRepository{
  
  
  repository: Rental[] = [];

  async create({ 
    user_id, 
    car_id, 
    expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign( rental, {
      user_id, 
      car_id,
      expected_return_date,
      start_date: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    });

    this.repository.push(rental);

    return rental;
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.repository.find( (rental) => 
      !rental.end_date && rental.car_id === car_id );
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.repository.find( (rental) => 
      !rental.end_date && rental.user_id === user_id );
  }


  async findById(id: string): Promise<Rental> {
    return this.repository.find( (rental) => 
      !rental.end_date && rental.id === id );
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.filter( rental => rental.user_id === user_id );
  }
}

export { RentalsRepositoryInMemory }