#!/bin/sh

#Run mysql database container.
echo "Starting DB..."
docker run --name the_box-db -d \
	-e MYSQL_ROOT_PASSWORD=123 \
	-e MYSQL_DATABASE=clients -e MYSQL_USER=clients_service -e MYSQL_PASSWORD=123 \
	-p 3306:3306 \
	mysql:latest tail -f /dev/null


