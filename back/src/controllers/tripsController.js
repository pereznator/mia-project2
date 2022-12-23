const tripsService = require("../services/tripsService");
const { errorMessage, DEFAULT_ERROR_MESSAGE, successMessage } = require("../utils/constants");

const getAllTrips = async (req, res) => {
  try {
    const { search } = req.query;
    const [trips, error] = await tripsService.getAllTrips(search);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = trips;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

const createTrip = async (req, res) => {
  try {
    const [trips, error] = await tripsService.createTrip(req.body);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = trips;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

const removeTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const [trips, error] = await tripsService.removeTrip(tripId);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = trips;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};


module.exports = {
  getAllTrips,
  createTrip,
  removeTrip
};