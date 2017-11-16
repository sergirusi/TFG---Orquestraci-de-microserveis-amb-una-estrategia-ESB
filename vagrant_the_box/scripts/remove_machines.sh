#!/bin/bash

docker rm -f web
docker rm -f db
docker rm -f db_connection
docker rm -f mule
docker rm -f sign_up_ms
docker rm -f get_client_ms
docker rm -f delete_client_ms
docker rm -f update_client_ms
docker rm -f logstash
docker rm -f elasticsearch
docker rm -f kibana
