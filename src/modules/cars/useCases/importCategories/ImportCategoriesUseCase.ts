import { inject, injectable } from "tsyringe";
import fs from 'fs';
import { parse } from "csv-parse";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
  name: string,
  description: string
}

@injectable()
class ImportCategoriesUseCase{

  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoriesRepository){
  }

  private async loadCategories( file: Express.Multer.File ): Promise<IImportCategory[]>{
    return new Promise( (resolve, reject ) => {
      
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();
      
      const categories: IImportCategory[] = [];
      stream.pipe(  parseFile );
      
      parseFile.on('data', async (line) => {
        const [ name, description ] = line;
        categories.push({name,description});
      }).on("end", () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      }).on("error", (error) =>{
        reject(error.message);
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void>{
    const categories = await this.loadCategories(file);
    
    categories.map( async category => {
      
      const { name, description} = category;

      const alreadyExistsCategory = await this.categoriesRepository.findByName(
        name
      );
      
      if(!alreadyExistsCategory){
        await this.categoriesRepository.create({name,description});
      }
    })
    
  }
}

export { ImportCategoriesUseCase }