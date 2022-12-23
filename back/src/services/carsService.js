const dataService = require("./dataService");

class CarsService {

  async getCars() {
    const cars = await dataService.getCars();
    if (!cars) {
      return [null, "No se encontraron carros"];
    }
    return [cars, null];
  }

  async createCar(carBody) {
    if (!carBody.liscence_plate || !carBody.agency || !carBody.brand || !carBody.model || !carBody.price || !carBody.city)  {
      return [null, "Atributos faltantes para agregar carro."];
    }
    const cars = await dataService.getCars();

    const foundCar = cars.find(car => car.liscence_plate === carBody.liscence_plate);
    if (foundCar) {
      return [null, "Ya existe un carro con el mismo numero de placa."];
    }
    const newCar = {
      liscence_plate: carBody.liscence_plate,
      agency: carBody.agency,
      brand: carBody.brand,
      model: carBody.model,
      price: carBody.price,
      city: carBody.city,
    };
    
    cars.push(newCar);
    await dataService.saveCars(cars);
    return [newCar, null];
  }

  async removeCar(liscencePlate) {
    const cars = await dataService.getCars();
    if (!cars) {
      return [null, "No se encontraron carros"];
    }
    const carIndex = cars.findIndex(car => car.liscence_plate === liscencePlate);
    if (carIndex == -1) {
      return [null, "No se encontó el carro."];
    }
    cars.splice(carIndex, 1);
    await dataService.saveCars(cars);
    return [carIndex, null];
  }

}

module.exports = new CarsService();