var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var port = 8084;

//  Lots of verbose logging when we're starting up...
console.log("--- GET CLIENT MICROSERVICE ---");
console.log("Connecting to GET CLIENT MICROSERVICE repository...");

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
  console.error('GET CLIENT MICROSERVICE: Unhandled Exception', err);
});
process.on('unhandledRejection', function(err, promise){
  console.error('GET CLIENT MICROSERVICE: Unhandled Rejection', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/get_client', function(req, res) {

  var data = req.query.client_name;
  var requestOptions = {
    hostname: 'mule',
    port: 8083,
    path: "/get_client?data=" + data,
    method: "GET"
  }

  var externalRequest = http.request(requestOptions, (externalResponse) => {
    externalResponse.on('data', function(data) {
    })
    externalResponse.on('end', () => {
      res.end('Data was requested to destination');
    })
  })
  console.log("GET CLIENT MICROSERVICE -> Client requested: " + data);
  externalRequest.end(data);
  res.send("OK");
})

app.listen(port, (err) => {
  if (err) {
    return console.error('GET CLIENT MICROSERVICE: An error ocurred on server!: ', err)
  }

  console.log('GET CLIENT MICROSERVICE: server is listening on port 8084') 
})