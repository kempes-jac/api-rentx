import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository{
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find( cat => cat.name === name );
    
    return category;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    
    Object.assign( category, {
      name,
      description
    })

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory }