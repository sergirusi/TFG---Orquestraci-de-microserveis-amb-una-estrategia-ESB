var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var port = 8087;

console.log("--- SIGN UP MICROSERVICE ---");
console.log("Connecting to SIGN UP MICROSERVICE repository...");

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
  console.error('SIGN UP MICROSERVICE: Unhandled Exception', err);
});
process.on('unhandledRejection', function(err, promise){
  console.error('SIGN UP MICROSERVICE: Unhandled Rejection', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/sign_up_client', function(req, res) {

  console.log("SIGN UP MICROSERVICE -> Client to sign up: " + JSON.stringify(req.query));

  var requestOptions = {
    hostname: 'mule',
    port: 8083,
    path: "/sign_up_client",
    method: "POST"
  }

  var externalRequest = http.request(requestOptions, (externalResponse) => {
    externalResponse.on('data', function(data) {
      console.log("SIGN UP MICROSERVICE -> External response: " + data);
    })
    externalResponse.on('end', () => {
      res.end('Data has been sent to destination');
    })
  })
  var data = JSON.stringify(req.query);
  externalRequest.end(data);
})

app.listen(port, (err) => {
  if (err) {
    return console.error('SIGN UP MICROSERVICE: An error ocurred on microservice!: ', err)
  }

  console.log('SIGN UP MICROSERVICE: server is listening on port 8087') 
})