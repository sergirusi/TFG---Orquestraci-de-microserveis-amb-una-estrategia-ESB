var express = require("express");
var http = require("http");
var fs = require('fs');
var app = express();
var cors = require('cors');
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req,res,next) {
  console.log("THE BOX WEBSITE SERVER: Requested method = /" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

var gotJSON = {
	client_name: ""
};

router.get('/sign_up_client', function(req, res) {

	var urlPath = "/sign_up_client?client_name=" + req.query.client_name + "&age=" + req.query.age + "&phone_number=" + req.query.phone_number + "&email=" + req.query.email;

	var requestOptions = {
		hostname:'sign_up_ms',
		port:8087,
		path:urlPath,
		method:"POST"
	}

	var externalRequest = http.request(requestOptions, (externalResponse) => {
		externalResponse.on('data', function(data) {
	  		console.log("THE BOX WEBSITE SERVER: Sign up external response data = " + data);
		})
	})
	externalRequest.end();
	console.log("THE BOX WEBSITE SERVER: Sign up client query = " + req.query);
	res.send("OK");
})

router.get('/get_client', function(req, res) {
	
	gotJSON = {
		client_name: ""
	};
	
	var urlPath = "/get_client?client_name=" + req.query.client_name;

	var requestOptions = {
		hostname:'get_client_ms',
		port:8084,
		path:urlPath,
		method:"GET"
	}

	var externalRequest = http.request(requestOptions, (externalResponse) => {
		externalResponse.on('data', function(data) {
	  		console.log("THE BOX WEBSITE SERVER: Get client external response data = " + data);
	  		res.send('OK')
		})
	})
	externalRequest.end();
})

router.get('/delete_client', function(req, res) {

	var urlPath = "/delete_client?client_name=" + req.query.client_name;

	var requestOptions = {
		hostname:'delete_client_ms',
		port:8085,
		path:urlPath,
		method:"POST"
	}

	var externalRequest = http.request(requestOptions, (externalResponse) => {
		externalResponse.on('data', function(data) {
	  		console.log("THE BOX WEBSITE SERVER: Delete client external response data = " + data);
		})
	})
	externalRequest.end();
	console.log("THE BOX WEBSITE SERVER: Delete client query = " + req.query);
	res.send("OK");
})

router.get('/update_client', function(req, res) {

	var urlPath = "/update_client?client_name=" + req.query.client_name + "&type=" + req.query.type + "&data=" + req.query.data;

	var requestOptions = {
		hostname:'update_client_ms',
		port:8086,
		path:urlPath,
		method:"POST"
	}

	var externalRequest = http.request(requestOptions, (externalResponse) => {
		externalResponse.on('data', function(data) {
	  		console.log("THE BOX WEBSITE SERVER: Upd client external response data = " + data);
		})
	})
	externalRequest.end();
	res.send("OK");
})

router.post('/db_response', function(req, res) {
 	gotJSON = JSON.stringify(req.query);
  	res.send('OK')
  	console.log("THE BOX WEBSITE SERVER: Database response = " + gotJSON);
});

router.get('/get_data', function(req, res) {
	console.log("THE BOX WEBSITE SERVER: Saved data = " + gotJSON);
	res.send(gotJSON);
});


app.use("/",router);

app.use(cors());

/*app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});*/

app.listen(8081, function(){
  console.log("THE BOX WEBSITE SERVER: Live at Port 8081");
});
