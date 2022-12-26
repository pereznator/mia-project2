require('dotenv').config();
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

class CognitoService {

  cognito = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.APP_CLIENT_ID
  };
  userPool = new AmazonCognitoIdentity.CognitoUserPool(this.cognito);
  
  async signUpUser(username, email, password) {
    const attributes = [];
    attributes.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name: "email", Value: email}));

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributes, null, (err, data) => {
        if (err) {
          resolve(err);
          return;
        }
        const user = data.user;
        resolve(user);
        return;
      });
    });
  }

  async loginUser(username, password) {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password
    });

    const userData = {
        Username: username,
        Pool: this.userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            resolve(result);
          },
          onFailure: function (err) {
            console.log('Entra aqui con error: ' + err);
            resolve(err);  
          }
      });
    });

  }

  async removeUser(username, password) {

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password
    });
    
    const userData = {
      Username: username,
      Pool: this.userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          cognitoUser.deleteUser((err, result) => {
              if (err) {
                resolve({error: true, message: err})
                return;
              } 
              resolve({error: false, message: 'User deleted'});
              return;
          });
        },
        onFailure: function (err) {
          resolve({error: true, message: err});
        }
      });
    });
  }

}

module.exports = new CognitoService();