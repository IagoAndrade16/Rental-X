import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

beforeEach(() => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  listAvailableCarsUseCase = new ListAvailableCarsUseCase(
    carsRepositoryInMemory
  );
});

describe("List cars", () => {
  it("should be able to list avalailable cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A4",
      description: "Carro bonito",
      daily_rate: 110,
      license_plate: "14120",
      fine_amount: 100,
      brand: "Audi",
      category_id: "2ec27983-0aaa-472b-b267-cecb2e205ed0",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Carro bonito",
      daily_rate: 110,
      license_plate: "14120",
      fine_amount: 100,
      brand: "Audi_test",
      category_id: "2ec27983-0aaa-472b-b267-cecb2e205ed0",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Audi_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Carro bonito",
      daily_rate: 110,
      license_plate: "14120",
      fine_amount: 100,
      brand: "Audi_test",
      category_id: "2ec27983-0aaa-472b-b267-cecb2e205ed0",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Carro bonito",
      daily_rate: 110,
      license_plate: "14120",
      fine_amount: 100,
      brand: "Audi_test",
      category_id: "2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "2",
    });

    expect(cars).toEqual([car]);
  });
});
