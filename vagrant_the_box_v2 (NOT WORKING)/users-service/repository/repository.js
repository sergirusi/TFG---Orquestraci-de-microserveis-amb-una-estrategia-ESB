//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var mysql = require('mysql');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connection) {
    this.connection = connection;
  }

  addClient() {
    return new Promise((resolve, reject) => {
      var client_name = "Sergi Rusiñol"
      var age = "24"
      var phone = "+34652319692"
      var email = "sergirusi@gmail.com"
      this.connection.query("INSERT INTO clients(client_name, age, phone, email) Values ('Sergi Rusiñol', '24', '+34652319692', 'sergirusi@gmail.com');", (err, results) => {
        if(err) {
          return reject(new Error('An error occured getting the users: ' + err));
        }
        else {
          console.log("SUCCESS addClient")
          this.connection.end();
        }
      });

    });
  }

  getUserByName(client_name) {

    return new Promise((resolve, reject) => {

      //  Fetch the customer.
      this.connection.query('SELECT * FROM directory WHERE client_name = ?', [client_name], (err, results) => {

        if(err) {
          return reject(new Error('An error occured getting the client: ' + err));
        }

        if(results.length === 0) {
          resolve(undefined);
        } else {
          resolve({
            client_name: results[0].client_name,
            age: results[0].age,
            email: results[0].email,
            phone_number: results[0].phone_number
          });
        }

      });

    });
  }

  disconnect() {
    this.connection.end();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.user) throw new Error("A user must be specified.");
    if(!connectionSettings.password) throw new Error("A password must be specified.");
    if(!connectionSettings.port) throw new Error("A port must be specified.");

    resolve(new Repository(mysql.createConnection(connectionSettings)));
  });
};