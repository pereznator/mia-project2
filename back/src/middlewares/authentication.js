const dataService = require("../services/dataService");
const { errorMessage } = require("../utils/constants");

const validateUser = async (req, res, next) => {
  const { userid } = req.headers;
  if (!userid) {
    errorMessage.error = "No esta autenticado.";
    return res.status(401).send(errorMessage);
  }
  const users = await dataService.getUsers();
  const foundUser = users.find(user => user.id === userid);
  if (!foundUser) {
    errorMessage.error = "Usuario desconocido.";
    return res.status(401).send(errorMessage);
  }
  if (!foundUser.verified) {
    errorMessage.error = "Usuario no verificado.";
    return res.status(401).send(errorMessage);  
  }
  req.user = foundUser;
  next();
};

module.exports = {
  validateUser
};