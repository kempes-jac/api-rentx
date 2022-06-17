import { Repository } from "typeorm";


import { dataSource } from "@shared/infra/typeorm/";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository, IListAvailable } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository{
  private repository: Repository<Car>;

  constructor(){
    this.repository = dataSource.getRepository(Car);
  }
  
  
  async listAvailable(listOptions: IListAvailable): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder()
      .where("available = :available", {available: true});

    if(listOptions.brand){
      carsQuery.andWhere("brand = :brand ",{brand: listOptions.brand});
    }
    if(listOptions.name){
      carsQuery.andWhere("name = :name ",{name: listOptions.name});
    }
    if(listOptions.category_id){
      carsQuery.andWhere("category_id = :category_id ",
        {category_id: listOptions.category_id});
    }
    const cars = await carsQuery.getMany();
    return cars;
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create();

    Object.assign( car, data );

    this.repository.save( car );

    return car;

  }
  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({where: { license_plate }});
  }

  async findCarById(car_id: string): Promise<Car> {
    return await this.repository.findOne({where: {id: car_id}});
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    await this.repository.createQueryBuilder()
      .update()
      .set({available})
      .where("id = :id", {id: car_id}).execute();
    
  }

}

export { CarsRepository }