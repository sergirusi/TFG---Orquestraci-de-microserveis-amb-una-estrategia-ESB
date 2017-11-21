//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var mysql = require('mysql');
var http = require('http');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connection) {
    this.connection = connection;
  }

  addClient(req) {
    return new Promise((resolve, reject) => {
      this.connection.query(req, (err, results) => {
        if(err && err.toString().indexOf('ER_NO_SUCH_TABLE') > -1) {
          var query = "create table users_data(client_name VARCHAR(50), age VARCHAR(3), phone_number VARCHAR(12), email VARCHAR(50), PRIMARY KEY(client_name));"
          this.connection.query(query, (err, results) => {
            if(err) {
              return reject(new Error('DB CONNECTION MICROSERVICE: An error occured signing up user: ' + err));
            }
            else {
              this.connection.query(req, (err, results) => {
                if(err) {
                  return reject(new Error('DB CONNECTION MICROSERVICE: An error occured signing up user: ' + err));
                }
                else {
                  console.log("DB CONNECTION MICROSERVICE: SUCCESS! Client signed up")
                }
              })
            }
          })
        }
        else if(err) {
          return reject(new Error('DB CONNECTION MICROSERVICE: An error occured signing up user: ' + err));
        }
        else {
          console.log("DB CONNECTION MICROSERVICE: SUCCESS! Client signed up")
        }
      });

    });
  }

  getClient(req) {

    return new Promise((resolve, reject) => {
      try {
        this.connection.query(req, (err, results) => {
          if(err) {
            return reject(new Error('DB CONNECTION MICROSERVICE: An error occured getting the client: ' + err));
          } else {
            resolve(results[0]);
          }
          var json = results[0];
          if (json === undefined) {
            console.log("DB CONNECTION MICROSERVICE: Database response is undefined")
            json = {
              client_name: null,
              age: null,
              phone_number: null,
              email: null
            }
          }
          var requestOptions = {
            hostname: 'web',
            port: 8081,
            path: "/db_response?client_name=" + json.client_name + "&age=" + json.age + "&phone_number=" + json.phone_number + "&email=" +  json.email,
            method: "POST"
          }

          var externalRequest = http.request(requestOptions, (externalResponse) => {
            externalResponse.on('end', () => {
            })
          })
          var data = JSON.stringify(json);
          console.log("DB CONNECTION MICROSERVICE: Database response to requested client: " + data + "\n");
          externalRequest.end(data);
          console.log("DB CONNECTION MICROSERVICE: Sent data to client\n");
        });
      } catch(err) {
        console.error("DB CONNECTION MICROSERVICE: An error occured getting the client = ", err);
        var requestOptions = {
          hostname: 'web',
          port: 8081,
          path: "/db_response?client_name=" + undefined + "&age=" + undefined + "&phone_number=" + undefined + "&email=" +  undefined,
          method: "POST"
        }

        var externalRequest = http.request(requestOptions, (externalResponse) => {
          externalResponse.on('end', () => {
          })
        })
        externalRequest.end(undefined);
      }
    })
  }

  deleteClient(req) {
    return new Promise((resolve, reject) => {
      this.connection.query(req, (err, results) => {
        if(err) {
          return reject(new Error('DB CONNECTION MICROSERVICE: An error occured deleting the client: ' + err));
        }
        else {
          console.log("DB CONNECTION MICROSERVICE: SUCCESS! Client deleted")
        }
      });

    });
  }

  updateClient(req) {
    return new Promise((resolve, reject) => {
      this.connection.query(req, (err, results) => {
        if(err) {
          return reject(new Error('DB CONNECTION MICROSERVICE: An error occured updating the client: ' + err));
        }
        else {
          console.log("DB CONNECTION MICROSERVICE: SUCCESS! Client updated")
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
    if(!connectionSettings.host) throw new Error("DB CONNECTION MICROSERVICE: A host must be specified.");
    if(!connectionSettings.user) throw new Error("DB CONNECTION MICROSERVICE: A user must be specified.");
    if(!connectionSettings.password) throw new Error("DB CONNECTION MICROSERVICE: A password must be specified.");
    if(!connectionSettings.port) throw new Error("DB CONNECTION MICROSERVICE: A port must be specified.");

    resolve(new Repository(mysql.createConnection(connectionSettings)));
  });
};