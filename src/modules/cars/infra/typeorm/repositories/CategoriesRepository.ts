import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm/";
import { Category } from "@modules/cars/infra/typeorm/entities/Category"
import { 
  ICategoriesRepository
} from "@modules/cars/repositories/ICategoriesRepository";
import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";



class CategoriesRepository implements ICategoriesRepository{

  private repository: Repository<Category>;

  constructor(){
    this.repository = dataSource.getRepository(Category);
  }

  async create({ name, description}: ICreateCategoryDTO ): Promise<void>{
    const category = this.repository.create({
      description,
      name
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]>{
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category>{
    const category = await this.repository.findOne({ where: { name } });
    return category;
  }


}

export { CategoriesRepository }