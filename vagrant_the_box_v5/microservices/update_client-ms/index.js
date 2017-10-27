var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var port = 8086;

//  Lots of verbose logging when we're starting up...
console.log("--- Customer Service---");
console.log("Connecting to customer repository...");

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
  console.error('Unhandled Exception', err);
});
process.on('unhandledRejection', function(err, promise){
  console.error('Unhandled Rejection', err);
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
      console.log(data);
    })
    externalResponse.on('end', () => {
      res.end('Data was send to destination');
    })
  })
  var data = JSON.stringify(req.query);
  externalRequest.end(data);
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log('server is listening on port 8086') 
})