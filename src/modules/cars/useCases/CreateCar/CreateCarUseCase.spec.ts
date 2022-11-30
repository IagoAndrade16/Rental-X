import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

beforeEach(() => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
});

describe("Create car", () => {
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "car1",
      description: "description car",
      daily_rate: 100,
      license_plate: "1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "car2",
        description: "description car",
        daily_rate: 100,
        license_plate: "1234",
        fine_amount: 60,
        brand: "brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "description car",
      daily_rate: 100,
      license_plate: "abc",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
