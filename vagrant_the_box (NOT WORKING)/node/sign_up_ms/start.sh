#!/bin/sh

#Run microservice.
echo "Starting sign up microservice"
docker build -t sign_up_ms .
docker run -it -p 8888:8888 sign_up_ms
