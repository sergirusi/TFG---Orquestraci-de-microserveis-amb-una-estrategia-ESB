#!/usr/bin/env bash

sudo cp /vagrant/bash.bashrc /etc/bash.bashrc
sudo cp /vagrant/environment /etc/environment
sudo cp /vagrant/apt.conf /etc/apt/apt.conf
sudo apt-get update
sudo apt-get -y install nginx

#apt-get install -y apache2
#if ! [ -L /var/www ]; then
#	rm -rf /var/www
#	ln -fs /vagrant /var/www
#fi
