const fs = require("fs");
const util = require("util");

class DataService {

  async getUsers() {
    const readFile = util.promisify(fs.readFile);
    const fileData = await readFile(require.resolve("../data/users.json"));
    const users = JSON.parse(fileData).users;
    return users;
  }

  async saveUsers(users) {
    const writeFile = util.promisify(fs.writeFile);
    let usersBody = {
      users
    };
    const usersJson = JSON.stringify(usersBody, null, 2);
    await writeFile(require.resolve("../data/users.json"), usersJson);
  }
  
  async getTrips() {
    const readFile = util.promisify(fs.readFile);
    const fileData = await readFile(require.resolve("../data/trips.json"));
    const trips = JSON.parse(fileData).trips;
    return trips;
  }

  async saveTrips(trips) {
    const writeFile = util.promisify(fs.writeFile);
    let tripsBody = {
      trips
    };
    const tripsJson = JSON.stringify(tripsBody, null, 2);
    await writeFile(require.resolve("../data/trips.json"), tripsJson);
  }
  
  async getCars() {
    const readFile = util.promisify(fs.readFile);
    const fileData = await readFile(require.resolve("../data/cars.json"));
    const cars = JSON.parse(fileData).cars;
    return cars;
  }

  async saveCars(cars) {
    const writeFile = util.promisify(fs.writeFile);
    let carsBody = {
      cars
    };
    const carsJson = JSON.stringify(carsBody, null, 2);
    await writeFile(require.resolve("../data/cars.json"), carsJson);
  }
  
  async getUserCars() {
    const readFile = util.promisify(fs.readFile);
    const fileData = await readFile(require.resolve("../data/user-car.json"));
    const userCar = JSON.parse(fileData).userCar;
    return userCar;
  }

  async saveUserCars(userCars) {
    const writeFile = util.promisify(fs.writeFile);
    let userCarsBody = {
      userCar: userCars
    };
    const userCarsJson = JSON.stringify(userCarsBody, null, 2);
    await writeFile(require.resolve("../data/user-car.json"), userCarsJson);
  }
  
  async getUserTrips() {
    const readFile = util.promisify(fs.readFile);
    const fileData = await readFile(require.resolve("../data/user-trip.json"));
    const userTrip = JSON.parse(fileData).userTrip;
    return userTrip;
  }

  async saveUserTrips(userTrips) {
    const writeFile = util.promisify(fs.writeFile);
    let userTripsBody = {
      userTrip: userTrips
    };
    const userTripsJson = JSON.stringify(userTripsBody, null, 2);
    await writeFile(require.resolve("../data/user-trip.json"), userTripsJson);
  }

}

module.exports = new DataService();