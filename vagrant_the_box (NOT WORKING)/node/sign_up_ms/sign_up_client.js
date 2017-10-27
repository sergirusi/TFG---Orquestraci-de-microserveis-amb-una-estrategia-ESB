var request = require('request')

request.post('http://localhost:8083/sign_up_client', { form: {
		client_name: "Sergi Rusiñol",
		age: "24",
		phone: "+34652319692",
		email: "sergirusi@gmail.com"
	}
})
