import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";


class ImportCategoriesController{

  async handle(request: Request, response: Response): Promise<Response> {
    
    const { file } = request;

    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);
    // try {
    await importCategoriesUseCase.execute(file);
    // } catch (error) {
    //   return response.status(400).send();      
    // }
    return response.status(200).send();
  }
}

export { ImportCategoriesController }