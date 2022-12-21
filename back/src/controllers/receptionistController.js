const { errorMessage, DEFAULT_ERROR_MESSAGE, successMessage } = require("../utils/constants");


const getUsers = async (req, res) => {
  try {
    console.log("getting receptionists!");

    return res.status(successMessage.status).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.error = DEFAULT_ERROR_MESSAGE;
    return res.status(errorMessage.status).send(errorMessage);
  }
};

module.exports = {
  getUsers
}