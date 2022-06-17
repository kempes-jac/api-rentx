import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";


interface IListAvailable{
  name?: string,
  brand?: string,
  category_id?: string
}

interface ICarsRepository{
  create(data: ICreateCarDTO): Promise<Car>;
  findCarByLicensePlate(licensePlate: string): Promise<Car>;
  findCarById(car_id: string): Promise<Car>;
  listAvailable(listOptions: IListAvailable): Promise<Car[]>;
  updateAvailable(car_id: string, available: boolean): Promise<void>;
}

export { ICarsRepository, IListAvailable }