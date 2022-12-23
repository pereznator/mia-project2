const carsService = require("../services/carsService");
const { errorMessage, successMessage, DEFAULT_ERROR_MESSAGE } = require("../utils/constants");

const getAllCars = async (req, res) => {
  try {
    const { search } = req.query;
    const [cars, error] = await carsService.getCars(search);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = cars;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

const createCar = async (req, res) => {
  try {
    const [cars, error] = await carsService.createCar(req.body);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = cars;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

const removeCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const [cars, error] = await carsService.removeCar(carId);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = cars;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

const reserveCar = async (req, res) => {
  try {
    const { liscencePlate } = req.params;
    const [cars, error] = await carsService.reserveCar(req.user.id, liscencePlate);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = cars;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

const getUserCars = async (req, res) => {
  try {
    const userId = req.user.id;
    const [cars, error] = await carsService.getUserCars(userId);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = cars;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};


module.exports = {
  getAllCars,
  createCar,
  removeCar,
  getUserCars,
  reserveCar
};