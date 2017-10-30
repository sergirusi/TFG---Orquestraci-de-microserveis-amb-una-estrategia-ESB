#!/bin/bash

docker rm -f get_client_ms
docker build -t get_client_ms /vagrant/microservices/get_client-ms
docker run -it --name get_client_ms -p 8084:8084 --link mule:mule --link web:web get_client_ms
