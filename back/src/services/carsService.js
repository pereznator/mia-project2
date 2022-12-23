const { uuid } = require("uuidv4");
const dataService = require("./dataService");

class CarsService {

  async getCars(search) {
    let cars = await dataService.getCars();
    if (!cars) {
      return [null, "No se encontraron carros"];
    }
    if (search) {
      if (search.length > 0) {
        cars = cars.filter(car => car.liscence_plate === search || car.agency === search || car.brand === search || car.model === search || car.price === search || car.city === search);
      }
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

  async reserveCar(userId, liscencePlate) {
    const userCars = await dataService.getUserCars();
    if (!userCars) {
      return [null, "No se encontraron carros"];
    }
    const foundCar = userCars.find(car => car.liscence_plate === liscencePlate && car.user_id === userId);
    if (foundCar) {
      return [null, "Ya has reservado el carro seleccionado"];
    }
    let newCarRequest = {
      id: uuid(),
      liscence_plate: liscencePlate,
      user_id: userId,
      approved: false
    };

    userCars.push(newCarRequest);
    await dataService.saveUserCars(userCars);
    return [newCarRequest, null];
  }

  async getUserCars(userId) {
    const allUserCars = await dataService.getUserCars();
    if (!allUserCars) {
      return [null, "No se encontraron carros del usuario"];
    }
    const userReserves = allUserCars.filter(userCar => userCar.user_id === userId);
    if (!userReserves) {
      return [null, "No se encontraron carros del usuario"];
    }
    if (userReserves.length === 0) {
      return [[], null];
    }
    const allCars = await dataService.getCars();
    let userCars = allCars.filter(car => userReserves.map(userReserve => userReserve.liscence_plate).includes(car.liscence_plate));
    userCars = userCars.map(userCar => {
      const request = userReserves.find(reserve => reserve.liscence_plate === userCar.liscence_plate);
      return {
        ...userCar,
        approved: request.approved,
        id: request.id
      }
    });
    return [userCars, null];
  }

}

module.exports = new CarsService();