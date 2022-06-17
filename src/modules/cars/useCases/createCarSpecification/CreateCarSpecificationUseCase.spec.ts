import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

const carData = {
  name: "Test car",
  description: "Test car description",
  daily_rate: 1,
  license_plate: "test plate",
  fine_amount: 0.5,
  brand: "test brand",
  category_id: "category"
};

const specificationsData = [
  {
    name: 'Specification 1',
    description: 'Specification Test 1'

  },
  {
    name: 'Specification 2',
    description: 'Specification Test 2'

  },
  {
    name: 'Specification 3',
    description: 'Specification Test 3'

  }
]

describe('Create Car Specification', () => {

  beforeEach( async ()=>{
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );

  });

  
  
  it('Should be possible add a new specification to a car',async ()=>{
    const car = await carsRepository.create(carData);

    let specifications_id: string[] = [];
    specificationsData.map( async (data) => {
      const specification: Specification = await specificationsRepository.create(data);
      specifications_id.push(specification.id);
    });

    const specificationsCar = await createCarSpecificationUseCase
      .execute({car_id: car.id, specifications_id});
    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications).toHaveLength(3);
  });

  it('Should not be possible add a new specification to a non existent car', async ()=>{
    const car_id = "1234";
    const specifications_id = ["12345"];
    await expect( createCarSpecificationUseCase.execute({car_id, specifications_id})
    ).rejects.toEqual(new AppError("Car does not exist"));
  });
});