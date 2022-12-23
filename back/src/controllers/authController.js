const authService = require("../services/authService");
const { errorMessage, DEFAULT_ERROR_MESSAGE, successMessage } = require("../utils/constants");

const login = async (req, res) => {
  try {
    const [foundUser, error] = await authService.login(req.body);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = foundUser;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

const register = async (req, res) => {
  try {
    const [registration, error] = await authService.register(req.body);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = registration;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.error = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};



module.exports = {
  login,
  register
};