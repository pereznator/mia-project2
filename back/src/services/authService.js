const { uuid } = require("uuidv4");
const bucketService = require("./bucketService");
const cognitoService = require("./cognitoService");
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
      picture: null,
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

    const data = await cognitoService.signUpUser(newUser.username, newUser.email, newUser.password);

    if (!data.username) {
      return [null, "No se pudo crear el usuario (cognito)."];
    }

    if (body.picture) {
      const bucketData = await bucketService.uploadPicture(body.picture, body.username);
      if (bucketData.error) {
        return [null, "No se pudo almacenar la imagen"];
      }
      newUser.picture = bucketData.message.Location;
    }


    users.push(newUser);
    dataService.saveUsers(users);

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
    let foundUserIdx = users.findIndex(user => user.email === body.email);
    if (foundUserIdx == -1) {
      foundUserIdx = users.findIndex(user => user.username === body.email);
      if (foundUserIdx == -1) {
        return [null, "Usuario o contraseña incorrecta."];
      }
    }
    if (users[foundUserIdx].password !== body.password) {
      return [null, "Usuario o contraseña incorrecta."];
    }

    const data = await cognitoService.loginUser(users[foundUserIdx].username, users[foundUserIdx].password);
    if (!data.idToken) {
      return [null, "No se puede iniciar sesion (cognito)."];
    }

    if (!users[foundUserIdx].verified) {
      users[foundUserIdx].verified = true;
      await dataService.saveUsers(users);
    }

    return [users[foundUserIdx], null];
  }

}

module.exports = new AuthService();