#!/bin/bash

docker build -t db_connection /vagrant/microservices/db_connection-ms/
docker build -t mule_connection /vagrant/microservices/mule_connection-ms/
