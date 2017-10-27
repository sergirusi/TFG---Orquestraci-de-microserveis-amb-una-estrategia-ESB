#!/bin/bash

docker run -it --name mule_connection -p 80:8081 --link mule:mule mule_connection
