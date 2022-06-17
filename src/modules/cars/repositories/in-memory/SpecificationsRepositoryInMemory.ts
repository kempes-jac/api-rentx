import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepositoryInMemory implements ISpecificationsRepository{
  repository: Specification[] = [];


  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign( specification, {name, description });

    this.repository.push(specification);

    return specification;
  }


  async findByName(name: string): Promise<Specification> {
    return this.repository.find( specification => specification.name === name );
  }


  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository
      .filter( currentSpecification => ids.includes(currentSpecification.id) );

    return specifications;
  }

}

export { SpecificationsRepositoryInMemory }