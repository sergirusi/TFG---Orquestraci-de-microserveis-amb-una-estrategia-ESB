var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var port = 8085;

//  Lots of verbose logging when we're starting up...
console.log("--- DELETE CLIENT MICROSERVICE ---");
console.log("Connecting to DELETE CLIENT MICROSERVICE repository...");

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
  console.error('DELETE CLIENT MICROSERVICE: Unhandled Exception', err);
});
process.on('unhandledRejection', function(err, promise){
  console.error('DELETE CLIENT MICROSERVICE: Unhandled Rejection', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/delete_client', function(req, res) {
  var data = req.query.client_name;

  var requestOptions = {
    hostname: 'mule',
    port: 8083,
    path: "/delete_client?data=" + data,
    method: "POST"
  }

  var externalRequest = http.request(requestOptions, (externalResponse) => {
    externalResponse.on('data', function(data) {
    })
    externalResponse.on('end', () => {
      res.end('Data was requested to destination');
    })
  })
  console.log("DELETE CLIENT MICROSERVICE -> Client to delete: " + data)
  externalRequest.end(data);
})

app.listen(port, (err) => {
  if (err) {
    return console.error('DELETE CLIENT MICROSERVICE: An error ocurred on microservice!: ', err)
  }

  console.log('DELETE CLIENT MICROSERVICE: server is listening on port 8085') 
})