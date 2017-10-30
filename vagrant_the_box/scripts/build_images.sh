#!/bin/bash

docker build -t the_box_web /vagrant/the_box_website/
docker build -t db_connection /vagrant/microservices/db_connection-ms/
docker build -t sign_up_ms /vagrant/microservices/sign_up-ms/
docker build -t get_client_ms /vagrant/microservices/get_client-ms/
docker build -t delete_client_ms /vagrant/microservices/delete_client-ms/
docker build -t update_client_ms /vagrant/microservices/update_client-ms/