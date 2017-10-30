#!/bin/bash

docker rm -f db_connection
docker build -t db_connection /vagrant/microservices/db_connection-ms
docker run -it --name db_connection -p 8082:8082 --link db:db --link web:web db_connection
