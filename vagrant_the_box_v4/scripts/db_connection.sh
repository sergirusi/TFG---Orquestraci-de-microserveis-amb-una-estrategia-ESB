#!/bin/bash
docker run --name db_connection -it -p 8082:8082 --link db:db --link mule:mule -e DATABASE_HOST=DB db_connection
