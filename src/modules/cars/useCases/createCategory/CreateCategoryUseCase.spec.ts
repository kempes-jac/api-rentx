import { AppError } from "@shared/errors/AppErrors";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {

  beforeEach( () => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("Should be able to create a new category", async () => {
    const name: string = 'Test';
    const description: string = 'Test description'
    await createCategoryUseCase.execute({name, description});
    const  category = await categoriesRepositoryInMemory.findByName(name);
    expect(category).toHaveProperty('id');
  });

  it("Shouldn't be able to create a new category if name already exists", async () => {

    const name: string = 'Test';
    const description: string = 'Test description';
    await createCategoryUseCase.execute({name, description});

    await  expect( createCategoryUseCase.execute({name, description})
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});