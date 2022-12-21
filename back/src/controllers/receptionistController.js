const { errorMessage, DEFAULT_ERROR_MESSAGE, successMessage } = require("../utils/constants");

const getUsers = async (req, res) => {
  try {
    console.log("Get Users");
    successMessage.data = "Receptionist Controler";
    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.error).send(errorMessage);
  }
};

module.exports = {
  getUsers
};