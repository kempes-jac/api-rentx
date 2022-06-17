import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, IListAvailable } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{
 
  repository: Car[] = [];

  async listAvailable(listOptions: IListAvailable): Promise<Car[]> {
    const cars = this.repository
      .filter( car => car.available && (
        (listOptions.brand ? car.brand===listOptions.brand : true) 
        && (listOptions.category_id 
          ? car.category_id===listOptions.category_id
          : true) 
        && (listOptions.name ? car.name === listOptions.name : true)
      ) );    
    return cars;
  }


  async findCarByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.repository.find( currentCar => 
      currentCar.license_plate === licensePlate
    );
    return car;
  }

  async findCarById(car_id: string): Promise<Car> {
    const car = await this.repository.find( currentCar => 
      currentCar.id === car_id
    );
    return car;
  }


  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign( car, data);

    this.repository.push(car);

    return car;
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const carIndex = this.repository.findIndex( car => car.id = car_id);
    this.repository[carIndex].available = available;
  }

}

export { CarsRepositoryInMemory }