#!/bin/bash

docker rm -f web
docker rm -f db
docker rm -f db_connection
docker rm -f mule
docker rm -f sign_up_ms
docker rm -f get_client_ms
docker rm -f delete_client_ms
docker rm -f update_client_ms

docker build -t the_box_web /vagrant/the_box_website/

docker rmi $(docker images -f dangling=true -q)
docker rm $(docker ps -a -f status=exited -f status=created -q)

docker-compose up &
