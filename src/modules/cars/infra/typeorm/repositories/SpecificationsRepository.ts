import { In, Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm/";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";



class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;


  constructor(){
    this.repository = dataSource.getRepository(Specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findBy({id: In(ids)});
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({ where: {name}})
      
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create(
      {
        name,
        description
      }
    );
    const newSpecification = await this.repository.save(specification);
    return newSpecification;
  }
}

export {SpecificationsRepository}