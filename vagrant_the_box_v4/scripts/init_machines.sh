#!/bin/bash

docker rmi $(docker images -f dangling=true -q)
docker rm $(docker ps -a -f status=exited -f status=created -q)

docker run --name db -d -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=users -e MYSQL_USER=users_service -e MYSQL_PASSWORD=123 -p 3306:3306 mysql

docker run --name db_connection -d -it -p 8082:8082 --link db:db -e DATABASE_HOST=DB db_connection

docker run -d --name mule -p 8083:8083 -v /vagrant/mule/apps:/opt/mule/apps -v /vagrant/mule/logs:/opt/mule/logs mule

docker rm -f db_connection

docker run --name db_connection -d -it -p 8082:8082 --link db:db --link mule:mule -e DATABASE_HOST=DB db_connection

docker run -it --name mule_connection -p 80:8081 --link mule:mule mule_connection
