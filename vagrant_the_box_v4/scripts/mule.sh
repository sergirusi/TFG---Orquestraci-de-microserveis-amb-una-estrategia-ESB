#!/bin/bash

docker run -d --name mule -p 8083:8083 -v /vagrant/mule/apps:/opt/mule/apps -v /vagrant/mule/logs:/opt/mule/logs mule
