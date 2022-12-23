const { uuid } = require("uuidv4");
const { USER_TYPES } = require("../utils/constants");
const dataService = require("./dataService");

class UserService {

  async getUser(userId) {
    const users = await dataService.getUsers();
    if (!users) {
      return [null, "No se encontraron usuarios"];
    }
    const foundUser = users.find(user => user.id === userId);
    if (!foundUser) {
      return [null, "No se encontraro usuario"];
    }
    return [foundUser, null];
  }

  async getAllUsers() {
    const users = await dataService.getUsers();
    if (!users) {
      return [null, "No se encontraron usuarios"];
    }
    return [users, null];
  }

  async removeUser(userId) {
    let users = await dataService.getUsers();
    if (!users) {
      return [null, "No se encontraron usuarios"];
    }
    const idx = users.findIndex(user => user.id === userId);
    if (idx == -1) {
      return [null, "No se encontro el usuario"];
    }
    users.splice(idx, 1);
    await dataService.saveUsers(users);
    return [idx, null];
  }

  async addUser(userBody) {
    if (!userBody.name || !userBody.username || !userBody.email || !userBody.password) {
      return [null, "Valores requeridos hacen falta."];
    }
    let newUser = {
      id: uuid(),
      name: userBody.name,
      username: userBody.username,
      type: userBody.type ? userBody.type : USER_TYPES.TOURIST,
      email: userBody.email,
      picture: userBody.picture ? userBody.picture : null,
      password: userBody.password,
      verified: false
    };
    const users = await dataService.getUsers();
    if (!users) {
      return [null, "No se encontraron usuarios"];
    }
    const userEmail = users.find(user => user.email === userBody.email);
    if (userEmail) {
      return [null, "Email ya esta registrado."];
    }
    const userName = users.find(user => user.username === userBody.username);
    if (userName) {
      return [null, "Username ya esta registrado."];
    }
    users.push(newUser);
    await dataService.saveUsers(users);
    return [newUser, null];
  }

}

module.exports = new UserService();