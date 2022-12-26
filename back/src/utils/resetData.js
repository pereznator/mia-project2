const dataService = require("../services/dataService");

const resetData = async () => {
  await dataService.saveUsers([]);
  await dataService.saveCars([]);
  await dataService.saveTrips([]);
  await dataService.saveUserCars([]);
  await dataService.saveUserTrips([]);
};

module.exports = resetData;