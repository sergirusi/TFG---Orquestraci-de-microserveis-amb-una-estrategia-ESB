#!/bin/bash

while :
do
	echo "Presiona [CTRL+C] para parar.."
	curl -X POST "127.0.0.1:8087/sign_up_client?client_name=user0&age=21&phone_number=123456789&email=user0@gmail.com"
	for i in {1..10}
	do
		curl -X POST "127.0.0.1:8085/delete_client?client_name=user$[i-1]"
		curl -X POST "127.0.0.1:8087/sign_up_client?client_name=user$[i]&age=21&phone_number=123456789&email=user$[i]@gmail.com"
		curl -X GET "127.0.0.1:8084/get_client?client_name=user$[i]"
		curl -X POST "127.0.0.1:8084/delete_client?client_name=user$[i-1]"
		curl -X POST "127.0.0.1:8084/delete_client?client_name=user$[i+1]"
		curl -X POST "127.0.0.1:8086/update_client?client_name=user$[i]&type=age&data=24"
		curl -X GET "127.0.0.1:8084/get_client?client_name=user$[i]"
	done
done
