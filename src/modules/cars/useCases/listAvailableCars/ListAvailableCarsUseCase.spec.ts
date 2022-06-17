import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


const listOfCars = [
  {
    id: '1',
    name: 'Name 1',
    description: 'Car 1',
    daily_rate: 1,
    fine_amount: 1,
    license_plate: '1111',
    brand: "brand 1",
    category_id: 'category 1',
    available: true
  },
  {
    id: '2',
    name: 'Name 2',
    description: 'Car 2',
    daily_rate: 2,
    fine_amount: 2,
    license_plate: '22222',
    brand: "brand 2",
    category_id: 'category 2',
    available: true
  },
  {
    id: '3',
    name: 'Name 3',
    description: 'Car 3',
    daily_rate: 3,
    fine_amount: 3,
    license_plate: '3333',
    brand: "brand 3",
    category_id: 'category 3',
    available: true
  },
  {
    id: '4',
    name: 'Name 1',
    description: 'Car 4',
    daily_rate: 3,
    fine_amount: 3,
    license_plate: '4444',
    brand: "brand 1",
    category_id: 'category 1',
    available: false
  },
  {
    id: '5',
    name: 'Name 2',
    description: 'Car 5',
    daily_rate: 3,
    fine_amount: 3,
    license_plate: '5555',
    brand: "brand 2",
    category_id: 'category 2',
    available: false
  },
  {
    id: '6',
    name: 'Name 3',
    description: 'Car 6',
    daily_rate: 3,
    fine_amount: 3,
    license_plate: '5555',
    brand: "brand 3",
    category_id: 'category 3',
    available: false
  }
];


let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

type ICarsReturn = Array<Car> | null;


describe('List Cars',()=>{

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it('Should be possible list all available cars.', async () => {
    listOfCars.map( async car => {
      await carsRepository.create(car);
    })
    const cars = await listCarsUseCase.execute({});
    expect(cars).toBeInstanceOf(Array<Car>);
    expect(cars).toHaveLength(3);
  });

  it('Should be possible list all available cars filtering by name', async () => 
    {
      listOfCars.map( async car => {
        await carsRepository.create(car);
      });

      const cars1 = await listCarsUseCase.execute({name: "Name 1"});
      expect(cars1).toBeInstanceOf(Array<Car>);
      expect(cars1).toHaveLength(1);
      const cars2 = await listCarsUseCase.execute({name: "Test"});
      expect(cars2).toBeInstanceOf(Array<Car>);
      expect(cars2).toHaveLength(0);
  });

  it('Should be possible list all available cars filtering by brand', async () => 
    {
      listOfCars.map( async car => {
        await carsRepository.create(car);
      });

      const cars1 = await listCarsUseCase.execute({brand: "brand 2"});
      expect(cars1).toBeInstanceOf(Array<Car>);
      expect(cars1).toHaveLength(1);
      const cars2 = await listCarsUseCase.execute({brand: "Test"});
      expect(cars2).toBeInstanceOf(Array<Car>);
      expect(cars2).toHaveLength(0);
  });

  it('Should be possible list all available cars filtering by category', async () => 
    {
      listOfCars.map( async car => {
        await carsRepository.create(car);
      });

      const cars1 = await listCarsUseCase.execute({category_id: "category 3"});
      expect(cars1).toBeInstanceOf(Array<Car>);
      expect(cars1).toHaveLength(1);
      const cars2 = await listCarsUseCase.execute({category_id: "Test"});
      expect(cars2).toBeInstanceOf(Array<Car>);
      expect(cars2).toHaveLength(0);
  });

  
});