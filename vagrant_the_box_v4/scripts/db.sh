#!/bin/bash

docker run --name db -d -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=users -e MYSQL_USER=users_service -e MYSQL_PASSWORD=123 -p 3306:3306 mysql
