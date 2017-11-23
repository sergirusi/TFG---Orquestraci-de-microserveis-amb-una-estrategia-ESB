var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var port = 8086;

//  Lots of verbose logging when we're starting up...
console.log("--- UPDATE CLIENT MICROSERVICE ---");
console.log("Connecting to UPDATE CLIENT MICROSERVICE repository...");

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
  console.error('UPDATE CLIENT MICROSERVICE: Unhandled Exception', err);
});
process.on('unhandledRejection', function(err, promise){
  console.error('UPDATE CLIENT MICROSERVICE: Unhandled Rejection', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/update_client', function(req, res) {

  var requestOptions = {
    hostname: 'mule',
    port: 8083,
    path: "/update_client",
    method: "POST"
  }

  var externalRequest = http.request(requestOptions, (externalResponse) => {
    externalResponse.on('data', function(data) {
    })
    externalResponse.on('end', () => {
      res.end('Data has been sent to destination');
    })
  })

  var data = JSON.stringify(req.query);
  console.log("UPDATE CLIENT MICROSERVICE -> Client to update: " + data)
  externalRequest.end(data);
})

app.listen(port, (err) => {
  if (err) {
    return console.error('UPDATE CLIENT MICROSERVICE: An error ocurred on microservice!', err)
  }

  console.log('UPDATE CLIENT MICROSERVICE: server is listening on port 8086') 
})