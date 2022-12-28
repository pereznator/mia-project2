const userService = require("../services/userService");
const { errorMessage, DEFAULT_ERROR_MESSAGE, successMessage } = require("../utils/constants");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [foundUser, error] = await userService.getUser(id);
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

const getAllUsers = async (req, res) => {
  try {
    const [foundUsers, error] = await userService.getAllUsers();
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = foundUsers;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

const createUser = async (req, res) => {
  try {
    const [newUser, error] = await userService.addUser(req.body);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = newUser;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [foundUsers, error] = await userService.removeUser(id);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = foundUsers;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [foundUsers, error] = await userService.updateUser(id, req.body);
    if (error) {
      errorMessage.error = error;
      return res.status(errorMessage.status).send(errorMessage);
    }
    successMessage.data = foundUsers;
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};


module.exports = {
  getUser,
  getAllUsers,
  removeUser,
  createUser,
  updateUser
};