import { ICreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";


interface IRentalsRepository {
  create( { 
    user_id, 
    car_id, 
    expected_return_date,
    id,
    total,
    end_date
  }: ICreateRentalDTO ): Promise<Rental>;

  findOpenRentalByCarId( car_id: string ): Promise<Rental>;
  findOpenRentalByUserId( user_id: string ): Promise<Rental>;
  findById( id: string ): Promise<Rental>;
  findByUser( user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository }