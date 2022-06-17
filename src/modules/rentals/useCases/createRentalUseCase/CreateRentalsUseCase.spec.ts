import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let daysjsDateProvider: DayjsDateProvider;
let carsRepository: CarsRepositoryInMemory;

const fakeRentalData1 = {
  user_id: "user1",
  car_id: "car1",
  expected_return_date: new Date
}
fakeRentalData1.expected_return_date.setDate(fakeRentalData1.expected_return_date.getDate()+1);


const fakeRentalData2 = {
  user_id: "user2",
  car_id: "car1",
  expected_return_date: new Date('2022-06-06')
}
fakeRentalData2.expected_return_date.setDate(fakeRentalData2.expected_return_date.getDate()+1);

const fakeRentalData3 = {
  user_id: "user1",
  car_id: "car2",
  expected_return_date: new Date('2022-06-06')
}
fakeRentalData3.expected_return_date.setDate(fakeRentalData3.expected_return_date.getDate()+1);


const fakeRentalData4 = {
  user_id: "user1",
  car_id: "car2",
  expected_return_date: new Date()
}


describe('Create Rental', ()=>{
  beforeEach(()=>{
    rentalsRepository = new RentalsRepositoryInMemory();
    daysjsDateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository, 
      daysjsDateProvider, 
      carsRepository
    );
    const car1 = new Car();
    Object.assign(car1,{
      available: true,
      id: 'car1'
    });
    carsRepository.repository.push(car1);
  });

  it('Should be possible create a new rental.',async ()=>{
    const rental = await createRentalUseCase.execute(fakeRentalData1);
      
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it("Shouldn't be possible create new rental having invalid expected return date.", async ()=>{
    await expect( createRentalUseCase.execute(fakeRentalData4)
    ).rejects.toEqual(new AppError('Invalid return date'));
  });

  it("Shouldn't be possible register a new rental if the user already has open rental.", async ()=>{
    await createRentalUseCase.execute(fakeRentalData1);
    await expect( createRentalUseCase.execute(fakeRentalData3)
    ).rejects.toEqual(new AppError("There is a rental in progress for user"));

  });

  it("Shouldn't be possible register a new rental if the car was not returned.", async ()=>{
    await createRentalUseCase.execute(fakeRentalData1);
    await expect( createRentalUseCase.execute(fakeRentalData2)
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

});