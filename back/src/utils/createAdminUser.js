const authService = require('../services/authService');
const { USER_TYPES } = require('./constants');

require('dotenv').config();

const createAdminUser = async () => {
  const username = process.env.ADMIN_USER;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const userBody = {
    username,
    email,
    password,
    name: "Administrator",
    type: USER_TYPES.ADMIN,
    picture: null,
  };

  const [newUser, error] = await authService.register(userBody);
  if (error) {
    console.error("[CREATE ADMIN ERROR]", error);
    return;
  }
  console.info("[CREATE ADMIN SUCCESS]", newUser);
  return;
};


module.exports = createAdminUser;