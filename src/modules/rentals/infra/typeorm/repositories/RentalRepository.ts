import { IsNull, Repository } from "typeorm";

import { dataSource } from "@shared/infra/typeorm/";

import { ICreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";


class RentalRepository implements IRentalsRepository{

  private repository: Repository<Rental>;

  constructor(){
    this.repository = dataSource.getRepository(Rental);
  }
  
  
  
  async create({ user_id, car_id, expected_return_date, id, total,end_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      total,
      end_date
    });

    await this.repository.save(rental);

    return rental;
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return await this.repository.findOne({where: {car_id, end_date: IsNull()}});
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return await this.repository.findOne({where: {user_id, end_date: IsNull()}});
  }


  async findById(id: string): Promise<Rental> {
    return await this.repository.findOneBy({id});
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: {user_id},
      relations: ["car"]
    });
  }
}

export { RentalRepository }