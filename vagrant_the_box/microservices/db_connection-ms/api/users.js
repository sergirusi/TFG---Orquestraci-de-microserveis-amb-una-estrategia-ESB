//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.post('/sign_up_client', (req, res, next) => {
    console.log('DB CONNECTION MICROSERVICE: Proceding to signing up the client')
    options.repository.addClient(req.query.data).catch(next);
  });

  app.get('/get_client', (req, res, next) => {
    console.log('DB CONNECTION MICROSERVICE: Proceding to getting the client')
    options.repository.getClient(req.query.data).catch(next);
    res.send('OK')
  });

  app.post('/delete_client', (req, res, next) => {
    console.log('DB CONNECTION MICROSERVICE: Proceding to deleting the client')
    options.repository.deleteClient(req.query.data).catch(next);
  });

    app.post('/update_client', (req, res, next) => {
    console.log('DB CONNECTION MICROSERVICE: Proceding to updating the client')
    options.repository.updateClient(req.query.data).catch(next);
  });
};
