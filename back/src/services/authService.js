const { uuid } = require("uuidv4");
const dataService = require("./dataService");

class AuthService {
  
  async register(body) {
    if (!body.name || !body.username || !body.email || !body.password) {
      return [null, "Valores requeridos hacen falta."];
    }
    let newUser = {
      id: uuid(),
      name: body.name,
      username: body.username,
      type: body.type ? body.type : "tourist",
      email: body.email,
      picture: body.picture ? body.picture : null,
      password: body.password,
      verified: false
    };
    if (!body.type) {
      newUser.type = "tourist";
    }
    const users = await dataService.getUsers();
    if (!users) {
      return [null, "No se encontraron usuarios"];
    }
    const userEmail = users.find(user => user.email === body.email);
    if (userEmail) {
      return [null, "Email ya esta registrado."];
    }
    const userName = users.find(user => user.username === body.username);
    if (userName) {
      return [null, "Username ya esta registrado."];
    }
    users.push(newUser);
    await dataService.saveUsers(users);
    return [newUser, null];
  }

  async login(body) {
    if (!body.email || !body.password) {
      return [null, "Valores requeridos hacen falat."];
    }
    const users = await dataService.getUsers();
    if (!users) {
      return [null, "No se encontraron usuarios"];
    }
    let foundUser = users.find(user => user.email === body.email);
    if (!foundUser) {
      foundUser = users.find(user => user.username === body.email);
      if (!foundUser) {
        return [null, "Usuario o contraseña incorrecta."];
      }
    }
    if (foundUser.password !== body.password) {
      return [null, "Usuario o contraseña incorrecta."];
    }
    if (!foundUser.verified) {
      return [null, "Usuario no verificado."];
    }
    return [foundUser, null];
  }

}

module.exports = new AuthService();