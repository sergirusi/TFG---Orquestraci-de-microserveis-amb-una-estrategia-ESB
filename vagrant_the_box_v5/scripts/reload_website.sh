#! /bin/bash

docker rm -f web
docker build -t the_box_web /vagrant/the_box_website/
docker run --name web -it -p 80:8081 --link sign_up_ms:sign_up_ms --link get_client_ms:get_client_ms --link delete_client_ms:delete_client_ms --link update_client_ms:update_client_ms the_box_web
