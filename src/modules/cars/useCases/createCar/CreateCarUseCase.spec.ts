import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car",()=>{

  const carInterface = {
    name: "Test car",
    description: "Test car description",
    daily_rate: 1,
    license_plate: "test plate",
    fine_amount: 0.5,
    brand: "test brand",
    category_id: "category"
  }

  const carInterfaceRepeatedPlate = {
    name: "Test car 2",
    description: "Test car description 2",
    daily_rate: 2,
    license_plate: "test plate",
    fine_amount: 1.5,
    brand: "test brand 2",
    category_id: "category 2"
  }

  beforeEach(()=>{
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be possible create a new car", async ()=> {
    const car = await createCarUseCase.execute(carInterface);
    expect(car).toHaveProperty("id");
  })

  it("Shouldn't be possible create a car whose license plate is already in use.", async () => {
    await createCarUseCase.execute(carInterface);
    await expect(
      createCarUseCase.execute(carInterfaceRepeatedPlate)
    ).rejects.toEqual(new AppError(('Plate already in use')))
  });

  it("Should be possible create car having available true by default", async () => {
    const car = await createCarUseCase.execute(carInterface);
    expect(car.available).toBe(true);
  });

})